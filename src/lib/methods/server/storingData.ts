import path from "path";
import axios from "axios";
import fs from "fs";
import { put, list } from "@vercel/blob";

import { CollegeData } from "@/types/CollegeData";
import { filePaths } from "@/constants/filePaths";

export async function saveCollegeData(collegeData: CollegeData[]) {
  const results = await Promise.allSettled(
    collegeData.map((clg) => saveCollegeDataPDF(clg))
  );

  const failed = results.filter((r) => r.status === "rejected");
  if (failed.length > 0) {
    console.error(`${failed.length} colleges failed to download`);
  }

  // const collegeCodes: number[] = collegeData.map((clg) => parseInt(clg.code));
  console.log("All possible downloads completed!");
}

async function saveCollegeDataPDF(collegeData: CollegeData) {
  const { code, cap1PdfUrl, cap2PdfUrl, cap3PdfUrl, cap4PdfUrl } = collegeData;
  let uploadedAny = false;

  const cap1FilePath = `${filePaths.cap1Dir}/${code}_cap1.pdf`;
  const cap2FilePath = `${filePaths.cap2Dir}/${code}_cap2.pdf`;
  const cap3FilePath = `${filePaths.cap3Dir}/${code}_cap3.pdf`;
  const cap4FilePath = `${filePaths.cap4Dir}/${code}_cap4.pdf`;

  // cap pdf download
  const downloadAndUploadPDF = async (url: string, blobName: string) => {
    try {
      // 1. Check if file already exists
      const { blobs } = await list();
      const exists = blobs.some((b) => b.pathname === blobName);

      if (exists) {
        console.log(`${blobName} already exists → skipping download`);
        return;
      }

      // Fetch PDF
      const response = await axios.get(url, { responseType: "arraybuffer" });

      // Upload to Vercel Blob
      const { url: blobUrl } = await put(blobName, response.data, {
        access: "public", // or "private"
      });

      console.log(`Uploaded ${blobName} → ${blobUrl}`);
      uploadedAny = true;
    } catch (err) {
      console.error(`Failed to process ${blobName}:`, err);
    }
  };

  type capDownloadArrayType = Promise<void>;
  const capDownloadArray: capDownloadArrayType[] = [];

  if (cap1PdfUrl)
    capDownloadArray.push(downloadAndUploadPDF(cap1PdfUrl, cap1FilePath));
  if (cap2PdfUrl)
    capDownloadArray.push(downloadAndUploadPDF(cap2PdfUrl, cap2FilePath));
  if (cap3PdfUrl)
    capDownloadArray.push(downloadAndUploadPDF(cap3PdfUrl, cap3FilePath));
  if (cap4PdfUrl)
    capDownloadArray.push(downloadAndUploadPDF(cap4PdfUrl, cap4FilePath));

  // parallel downloading
  await Promise.all(capDownloadArray);
  if (uploadedAny) {
    console.log(`PDFs saved for ${code}`);
  } else {
    console.log(`No new PDFs downloaded for ${code}`);
  }
}

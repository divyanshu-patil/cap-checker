import path from "path";
import axios from "axios";
import fs from "fs";

import { CollegeData } from "@/types/CollegeData";

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

const rootDir = process.cwd();

const cap1Dir = path.resolve(rootDir, process.env.CAP1 as string);
const cap2Dir = path.resolve(rootDir, process.env.CAP2 as string);
const cap3Dir = path.resolve(rootDir, process.env.CAP3 as string);
const cap4Dir = path.resolve(rootDir, process.env.CAP4 as string);

async function saveCollegeDataPDF(collegeData: CollegeData) {
  const { code, cap1PdfUrl, cap2PdfUrl, cap3PdfUrl, cap4PdfUrl } = collegeData;
  let downloadedAny = false;

  const cap1FilePath = path.join(cap1Dir, `${code}_cap1.pdf`);
  const cap2FilePath = path.join(cap2Dir, `${code}_cap2.pdf`);
  const cap3FilePath = path.join(cap3Dir, `${code}_cap3.pdf`);
  const cap4FilePath = path.join(cap4Dir, `${code}_cap4.pdf`);

  // cap pdf download
  const downloadPDF = async (url: string, outputPath: string) => {
    if (fs.existsSync(outputPath)) {
      console.log("pdf exists skipping download");
      return;
    }
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    const response = await axios.get(url, { responseType: "stream" });
    const capWriteStream = fs.createWriteStream(outputPath, { flags: "a" });

    response.data.pipe(capWriteStream);

    return new Promise<void>((resolve, reject) => {
      capWriteStream.on("finish", () => {
        downloadedAny = true;
        resolve();
      });
      capWriteStream.on("error", reject);
    });
  };

  type capDownloadArrayType = Promise<void>;
  const capDownloadArray: capDownloadArrayType[] = [];

  if (cap1PdfUrl) capDownloadArray.push(downloadPDF(cap1PdfUrl, cap1FilePath));
  if (cap2PdfUrl) capDownloadArray.push(downloadPDF(cap2PdfUrl, cap2FilePath));
  if (cap3PdfUrl) capDownloadArray.push(downloadPDF(cap3PdfUrl, cap3FilePath));
  if (cap4PdfUrl) capDownloadArray.push(downloadPDF(cap4PdfUrl, cap4FilePath));

  // parallel downloading
  await Promise.all(capDownloadArray);
  if (downloadedAny) {
    console.log(`PDFs saved for ${code}`);
  } else {
    console.log(`No new PDFs downloaded for ${code}`);
  }
}

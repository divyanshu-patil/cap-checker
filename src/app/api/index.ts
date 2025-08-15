// legacy code

import axios from "axios";
import * as cheerio from "cheerio";
import type { Element } from "domhandler";
import fs from "fs";

import { collegeCodes } from "./data/CollegeCodes";
import path from "path";

async function checkIfCap2Started(data: any): Promise<boolean> {
  const $ = cheerio.load(data);

  const tableHeader = $(".whitebox table tr").first().find("th");
  const cap2Row = tableHeader.eq(4);

  console.log(); // for formatting

  tableHeader.each((i, el) => {
    console.log(i, $(el).text());
  });

  console.log(); // for formatting

  if (!cap2Row.html()) {
    console.log("cap 2 hasnt started");
    return false;
  }

  return true;
}

interface CollegeData {
  code: string;
  name: string;
  cap1PdfUrl: string;
  cap2pdfUrl: string;
}

function getCollegeData(
  tableRow: cheerio.Cheerio<Element>,
  $: cheerio.CheerioAPI
): CollegeData | null {
  //   console.log(tableRow.html());
  const code = tableRow.find("td b font").text();

  if (!collegeCodes.includes(Number(code))) {
    return null;
  }

  const name = tableRow.find("td strong font").text().replaceAll(",", "");

  const capLinks = tableRow.find("td a");
  const [cap1, cap2] = capLinks.map((i, el) => {
    const onclick = $(el).attr("onclick");

    const capLink = onclick?.match(/'(https?:\/\/[^']+\.pdf)'/)?.[1] || "";
    // console.log(capLink);

    return capLink;
  });
  //   console.log(code, name, cap1, cap2);
  //   console.log(code, name, cap1PdfUrl);
  return { code, name, cap1PdfUrl: cap1, cap2pdfUrl: cap2 };
}

const CSVFilePath = path.resolve(__dirname, process.env.CSV_DATA as string);

async function saveCollegeDataToCSV(collegeData: CollegeData[]) {
  fs.unlink(CSVFilePath, (err) => {
    if (err) console.log(err);
    console.log("file deleted");
  });
  fs.mkdirSync(path.dirname(CSVFilePath), { recursive: true });
  const writeStream = fs.createWriteStream(CSVFilePath, { flags: "a" });

  const fileExists = fs.existsSync(CSVFilePath);
  let csvString = "";
  if (!fileExists) {
    csvString += "instcode,name,cap1PdfUrl,cap2PdfUrl\n";
  }

  writeStream.write(csvString);

  for (const data of collegeData) {
    const csvDataString = `${data.code},${data.name},${data.cap1PdfUrl},${data.cap2pdfUrl}\n`;
    const overWatermark = writeStream.write(csvDataString);

    if (!overWatermark) {
      await new Promise((resolve) => writeStream.once("drain", () => resolve));
    }
  }
}

const cap1Dir = path.resolve(__dirname, process.env.CAP1 as string);
const cap2Dir = path.resolve(__dirname, process.env.CAP2 as string);

async function saveCollegeDataPDF(collegeData: CollegeData) {
  const { code, cap1PdfUrl, cap2pdfUrl } = collegeData;

  const cap1FilePath = path.join(cap1Dir, `${code}_cap1.pdf`);
  const cap2FilePath = path.join(cap2Dir, `${code}_cap2.pdf`);

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
      capWriteStream.on("finish", resolve);
      capWriteStream.on("error", reject);
    });
  };

  // parallel downloading
  await Promise.all([
    downloadPDF(cap1PdfUrl, cap1FilePath),
    downloadPDF(cap2pdfUrl, cap2FilePath),
  ]);
  console.log(`PDFs saved for ${code}`);
}

function saveCollegeData(collegeData: CollegeData[]) {
  for (const clg of collegeData) {
    saveCollegeDataPDF(clg);
  }
  saveCollegeDataToCSV(collegeData);
}

function parseData(data: any) {
  const $ = cheerio.load(data);
  const tableRow = $(".whitebox table tr");
  const collegeData = tableRow
    .map((i, el) => {
      const collegeData = getCollegeData($(el), $);
      if (!collegeData) return;
      return collegeData;
    })
    .get() // converts Cheerio object to plain array
    .filter(Boolean);

  saveCollegeData(collegeData);
}

async function fetchData() {
  const { data } = await axios.get(process.env.TARGET_SITE as string);
  const cap2AllotmentAvailable = await checkIfCap2Started(data);
  if (cap2AllotmentAvailable) {
    parseData(data);
  }
}

fetchData();

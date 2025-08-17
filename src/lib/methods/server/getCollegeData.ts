import * as cheerio from "cheerio";
import type { Element } from "domhandler";

export interface CollegeData {
  code: string;
  name: string;
  cap1PdfUrl?: string;
  cap2PdfUrl?: string;
  cap3PdfUrl?: string;
  cap4PdfUrl?: string;
}

export const getCollegeData = ({
  tableRow,
  $,
  collegeCodes,
}: {
  tableRow: cheerio.Cheerio<Element>;
  $: cheerio.CheerioAPI;
  collegeCodes: number[];
}): CollegeData | null => {
  //   console.log(tableRow.html());
  const code = tableRow.find("td b font").text();

  if (!collegeCodes.includes(Number(code))) {
    return null;
  }

  const name = tableRow.find("td strong font").text().replaceAll(",", "");

  const capLinks = tableRow.find("td a");
  const [cap1, cap2, cap3, cap4] = capLinks.map((i, el) => {
    const onclick = $(el).attr("onclick");

    const capLink = onclick?.match(/'(https?:\/\/[^']+\.pdf)'/)?.[1] || "";

    return capLink;
  });
  return {
    code,
    name,
    cap1PdfUrl: cap1,
    cap2PdfUrl: cap2,
    cap3PdfUrl: cap3,
    cap4PdfUrl: cap4,
  };
};

import { CollegeData } from "./CollegeData";
import * as cheerio from "cheerio";
import type { Element } from "domhandler";

export const getCollegeData = ({
  tableRow,
  $,
  collegeCodes,
  capNumber,
}: {
  tableRow: cheerio.Cheerio<Element>;
  $: cheerio.CheerioAPI;
  collegeCodes: number[];
  capNumber?: number;
}): CollegeData | null => {
  //   console.log(tableRow.html());
  const code = tableRow.find("td b font").text();

  if (!collegeCodes.includes(Number(code))) {
    return null;
  }

  const name = tableRow.find("td strong font").text().replaceAll(",", "");

  const capLinks = tableRow.find("td a");

  if (capNumber) {
    const capEl = capLinks.filter((i) => i === capNumber - 1);
    const onclick = capEl.attr("onclick");
    const cap = onclick?.match(/'(https?:\/\/[^']+\.pdf)'/)?.[1] || "";

    // console.log("cap link ", cap);

    return {
      code,
      name,
      cap1PdfUrl: capNumber === 1 ? cap : undefined,
      cap2PdfUrl: capNumber === 2 ? cap : undefined,
      cap3PdfUrl: capNumber === 3 ? cap : undefined,
      cap4PdfUrl: capNumber === 4 ? cap : undefined,
    };
  }

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

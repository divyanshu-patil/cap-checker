import * as cheerio from "cheerio";
import { CollegeData, getCollegeData } from "./getCollegeData";
import { saveCollegeData } from "./storingData";

export async function getCollegeDataFromCodes(
  data: any,
  collegeCodes: number[]
): Promise<CollegeData[]> {
  const $ = cheerio.load(data);
  const tableRow = $(".whitebox table tr");
  const collegeData = tableRow
    .map((i, el) => {
      const collegeData = getCollegeData({ tableRow: $(el), $, collegeCodes });
      if (!collegeData) return;
      return collegeData;
    })
    .get() // converts Cheerio object to plain array
    .filter(Boolean);

  return collegeData;
}

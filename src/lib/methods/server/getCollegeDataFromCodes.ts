import * as cheerio from "cheerio";

import { getCollegeData } from "./getCollegeData";
import { CollegeData } from "@/types/CollegeData";

export async function getCollegeDataFromCodes(
  data: any,
  collegeCodes: number[],
  capNumber?: number
): Promise<CollegeData[]> {
  const $ = cheerio.load(data);
  const tableRow = $(".whitebox table tr");
  const collegeData = tableRow
    .map((i, el) => {
      const collegeData = getCollegeData({
        tableRow: $(el),
        $,
        collegeCodes,
        capNumber,
      });
      if (!collegeData) return;
      return collegeData;
    })
    .get() // converts Cheerio object to plain array
    .filter(Boolean);

  return collegeData;
}

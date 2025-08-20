import * as cheerio from "cheerio";

export async function checkIfCapStarted(
  data: any,
  capNumber: number
): Promise<boolean> {
  const $ = cheerio.load(data);

  const tableHeader = $(".whitebox table tr").first().find("th");
  // Ignore first 3 (Sr No, Inst Code, Inst Name)
  const capHeaders = tableHeader.slice(3);

  // Now capNumber = 1 → CAP I, 2 → CAP II
  const capRow = capHeaders.eq(capNumber - 1);

  // console.log("cap row", capRow.html());

  // console.log(); // for formatting

  // tableHeader.each((i, el) => {
  //   console.log(i, $(el).text());
  // });

  // console.log(); // for formatting

  if (!capRow.html()) {
    console.log(`cap ${capNumber} hasnt started`);
    return false;
  }

  return true;
}

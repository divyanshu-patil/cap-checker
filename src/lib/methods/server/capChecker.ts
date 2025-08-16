import * as cheerio from "cheerio";

export async function checkIfCapStarted(
  data: any,
  capNumber: number
): Promise<boolean> {
  const $ = cheerio.load(data);

  const tableHeader = $(".whitebox table tr").first().find("th");
  const cap2Row = tableHeader.eq(capNumber - 2); // -2 for sr no and inst code

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

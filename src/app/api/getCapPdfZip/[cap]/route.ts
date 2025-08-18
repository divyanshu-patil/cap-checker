import {
  InvalidFieldsError,
  MissingFieldsError,
  NotFoundError,
} from "@/lib/errors";
import { fetchDataStatus } from "@/lib/methods/server/fetchData";
import { getCollegeDataFromCodes } from "@/lib/methods/server/getCollegeDataFromCodes";
import { saveCollegeData } from "@/lib/methods/server/storingData";
import { zipCollegePdf } from "@/lib/methods/server/zipCollegePdf";
import { CollegeData } from "@/types/CollegeData";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  context: { params: { cap: string } }
) {
  try {
    const params = await context.params;
    const body = await req.json();
    const { codes } = body;
    const capNumber = parseInt(params.cap);

    console.log("capNumber", capNumber);
    if (!capNumber || capNumber < 1 || capNumber > 4) {
      return NextResponse.json(
        {
          error: "invalid cap number",
          name: InvalidFieldsError.name,
        },
        { status: 400 }
      );
    }

    if (!Array.isArray(codes) || codes.length === 0) {
      return NextResponse.json(
        { error: "collegeCodes array required", name: MissingFieldsError.name },
        { status: 400 }
      );
    }

    const dataStatus = await fetchDataStatus(capNumber);
    console.log(dataStatus.status);

    if (!dataStatus.status || !dataStatus.data)
      return NextResponse.json(
        { error: `allotment for CAP ${capNumber} not available yet` },
        { status: 404 }
      );

    const collegeData: CollegeData[] = await getCollegeDataFromCodes(
      dataStatus.data,
      codes,
      capNumber
    );

    // console.log(collegeData);
    // saving if new college skips if clg exists
    await saveCollegeData(collegeData);

    // zips college data and returns
    const zip = await zipCollegePdf(codes, capNumber);
    if (!zip) {
      return NextResponse.json(
        { success: false, error: "colleges with code not found" },
        { status: 404 }
      );
    }
    // Convert Buffer to Uint8Array
    const uint8Zip = new Uint8Array(zip);
    return new NextResponse(uint8Zip, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename=cap${capNumber}Pdf.zip`,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

import { fetchDataStatus } from "@/lib/methods/server/fetchData";
import { CollegeData } from "@/lib/methods/server/getCollegeData";
import { getCollegeDataFromCodes } from "@/lib/methods/server/getCollegeDataFromCodes";
import { saveCollegeData } from "@/lib/methods/server/storingData";
import { zipCollegePdf } from "@/lib/methods/server/zipCollegePdf";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { codes } = body;

    if (!Array.isArray(codes) || codes.length === 0) {
      return NextResponse.json(
        { error: "collegeCodes array required", name: "MissingFieldsError" },
        { status: 400 }
      );
    }

    const dataStatus = await fetchDataStatus(codes);
    if (!dataStatus.status || !dataStatus.data)
      return NextResponse.json(
        { error: "Cap status not showing on website" },
        { status: 500 }
      );

    const collegeData: CollegeData[] = await getCollegeDataFromCodes(
      dataStatus.data,
      codes
    );

    // saving if new college skips if clg exists
    await saveCollegeData(collegeData);

    // zips college data and returns
    const zip = await zipCollegePdf(codes);
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
        "Content-Disposition": "attachment; filename=capPdf.zip",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}

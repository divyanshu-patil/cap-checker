import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // parse JSON body
    const { codes } = body;

    if (!codes) {
      return NextResponse.json(
        { success: false, error: "codes are required" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, received: codes });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}

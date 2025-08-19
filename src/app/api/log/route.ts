import { logPath } from "@/constants/filePaths";
import { head, put } from "@vercel/blob";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { codes, cap } = body;

  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const timestamp = new Date().toISOString();
  const newEntry = `[${timestamp}]: IP=${ip} requested institutes ${codes} for CAP rounds: ${cap}\n`;

  try {
    const meta = await head(logPath);
    if (meta) {
      const response = await axios.get(meta.url);
      const oldLogs = response.data as string;

      // added new logs
      const updatedLogs = oldLogs + newEntry;

      // update log file
      await put(logPath, updatedLogs, {
        access: "public",
        allowOverwrite: true,
      });
      return NextResponse.json({ message: "log added" }, { status: 200 });
    }
  } catch (err: any) {
    console.log("Log head/fetch failed:", err?.message || err);
  }

  // If file not found → create new one
  await put(logPath, newEntry, {
    access: "public",
    allowOverwrite: true,
  });

  return NextResponse.json({ message: "new log created" }, { status: 200 });
}

import archiver from "archiver";
import { PassThrough } from "stream";
import { finished } from "stream/promises";
import { filePaths } from "@/constants/filePaths";
import { head } from "@vercel/blob";
import axios from "axios";
import path from "path";

export async function zipCollegePdf(
  collegeCodes: number[],
  capNumber = 0
): Promise<Buffer | null> {
  const archive = archiver("zip", { zlib: { level: 9 } });
  const chunks: Buffer[] = [];
  const stream = new PassThrough();

  archive.pipe(stream);
  stream.on("data", (chunk) => chunks.push(chunk));

  let addedAny = false;
  const caps = [
    filePaths.cap1Dir,
    filePaths.cap2Dir,
    filePaths.cap3Dir,
    filePaths.cap4Dir,
  ];

  if (capNumber > 0) {
    const capDirName = caps[capNumber - 1];
    for (const code of collegeCodes) {
      const blobName = `${capDirName}/${code}_cap${capNumber}.pdf`;

      const added = await addToArchive(archive, blobName);
      if (added) {
        addedAny = true;
      }
    }
  } else {
    for (const [i, capDirName] of caps.entries()) {
      let addedAnyLocal = false;

      for (const code of collegeCodes) {
        const blobName = `${capDirName}/${code}_cap${i + 1}.pdf`;

        const added = await addToArchive(archive, blobName);
        if (added) {
          addedAny = true;
          addedAnyLocal = true;
        }
      }

      if (!addedAnyLocal) {
        console.log(`No PDFs found for ${capDirName}`);
      }
    }
  }

  if (!addedAny) return null;

  await archive.finalize();
  await finished(stream);

  return Buffer.concat(chunks);
}

async function addToArchive(
  archive: archiver.Archiver,
  blobName: string
): Promise<boolean> {
  try {
    const { url } = await head(blobName);
    const res = await axios.get(url, { responseType: "stream" });
    archive.append(res.data, { name: blobName });
    return true;
  } catch {
    return false; // blob doesn’t exist
  }
}

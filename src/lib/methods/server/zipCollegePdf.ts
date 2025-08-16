import fs from "fs";
import path from "path";
import archiver from "archiver";
import { PassThrough } from "stream";

const rootDir = process.cwd();

const capDirs = {
  cap1: path.resolve(rootDir, process.env.CAP1 as string),
  cap2: path.resolve(rootDir, process.env.CAP2 as string),
  cap3: path.resolve(rootDir, process.env.CAP3 as string),
  cap4: path.resolve(rootDir, process.env.CAP4 as string),
};

export async function zipCollegePdf(
  collegeCodes: number[]
): Promise<Buffer | null> {
  const archive = archiver("zip", { zlib: { level: 9 } });
  const chunks: Buffer[] = [];
  const stream = new PassThrough();

  archive.pipe(stream);
  stream.on("data", (chunk) => chunks.push(chunk));

  let addedAny = false;

  for (const [capName, dirPath] of Object.entries(capDirs)) {
    if (!fs.existsSync(dirPath)) {
      console.log(`Skipping ${capName} — directory not found`);
      continue;
    }

    let addedAnyLocal = false;

    for (const code of collegeCodes) {
      // console.log(code);
      const added = addToArchive({ code, archive, capName, dirPath });
      if (added) {
        addedAny = true;
        addedAnyLocal = true;
      }
    }

    if (!addedAnyLocal) {
      console.log(`No PDFs found for ${capName}`);
    }
  }

  if (!addedAny) {
    return null;
  }

  await archive.finalize();
  return Buffer.concat(chunks);
}

function addToArchive({
  code,
  archive,
  capName,
  dirPath,
}: {
  code: number;
  capName: string;
  dirPath: string;
  archive: archiver.Archiver;
}): boolean {
  const filePattern = new RegExp(`^${code}.*\\.pdf$`, "i");
  const files = fs.readdirSync(dirPath).filter((f) => filePattern.test(f));

  if (files.length === 0) return false;

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    archive.file(filePath, { name: `${capName}/${file}` });
  }

  return true;
}

import path from "path";
import fs from "fs-extra";
import archiver from "archiver";

export function generateZipFile(outputPath: string, filesToInclude: any[]) {
  return new Promise<void>((resolve, reject) => {
    const output = fs.createWriteStream(outputPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", () => {
      console.log(`${archive.pointer()} total bytes`);
      console.log(
        "Archive has been finalized and the output file descriptor has closed."
      );
      resolve();
    });

    archive.on("error", (err) => {
      console.error("Error creating archive:", err);
      reject(err);
    });

    archive.pipe(output);

    filesToInclude.forEach((file: any) => {
      if (fs.statSync(file).isFile()) {
        console.log(`Adding file to archive: ${file}`);
        archive.file(file, { name: path.basename(file) });
      } else if (fs.statSync(file).isDirectory()) {
        console.log(`Processing directory: ${file}`);
        const files = fs.readdirSync(file);
        files.forEach((fileName) => {
          const filePath = path.join(file, fileName);
          if (fs.statSync(filePath).isFile()) {
            console.log(`Adding file from directory to archive: ${filePath}`);
            archive.file(filePath, {
              name: path.join(path.basename(file), fileName),
            });
          }
        });
      }
    });

    archive.finalize();
  });
}

export async function archiveFolder(
  sourceDir: string,
  outPath: fs.PathLike,
  excludeDirs: string[] = []
) {
  const output = fs.createWriteStream(outPath);
  const archive = archiver("zip", {
    zlib: { level: 9 },
  });

  return new Promise<void>((resolve, reject) => {
    output.on("close", () => {
      console.log(`Архив создан: ${outPath} (${archive.pointer()} байт)`);
      resolve();
    });

    archive.on("error", (err) => {
      reject(err);
    });

    archive.pipe(output);

    // archive.directory(sourceDir, false);
    archive.directory(sourceDir, false, (entry) => {
      const entryPath = entry.name;
      const shouldExclude = excludeDirs.some(
        (excludeDir) =>
          entryPath.startsWith(`${excludeDir}/`) || entryPath === excludeDir
      );

      return shouldExclude ? false : entry;
    });

    archive.finalize();
  });
}

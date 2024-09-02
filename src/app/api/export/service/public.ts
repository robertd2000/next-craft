import path from "path";
import fs, { writeFile } from "fs-extra";
import { promisify } from "util";
import { indexHtmlContent, projectPath } from "../constatnts";

const mkdir = promisify(fs.mkdir);

export async function initPublic() {
  const publicPath = path.join(projectPath, "public");
  await mkdir(publicPath, { recursive: true });
  // Create index.html if it doesn't exist
  const indexHtmlPath = path.join(publicPath, "index.html");

  await writeFile(indexHtmlPath, indexHtmlContent.trim());
}

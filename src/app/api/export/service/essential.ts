import fs, { writeFile } from "fs-extra";
import { promisify } from "util";
import path from "path";
import { projectPath, indexContent, indexCssContent } from "../constatnts";

const mkdir = promisify(fs.mkdir);

export async function initEssentials(componentCode: string) {
  const srcPath = path.join(projectPath, "src");
  const indexPath = path.join(srcPath, "index.tsx");
  const appPath = path.join(srcPath, "App.tsx");

  await mkdir(srcPath, { recursive: true });

  // Create index.tsx

  await writeFile(indexPath, indexContent.trim());

  // Create App.tsx
  const appContent = componentCode;
  await writeFile(appPath, appContent.trim());

  // Create index.css for Tailwind styles
  const indexCssPath = path.join(srcPath, "index.css");

  await writeFile(indexCssPath, indexCssContent.trim());
}

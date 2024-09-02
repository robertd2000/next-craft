import { promisify } from "util";
import { exec } from "child_process";
import fs, { readFile, writeFile } from "fs-extra";
import path from "path";
import {
  postcssConfigContent,
  projectPath,
  tailwindConfigContent,
  tempDir,
} from "../constatnts";
const execPromise = promisify(exec);
const mkdir = promisify(fs.mkdir);

export async function initTailwind() {
  await execPromise("npx tailwindcss init", { cwd: projectPath });

  const sourceFilePath = path.join(process.cwd(), "src", "lib", "utils.ts"); // Path to the source file
  const targetDirPath = path.join(tempDir, "src", "lib"); // Target directory path
  const targetFilePath = path.join(targetDirPath, "utils.ts"); // Target file path

  // Ensure the target directory exists
  await mkdir(targetDirPath, { recursive: true });

  // Read content from the source file
  const content = await readFile(sourceFilePath, "utf8");

  // Write content to the new file in the target directory
  await writeFile(targetFilePath, content);

  const tailwindConfigPath = path.join(projectPath, "tailwind.config.js");
  const postcssConfigPath = path.join(projectPath, "postcss.config.js");

  // Create Tailwind config
  await writeFile(tailwindConfigPath, tailwindConfigContent.trim());

  // Create PostCSS config
  await writeFile(postcssConfigPath, postcssConfigContent.trim());
}

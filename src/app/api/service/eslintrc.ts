import { writeFile } from "fs-extra";
import path from "path";
import { projectPath, eslintrcContent } from "../constatnts";

export async function initEslintrc() {
  const eslintrcPath = path.join(projectPath, ".eslintrc.json");

  try {
    await writeFile(eslintrcPath, JSON.stringify(eslintrcContent, null, 2));
  } catch (error: any) {
    console.error("Error creating .gitignore file:", error);
  }
}

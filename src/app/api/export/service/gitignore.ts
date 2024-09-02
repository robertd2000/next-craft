import { writeFile } from "fs-extra";
import path from "path";
import { projectPath, gitignoreContent } from "../constatnts";

export async function initGitignore() {
  const gitignorePath = path.join(projectPath, ".gitignore");

  try {
    // Write the .gitignore file
    await writeFile(gitignorePath, gitignoreContent.trim());
  } catch (error: any) {
    console.error("Error creating .gitignore file:", error);
  }
}

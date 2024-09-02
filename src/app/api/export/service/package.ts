import fs, { writeFile } from "fs-extra";
import path from "path";
const access = promisify(fs.access);
import { projectPath, packageJsonContent } from "../constatnts";
import { promisify } from "util";

export async function initPackageJSON() {
  const packageJsonPath = path.join(projectPath, "package.json");
  try {
    await access(packageJsonPath);
  } catch (error) {
    await writeFile(
      packageJsonPath,
      JSON.stringify(packageJsonContent, null, 2)
    );
  }
}

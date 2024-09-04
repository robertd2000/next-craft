import { writeFile } from "fs-extra";
import path from "path";
import { projectPath, tsconfigContent } from "../constatnts";

export async function initTsconfig() {
  const tsconfigPath = path.join(projectPath, "tsconfig.json");

  await writeFile(tsconfigPath, JSON.stringify(tsconfigContent, null, 2));
}

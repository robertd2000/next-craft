import fs from "fs-extra";
import { promisify } from "util";
import { projectPath } from "../constatnts";
const mkdir = promisify(fs.mkdir);
const access = promisify(fs.access);

export async function initProject() {
  try {
    await access(projectPath);
  } catch (error) {
    await mkdir(projectPath, { recursive: true });
  }
}

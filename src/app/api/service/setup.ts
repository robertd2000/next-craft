import fs from "fs-extra";
import { tempDir, destComponentsDir, pageFilePath } from "../constatnts";
import { ComponentImport } from "../types";
import { initComponents } from "./components";
import { initEslintrc } from "./eslintrc";
import { initEssentials } from "./essential";
import { initGitignore } from "./gitignore";
import { initPackageJSON } from "./package";
import { initProject } from "./project";
import { initPublic } from "./public";
import { initTailwind } from "./tailwind";
import { initTsconfig } from "./tsconfig";

export async function setup(
  componentCode: string,
  components: ComponentImport[]
) {
  fs.ensureDirSync(tempDir);
  fs.ensureDirSync(destComponentsDir);

  await initComponents(components);
  fs.writeFileSync(pageFilePath, componentCode, "utf8");

  // await generateZipFile(zipFilePath, [pageFilePath, destComponentsDir]);
  // Read the ZIP file into a buffer
  // const fileBuffer = await readFile(zipFilePath);

  await initProject();
  // Create package.json file
  await initPackageJSON();
  // Create .gitignore file
  await initGitignore();
  // Create tsconfig.json file
  await initTsconfig();
  // Create .eslintrc.json file
  await initEslintrc();
  // Initialize Tailwind CSS
  await initTailwind();
  // Create public and src directories if they don't exist
  await initPublic();
  await initEssentials(componentCode);
}

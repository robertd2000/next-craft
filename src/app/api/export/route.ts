import fs, { readFile } from "fs-extra";
import { NextResponse } from "next/server";
import { promisify } from "util";
import { exec } from "child_process";
import {
  buildPath,
  destComponentsDir,
  pageFilePath,
  projectPath,
  tempDir,
  zipBuildPath,
} from "./constatnts";
import { archiveFolder } from "./utils";
import {
  initComponents,
  initEslintrc,
  initEssentials,
  initGitignore,
  initHeaders,
  initPackageJSON,
  initPublic,
  initTailwind,
  initTsconfig,
} from "./service";
import { ComponentImport } from "./types";
import { initProject } from "./service/project";

const execPromise = promisify(exec);
const access = promisify(fs.access);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      componentCode,
      components,
    }: { componentCode: string; components: ComponentImport[] } = body;

    fs.ensureDirSync(tempDir);
    fs.ensureDirSync(destComponentsDir);

    await initComponents(components);
    fs.writeFileSync(pageFilePath, componentCode, "utf8");

    // await generateZipFile(zipFilePath, [pageFilePath, destComponentsDir]);
    const headers = await initHeaders();
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
    // Install dependencies (npm install)
    await execPromise("npm install", { cwd: projectPath });
    // Initialize Tailwind CSS
    await initTailwind();
    // Create public and src directories if they don't exist
    await initPublic();
    await initEssentials(componentCode);
    // Run build command (npm run build)
    await execPromise("npm run build", { cwd: projectPath });
    // Check if the build directory exists
    await access(buildPath, fs.constants.R_OK);

    await archiveFolder(buildPath, zipBuildPath);
    // await generateZipFile(zipBuildPath, [
    //   buildPath,
    //   staticDir,
    //   staticDirJS,
    //   staticDirCSS,
    // ]);

    const fileBuildBuffer = await readFile(zipBuildPath);

    const readableBuildStream = new ReadableStream({
      start(controller) {
        controller.enqueue(fileBuildBuffer);
        controller.close();
      },
    });

    return new NextResponse(readableBuildStream, {
      headers,
    });
  } catch (error) {
    console.log(error);

    return new Response("Internal error", { status: 500 });
  }
}

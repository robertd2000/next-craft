import fs, { readFile } from "fs-extra";
import { NextResponse } from "next/server";
import { promisify } from "util";
import { exec } from "child_process";
import {
  buildPath,
  destComponentsDir,
  pageFilePath,
  projectName,
  projectPath,
  tempDir,
  zipBuildPath,
  zipFilePath,
} from "./constatnts";
import { generateZipFile } from "./utils";
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
const mkdir = promisify(fs.mkdir);
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

    await generateZipFile(zipFilePath, [pageFilePath, destComponentsDir]);
    await initHeaders();
    // Read the ZIP file into a buffer
    const fileBuffer = await readFile(zipFilePath);

    await initProject();
    // Create package.json file
    await initPackageJSON();
    // Create .gitignore file
    await initGitignore();
    // Create tsconfig.json file
    await initTsconfig();
    // Create .eslintrc.json file
    await initEslintrc();
    // Step 3: Install dependencies (npm install)
    await execPromise("npm install", { cwd: projectPath });

    // Step 4: Initialize Tailwind CSS
    await initTailwind();

    // Create public and src directories if they don't exist
    await initPublic();
    await initEssentials(componentCode);

    // Step 6: Run build command (npm run build)
    await execPromise("npm run build", { cwd: projectPath });

    // Step 7: Check if the build directory exists
    await access(buildPath, fs.constants.R_OK);

    await generateZipFile(zipBuildPath, [buildPath]);

    const fileBuildBuffer = await readFile(zipBuildPath);

    const readableBuildStream = new ReadableStream({
      start(controller) {
        controller.enqueue(fileBuildBuffer);
        controller.close();
      },
    });

    // Step 11: Send the ReadableStream as a response
    return new NextResponse(readableBuildStream, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename=${projectName}-build.zip`,
      },
    });
  } catch (error) {
    console.log(error);

    return new Response("Internal error", { status: 500 });
  }
}

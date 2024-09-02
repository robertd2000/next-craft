import path from "path";
import fs, { readFile, writeFile } from "fs-extra";
import { NextResponse } from "next/server";
import { promisify } from "util";
import { exec } from "child_process";
import {
  buildPath,
  componentsDir,
  destComponentsDir,
  eslintrcContent,
  gitignoreContent,
  packageJsonContent,
  pageFilePath,
  projectName,
  projectPath,
  tempDir,
  tsconfigContent,
  zipBuildPath,
  zipFilePath,
} from "./constatnts";
import { copyComponentFile, generateZipFile } from "./utils";
import {
  initEssentials,
  initGitignore,
  initPackageJSON,
  initPublic,
  initTailwind,
  initTsconfig,
} from "./service";

const execPromise = promisify(exec);
const mkdir = promisify(fs.mkdir);
const access = promisify(fs.access);
type ComponentImport = {
  component: string;
  path: string;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      componentCode,
      components,
    }: { componentCode: string; components: ComponentImport[] } = body;

    fs.ensureDirSync(tempDir);
    fs.ensureDirSync(destComponentsDir);

    components?.forEach((component) => {
      if (!component?.component) return;
      const componentPath = path.join(
        componentsDir,
        `/${component?.path?.toLowerCase()}.tsx`
      );
      console.log("Copying component file from", componentPath);
      copyComponentFile(componentPath, destComponentsDir);
    });

    fs.writeFileSync(pageFilePath, componentCode, "utf8");

    await generateZipFile(zipFilePath, [pageFilePath, destComponentsDir]);
    const headers = new Headers();
    headers.append("Content-Disposition", 'attachment; filename="test.zip"');
    headers.append("Content-Type", "application/zip");

    // Read the ZIP file into a buffer
    const fileBuffer = await readFile(zipFilePath);

    // Create a ReadableStream from the buffer

    try {
      await access(projectPath);
    } catch (error) {
      await mkdir(projectPath, { recursive: true });
    }

    await initPackageJSON();
    await initGitignore();
    // Create tsconfig.json file
    await initTsconfig();

    // Create .eslintrc.json file
    const eslintrcPath = path.join(projectPath, ".eslintrc.json");

    await writeFile(eslintrcPath, JSON.stringify(eslintrcContent, null, 2));

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

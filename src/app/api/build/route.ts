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
} from "../constatnts";
import { archiveFolder } from "../utils";
import { initComponents, initHeaders } from "../service";
import { ComponentImport } from "../types";
import { setup } from "../service/setup";

const execPromise = promisify(exec);
const access = promisify(fs.access);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      componentCode,
      components,
    }: { componentCode: string; components: ComponentImport[] } = body;

    await setup(componentCode, components);
    fs.ensureDirSync(tempDir);
    fs.ensureDirSync(destComponentsDir);

    await initComponents(components);
    fs.writeFileSync(pageFilePath, componentCode, "utf8");

    // Install dependencies (npm install)
    await execPromise("npm install", { cwd: projectPath });
    // Run build command (npm run build)
    await execPromise("npm run build", { cwd: projectPath });
    // Check if the build directory exists
    await access(buildPath, fs.constants.R_OK);

    await archiveFolder(buildPath, zipBuildPath);

    const fileBuildBuffer = await readFile(zipBuildPath);

    const readableBuildStream = new ReadableStream({
      start(controller) {
        controller.enqueue(fileBuildBuffer);
        controller.close();
      },
    });

    const headers = await initHeaders();

    return new NextResponse(readableBuildStream, {
      headers,
    });
  } catch (error) {
    console.log(error);

    return new Response("Internal error", { status: 500 });
  }
}

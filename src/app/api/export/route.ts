import fs, { readFile } from "fs-extra";
import { NextResponse } from "next/server";
import { promisify } from "util";
import {
  destComponentsDir,
  pageFilePath,
  tempDir,
  zipFilePath,
} from "../constatnts";
import { archiveFolder } from "../utils";
import { initComponents, initHeaders } from "../service";
import { ComponentImport } from "../types";
import { setup } from "../service/setup";

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

    // Check if the build directory exists
    await access(tempDir, fs.constants.R_OK);

    await archiveFolder(tempDir, zipFilePath, ["node_modules"]);

    const fileBuildBuffer = await readFile(zipFilePath);

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

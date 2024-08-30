import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import archiver from "archiver";

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    const { serializedNodes, styles } = await request.json();

    // Create a temporary directory for the build
    const buildDir = path.join(process.cwd(), "temp");
    await fsPromises.mkdir(buildDir, { recursive: true });

    // Create necessary files for the build
    await createBuildFiles(buildDir, serializedNodes, styles);

    // Install dependencies
    console.log("Installing dependencies...");
    await execAsync("npm install", { cwd: buildDir });

    // Run the build command
    console.log("Building the project...");
    const buildCommand =
      process.platform === "win32"
        ? "set NODE_ENV=production && npm run build"
        : "NODE_ENV=production npm run build";

    const { stdout, stderr } = await execAsync(buildCommand, { cwd: buildDir });

    console.log("Build output:", stdout);
    if (stderr) console.error("Build errors:", stderr);

    // Zip the build output
    const zipFilePath = await zipBuildOutput(buildDir);

    // Clean up the temporary directory
    // await fsPromises.rm(buildDir, { recursive: true, force: true });

    // Return the zip file
    const fileContent = await fsPromises.readFile(zipFilePath);
    await fsPromises.unlink(zipFilePath);

    return new NextResponse(fileContent, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": "attachment; filename=build.zip",
      },
    });
  } catch (error: any) {
    console.error("Build failed:", error);
    return NextResponse.json(
      { message: "Build failed", error: error.message },
      { status: 500 }
    );
  }
}

async function createBuildFiles(
  buildDir: string,
  serializedNodes: any,
  styles: string
) {
  // Create package.json
  await fsPromises.writeFile(
    path.join(buildDir, "package.json"),
    JSON.stringify(
      {
        name: "craft-js-page",
        version: "1.0.0",
        scripts: {
          build: "next build",
        },
        dependencies: {
          next: "13.4.19",
          react: "18.2.0",
          "react-dom": "18.2.0",
        },
      },
      null,
      2
    )
  );

  // Create next.config.js
  await fsPromises.writeFile(
    path.join(buildDir, "next.config.js"),
    `
    /** @type {import('next').NextConfig} */
    const nextConfig = {
      output: 'export',
      reactStrictMode: true,
    }
    
    module.exports = nextConfig
  `
  );

  // Create app directory
  const appDir = path.join(buildDir, "app");
  await fsPromises.mkdir(appDir, { recursive: true });

  // Create page.tsx in app directory
  await fsPromises.writeFile(
    path.join(appDir, "page.tsx"),
    `
    import React from 'react'
    
    export default function Home() {
      return (
        <div>
          ${generateCraftContent(serializedNodes)}
        </div>
      )
    }
  `
  );

  // Create layout.tsx in app directory
  await fsPromises.writeFile(
    path.join(appDir, "layout.tsx"),
    `
    import React from 'react'
    import './globals.css'

    export const metadata = {
      title: 'Craft.js Generated Page',
      description: 'A page created with Craft.js',
    }

    export default function RootLayout({
      children,
    }: {
      children: React.ReactNode
    }) {
      return (
        <html lang="en">
          <body>{children}</body>
        </html>
      )
    }
  `
  );

  // Create globals.css in app directory
  await fsPromises.writeFile(path.join(appDir, "globals.css"), styles);
}

function generateCraftContent(serializedNodes: any) {
  let content = "";
  for (const nodeId in serializedNodes) {
    const node = serializedNodes[nodeId];
    if (node.type === "Text") {
      content += `<p style={{fontSize: '${
        node.props.fontSize
      }px'}}>{${JSON.stringify(node.props.text)}}</p>`;
    } else if (node.type === "Container") {
      content += `<div style={{padding: '${node.props.padding}px', background: '${node.props.background}'}}>`;
      if (node.nodes) {
        for (const childId of node.nodes) {
          content += generateCraftContent({
            [childId]: serializedNodes[childId],
          });
        }
      }
      content += "</div>";
    }
    // Add more conditions for other component types
  }
  return content;
}

async function zipBuildOutput(buildDir: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(process.cwd(), "build.zip");
    const output = fs.createWriteStream(outputPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", () => resolve(outputPath));
    archive.on("error", reject);

    archive.pipe(output);
    archive.directory(path.join(buildDir, "out"), false);
    archive.finalize();
  });
}

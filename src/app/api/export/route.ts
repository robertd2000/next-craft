import path from "path";
import fs, { readFile, writeFile } from "fs-extra";
import { NextResponse } from "next/server";
import { promisify } from "util";
import { exec } from "child_process";
import {
  eslintrcContent,
  gitignoreContent,
  indexContent,
  indexCssContent,
  indexHtmlContent,
  packageJsonContent,
  postcssConfigContent,
  projectName,
  tailwindConfigContent,
  tsconfigContent,
} from "./constatnts";
import { copyComponentFile, generateZipFile } from "./utils";

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

    const componentsDir = //path.resolve(__dirname, "../../../components/ui");
      path.join(process.cwd(), "src", "components/ui");
    const tempDir = path.join(process.cwd(), "src", "temp");
    // path.resolve(__dirname, "temp_export");
    const destComponentsDir = path.join(tempDir, "src/components/ui");
    const pageFilePath = path.join(tempDir, "PageComponent.jsx");
    const zipFilePath = path.join(process.cwd(), "src", "export.zip"); // path.join(__dirname, "export.zip");

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

    const projectPath = path.join(process.cwd(), "src", projectName);
    const buildPath = path.join(projectPath, "build");
    const zipBuildPath = path.join(
      process.cwd(),
      "src",
      "temp",
      `${projectName}-build.zip`
    );

    // Step 1: Ensure project directory exists, create if not
    try {
      await access(projectPath);
    } catch (error) {
      await mkdir(projectPath, { recursive: true });
    }

    // Step 2: Initialize package.json if it doesn't exist
    const packageJsonPath = path.join(projectPath, "package.json");
    try {
      await access(packageJsonPath);
    } catch (error) {
      await writeFile(
        packageJsonPath,
        JSON.stringify(packageJsonContent, null, 2)
      );
    }

    const gitignorePath = path.join(projectPath, ".gitignore");

    try {
      // Write the .gitignore file
      await writeFile(gitignorePath, gitignoreContent.trim());
    } catch (error: any) {
      console.error("Error creating .gitignore file:", error);
    }

    // Create tsconfig.json file
    const tsconfigPath = path.join(projectPath, "tsconfig.json");

    await writeFile(tsconfigPath, JSON.stringify(tsconfigContent, null, 2));

    // Create .eslintrc.json file
    const eslintrcPath = path.join(projectPath, ".eslintrc.json");

    await writeFile(eslintrcPath, JSON.stringify(eslintrcContent, null, 2));

    // Step 3: Install dependencies (npm install)
    await execPromise("npm install", { cwd: projectPath });

    // Step 4: Initialize Tailwind CSS
    await execPromise("npx tailwindcss init", { cwd: projectPath });

    const sourceFilePath = path.join(process.cwd(), "src", "lib", "utils.ts"); // Path to the source file
    const targetDirPath = path.join(tempDir, "src", "lib"); // Target directory path
    const targetFilePath = path.join(targetDirPath, "utils.ts"); // Target file path

    // Ensure the target directory exists
    await mkdir(targetDirPath, { recursive: true });

    // Read content from the source file
    const content = await readFile(sourceFilePath, "utf8");

    // Write content to the new file in the target directory
    await writeFile(targetFilePath, content);

    // Create public and src directories if they don't exist
    const publicPath = path.join(projectPath, "public");
    await mkdir(publicPath, { recursive: true });
    // Create index.html if it doesn't exist
    const indexHtmlPath = path.join(publicPath, "index.html");

    await writeFile(indexHtmlPath, indexHtmlContent.trim());
    // Step 5: Create essential project files
    const srcPath = path.join(projectPath, "src");
    const indexPath = path.join(srcPath, "index.tsx");
    const appPath = path.join(srcPath, "App.tsx");
    const tailwindConfigPath = path.join(projectPath, "tailwind.config.js");
    const postcssConfigPath = path.join(projectPath, "postcss.config.js");

    await mkdir(srcPath, { recursive: true });

    // Create index.tsx

    await writeFile(indexPath, indexContent.trim());

    // Create App.tsx
    const appContent = componentCode;
    await writeFile(appPath, appContent.trim());

    // Create Tailwind config
    await writeFile(tailwindConfigPath, tailwindConfigContent.trim());

    // Create PostCSS config

    await writeFile(postcssConfigPath, postcssConfigContent.trim());

    // Create index.css for Tailwind styles
    const indexCssPath = path.join(srcPath, "index.css");

    await writeFile(indexCssPath, indexCssContent.trim());

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

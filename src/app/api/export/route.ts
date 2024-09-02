import path from "path";
import fs, { readFile, writeFile } from "fs-extra";
import archiver from "archiver";
import { NextResponse } from "next/server";
import { promisify } from "util";
import { exec } from "child_process";

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

    const filesInDir = fs.readdirSync(destComponentsDir);
    console.log("Files in destination directory:", filesInDir);

    const filesPageInDir = fs.readdirSync(tempDir);
    console.log("File of page:", filesPageInDir);

    fs.writeFileSync(pageFilePath, componentCode, "utf8");

    await generateZipFile(zipFilePath, [pageFilePath, destComponentsDir]);
    const headers = new Headers();
    headers.append("Content-Disposition", 'attachment; filename="test.zip"');
    headers.append("Content-Type", "application/zip");
    const zipFileStream = fs.createReadStream(zipFilePath);

    // Read the ZIP file into a buffer
    const fileBuffer = await readFile(zipFilePath);

    // Create a ReadableStream from the buffer
    const readableStream = new ReadableStream({
      start(controller) {
        controller.enqueue(fileBuffer);
        controller.close();
      },
    });

    const projectName = "temp"; // Name of your React project folder
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
      const packageJsonContent = {
        name: projectName,
        version: "1.0.0",
        private: true,
        scripts: {
          start: "react-scripts start",
          build: "react-scripts build",
          test: "react-scripts test",
          eject: "react-scripts eject",
        },
        dependencies: {
          react: "^18.0.0",
          "react-dom": "^18.0.0",
          "react-scripts": "5.0.1",
          "@radix-ui/react-accordion": "^1.2.0",
          "@radix-ui/react-dialog": "^1.1.1",
          "@radix-ui/react-icons": "^1.3.0",
          "@radix-ui/react-label": "^2.1.0",
          "@radix-ui/react-navigation-menu": "^1.2.0",
          "@radix-ui/react-radio-group": "^1.2.0",
          "@radix-ui/react-scroll-area": "^1.1.0",
          "@radix-ui/react-select": "^2.1.1",
          "@radix-ui/react-slider": "^1.2.0",
          "@radix-ui/react-slot": "^1.1.0",
          "@radix-ui/react-tabs": "^1.1.0",
          "class-variance-authority": "^0.7.0",
          clsx: "^2.1.1",
          "tailwind-merge": "^2.5.2",
          "tailwindcss-animate": "^1.0.7",
          vaul: "^0.9.1",
        },
        devDependencies: {
          tailwindcss: "^3.0.0",
          postcss: "^8.0.0",
          autoprefixer: "^10.0.0",
          typescript: "^4.0.0",
          "@types/react": "^18.0.0",
          "@types/react-dom": "^18.0.0",
          "@babel/plugin-proposal-private-property-in-object": "^7.21.0",
        },
      };
      await writeFile(
        packageJsonPath,
        JSON.stringify(packageJsonContent, null, 2)
      );
    }

    const gitignoreContent = `
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js
.yarn/install-state.gz

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
    `;

    const gitignorePath = path.join(projectPath, ".gitignore");

    try {
      // Write the .gitignore file
      await writeFile(gitignorePath, gitignoreContent.trim());
    } catch (error: any) {
      console.error("Error creating .gitignore file:", error);
    }

    // Create tsconfig.json file
    const tsconfigPath = path.join(projectPath, "tsconfig.json");
    const tsconfigContent = {
      compilerOptions: {
        target: "es6",
        lib: ["dom", "dom.iterable", "esnext"],
        allowJs: true,
        skipLibCheck: true,
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        strict: true,
        forceConsistentCasingInFileNames: true,
        noFallthroughCasesInSwitch: true,
        module: "esnext",
        moduleResolution: "node",
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: "react-jsx",
        outDir: "./build",
        baseUrl: "./src",
        paths: {
          "@lib/*": ["./lib/*"],
        },
      },
      include: ["src"],
    };
    await writeFile(tsconfigPath, JSON.stringify(tsconfigContent, null, 2));

    // Create .eslintrc.json file
    const eslintrcPath = path.join(projectPath, ".eslintrc.json");
    const eslintrcContent = {
      extends: ["react-app", "react-app/jest"],
      rules: {
        // Add React-specific linting rules here if necessary
      },
    };
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
    const indexHtmlContent = `
     <!DOCTYPE html>
     <html lang="en">
     <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>React App</title>
       <link rel="stylesheet" href="/index.css">
     </head>
     <body>
       <div id="root"></div>
     </body>
     </html>
     `;
    await writeFile(indexHtmlPath, indexHtmlContent.trim());
    // Step 5: Create essential project files
    const srcPath = path.join(projectPath, "src");
    const indexPath = path.join(srcPath, "index.tsx");
    const appPath = path.join(srcPath, "App.tsx");
    const tailwindConfigPath = path.join(projectPath, "tailwind.config.js");
    const postcssConfigPath = path.join(projectPath, "postcss.config.js");

    await mkdir(srcPath, { recursive: true });

    // Create index.tsx
    const indexContent = `
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
    `;
    await writeFile(indexPath, indexContent.trim());

    // Create App.tsx
    const appContent = componentCode;
    await writeFile(appPath, appContent.trim());

    // Create Tailwind config
    const tailwindConfigContent = `
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
    `;
    await writeFile(tailwindConfigPath, tailwindConfigContent.trim());

    // Create PostCSS config
    const postcssConfigContent = `
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
    `;
    await writeFile(postcssConfigPath, postcssConfigContent.trim());

    // Create index.css for Tailwind styles
    const indexCssPath = path.join(srcPath, "index.css");
    const indexCssContent = `
@tailwind base;
@tailwind components;
@tailwind utilities;
    `;
    await writeFile(indexCssPath, indexCssContent.trim());

    // Step 6: Run build command (npm run build)
    await execPromise("npm run build", { cwd: projectPath });

    // Step 7: Check if the build directory exists
    await access(buildPath, fs.constants.R_OK);

    await generateZipFile(zipBuildPath, [buildPath]);
    const zipBuildFileStream = fs.createReadStream(zipBuildPath);

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

    return new NextResponse(readableStream, {
      headers,
    });
  } catch (error) {
    console.log(error);

    return new Response("Internal error", { status: 500 });
  }
}

const copyComponentFile = (componentPath: string, destDir: string) => {
  const componentName = path.basename(componentPath);
  const destPath = path.join(destDir, componentName);
  fs.copySync(componentPath, destPath);
};

function generateZipFile(outputPath: string, filesToInclude: any[]) {
  return new Promise<void>((resolve, reject) => {
    const output = fs.createWriteStream(outputPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", () => {
      console.log(`${archive.pointer()} total bytes`);
      console.log(
        "Archive has been finalized and the output file descriptor has closed."
      );
      resolve();
    });

    archive.on("error", (err) => {
      console.error("Error creating archive:", err);
      reject(err);
    });

    archive.pipe(output);

    filesToInclude.forEach((file: any) => {
      if (fs.statSync(file).isFile()) {
        console.log(`Adding file to archive: ${file}`);
        archive.file(file, { name: path.basename(file) });
      } else if (fs.statSync(file).isDirectory()) {
        console.log(`Processing directory: ${file}`);
        const files = fs.readdirSync(file);
        files.forEach((fileName) => {
          const filePath = path.join(file, fileName);
          if (fs.statSync(filePath).isFile()) {
            console.log(`Adding file from directory to archive: ${filePath}`);
            archive.file(filePath, {
              name: path.join(path.basename(file), fileName),
            });
          }
        });
      }
    });

    archive.finalize();
  });
}

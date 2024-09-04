import path from "path";

export const componentsDir = //path.resolve(__dirname, "../../../components/ui");
  path.join(process.cwd(), "src", "components/ui");
export const tempDir = path.join(process.cwd(), "src", "temp");
// path.resolve(__dirname, "temp_export");
export const destComponentsDir = path.join(tempDir, "src/components/ui");
export const pageFilePath = path.join(tempDir, "PageComponent.jsx");
export const zipFilePath = path.join(process.cwd(), "src", "export.zip"); // path.join(__dirname, "export.zip");
export const projectName = "temp";
export const projectPath = path.join(process.cwd(), "src", projectName);
export const buildPath = path.join(projectPath, "build");
export const staticDir = path.join(buildPath, "static");
export const staticDirCSS = path.join(staticDir, "css");
export const staticDirJS = path.join(staticDir, "js");
export const zipBuildPath = path.join(
  process.cwd(),
  "src",
  "temp",
  `${projectName}-build.zip`
);

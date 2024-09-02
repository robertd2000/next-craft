import path from "path";
import fs from "fs-extra";

export const copyComponentFile = (componentPath: string, destDir: string) => {
  const componentName = path.basename(componentPath);
  const destPath = path.join(destDir, componentName);
  fs.copySync(componentPath, destPath);
};

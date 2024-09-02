import path from "path";
import { componentsDir, destComponentsDir } from "../constatnts";
import { ComponentImport } from "../types";
import { copyComponentFile } from "../utils";

export async function initComponents(components: ComponentImport[]) {
  components?.forEach((component) => {
    if (!component?.component) return;
    const componentPath = path.join(
      componentsDir,
      `/${component?.path?.toLowerCase()}.tsx`
    );
    console.log("Copying component file from", componentPath);
    copyComponentFile(componentPath, destComponentsDir);
  });
}

import { useEditor } from "@craftjs/core";
import { useState } from "react";

export const Viewport = ({ children }: { children: React.ReactNode }) => {
  async function buildPage(serializedNodes: any, styles: string) {
    try {
      const response = await fetch("/api/build", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ serializedNodes, styles }),
      });

      if (!response.ok) {
        throw new Error("Build failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "build.zip";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Build process failed:", error);
      throw error;
    }
  }

  const { query } = useEditor();
  const [isBuilding, setIsBuilding] = useState(false);

  const handleBuild = async () => {
    setIsBuilding(true);
    try {
      const serializedNodes = query.serialize();

      const styles = `
        body { font-family: Arial, sans-serif; }
        .craft-block { margin-bottom: 12px; }
      `;

      await buildPage(serializedNodes, styles);
    } catch (error) {
      console.error("Build failed:", error);
    } finally {
      setIsBuilding(false);
    }
  };
  return (
    <div className="viewport w-full overflow-y-auto overflow-x-hidden">
      <button onClick={handleBuild}>Export</button>

      <div className={"craftjs-renderer flex-1 h-full w-full"}>{children}</div>
    </div>
  );
};

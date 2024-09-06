import { useState } from "react";
import { useEditor } from "@craftjs/core";
import { parseStructureToString } from "@/lib/parse";

export const useExport = () => {
  const { query } = useEditor();

  const [isExportLoading, setExportLoading] = useState(false);

  const state = query.getSerializedNodes();

  const handleExport = async () => {
    setExportLoading(true);

    try {
      const { componentCode, components } = parseStructureToString(state);

      const response = await fetch("/api/export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ componentCode, components }),
      });

      const blob = await response.blob();

      // Create a link element to download the Blob
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `export.zip`;
      document.body.appendChild(a);
      a.click();

      // Clean up by revoking the object URL and removing the element
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 0);
    } catch (error) {
      console.log(error);
    } finally {
      setExportLoading(false);
    }
  };

  return {
    isExportLoading,
    handleExport,
  };
};

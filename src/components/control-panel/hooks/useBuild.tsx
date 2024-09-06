import { parseStructureToString } from "@/lib/parse";
import { useEditor } from "@craftjs/core";
import React, { useState } from "react";

export const useBuild = () => {
  const { query } = useEditor();

  const [isBuildLoading, setIsBuildLoading] = useState(false);

  const state = query.getSerializedNodes();

  const handleBuild = async () => {
    setIsBuildLoading(true);

    try {
      const { componentCode, components } = parseStructureToString(state);

      const response = await fetch("/api/build", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ componentCode, components }),
      });

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `build.zip`;
      document.body.appendChild(a);
      a.click();

      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 0);
    } catch (error) {
      console.log(error);
    } finally {
      setIsBuildLoading(false);
    }
  };

  return { isBuildLoading, handleBuild };
};

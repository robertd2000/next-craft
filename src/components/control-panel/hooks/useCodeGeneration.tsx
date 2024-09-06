import { getOutputCode } from "@/lib/code-gen";
import { useEditor } from "@craftjs/core";
import React, { useState } from "react";

export const useCodeGeneration = () => {
  const [output, setOutput] = useState<string | null>();
  const [open, setOpen] = useState(false);

  const { query } = useEditor();

  const generateCode = () => {
    const { importString, output } = getOutputCode(query.getNodes());

    setOutput(`${importString}\n\n${output}`);
  };

  return {
    output,
    open,
    setOpen,
    generateCode,
  };
};

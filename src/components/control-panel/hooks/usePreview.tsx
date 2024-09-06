import { useEditor } from "@craftjs/core";
import { parseStructure } from "@/lib/parseToJSX";

export const usePreview = () => {
  const { query } = useEditor();

  const state = query.getSerializedNodes();

  const { renderComponent } = parseStructure(state);

  return {
    renderComponent,
  };
};

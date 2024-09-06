import { useEditor } from "@craftjs/core";

export const useEditorHistory = () => {
  const { canUndo, canRedo, actions } = useEditor((state, query) => {
    const currentlySelectedNodeId = query.getEvent("selected").first();
    return {
      canUndo: query.history.canUndo(),
      canRedo: query.history.canRedo(),
    };
  });

  return {
    canUndo,
    canRedo,
    actions,
  };
};

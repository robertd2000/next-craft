import { useEditor } from "@craftjs/core";

export const useEditorHistory = () => {
  const { active, related, canUndo, canRedo, actions } = useEditor(
    (state, query) => {
      const currentlySelectedNodeId = query.getEvent("selected").first();
      return {
        active: currentlySelectedNodeId,
        related:
          currentlySelectedNodeId &&
          state.nodes[currentlySelectedNodeId].related,
        canUndo: query.history.canUndo(),
        canRedo: query.history.canRedo(),
      };
    }
  );

  return {
    active,
    related,
    canUndo,
    canRedo,
    actions,
  };
};

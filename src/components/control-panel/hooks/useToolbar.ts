import { useEditor } from "@craftjs/core";

export const useToolbar = () => {
  const { active, related, actions } = useEditor((state, query) => {
    const currentlySelectedNodeId = query.getEvent("selected").first();

    return {
      active: currentlySelectedNodeId,
      related:
        currentlySelectedNodeId && state.nodes[currentlySelectedNodeId].related,
    };
  });

  return { active, related, actions };
};

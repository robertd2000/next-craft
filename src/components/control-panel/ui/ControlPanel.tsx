import React from "react";
import { useEditor } from "@craftjs/core";
import { ScrollArea } from "@/components/ui/scroll-area";

export const ControlPanel = () => {
  const { active, related } = useEditor((state, query) => {
    const currentlySelectedNodeId = query.getEvent("selected").first();
    return {
      active: currentlySelectedNodeId,
      related:
        currentlySelectedNodeId && state.nodes[currentlySelectedNodeId].related,
    };
  });

  return (
    <div className="w-[600px] border-l h-auto">
      <ScrollArea className="h-[100vh] w-full p-4">
        <h3 className="py-2 px-4 border-b text-md font-semibold text-left">
          Control Panel
        </h3>
        {active && related.toolbar && React.createElement(related.toolbar)}
      </ScrollArea>
    </div>
  );
};

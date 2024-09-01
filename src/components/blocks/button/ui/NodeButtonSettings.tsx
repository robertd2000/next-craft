import { ToolbarSection, ToolbarItem } from "@/components/toolbar";
import React from "react";

export function NodeButtonSettings() {
  return (
    <div>
      <ToolbarItem
        full={true}
        propKey="background"
        type="bg"
        label="Background"
      />
      <ToolbarItem full={true} propKey="color" type="color" label="Text" />
    </div>
  );
}

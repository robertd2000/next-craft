import React from "react";
import { SettingsControl } from "@/components/controls/SettingsControl";
import { ToolbarItem } from "@/components/toolbar";

export function NodeButtonSettings() {
  return (
    <SettingsControl>
      <ToolbarItem
        full={true}
        propKey="background"
        type="bg"
        label="Background"
      />
      <ToolbarItem full={true} propKey="color" type="color" label="Text" />
    </SettingsControl>
  );
}

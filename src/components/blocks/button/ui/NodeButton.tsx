import { Button } from "@/components/ui/button";
import { withNode } from "../../connector";
import { SettingsControl } from "@/components/controls/SettingsControl";
import { NodeButtonSettings } from "./NodeButtonSettings";

const draggable = true;

export const NodeButton = withNode(Button, {
  draggable,
});

NodeButton.craft = {
  ...NodeButton.craft,
  related: {
    // toolbar: SettingsControl,
    toolbar: NodeButtonSettings,
  },
};

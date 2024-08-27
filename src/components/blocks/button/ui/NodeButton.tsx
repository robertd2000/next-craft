import { Button } from "@/components/ui/button";
import { withNode } from "../../connector";

const draggable = true;

export const NodeButton = withNode(Button, {
  draggable,
});

NodeButton.craft = {
  ...NodeButton.craft,
  related: {
    // toolbar: SettingsControl,
  },
};

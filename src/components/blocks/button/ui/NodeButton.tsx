import { Button } from "@/components/ui/button";
import { withNode } from "../../connector";
import { SettingsControl } from "@/components/controls";

const draggable = true;

export const NodeButton = withNode(Button, {
  draggable,
  type: 'button',
});
// @ts-ignore
NodeButton.craft = {
  // @ts-ignore
  ...NodeButton.craft,
  related: {
    toolbar: () => <SettingsControl type="button" />,
  },
};

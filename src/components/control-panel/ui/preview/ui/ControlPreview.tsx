import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { usePreview } from "@/components/control-panel/hooks/usePreview";
import {ReactIframe} from "@/components/react-iframe";
import {Frame} from "@craftjs/core";

export function ControlPreview() {
  const { renderComponent } = usePreview();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Preview</Button>
      </DrawerTrigger>
      <DrawerContent className="h-[80%] p-2 m-2">
        {<div>{renderComponent}</div>}
      </DrawerContent>
    </Drawer>
  );
}

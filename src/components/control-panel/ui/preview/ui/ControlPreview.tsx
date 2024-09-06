import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { usePreview } from "@/components/control-panel/hooks/usePreview";

export function ControlPreview() {
  const { renderComponent } = usePreview();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Preview</Button>
      </DrawerTrigger>
      <DrawerContent className="w-full h-[80%] p-2 m-2">
        {<div>{renderComponent}</div>}
      </DrawerContent>
    </Drawer>
  );
}

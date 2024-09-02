import { Button } from "@/components/ui/button";
import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/drawer";
import { useEditor } from "@craftjs/core";
import { parseStructure } from "../../../lib/parse";

export const Viewport = ({ children }: { children: React.ReactNode }) => {
  const { query } = useEditor((state) => ({
    query: state.nodes,
  }));

  // @ts-ignore
  const { renderComponent } = parseStructure(query.getSerializedNodes());

  return (
    <div className="viewport w-full overflow-y-auto overflow-x-hidden">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Open Drawer</Button>
        </DrawerTrigger>
        <DrawerContent className="w-full h-[80%] p-2 m-2">
          {<div>{renderComponent}</div>}
        </DrawerContent>
      </Drawer>

      <div className={"craftjs-renderer flex-1 h-full w-full"}>{children}</div>
    </div>
  );
};

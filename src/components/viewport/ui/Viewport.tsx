import { Button } from "@/components/ui/button";
import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/drawer";
import { useEditor } from "@craftjs/core";
import { parseStructure, parseStructureToString } from "../../../lib/parse";

export const Viewport = ({ children }: { children: React.ReactNode }) => {
  const { query } = useEditor((state) => ({
    query: state.nodes,
  }));

  // @ts-ignore
  const state = query.getSerializedNodes();
  const handleExport = async () => {
    const { componentCode, components } = parseStructureToString(state);

    const response = await fetch("/api/export", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ componentCode, components }),
    });

    const blob = await response.blob();

    // Create a link element to download the Blob
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `$export.zip`;
    document.body.appendChild(a);
    a.click();

    // Clean up by revoking the object URL and removing the element
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 0);
  };

  const { renderComponent } = parseStructure(state);

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

      <button onClick={handleExport}>Export</button>
      <div className={"craftjs-renderer flex-1 h-full w-full"}>{children}</div>
    </div>
  );
};

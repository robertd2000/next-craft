import React, { useState } from "react";
import { useEditor } from "@craftjs/core";
import { ScrollArea } from "@/components/ui/scroll-area";
import { parseStructureToString } from "@/lib/parse";
import { Code, Redo, Undo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { parseStructure } from "@/lib/parseToJSX";
import { CodeView } from "@/components/code-view";
import { useCodeGeneration } from "../hooks/useCodeGeneration";

export const ControlPanel = () => {
  const { active, related, query, canUndo, canRedo, actions } = useEditor(
    (state, query) => {
      const currentlySelectedNodeId = query.getEvent("selected").first();
      return {
        active: currentlySelectedNodeId,
        related:
          currentlySelectedNodeId &&
          state.nodes[currentlySelectedNodeId].related,
        canUndo: query.history.canUndo(),
        canRedo: query.history.canRedo(),
      };
    }
  );

  const [isLoading, setIsLoading] = useState(false);

  // @ts-ignore
  const state = query.getSerializedNodes();

  const handleBuild = async () => {
    setIsLoading(true);

    try {
      const { componentCode, components } = parseStructureToString(state);

      const response = await fetch("/api/build", {
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
      a.download = `build.zip`;
      document.body.appendChild(a);
      a.click();

      // Clean up by revoking the object URL and removing the element
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 0);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleExport = async () => {
    setIsLoading(true);

    try {
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
      a.download = `export.zip`;
      document.body.appendChild(a);
      a.click();

      // Clean up by revoking the object URL and removing the element
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 0);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const { output, open, setOpen, generateCode } = useCodeGeneration();

  const { renderComponent } = parseStructure(state);

  return (
    <div className="w-full border-l h-auto">
      <ScrollArea className="h-[100vh] w-full p-2">
        <div className="flex flex-row gap-2 py-2 justify-between items-center border-b active:text-primary">
          <div>
            <div className="flex gap-2">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline">Preview</Button>
                </DrawerTrigger>
                <DrawerContent className="w-full h-[80%] p-2 m-2">
                  {<div>{renderComponent}</div>}
                </DrawerContent>
              </Drawer>

              <Drawer
                open={open}
                onOpenChange={(value: boolean) => {
                  generateCode();
                  setOpen(value);
                }}
              >
                <DrawerTrigger>
                  <Code
                    size={24}
                    strokeWidth={1.75}
                    className="text-gray-500 hover:text-primary transition duration-300"
                  />
                </DrawerTrigger>

                <DrawerContent className="h-[75vh]">
                  <CodeView codeString={output as string} />
                </DrawerContent>
              </Drawer>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8">
                {canUndo && (
                  <Undo
                    size={24}
                    strokeWidth={1.75}
                    className="text-gray-500 hover:text-primary transition duration-300 cursor-pointer"
                    onClick={(event) => {
                      actions.history.undo();
                    }}
                  />
                )}
              </div>
              <div className="w-8">
                {canRedo && (
                  <Redo
                    size={24}
                    strokeWidth={1.75}
                    className="text-gray-500 hover:text-primary transition duration-300 cursor-pointer"
                    onClick={(event) => {
                      actions.history.redo();
                    }}
                  />
                )}
              </div>
              <div className="flex gap-2">
                <Button onClick={handleExport} className="bg-green-500">
                  Export
                </Button>
                <Button onClick={handleBuild}>Build</Button>
              </div>
            </div>
          </div>
        </div>
        {active && related.toolbar && React.createElement(related.toolbar)}
      </ScrollArea>
    </div>
  );
};

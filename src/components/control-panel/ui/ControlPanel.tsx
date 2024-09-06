import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Code, Redo, Undo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { CodeView } from "@/components/code-view";
import { useCodeGeneration } from "../hooks/useCodeGeneration";
import { usePreview } from "../hooks/usePreview";
import { useEditorHistory } from "../hooks/useEditorHistory";
import { useExport } from "../hooks/useExport";
import { useBuild } from "../hooks/useBuild";

export const ControlPanel = () => {
  const { output, open, setOpen, generateCode } = useCodeGeneration();
  const { active, related, canUndo, canRedo, actions } = useEditorHistory();
  const { renderComponent } = usePreview();
  const { isExportLoading, handleExport } = useExport();
  const { isBuildLoading, handleBuild } = useBuild();

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

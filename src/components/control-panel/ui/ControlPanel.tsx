import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ControlHistory } from "./history";
import { ControlPreview } from "./preview";
import { ControlCodeView } from "./code-view";
import { useToolbar } from "../hooks/useToolbar";
import { useExport } from "../hooks/useExport";
import { useBuild } from "../hooks/useBuild";

export const ControlPanel = () => {
  const { isExportLoading, handleExport } = useExport();
  const { isBuildLoading, handleBuild } = useBuild();
  const { active, related } = useToolbar();

  return (
    <div className="w-full border-l h-auto">
      <ScrollArea className="h-[100vh] w-full p-2">
        <div className="flex flex-row gap-2 py-2 justify-between items-center border-b active:text-primary">
          <div>
            <div className="flex gap-2">
              <ControlPreview />

              <ControlCodeView />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <ControlHistory />
              <div className="flex gap-2">
                <Button
                  onClick={handleExport}
                  className="bg-green-500"
                  loading={isExportLoading}
                >
                  Export
                </Button>
                <Button onClick={handleBuild} loading={isBuildLoading}>
                  Build
                </Button>
              </div>
            </div>
          </div>
        </div>
        {active && related.toolbar && React.createElement(related.toolbar)}
      </ScrollArea>
    </div>
  );
};

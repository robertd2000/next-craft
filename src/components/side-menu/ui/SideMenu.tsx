import React from "react";

import { Components } from "@/components/blocks/constants/components-map";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CopyPlus, Layers3 } from "lucide-react";
import { Blocks } from "./tabs";

export interface SideMenuProps {
  componentsMap: Components[];
}

export const SideMenu = ({ componentsMap }: SideMenuProps) => {
  return (
    <Tabs
      defaultValue="layers"
      className="w-[300px] grid grid-cols-6 gap-4"
      orientation="vertical"
    >
      <TabsList className="flex flex-col h-full col-span-2 justify-start">
        <TabsTrigger value="layers">
          <Layers3 />
        </TabsTrigger>
        <TabsTrigger value="components">
          <CopyPlus />
        </TabsTrigger>
      </TabsList>
      <div className="col-span-4">
        <TabsContent value="layers"></TabsContent>
        <TabsContent value="components">
          <Blocks componentsMap={componentsMap} />
        </TabsContent>
      </div>
    </Tabs>
  );
};

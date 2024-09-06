import React from "react";

import { Components } from "@/components/blocks/constants/components-map";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CopyPlus, Layers3 } from "lucide-react";
import { Blocks } from "./tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Layers } from "@craftjs/layers";

export interface SideMenuProps {
  componentsMap: Components[];
}

export const SideMenu = ({ componentsMap }: SideMenuProps) => {
  return (
    <Tabs
      defaultValue="layers"
      className="w-full h-[100vh] grid grid-cols-10 border border-zink-100"
      orientation="vertical"
    >
      <TabsList className="flex flex-col h-full w-full col-span-2 justify-start ">
        <TabsTrigger value="layers">
          <Layers3 />
        </TabsTrigger>
        <TabsTrigger value="components">
          <CopyPlus />
        </TabsTrigger>
      </TabsList>
      <ScrollArea className="col-span-8">
        <TabsContent value="layers">
          <Layers expandRootOnLoad={true} />
        </TabsContent>
        <TabsContent value="components">
          <Blocks componentsMap={componentsMap} />
        </TabsContent>
      </ScrollArea>
    </Tabs>
  );
};

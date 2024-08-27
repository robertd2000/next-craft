import React, { ReactElement, ReactNode } from "react";

import {
  NavigationMenuLink,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuViewport,
} from "@/components/ui/vertical-navigation-menu";
import { useEditor } from "@craftjs/core";
import { cn } from "@/lib/utils";
import { Components } from "@/components/blocks/constants/components-map";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface BlocksProps {
  componentsMap: Components[];
}
export function Blocks({ componentsMap }: BlocksProps) {
  const { connectors } = useEditor();

  return (
    <Accordion type="multiple" className="w-full">
      {componentsMap.map((menuItem, index) => {
        return (
          <AccordionItem value={menuItem.name}>
            <AccordionTrigger>{menuItem.name}</AccordionTrigger>
            <AccordionContent
              className={`grid w-full grid-cols-${menuItem.grid}`}
            >
              {menuItem.items.map((component, index) => (
                <ListItem
                  key={index}
                  ref={(ref) => {
                    if (ref) {
                      connectors.create(ref, component.node, {
                        onCreate(nodeTree) {},
                      });
                    }
                  }}
                >
                  {component.demo ? component.demo : component.name}
                </ListItem>
              ))}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );

  return (
    <NavigationMenu
      orientation="vertical"
      className="justify-start items-start border-r"
    >
      <NavigationMenuList className="flex-col w-36">
        {componentsMap.map((menuItem, index) => (
          <NavigationMenuItem key={index} className="p-2">
            <NavigationMenuTrigger className="flex justify-between w-full">
              {menuItem.name}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="w-full">
              <ul className="w-full">
                {menuItem.items.map((component, index) => (
                  <ListItem
                    key={index}
                    ref={(ref) => {
                      if (ref) {
                        connectors.create(ref, component.node, {
                          onCreate(nodeTree) {},
                        });
                      }
                    }}
                  >
                    {component.demo ? component.demo : component.name}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
      <NavigationMenuViewport className="w-48 left-1 border-r shadow-none" />
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, children, ...props }, ref) => {
  return (
    <div className="w-full p-2">
      <div>
        <a
          ref={ref}
          className={cn(
            "block w-full select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm w-full font-medium leading-none">
            {children}
          </div>
        </a>
      </div>
    </div>
  );
});
ListItem.displayName = "ListItem";

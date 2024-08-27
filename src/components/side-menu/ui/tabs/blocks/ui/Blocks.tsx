import React from "react";
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
    <Accordion type="multiple" className="w-full p-1">
      {componentsMap.map((menuItem, index) => {
        return (
          <AccordionItem value={menuItem.name}>
            <AccordionTrigger>{menuItem.name}</AccordionTrigger>
            <AccordionContent
              className={`grid w-full grid-cols-${menuItem.grid} `}
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

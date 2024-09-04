import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNode } from "@craftjs/core";
import { X, Minus, Ellipsis, ChevronsLeftRightEllipsis } from "lucide-react";

export function Borders() {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <AccordionItem value="Borders">
      <AccordionTrigger>Borders</AccordionTrigger>

      <AccordionContent>
        <div className="flex flex-wrap justify-between items-center">
          <div>
            <Label htmlFor="borderStyle">Style</Label>
          </div>
          <Tabs
            defaultValue="start"
            value={props.style?.borderStyle}
            onValueChange={(e) => {
              setProp(
                (props: { style: { borderStyle: string } }) =>
                  (props.style = {
                    ...props.style,
                    borderStyle: e,
                  })
              );
            }}
          >
            <TabsList>
              <TabsTrigger value="none">
                <X />
              </TabsTrigger>
              <TabsTrigger value="solid">
                <Minus />
              </TabsTrigger>
              <TabsTrigger value="dashed">
                <ChevronsLeftRightEllipsis />
              </TabsTrigger>
              <TabsTrigger value="dotted">
                <Ellipsis />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

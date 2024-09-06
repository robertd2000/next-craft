import { Label } from "@/components/ui/label";
import { useNode } from "@craftjs/core";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {Textarea} from "@/components/ui/textarea";
import React from "react";

export function Scripts() {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
      <AccordionItem value="Scripts">
        <AccordionTrigger>Scripts</AccordionTrigger>

        <AccordionContent>
          <div className="flex flex-col gap-2 mt-2 mb-2">
            <Label htmlFor="display">On Click</Label>
            <Textarea
              value={props.onClickScript}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setProp((props: { onClickScript: string }) => (props.onClickScript = e.target.value), 5000)
                }
              }
            />
          </div>
        </AccordionContent>
      </AccordionItem>
  );
}

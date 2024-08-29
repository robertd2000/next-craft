import React, { HTMLAttributes } from "react";
import { withNode } from "../../connector";
import { cn } from "@/lib/utils";
import { Element } from "@craftjs/core";
import { NodeCardContent } from "../../card";
import { Card } from "@/components/ui/card";

interface DivBlockProps extends HTMLAttributes<HTMLDivElement> {}
export function DivBlock({ className, ...props }: DivBlockProps) {
  return (
    <div
      className={cn(
        "w-full h-10 border border-zinc-800 rounded-sm align-middle leading-10",
        className
      )}
      {...props}
    ></div>
  );
}

const NodeDivContainer = withNode(Card, {
  droppable: true,
});

export const NodeDiv = ({ ...props }: DivBlockProps) => {
  return (
    <NodeDivContainer {...props}>
      <Element
        canvas
        id="div-content"
        is={NodeCardContent as typeof NodeCardContent & string}
      ></Element>
    </NodeDivContainer>
  );
};

NodeDiv.craft = {
  ...NodeDiv.craft,
  displayName: "div",
  props: {
    className: "p-6 m-2",
  },
  related: {
    //   toolbar: SettingsControl,
  },
};

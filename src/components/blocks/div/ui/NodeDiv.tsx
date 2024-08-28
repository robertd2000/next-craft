import React, { HTMLAttributes } from "react";
import { withNode } from "../../connector";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Element } from "@craftjs/core";
import { NodeCardContainer, NodeCardContent } from "../../card";

interface DivBlockProps extends HTMLAttributes<HTMLDivElement> {}
export function DivBlock({ className, ...props }: DivBlockProps) {
  return (
    <div
      className={cn("w-full h-30 border border-zinc-800", className)}
      {...props}
    ></div>
  );
}

const NodeDivContainer = withNode(DivBlock, {
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
  custom: {
    importPath: "@/components/card",
  },
  related: {
    //   toolbar: SettingsControl,
  },
};

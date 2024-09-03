import React, { HTMLAttributes } from "react";
import { Element, useNode } from "@craftjs/core";
import { Card } from "@/components/ui/card";
import { NodeCardContent } from "../../card";
import { cn } from "@/lib/utils";
import { withNode } from "../../connector";
import { SettingsControl } from "@/components/controls/SettingsControl";

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
  draggable: true,
});

export const NodeDiv = withNode(NodeDivContainer, {
  droppable: true,
  draggable: true,
});

export const NodeDivElement = ({ ...props }: DivBlockProps) => {
  return (
    <Element
      canvas
      id="div-content"
      {...props}
      is={NodeDiv as typeof NodeCardContent & string}
    ></Element>
  );
};

// @ts-ignore
NodeDiv.craft = {
  // @ts-ignore
  ...NodeDiv.craft,
  displayName: "div",
  props: {
    className: "p-6 m-2",
  },
  related: {
    toolbar: SettingsControl,
  },
};

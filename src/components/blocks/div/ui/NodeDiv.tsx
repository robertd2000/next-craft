import React, { HTMLAttributes } from "react";
import { withNode } from "../../connector";
import { cn } from "@/lib/utils";

interface DivBlockProps extends HTMLAttributes<HTMLDivElement> {}
export function DivBlock({ className, ...props }: DivBlockProps) {
  return (
    <div
      className={cn("w-full h-10 border border-zinc-800", className)}
      {...props}
    ></div>
  );
}

export const NodeDiv = withNode(DivBlock, {
  draggable: true,
  droppable: true,
});

NodeDiv.craft = {
  displayName: "div",
  related: {
    //   toolbar: SettingsControl,
  },
};

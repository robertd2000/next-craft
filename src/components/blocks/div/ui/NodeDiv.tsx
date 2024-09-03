import React, { HTMLAttributes } from "react";
import { Element, useNode } from "@craftjs/core";
import { Card } from "@/components/ui/card";
import { NodeCardContent } from "../../card";
import { withNode } from "../../connector";
import { SettingsControl } from "@/components/controls/SettingsControl";

const NodeDivContainer = withNode(Card, {
  droppable: true,
  draggable: true,
});

export const NodeDiv = withNode(NodeDivContainer, {
  droppable: true,
  draggable: true,
});
interface DivBlockProps extends HTMLAttributes<HTMLDivElement> {}

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

NodeDivElement.craft = {
  displayName: "div",
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

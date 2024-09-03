import { SerializedNodes } from "@craftjs/core";
import React, { ReactNode } from "react";

export interface TransformedNode {
  type: any;
  props: any;
  children?: any;
}

export function transformNode(
  nodeId: string,
  structure: SerializedNodes
): TransformedNode | ReactNode | null {
  const node = structure[nodeId];

  if (!node) return null;

  const { displayName, props, linkedNodes, nodes } = node;

  const transformedNode: TransformedNode = {
    type: displayName,
    props: { ...props },
    children: [],
  };

  if (linkedNodes) {
    transformedNode.children = Object.values(linkedNodes)
      .map((childId) => transformNode(childId, structure))
      .filter((child) => child !== null) as ReactNode[];
  }

  if (nodes) {
    transformedNode.children.push(
      ...nodes
        .map((childId) => transformNode(childId, structure))
        .filter((child) => child !== null)
    );
  }

  return transformedNode;
}

export function transformStructure(
  structure: SerializedNodes
): TransformedNode | ReactNode {
  const rootId = "ROOT";
  return transformNode(rootId, structure);
}

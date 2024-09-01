import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Text } from "../components/blocks/text";
import React, { ReactNode } from "react";
import { SerializedNodes } from "@craftjs/core";

const componentMap: {
  [key: string]: any;
} = {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Button,
  Text,
  // Добавляйте сюда другие компоненты по мере необходимости
};

interface TransformedNode {
  type: any;
  props: any;
  children?: any;
}

function transformNode(
  nodeId: string,
  structure: SerializedNodes
): ReactNode | null | TransformedNode {
  const node = structure[nodeId];

  if (!node) return null;

  const transformedNode: TransformedNode = {
    type: node.displayName,
    props: { ...node.props },
  };

  const linkedNodes = Object.values(node.linkedNodes || {});
  if (linkedNodes.length > 0) {
    transformedNode.children = linkedNodes
      .map((childId) => transformNode(childId, structure))
      .filter((child) => child !== null) as ReactNode[];
  }
  if (node.nodes && node.nodes.length > 0) {
    transformedNode.children = [
      ...(transformedNode.children || []),
      ...node.nodes
        .map((childId) => transformNode(childId, structure))
        .filter((child) => child !== null),
    ] as ReactNode[];
  }
  return transformedNode;
}

function transformStructure(
  structure: SerializedNodes
): TransformedNode | ReactNode {
  const rootId = "ROOT";
  return transformNode(rootId, structure);
}

export function parseStructure(structure: SerializedNodes) {
  const transformedStructure = transformStructure(structure);

  return createComponent(transformedStructure as TransformedNode);
}

export function createComponent(
  node: TransformedNode | null
): JSX.Element | null {
  if (!node) return null;
  const { type, props, children } = node;

  const Component = componentMap[type] || type;

  if (!children || children.length === 0) {
    return <Component {...props} key={props?.key} />;
  }

  return (
    <Component {...props}>
      {children.map((child: TransformedNode) => createComponent(child))}
    </Component>
  );
}

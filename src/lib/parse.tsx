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

function transformStructure(
  structure: SerializedNodes
): TransformedNode | ReactNode {
  const rootId = "ROOT";
  return transformNode(rootId, structure);
}

export function parseStructure(structure: SerializedNodes) {
  const transformedStructure = transformStructure(structure);

  const components: React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
  >[] = [];

  function createComponent(node?: TransformedNode): JSX.Element | null {
    if (!node) return null;

    const {
      type: ComponentType,
      props: componentProps,
      children: nodeChildren,
    } = node;

    const Component = componentMap[ComponentType] || ComponentType;

    components.push(Component);

    if (!nodeChildren || nodeChildren.length === 0) {
      return <Component {...componentProps} key={componentProps?.key} />;
    }

    return (
      <Component {...componentProps}>
        {nodeChildren.map((nodeChild: TransformedNode | undefined) =>
          createComponent(nodeChild)
        )}
      </Component>
    );
  }

  return {
    renderComponent: createComponent(transformedStructure as TransformedNode),
    components,
  };
}

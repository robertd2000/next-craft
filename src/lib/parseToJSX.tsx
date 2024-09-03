import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Text } from "@/components/ui/text";
import React from "react";
import { NodeDivElement } from "@/components/blocks";
import { SerializedNodes } from "@craftjs/core";
import { TransformedNode, transformStructure } from "./transform";

const componentMap: {
  [key: string]: {
    component: any;
    path: string;
  };
} = {
  Card: { component: Card, path: "card" },
  CardHeader: { component: CardHeader, path: "card" },
  CardTitle: { component: CardTitle, path: "card" },
  CardDescription: { component: CardDescription, path: "card" },
  CardContent: { component: CardContent, path: "card" },
  CardFooter: { component: CardFooter, path: "card" },
  Button: { component: Button, path: "button" },
  //@ts-ignore
  Text: { component: Text, path: "text" },
  NodeDivElement: { component: NodeDivElement, path: "div" },
  // Button,
  // Text,
  // Добавляйте сюда другие компоненты по мере необходимости
};

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

    const Component = componentMap[ComponentType]?.component || ComponentType;

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

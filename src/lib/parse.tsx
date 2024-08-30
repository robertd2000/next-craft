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
import React from "react";
import { SerializedNodes } from "@craftjs/core";

const componentMap = {
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

function transformNode(nodeId, structure) {
  const node = structure[nodeId];

  if (!node) return null;

  // Создаем базовый объект для текущего узла
  const transformedNode = {
    type: node.displayName,
    props: { ...node.props },
  };

  // Если узел имеет связные узлы (linkedNodes), добавляем их как дочерние элементы
  const linkedNodes = Object.values(node.linkedNodes || {});
  if (linkedNodes.length > 0) {
    transformedNode.children = linkedNodes
      .map((childId) => transformNode(childId, structure))
      .filter((child) => child !== null); // Убираем null элементы
  }
  // Если у узла есть дочерние узлы, добавляем их к children
  if (node.nodes && node.nodes.length > 0) {
    transformedNode.children = [
      ...(transformedNode.children || []),
      ...node.nodes
        .map((childId) => transformNode(childId, structure))
        .filter((child) => child !== null),
    ];
  }
  return transformedNode;
}
function transformStructure(structure) {
  // Начинаем с корневого узла, обычно это "ROOT"
  const rootId = "ROOT";
  return transformNode(rootId, structure);
}

export function parseStructure(structure: SerializedNodes) {
  console.log("structure", structure);
  const transformedStructure = transformStructure(structure);
  console.log("transformedStructure", transformedStructure);

  return createComponent(transformedStructure);
}

export function createComponent(
  node: { type: any; props: any; children: any } | null
) {
  if (!node) return null;
  const { type, props, children } = node;

  // Если тип компонента есть в словаре componentMap, используем его
  const Component = componentMap[type] || type;

  // Если у узла нет дочерних элементов, просто создаем компонент
  if (!children || children.length === 0) {
    return <Component {...props} key={props?.key} />;
  }

  // Если у узла есть дочерние элементы, создаем компонент рекурсивно
  return (
    <Component {...props}>
      {children.map((child, index) => createComponent(child))}
    </Component>
  );
}

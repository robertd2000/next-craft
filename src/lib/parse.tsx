import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Button, ButtonProps } from "../components/ui/button";
import { Text } from "@/components/ui/text";
import React, {
  ForwardRefExoticComponent,
  HTMLAttributes,
  ReactNode,
  RefAttributes,
} from "react";
import { SerializedNodes } from "@craftjs/core";

const componentMap: {
  [key: string]: {
    component: any;
    path: string;
  };
} = {
  Card: { component: Card, path: "card" },
  CardTitle: { component: CardTitle, path: "card" },
  CardDescription: { component: CardDescription, path: "card" },
  CardContent: { component: CardContent, path: "card" },
  CardFooter: { component: CardFooter, path: "card" },
  Button: { component: Button, path: "button" },
  //@ts-ignore
  Text: { component: Text, path: "text" },
  // Button,
  // Text,
  // Добавляйте сюда другие компоненты по мере необходимости
};

const unimportedNodes = ["div", "p", "h1", "h2", "span"];

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

type ComponentImport = {
  component: string;
  path: string;
};

export function parseStructureToString(structure: SerializedNodes) {
  const transformedStructure = transformStructure(structure);
  const components: ComponentImport[] = [];

  function propsToString(props: Record<string, any>): string {
    if (!props) return "";

    return Object.keys(props)
      .map((key) => {
        const value = props[key];
        if (typeof value === "string") {
          return `${key}="${value}"`;
        } else if (typeof value === "object") {
          return `${key}={${JSON.stringify(value)}}`;
        } else if (typeof value === "boolean") {
          return value ? `${key}` : "";
        }
        return `${key}={${value}}`;
      })
      .join(" ");
  }

  const componentsPaths: {
    [key: string]: ComponentImport;
  } = {
    Card: { component: "Card", path: "card" },
    CardTitle: { component: "CardTitle", path: "card" },
    CardDescription: { component: "CardDescription", path: "card" },
    CardContent: { component: "CardContent", path: "card" },
    CardFooter: { component: "CardFooter", path: "card" },
    Button: { component: "Button", path: "button" },
    Text: { component: "Text", path: "text" },
  };

  function createComponentString(node?: TransformedNode, depth = 0): string {
    if (!node) return "";

    const {
      type: ComponentType,
      props: componentProps,
      children: nodeChildren,
    } = node;

    const componentTag =
      typeof ComponentType === "string" ? ComponentType : ComponentType.name;

    if (ComponentType && !unimportedNodes.includes(ComponentType))
      components.push(componentsPaths[componentTag]);
    const propsString = propsToString(componentProps);

    const indent = "  ".repeat(depth);

    if (!nodeChildren || nodeChildren.length === 0) {
      return `${indent}<${componentTag} ${propsString} />`;
    }

    const childrenString = nodeChildren
      .map((nodeChild: TransformedNode | undefined) =>
        createComponentString(nodeChild, depth + 1)
      )
      .join("\n");

    return `${indent}<${componentTag} ${propsString}>\n${childrenString}\n${indent}</${componentTag}>`;
  }

  const componentString = createComponentString(
    transformedStructure as TransformedNode
  );

  const imports: string[] = [];

  components
    ?.filter((i) => !unimportedNodes?.includes(i?.component))
    ?.forEach((component: ComponentImport) => {
      const importString = `import ${component?.component} from './components/${component?.path}'`;

      if (!imports.includes(importString) && component?.component) {
        imports.push(importString);
      }
    });

  const componentCode = `
  ${imports?.join("\n")}

  export function MyComponent() {
    return ${componentString}
  }
`;

  return {
    componentCode,
    components,
  };
}

// export function parseStructureToString(structure: SerializedNodes) {
//   const transformedStructure = transformStructure(structure);

//   function propsToString(props: Record<string, any>): string {
//     if (!props) return "";

//     return Object.keys(props)
//       .map((key) => {
//         const value = props[key];
//         if (typeof value === "string") {
//           return `${key}="${value}"`;
//         } else if (typeof value === "object") {
//           // Handle complex object props, e.g., style objects
//           return `${key}={${JSON.stringify(value)}}`;
//         } else if (typeof value === "boolean") {
//           return value ? `${key}` : "";
//         }
//         return `${key}={${value}}`;
//       })
//       .join(" ");
//   }

//   function createComponentString(node?: TransformedNode): string {
//     if (!node) return "";

//     const {
//       type: ComponentType,
//       props: componentProps,
//       children: nodeChildren,
//     } = node;

//     const componentTag =
//       typeof ComponentType === "string" ? ComponentType : ComponentType.name;

//     const propsString = propsToString(componentProps);

//     if (!nodeChildren || nodeChildren.length === 0) {
//       return `<${componentTag} ${propsString} />`;
//     }

//     const childrenString = nodeChildren
//       .map((nodeChild: TransformedNode | undefined) =>
//         createComponentString(nodeChild)
//       )
//       .join("");

//     return `<${componentTag} ${propsString}>${childrenString}</${componentTag}>`;
//   }

//   const componentString = createComponentString(
//     transformedStructure as TransformedNode
//   );

//   return {
//     renderComponentString: componentString,
//   };
// }

// export function parseStructureToString(structure: SerializedNodes) {
//   const transformedStructure = transformStructure(structure);

//   const components: React.ForwardRefExoticComponent<
//     React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
//   >[] = [];

//   function createComponent(node?: TransformedNode): JSX.Element | null {
//     if (!node) return null;

//     const {
//       type: ComponentType,
//       props: componentProps,
//       children: nodeChildren,
//     } = node;

//     const Component = componentMap[ComponentType] || ComponentType;

//     components.push(Component);

//     if (!nodeChildren || nodeChildren.length === 0) {
//       return <Component {...componentProps} key={componentProps?.key} />;
//     }

//     return (
//       <Component {...componentProps}>
//         {nodeChildren.map((nodeChild: TransformedNode | undefined) =>
//           createComponent(nodeChild)
//         )}
//       </Component>
//     );
//   }

//   return {
//     renderComponent: createComponent(transformedStructure as TransformedNode),
//     components,
//   };
// }

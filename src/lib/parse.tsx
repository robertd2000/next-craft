import { SerializedNodes } from "@craftjs/core";
import { componentsPaths, unimportedNodes } from "@/constants/components";
import { TransformedNode, transformStructure } from "./transform";

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

  function createComponentString(node?: TransformedNode, depth = 0): string {
    if (!node) return "";

    const {
      type: ComponentType,
      props: componentProps,
      children: nodeChildren,
    } = node;

    let modifiedProps = componentProps;
    if ('onClickScript' in componentProps) {
      modifiedProps = {...componentProps, onClickScript: componentProps.onClickScript.replace(/"/g, "'")};
    }

    const componentTag =
      typeof ComponentType === "string" ? ComponentType : ComponentType.name;

    if (ComponentType && !unimportedNodes.includes(ComponentType))
      components.push(componentsPaths[componentTag]);
    const propsString = propsToString(modifiedProps);

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
      const importString = `import {${component?.component}} from './components/ui/${component?.path}'`;

      if (!imports.includes(importString) && component?.component) {
        imports.push(importString);
      }
    });

  const componentCode = `
  ${imports?.join("\n")}

  function App() {
    return ${componentString}
  }

  export default App;
`;

  return {
    componentCode,
    components,
  };
}

let imports = [];

const generateComponentCode = (nodesMap, nodeId, level) => {
  const node = nodesMap[nodeId];
  const { displayName, props, nodes, linkedNodes, custom } = node.data;

  const indendation = getIndentation(level);
  const openingTag = `<${displayName}${generatePropsString(props)}>`;
  const closingTag = `</${displayName}>`;

  if (!imports.find((item) => item.displayName === displayName)) {
    imports.push({
      displayName,
      importPath: custom.importPath,
      pathToCopyFile: custom.pathToCopyFile,
    });
  }

  if (nodes.length === 0 && Object.keys(linkedNodes).length === 0) {
    // No child nodes, return the self-closing tag
    return `${indendation}${openingTag}${generateChildString(
      props.children,
      level + 1
    )}${closingTag}`;
  } else {
    // Has child nodes, recursively generate code for children
    const childComponents = nodes.map((childId) =>
      generateComponentCode(nodesMap, childId, level + 1)
    );

    const childComponentsString = childComponents.length
      ? `\n${childComponents.join(`\n`)}`
      : "";

    const linkedChildComponents = Object.entries(linkedNodes).map(
      ([key, value]) => generateComponentCode(nodesMap, value, level + 1)
    );

    const linkedChildComponentsString = linkedChildComponents.length
      ? `\n${linkedChildComponents.join(`\n`)}`
      : "";

    return `${indendation}${openingTag}${childComponentsString}${linkedChildComponentsString}\n${indendation}${closingTag}`;
  }
};

function wrapInsideComponent(input) {
  return `
export function Component() {
  return (
    ${input.trim().replace(/^/gm, "  ")}
  );
}
  `.trim();
}

const generatePropsString = (props) => {
  const propsArray = Object.entries(props)
    .filter(([key]) => key !== "children") // Exclude children from props
    .map(([key, value]) => `${key}="${value}"`);
  return propsArray.length > 0 ? ` ${propsArray.join(" ")}` : "";
};

const getIndentation = (level) => {
  if (!level) {
    return "";
  }
  return " ".repeat(level * 2); // Adjust the number of spaces per level as needed
};

const generateChildString = (children, level) => {
  if (typeof children === "string") {
    // If children is a string, return it directly
    return children;
  } else if (Array.isArray(children) && children.length > 0) {
    return children
      .map((child) => generateComponentCode({ TEMP: child }, "TEMP", level))
      .join("");
  } else {
    return "";
  }
};

const generateImportStatements = (components) => {
  const filteredComponents = components.filter(
    (comp) => comp.displayName !== "div"
  );

  const groupedComponents = {};
  // const dynamicImports = [];

  filteredComponents.forEach((comp) => {
    const key = comp.importPath || ""; // Use an empty string for components without a path
    if (!groupedComponents[key]) {
      groupedComponents[key] = [];
    }
    groupedComponents[key].push(comp);
  });

  const importStatements = Object.values(groupedComponents).map((group) => {
    const displayNameList = group.map((comp) => comp.displayName).join(", ");
    const importPath = group[0].importPath
      ? ` from "${group[0].importPath}"`
      : "";
    return `import { ${displayNameList} }${importPath};`;
  });

  return { importString: importStatements.join("\n"), groupedComponents };
};

export const getOutputCode = async (nodes) => {
  imports = [];

  const componentString = generateComponentCode(nodes, "ROOT", 2);
  const { importString, groupedComponents } = generateImportStatements(imports);
  const output = wrapInsideComponent(componentString);

  console.log(importString, output, groupedComponents);

  return { importString, output, groupedComponents };
};

// export const getOutputHTMLFromId = (iframeId) => {
//   const iframe = document.getElementById(iframeId);
//   const iframeDocument = iframe?.contentWindow?.document || null;

//   if (iframeDocument) {
//     const indentation = "  "; // Adjust the indentation as needed
//     const iframeHtml = iframeDocument.documentElement.outerHTML;
//     const indentedHtml = iframeHtml.replace(/^(.*)$/gm, indentation + "$1");

//     return indentedHtml;
//   } else {
//     alert("Failed to access iframe content.");
//     return "";
//   }
// };

type BorderGroup = "border" | "border-t" | "border-b" | "border-l" | "border-r";
type RoundedGroup =
  | "rounded"
  | "rounded-tl"
  | "rounded-tr"
  | "rounded-bl"
  | "rounded-br";

export type ClassCategory =
  | "textColor"
  | "textAlign"
  | "backgroundColor"
  // | "margin"
  // | "padding"
  | "borderColor"
  | "width"
  | "height"
  | "maxWidth"
  | "maxHeight"
  | "minWidth"
  | "minHeight"
  | "position"
  | "display"
  | "fontWeight"
  | "fontSize"
  | "lineHeight"
  | "letterSpacing"
  | "textDecoration"
  | "textTransform"
  | "fontStyle"
  | "marginTop"
  | "marginBottom"
  | "marginLeft"
  | "marginRight"
  | "paddingTop"
  | "paddingBottom"
  | "paddingLeft"
  | "paddingRight"
  | "borderStyle"
  | "border-t"
  | "border-b"
  | "border-l"
  | "border-r"
  | "rounded"
  | "rounded-tl"
  | "rounded-tr"
  | "rounded-bl"
  | "rounded-br";

const createBorderConfig = (
  group: BorderGroup
): { pattern: RegExp; generateClass: (_: any, value: any) => string } => ({
  pattern: new RegExp(`${group}-\\[(#?[a-fA-F0-9]{3,6}|[0-9]+(px|%)?)\\]`),
  generateClass: (_, value) => `${group}-[${value}]`,
});

// Функция для создания конфигурации скруглений (rounded)
const createRoundedConfig = (
  group: RoundedGroup
): { pattern: RegExp; generateClass: (_: any, value: any) => string } => ({
  pattern: new RegExp(`${group}-\\[(\\d+(px|%)?)\\]`),
  generateClass: (_, value) => `${group}-[${value}]`,
});

const classConfig: Record<
  ClassCategory,
  {
    pattern: RegExp;
    generateClass: (classKey: string, value: string) => string;
  }
> = {
  ...["border-t", "border-b", "border-l", "border-r"].reduce((acc, group) => {
    acc[group as ClassCategory] = createBorderConfig(group as BorderGroup);
    return acc;
  }, {} as Record<ClassCategory, { pattern: RegExp; generateClass: (_: any, value: any) => string }>),

  // Добавляем скругления
  ...["rounded", "rounded-tl", "rounded-tr", "rounded-bl", "rounded-br"].reduce(
    (acc, group) => {
      acc[group as ClassCategory] = createRoundedConfig(group as RoundedGroup);
      return acc;
    },
    {} as Record<
      ClassCategory,
      { pattern: RegExp; generateClass: (_: any, value: any) => string }
    >
  ),
  textColor: {
    pattern: /text-\[\#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\]/,
    generateClass: (_, value) => `text-[${value}]`,
  },
  textAlign: {
    pattern: /text-(left|center|right|justify)/g,
    generateClass: (_, value) => `text-${value}`,
  },
  backgroundColor: {
    pattern: /bg-\[\#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\]/,
    generateClass: (_, value) => `bg-[${value}]`,
  },
  // margin: {
  //   pattern: /m[trblxy]?-?\[.*?\]/g,
  //   generateClass: (classKey, value) => `${classKey}-[${value}]`,
  // },
  marginTop: {
    pattern: /mt-\[(\d+(\.\d+)?(px|%|em|rem|svw|svh|lvh|lvw|ch))\]/,
    generateClass: (_, value) => `mt-[${value}]`,
  },
  marginBottom: {
    pattern: /mb-\[(\d+(\.\d+)?(px|%|em|rem|svw|svh|lvh|lvw|ch))\]/,
    generateClass: (_, value) => `mb-[${value}]`,
  },
  marginLeft: {
    pattern: /ml-\[(\d+(\.\d+)?(px|%|em|rem|svw|svh|lvh|lvw|ch))\]/,
    generateClass: (_, value) => `ml-[${value}]`,
  },
  marginRight: {
    pattern: /mr-\[(\d+(\.\d+)?(px|%|em|rem|svw|svh|lvh|lvw|ch))\]/,
    generateClass: (_, value) => `mr-[${value}]`,
  },
  paddingTop: {
    pattern: /pt-\[(\d+(\.\d+)?(px|%|em|rem|svw|svh|lvh|lvw|ch))\]/,
    generateClass: (_, value) => `pt-[${value}]`,
  },
  paddingBottom: {
    pattern: /pb-\[(\d+(\.\d+)?(px|%|em|rem|svw|svh|lvh|lvw|ch))\]/,
    generateClass: (_, value) => `pb-[${value}]`,
  },
  paddingLeft: {
    pattern: /pl-\[(\d+(\.\d+)?(px|%|em|rem|svw|svh|lvh|lvw|ch))\]/,
    generateClass: (_, value) => `pl-[${value}]`,
  },
  paddingRight: {
    pattern: /pr-\[(\d+(\.\d+)?(px|%|em|rem|svw|svh|lvh|lvw|ch))\]/,
    generateClass: (_, value) => `pr-[${value}]`,
  },
  // padding: {
  //   pattern: /p[trblxy]?-?\[.*?\]/g,
  //   generateClass: (classKey, value) => `${classKey}-[${value}]`,
  // },
  width: {
    pattern: /w-\[(\d+(\.\d+)?(px|%|em|rem|svw|svh|lvh|lvw|ch))\]/, // /w-\[.*?\]/g,
    generateClass: (_, value) => `w-[${value}]`,
  },
  height: {
    pattern: /h-\[(\d+(\.\d+)?(px|%|em|rem|svw|svh|lvh|lvw|ch))\]/, // /h-\[.*?\]/g,
    generateClass: (_, value) => `h-[${value}]`,
  },
  maxWidth: {
    pattern: /max-w-\[.*?\]/g,
    generateClass: (_, value) => `max-w-[${value}]`,
  },
  maxHeight: {
    pattern: /max-h-\[.*?\]/g,
    generateClass: (_, value) => `max-h-[${value}]`,
  },
  minWidth: {
    pattern: /min-w-\[.*?\]/g,
    generateClass: (_, value) => `min-w-[${value}]`,
  },
  minHeight: {
    pattern: /min-h-\[.*?\]/g,
    generateClass: (_, value) => `min-h-[${value}]`,
  },
  borderStyle: {
    pattern: /\b(border-(solid|dashed|dotted|double|none))\b/g,
    generateClass: (_, value) => `border-[${value}]`,
  },
  borderColor: {
    pattern: /border-\[\#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\]/,
    generateClass: (_, value) => `border-[${value}]`,
  },
  display: {
    pattern: /\b(block|inline-block|inline|flex|grid|hidden)\b/,
    generateClass: (_, value) => `${value}`,
  },
  position: {
    pattern:
      /\b(static|relative|absolute|sticky|fixed|inherit|revert|revert-layer|unset)\b/g,
    generateClass: (_, value) => `${value}`,
  },
  fontWeight: {
    pattern: /font-\[(\d+)\]/, // /font-\[.*?\]/g,
    generateClass: (_, value) => `font-[${value}]`,
  },
  fontSize: {
    pattern: /text-\[(\d+(\.\d+)?(px|%|em|rem|svw|svh|lvh|lvw|ch))\]/, // /text-\[\d+(px|%|em|rem|svw|svh|lvh|lvw|ch)\]/,
    generateClass: (_, value) => `text-[${value}]`,
  },
  lineHeight: {
    pattern: /leading-\[(\d+(\.\d+)?)\]/, // /leading-\[.*?\]/g,
    generateClass: (_, value) => `leading-[${value}]`,
  },
  letterSpacing: {
    pattern: /tracking-\[(\d+(\.\d+)?(px|em|rem|ch))\]/, // /tracking-\[.*?\]/g,
    generateClass: (_, value) => `tracking-[${value}]`,
  },
  textDecoration: {
    pattern: /(underline|line-through|no-underline)/, // /(underline|line-through|no-underline)/g,
    generateClass: (_, value) => `${value}`,
  },
  textTransform: {
    pattern: /(uppercase|lowercase|capitalize|normal-case)/, // /(uppercase|lowercase|capitalize|normal-case)/g,
    generateClass: (_, value) => `${value}`,
  },
  fontStyle: {
    pattern: /(italic|not-italic)/, // /(italic|not-italic)/g,
    generateClass: (_, value) => `${value}`,
  },
};

export function parseTailwindClass({
  currentClassName,
  classKey,
  category,
  value,
}: {
  currentClassName: string;
  classKey: string;
  value: string;
  category: ClassCategory;
}): string {
  const config = classConfig[category];

  const cleanedClassName = currentClassName
    ?.replace(config?.pattern, "")
    .trim();

  const newClass = config?.generateClass(classKey, value);

  return [cleanedClassName, newClass]
    ?.filter((i) => i != undefined)
    ?.join(" ")
    ?.trim();
}

export type ParsedClasses = {
  [key in ClassCategory]?: string;
};

export function parseTailwindClassesToValues(
  classString: string
): ParsedClasses {
  const parsedValues: ParsedClasses = {};
  const extractValue = (match: any) => match[1];

  for (const [category, { pattern }] of Object.entries(classConfig)) {
    const match = pattern.exec(classString);
    if (match) {
      parsedValues[category as ClassCategory] = extractValue(match);
    }
  }

  return parsedValues;
}

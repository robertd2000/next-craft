// Типы категорий классов
export type ClassCategory =
  | "textColor"
  | "textAlign"
  | "backgroundColor"
  // | "margin"
  | "padding"
  | "width"
  | "height"
  | "maxWidth"
  | "maxHeight"
  | "minWidth"
  | "minHeight"
  | "border"
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
  | "marginRight";

// Объект с конфигурациями для категорий классов
const classConfig: Record<
  ClassCategory,
  {
    pattern: RegExp;
    generateClass: (classKey: string, value: string) => string;
  }
> = {
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
  padding: {
    pattern: /p[trblxy]?-?\[.*?\]/g,
    generateClass: (classKey, value) => `${classKey}-[${value}]`,
  },
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
  border: {
    pattern: /border(-[a-z]+-[0-9]+)?/g,
    generateClass: (_, value) => `border-${value}`,
  },
  display: {
    pattern: /\b(block|inline-block|inline|flex|grid|hidden)\b/g,
    generateClass: (_, value) => `${value}`,
  },
  position: {
    pattern:
      /\b(static|relative|absolute|sticky|fixed|inherit|revert|revert-layer|unset)\b/g,
    generateClass: (_, value) => `${value}`,
  },
  fontWeight: {
    pattern: /font-\[.*?\]/g,
    generateClass: (_, value) => `font-[${value}]`,
  },
  fontSize: {
    pattern: /text-\[\d+(px|%|em|rem|svw|svh|lvh|lvw|ch)\]/,
    generateClass: (_, value) => `text-[${value}]`,
  },
  lineHeight: {
    pattern: /leading-\[.*?\]/g,
    generateClass: (_, value) => `leading-[${value}]`,
  },
  letterSpacing: {
    pattern: /tracking-\[.*?\]/g,
    generateClass: (_, value) => `tracking-[${value}]`,
  },
  textDecoration: {
    pattern: /(underline|line-through|no-underline)/g,
    generateClass: (_, value) => `${value}`,
  },
  textTransform: {
    pattern: /(uppercase|lowercase|capitalize|normal-case)/g,
    generateClass: (_, value) => `${value}`,
  },
  fontStyle: {
    pattern: /(italic|not-italic)/g,
    generateClass: (_, value) => `${value}`,
  },
};

// Основная функция парсинга и замены класса
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

  // Удаление старого класса
  const cleanedClassName = currentClassName
    ?.replace(config?.pattern, "")
    .trim();

  // Добавление нового класса
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

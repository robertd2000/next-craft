// Типы категорий классов
export type ClassCategory =
  | "textColor"
  | "textAlign"
  | "backgroundColor"
  | "margin"
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
  | "fontStyle";
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
  let classPattern: RegExp | null = null;
  let newClass = "";

  switch (category) {
    case "textColor":
      classPattern = /text-[a-z]+-[0-9]+/g;
      newClass = `text-${value}`;
      break;

    case "textAlign":
      classPattern = /text-(left|center|right|justify)/g;
      newClass = `text-${value}`;
      break;

    case "backgroundColor":
      classPattern = /bg-[a-z]+-[0-9]+/g;
      newClass = `bg-${value}`;
      break;

    case "margin":
      classPattern = /m[trblxy]?-?\[.*?\]/g;
      newClass = `${classKey}-[${value}]`;
      break;

    case "padding":
      classPattern = /p[trblxy]?-?\[.*?\]/g;
      newClass = `${classKey}-[${value}]`;
      break;

    case "width":
      classPattern = /w-\[.*?\]/g;
      newClass = `w-[${value}]`;
      break;

    case "height":
      classPattern = /h-\[.*?\]/g;
      newClass = `h-[${value}]`;
      break;

    case "maxWidth":
      classPattern = /max-w-\[.*?\]/g;
      newClass = `max-w-[${value}]`;
      break;

    case "maxHeight":
      classPattern = /max-h-\[.*?\]/g;
      newClass = `max-h-[${value}]`;
      break;

    case "minWidth":
      classPattern = /min-w-\[.*?\]/g;
      newClass = `min-w-[${value}]`;
      break;

    case "minHeight":
      classPattern = /min-h-\[.*?\]/g;
      newClass = `min-h-[${value}]`;
      break;

    case "border":
      classPattern = /border(-[a-z]+-[0-9]+)?/g;
      newClass = `border-${value}`;
      break;

    case "display":
      classPattern = /\b(block|inline-block|inline|flex|grid|hidden)\b/g;
      newClass = `${value}`;
      break;

    case "position":
      classPattern =
        /\b(static|relative|absolute|sticky|fixed|inherit|revert|revert-layer|unset)\b/g;
      newClass = `${value}`;
      break;

    case "fontWeight":
      classPattern =
        /font-(hairline|thin|light|normal|medium|semibold|bold|extrabold|black)/g;
      newClass = `font-${value}`;
      break;

    case "fontSize":
      classPattern = /text-(sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)/g;
      newClass = `text-${value}`;
      break;

    case "lineHeight":
      classPattern =
        /leading-(tight|snug|normal|relaxed|loose|[0-9]+(?:\.[0-9]+)?)/g;
      newClass = `leading-${value}`;
      break;

    case "letterSpacing":
      classPattern = /tracking-(tight|normal|wide|[0-9]+(?:\.[0-9]+)?)/g;
      newClass = `tracking-${value}`;
      break;

    case "textDecoration":
      classPattern = /(underline|line-through|no-underline)/g;
      newClass = `${value}`;
      break;

    case "textTransform":
      classPattern = /(uppercase|lowercase|capitalize|normal-case)/g;
      newClass = `${value}`;
      break;

    case "fontStyle":
      classPattern = /(italic|not-italic)/g;
      newClass = `${value}`;
      break;
  }

  // Удаление старого класса соответствующей категории
  if (classPattern) {
    currentClassName = currentClassName?.replace(classPattern, "").trim();
  }

  // Добавление нового класса
  return `${currentClassName} ${newClass}`.trim();
}

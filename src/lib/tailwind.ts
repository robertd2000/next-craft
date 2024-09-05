// Типы категорий классов
export type ClassCategory =
  | "textColor"
  | "textAlign"
  | "backgroundColor"
  | "margin"
  | "padding"
  | "width"
  | "height"
  | "border"
  | "display";

export function parseTailwindClass({
  currentClassName,
  classKey,
  value,
  category,
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
      classPattern = /m[trbl]?-?\d+/g;
      newClass = `${classKey}-${value}`;
      break;

    case "padding":
      classPattern = /p[trbl]?-?\d+/g;
      newClass = `${classKey}-${value}`;
      break;

    case "width":
      classPattern = /w-\[.*?\]/g;
      newClass = `w-[${value}]`;
      break;

    case "height":
      classPattern = /h-\[.*?\]/g;
      newClass = `h-[${value}]`;
      break;

    case "border":
      classPattern = /border(-[a-z]+-[0-9]+)?/g;
      newClass = `border-${value}`;
      break;

    case "display":
      classPattern = /\b(block|inline-block|inline|flex|grid|hidden)\b/g;
      newClass = `${value}`;
      break;
  }

  // Удаление старого класса соответствующей категории
  if (classPattern) {
    currentClassName = currentClassName.replace(classPattern, "").trim();
  }

  // Добавление нового класса
  return `${currentClassName} ${newClass}`.trim();
}

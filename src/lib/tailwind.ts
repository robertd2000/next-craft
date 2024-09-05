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
  | "display";
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
      // Регулярное выражение для классов цвета текста (например, text-red-500)
      classPattern = /text-[a-z]+-[0-9]+/g;
      newClass = `text-${value}`;
      break;

    case "textAlign":
      // Регулярное выражение для выравнивания текста (text-left, text-center и т.д.)
      classPattern = /text-(left|center|right|justify)/g;
      newClass = `text-${value}`;
      break;

    case "backgroundColor":
      // Регулярное выражение для классов фона (например, bg-blue-500)
      classPattern = /bg-[a-z]+-[0-9]+/g;
      newClass = `bg-${value}`;
      break;

    case "margin":
      // Регулярное выражение для классов отступов (например, m-[10px], mt-[5px])
      classPattern = /m[trblxy]?-?\[.*?\]/g;
      newClass = `${classKey}-[${value}]`;
      break;

    case "padding":
      // Регулярное выражение для классов паддингов (например, p-[5px], pt-[10px])
      classPattern = /p[trblxy]?-?\[.*?\]/g;
      newClass = `${classKey}-[${value}]`;
      break;

    case "width":
      // Регулярное выражение для классов ширины (например, w-[100px])
      classPattern = /w-\[.*?\]/g;
      newClass = `w-[${value}]`;
      break;

    case "height":
      // Регулярное выражение для классов высоты (например, h-[100px])
      classPattern = /h-\[.*?\]/g;
      newClass = `h-[${value}]`;
      break;

    case "maxWidth":
      // Регулярное выражение для максимальной ширины (например, max-w-[100px])
      classPattern = /max-w-\[.*?\]/g;
      newClass = `max-w-[${value}]`;
      break;

    case "maxHeight":
      // Регулярное выражение для максимальной высоты (например, max-h-[100px])
      classPattern = /max-h-\[.*?\]/g;
      newClass = `max-h-[${value}]`;
      break;

    case "minWidth":
      // Регулярное выражение для минимальной ширины (например, min-w-[100px])
      classPattern = /min-w-\[.*?\]/g;
      newClass = `min-w-[${value}]`;
      break;

    case "minHeight":
      // Регулярное выражение для минимальной высоты (например, min-h-[100px])
      classPattern = /min-h-\[.*?\]/g;
      newClass = `min-h-[${value}]`;
      break;

    case "border":
      // Регулярное выражение для классов границы (border, border-blue-500)
      classPattern = /border(-[a-z]+-[0-9]+)?/g;
      newClass = `border-${value}`;
      break;

    case "display":
      // Регулярное выражение для классов display (например, block, flex)
      classPattern = /\b(block|inline-block|inline|flex|grid|hidden)\b/g;
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

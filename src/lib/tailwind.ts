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

export function parseTailwindClass(
  currentClassName: string,
  classKey: string,
  value: string,
  category: ClassCategory
): string {
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
      classPattern = /m[trbl]?-?\d+/g; // Отступы m, mt, mb, ml, mr и их числовые значения
      newClass = `${classKey}-${value}`;
      break;

    case "padding":
      classPattern = /p[trbl]?-?\d+/g; // Паддинги p, pt, pb, pl, pr и их числовые значения
      newClass = `${classKey}-${value}`;
      break;

    case "width":
      classPattern = /w-\[.*?\]/g; // Ширина, например w-[100px]
      newClass = `w-[${value}]`;
      break;

    case "height":
      classPattern = /h-\[.*?\]/g; // Высота, например h-[100px]
      newClass = `h-[${value}]`;
      break;

    case "border":
      classPattern = /border(-[a-z]+-[0-9]+)?/g; // Граница border, border-color
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

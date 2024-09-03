import { ComponentImport } from "@/app/api/export/types";

export const componentsPaths: {
  [key: string]: ComponentImport;
} = {
  Card: { component: "Card", path: "card" },
  CardTitle: { component: "CardTitle", path: "card" },
  CardHeader: { component: "CardHeader", path: "card" },
  CardDescription: { component: "CardDescription", path: "card" },
  CardContent: { component: "CardContent", path: "card" },
  CardFooter: { component: "CardFooter", path: "card" },
  Button: { component: "Button", path: "button" },
  Text: { component: "Text", path: "text" },
  NodeDivElement: { component: "NodeDivElement", path: "div" },
};

export const unimportedNodes = ["div", "p", "h1", "h2", "span"];

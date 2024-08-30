"use client";
import { createComponent } from "../../lib/parse";

const appStructure = {
  type: "div",
  props: {
    className: "app-container",
    key: "1",
  },
  children: [
    {
      type: "Card", // Компонент из папки components
      props: {
        content: "This is a card",
        key: "2",
      },
      children: [
        {
          type: "CardHeader", // Компонент из папки components
          props: {
            content: "This is a card",
            key: "2",
          },
          children: [
            {
              type: "CardTitle", // Компонент из папки components
              props: {
                content: "This is a card",
                key: "2",
                children: "This is a card",
              },
            },
            {
              type: "CardDescription", // Компонент из папки components
              props: {
                content: "This is a card",
                key: "2",
                children: "Card Description",
              },
            },
          ],
        },
        {
          type: "CardContent", // Компонент из папки components
          props: {
            content: "This is a card",
            key: "2",
            children: "Empty Container",
          },
        },
      ],
    },
    {
      type: "Button", // Компонент из папки components
      props: {
        // onClick: () => alert("Button clicked"),
        children: "Click Me",
        key: "3",
      },
    },
  ],
};
export default function Test() {
  return createComponent(appStructure);
}

import { ReactElement, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { NodeButton } from "../button/ui/NodeButton";
import { NodeCard } from "../card";
import { NodeText } from "../text";

export type Components = {
  name: string;
  grid: number;
  items: {
    name: string;
    props?: {
      variant?:
        | "link"
        | "default"
        | "destructive"
        | "outline"
        | "secondary"
        | "ghost"
        | null
        | undefined;
      className?: string;
      children?: ReactNode | string;
    };
    node: ReactElement;
    demo?: ReactNode;
  }[];
};

export const componentsMap: Components[] = [
  {
    name: "Buttons",
    grid: 2,
    items: [
      {
        name: "Default",
        demo: <Button>Default</Button>,
        node: <NodeButton>Default</NodeButton>,
      },
      {
        name: "Outline",
        props: { variant: "outline", children: "Outline" },
        demo: <Button variant={"outline"}>Outline</Button>,
        node: <NodeButton variant={"outline"}>Outline</NodeButton>,
      },
      {
        name: "Destructive",
        props: { variant: "destructive", children: "Destructive" },
        demo: <Button variant={"destructive"}>Destructive</Button>,
        node: <NodeButton variant={"destructive"}>Destructive</NodeButton>,
      },
    ],
  },
  {
    name: "Text",
    grid: 2,
    items: [
      {
        name: "Text",
        demo: "Text",
        node: <NodeText tagName="p" text="Text" />,
      },
      {
        name: "Title",
        demo: <h2>Title</h2>,
        node: <NodeText tagName="h2" text="Title" />,
      },
    ],
  },
  {
    name: "Cards",
    grid: 1,
    items: [
      {
        name: "Default",
        demo: (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>Empty Container</CardContent>
            <CardFooter>
              <Button className="w-full">Footer button</Button>
            </CardFooter>
          </Card>
        ),
        node: <NodeCard></NodeCard>,
      },
    ],
  },
  //   {
  //     name: 'Layout',
  //     items: [
  //       {
  //         name: 'One Block',
  //         demo: (
  //           <OneBlock className="text-center italic p-4 bg-yellow-100 outline-dashed outline-amber-400">
  //             One Block
  //           </OneBlock>
  //         ),
  //         node: (
  //           <Element
  //             canvas
  //             is={NodeOneBlock as typeof NodeOneBlock & string}
  //             id="one-block"
  //           />
  //         ),
  //       },
  //       {
  //         name: 'Two Blocks',
  //         demo: (
  //           <OneBlock className="text-center italic p-4 bg-yellow-100 outline-dashed outline-amber-400 flex flex-row">
  //             <OneBlock className="text-center italic bg-yellow-100 outline-dashed outline-amber-400">
  //               First Block
  //             </OneBlock>
  //             <OneBlock className="text-center italic bg-yellow-100 outline-dashed outline-amber-400">
  //               Second Block
  //             </OneBlock>
  //           </OneBlock>
  //         ),
  //         node: <NodeTwoBlocks></NodeTwoBlocks>,
  //       },
  //     ],
  //   },
];

"use client";

import {
  NodeButton,
  NodeCard,
  NodeCardContent,
  NodeCardDescription,
  NodeCardFooter,
  NodeCardHeader,
  NodeCardTitle,
  NodeDiv,
  NodeText,
} from "@/components/blocks";
import { componentsMap } from "@/components/blocks/constants/components-map";
import { Canvas } from "@/components/canvas/ui/Canvas";
import { ReactIframe } from "@/components/react-iframe";
import { RenderNode } from "@/components/render-node/render-node";
import { SideMenu } from "@/components/side-menu";
import { Viewport } from "@/components/viewport";
import { Editor, Frame, Element } from "@craftjs/core";
import { spawn } from "child_process";
import { useState } from "react";
import { Reka } from "@rekajs/core";
import { RekaProvider } from "@rekajs/react";
import * as t from "@rekajs/types";

export default function Home() {
  const [loading, setLoading] = useState(false);

  const exportSite = async () => {
    setLoading(true);
    const response = await fetch("/api/export", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pageData: "yourPageData", // данные текущей страницы
      }),
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "exportedSite.zip");
      document.body.appendChild(link);
      link.click();
      link?.parentNode?.removeChild(link);
    } else {
      console.error("Ошибка экспорта");
    }
    setLoading(false);
  };

  const reka = Reka.create();

  reka.load(
    t.state({
      extensions: {},
      program: t.program({
        globals: [
          t.val({
            name: "globalText",
            init: t.literal({ value: "Global Text!" }),
          }),
        ],
        components: [
          t.rekaComponent({
            name: "App",
            props: [],
            state: [],
            template: t.tagTemplate({
              tag: "div",
              props: {
                className: t.literal({
                  value: "bg-neutral-100 px-3 py-4 w-full h-full",
                }),
              },
              children: [
                t.tagTemplate({
                  tag: "h4",
                  props: {
                    className: t.literal({ value: "text-lg w-full" }),
                  },
                  children: [
                    t.tagTemplate({
                      tag: "text",
                      props: {
                        value: t.literal({ value: "Hello World" }),
                      },
                      children: [],
                    }),
                  ],
                }),

                t.componentTemplate({
                  component: t.identifier({ name: "Button" }),
                  props: {},
                  children: [],
                }),
              ],
            }),
          }),
          t.rekaComponent({
            name: "Button",
            props: [
              t.componentProp({
                name: "text",
                init: t.literal({ value: "Click me!" }),
              }),
            ],
            state: [t.val({ name: "counter", init: t.literal({ value: 0 }) })],
            template: t.tagTemplate({
              tag: "button",
              props: {
                className: t.literal({ value: "rounded border-2 px-3 py-2" }),
                onClick: t.func({
                  params: [],
                  body: t.block({
                    statements: [
                      t.assignment({
                        left: t.identifier({ name: "counter" }),
                        operator: "+=",
                        right: t.literal({ value: 1 }),
                      }),
                    ],
                  }),
                }),
              },
              children: [
                t.tagTemplate({
                  tag: "text",
                  props: {
                    value: t.identifier({ name: "text" }),
                  },
                  children: [],
                }),
                t.tagTemplate({
                  tag: "text",
                  props: {
                    value: t.binaryExpression({
                      left: t.literal({ value: " -> " }),
                      operator: "+",
                      right: t.identifier({ name: "counter" }),
                    }),
                  },
                  children: [],
                }),
              ],
            }),
          }),
        ],
      }),
    })
  );

  reka.createFrame({
    id: "Main app",
    component: {
      name: "App",
    },
  });

  console.log("reka", reka.frames[0].view);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <button onClick={exportSite}>Export</button>
      <RekaProvider reka={reka}>
        <Editor
          resolver={{
            NodeButton,
            Canvas,
            NodeCardHeader,
            NodeCard,
            NodeCardContent,
            NodeCardDescription,
            NodeCardTitle,
            NodeCardFooter,
            NodeText,
            NodeDiv,
          }}
          onRender={RenderNode}
        >
          <div className="flex flex-1 relative overflow-hidden w-full h-full">
            <SideMenu componentsMap={componentsMap} />
            <Viewport>
              <ReactIframe
                title="my frame"
                className="p-4 w-full h-full page-container"
              >
                <Frame>
                  <Element
                    is={Canvas}
                    id="ROOT"
                    canvas
                    data-cy="root-container"
                  >
                    <NodeButton>Button 1</NodeButton>
                    <NodeButton>Button 2</NodeButton>
                    <NodeButton>Button 3</NodeButton>
                    <NodeButton>Button 4</NodeButton>
                  </Element>
                </Frame>
              </ReactIframe>
            </Viewport>
          </div>
        </Editor>
      </RekaProvider>
    </main>
  );
}

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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <button onClick={exportSite}>Export</button>
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
                <Element is={Canvas} id="ROOT" canvas data-cy="root-container">
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
    </main>
  );
}

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
  NodeDivElement,
  NodeText,
} from "@/components/blocks";
import { componentsMap } from "@/components/blocks/constants/components-map";
import { Canvas } from "@/components/canvas/ui/Canvas";
import { ReactIframe } from "@/components/react-iframe";
import { RenderNode } from "@/components/render-node/render-node";
import { SideMenu } from "@/components/side-menu";
import { Editor, Frame, Element } from "@craftjs/core";
import { ControlPanel } from "@/components/control-panel/ui/ControlPanel";

export default function Home() {
  return (
    <section className="w-full h-full flex flex-col">
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
          NodeDivElement,
        }}
        onRender={RenderNode}
      >
        <div className="flex flex-1 relative overflow-hidden h-full">
          <SideMenu componentsMap={componentsMap} />
          <ReactIframe title="my frame" className="w-full ">
            <Frame>
              <Element is={Canvas} id="ROOT" canvas data-cy="root-container">
                <NodeButton>Button 1</NodeButton>
                <NodeButton>Button 2</NodeButton>
                <NodeButton>Button 3</NodeButton>
                <NodeButton>Button 4</NodeButton>
              </Element>
            </Frame>
          </ReactIframe>
          <ControlPanel />
        </div>
      </Editor>
    </section>
  );
}

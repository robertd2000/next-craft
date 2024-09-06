import { useNode } from "@craftjs/core";
import React, { useState } from "react";

type CanvasProps = {
  children: React.ReactNode;
};

export const Canvas = ({ children }: CanvasProps) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  const [canvasWidth, setCanvasWidth] = useState("w-[100%]");

  const handleIconClick = (newWidth: any) => {
    setCanvasWidth(newWidth);
  };

  return (
    <div className="w-full h-full flex justify-center">
      <div
        className={`${canvasWidth} flex flex-col border rounded-sm w-full h-full`}
      >
        <div
          className="min-w-[1920px] w-[1920px] h-full flex-1 bg-white rounded-b-lg overflow-auto "
          ref={(ref) => {
            if (ref) {
              connect(drag(ref));
            }
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

Canvas.craft = {
  displayName: "div",
  props: {
    className: "w-full h-full",
  },
};

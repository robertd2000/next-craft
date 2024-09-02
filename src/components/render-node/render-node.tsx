"use client";

import { useNode, useEditor, ROOT_NODE } from "@craftjs/core";
import { Move, ArrowUp, Delete } from "lucide-react";
import React, { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export const RenderNode = ({ render }: { render: React.ReactNode }) => {
  const { id } = useNode();
  const { actions, query, isActive } = useEditor((_, query) => ({
    isActive: query.getEvent("selected").contains(id),
  }));

  const {
    isHover,
    dom,
    name,
    moveable,
    deletable,
    connectors: { drag: dragRef },
    parent,
  } = useNode((node) => ({
    isHover: node.events.hovered,
    dom: node.dom as HTMLElement,
    name: node.data.custom.displayName || node.data.displayName,
    moveable: query.node(node.id).isDraggable(),
    deletable: query.node(node.id).isDeletable(),
    parent: node.data.parent as string,
    props: node.data.props as Record<string, unknown>,
  }));

  const currentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dom) {
      if (isActive || isHover) dom.classList.add("component-selected");
      else dom.classList.remove("component-selected");
    }
  }, [dom, isActive, isHover]);

  const getPos = useCallback((dom: HTMLElement) => {
    const { top, left, bottom } = dom
      ? dom.getBoundingClientRect()
      : { top: 0, left: 0, bottom: 0 };

    return {
      top: `${top > 0 ? top + 55 : bottom}px`,
      left: `${left + 350}px`,
    };
  }, []);

  const scroll = useCallback(() => {
    const { current: currentDOM } = currentRef;

    if (!currentDOM) return;
    if (dom) {
      const { top, left } = getPos(dom);
      currentDOM.style.top = top;
      currentDOM.style.left = left;
    }
  }, [dom, getPos]);

  useEffect(() => {
    document
      ?.querySelector(".craftjs-renderer")
      ?.addEventListener("scroll", scroll);

    return () => {
      document
        ?.querySelector(".craftjs-renderer")
        ?.removeEventListener("scroll", scroll);
    };
  }, [scroll]);

  return (
    <>
      {isHover || isActive
        ? createPortal(
            <div
              ref={currentRef}
              className="px-2 py-2 text-white bg-primary bg-blue-700 fixed flex items-center h-[30px] mt-[-50px] text-xs"
              style={{
                left: getPos(dom as HTMLElement).left,
                top: getPos(dom as HTMLElement).top,
                zIndex: 9999,
              }}
            >
              <h2 className="flex-1 mr-4">{name}</h2>
              {moveable ? (
                // @ts-ignore
                <div className="mr-2 cursor-move h-4 w-4" ref={dragRef}>
                  <Move className="h-4 w-4" />
                </div>
              ) : null}
              {id !== ROOT_NODE && (
                <div
                  className="mr-2 cursor-pointer h-4 w-4"
                  onClick={() => {
                    actions.selectNode(parent);
                  }}
                >
                  <ArrowUp />
                </div>
              )}
              {deletable ? (
                <div
                  className="cursor-pointer"
                  onMouseDown={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    actions.delete(id);
                  }}
                >
                  <Delete />
                </div>
              ) : null}
            </div>,
            document.body
          )
        : null}
      {render}
    </>
  );
};

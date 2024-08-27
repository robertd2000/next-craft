"use client";

import { useNode, useEditor, ROOT_NODE } from "@craftjs/core";
import { Move, ArrowUp, Delete } from "lucide-react";
import React, { useCallback, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Button } from "../ui/button";

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
    connectors: { drag },
    parent,
  } = useNode((node) => ({
    isHover: node.events.hovered,
    dom: node.dom,
    name: node.data.custom.displayName || node.data.displayName,
    moveable: query.node(node.id).isDraggable(),
    deletable: query.node(node.id).isDeletable(),
    parent: node.data.parent,
    props: node.data.props,
  }));

  console.log("isHover", isHover);

  const currentRef = useRef<HTMLDivElement | null>();

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
      top: `${top > 0 ? top : bottom}px`,
      left: `${left}px`,
    };
  }, []);

  const scroll = useCallback(() => {
    const { current: currentDOM } = currentRef;

    if (!currentDOM) return;
    const { top, left } = getPos(dom as HTMLElement);
    currentDOM.style.top = top;
    currentDOM.style.left = left;
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

  // useEffect(() => {
  //   if (dom && id !== "ROOT") {
  //     if (isHover) {
  //       // If either active or hover, add corresponding classes

  //       dom.classList.toggle("component-hover", isHover);
  //     } else {
  //       // If neither active nor hover, remove both classes
  //       dom.classList.remove("component-hover");
  //     }
  //   }
  // }, [dom, isHover]);

  return (
    <>
      {isHover || isActive
        ? ReactDOM.createPortal(
            <div
              ref={currentRef}
              className="px-2 py-2 text-white bg-primary fixed flex items-center h-2"
              style={{
                left: getPos(dom as HTMLElement).left,
                top: getPos(dom as HTMLElement).top,
                zIndex: 9999,
              }}
            >
              <h2 className="flex-1 mr-4">{name}</h2>
              {moveable ? (
                <Button className="mr-2 cursor-move" ref={drag}>
                  <Move />
                </Button>
              ) : null}
              {id !== ROOT_NODE && (
                <Button
                  className="mr-2 cursor-pointer"
                  onClick={() => {
                    actions.selectNode(parent || "");
                  }}
                >
                  <ArrowUp />
                </Button>
              )}
              {deletable ? (
                <Button
                  className="cursor-pointer"
                  onMouseDown={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    actions.delete(id);
                  }}
                >
                  <Delete />
                </Button>
              ) : null}
            </div>,
            document.querySelector(".page-container") as Element
          )
        : null}
      {render}
    </>
  );
};

import type { PropsWithChildren } from "react";
import React, { forwardRef } from "react";
import { useEditor, useNode } from "@craftjs/core";

const BUTTON_PATH = "@/components/button";
const CARD_PATH = "@/components/card";
const DIV_PATH = "@/components/div";

const importPathMap: { [key: string]: string } = {
  divblock: DIV_PATH,
  button: BUTTON_PATH,
  card: CARD_PATH,
  cardheader: CARD_PATH,
  cardcontent: CARD_PATH,
  cardfooter: CARD_PATH,
  cardtitle: CARD_PATH,
  carddescription: CARD_PATH,
};

/**
 * Wrap a component with Craft.js functionality.
 *
 * @param Component The component to wrap. Must be a function component.
 * @param options Options for the wrapper component.
 * @param options.draggable Whether the component can be dragged into a container.
 * @param options.droppable Whether the component can be dropped into another
 *   component.
 * @returns A new component with the same props as `Component` plus a `ref` prop.
 */
export const withNode = <T extends Record<string, unknown>>(
  Component: React.ComponentType<T>,
  {
    draggable = true,
    droppable = true,
  }: {
    draggable?: boolean;
    droppable?: boolean;
  } = {}
): React.ForwardRefExoticComponent<
  React.PropsWithoutRef<T> & React.RefAttributes<HTMLElement>
> => {
  // Wrap the returned component with forwardRef
  const WithNode = React.forwardRef<HTMLElement, PropsWithChildren<T>>(
    (props, ref) => {
      const {
        id,
        connectors: { connect, drag },
      } = useNode();

      console.log("props", props);

      const { isActive } = useEditor((_, query) => ({
        isActive: query.getEvent("selected").contains(id),
      }));

      const applyRef = (node: HTMLElement) => {
        if (node) {
          if (draggable && droppable) {
            connect(drag(node));
          } else if (droppable) {
            connect(node);
          } else if (draggable) {
            drag(node);
          }
          // Forward the ref
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }
      };

      return (
        // @ts-ignore
        <Component
          ref={applyRef}
          {...props}
          className={
            isActive
              ? `${props?.className} component-selected`
              : props?.className
          }
        >
          {typeof props.children === "string" &&
          props.children.trim() === "" ? (
            <>Empty text</>
          ) : (
            props.children || (
              <div className="text-center italic p-4 bg-yellow-100 outline-dashed outline-amber-400">
                Empty container
              </div>
            )
          )}
        </Component>
      );
    }
  );

  WithNode.displayName = `WithNode(${Component.displayName})`;

  const importPathMapKey = Component.displayName?.toLowerCase();

  // @ts-ignore
  WithNode.craft = {
    displayName: Component.displayName,
    custom: {
      importPath: importPathMapKey ? importPathMap[importPathMapKey] || "" : "",
    },
  };

  return WithNode;
};

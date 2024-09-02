import React, { HTMLAttributes } from "react";
import ContentEditable from "react-contenteditable";
import { useEditor, useNode } from "@craftjs/core";
import { SettingsControl } from "@/components/controls/SettingsControl";

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  tagName: string;
  children: string;
}

export function Text({ children, tagName, ...props }: TextProps) {
  return (
    <ContentEditable
      tagName={tagName}
      html={children}
      disabled={true}
      onChange={() => {}}
      {...props}
    />
  );
}
export function NodeText({ children, tagName, ...props }: TextProps) {
  const {
    connectors: { connect },
    actions: { setProp },
  } = useNode();
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <ContentEditable
      innerRef={connect}
      tagName={tagName}
      html={children}
      disabled={!enabled}
      onChange={(e) => {
        setProp((prop: TextProps) => {
          prop.children = e.target.value;
        }, 500);
      }}
      {...props}
    />
  );
}

// @ts-ignore
NodeText.craft = {
  ...NodeText.craft,
  displayName: "Text",
  related: {
    toolbar: SettingsControl,
  },
};

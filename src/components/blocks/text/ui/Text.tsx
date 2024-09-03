import React, { HTMLAttributes } from "react";
import ContentEditable from "react-contenteditable";
import { useEditor, useNode } from "@craftjs/core";
import { SettingsControl } from "@/components/controls";

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  tagName: string;
  children: string;
}

export function NodeText({ children, tagName, ...props }: TextProps) {
  const {
    connectors: { connect },
    actions: { setProp },
  } = useNode();
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  console.log(props);

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

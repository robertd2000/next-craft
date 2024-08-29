import { useEditor, useNode } from "@craftjs/core";
import React, { HTMLAttributes } from "react";
import ContentEditable from "react-contenteditable";

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  tagName: string;
  text: string;
}
export function NodeText({ text, tagName, ...props }: TextProps) {
  const {
    connectors: { connect },
    setProp,
  } = useNode();
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <ContentEditable
      innerRef={connect}
      tagName={tagName}
      html={text} // innerHTML of the editable div
      disabled={!enabled}
      onChange={(e) => {
        setProp((prop) => (prop.text = e.target.value), 500);
      }}
      {...props}
    />
  );
}

NodeText.craft = {
  ...NodeText.craft,
  displayName: "Text",
};

import { HTMLAttributes } from "react";
import ContentEditable from "react-contenteditable";

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

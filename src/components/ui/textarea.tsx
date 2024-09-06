import React from "react";

interface TextareaProps extends React.HTMLProps<HTMLTextAreaElement> {}

export const Textarea = (props: TextareaProps) => {

  return (
      <textarea
        {...props}
        className='border-2 border-black border-solid rounded-md p-1.5 resize-none h-40'
      />
  );
};
import { cn } from "../../lib/utils";
import { HTMLAttributes } from "react";

interface DivBlockProps extends HTMLAttributes<HTMLDivElement> {}
export function DivBlock({ className, ...props }: DivBlockProps) {
  return (
    <div
      className={cn(
        "w-full h-10 border border-zinc-800 rounded-sm align-middle leading-10",
        className
      )}
      {...props}
    ></div>
  );
}

import { useEffect, useState } from "react";
import { useNode } from "@craftjs/core";
import {
  ClassCategory,
  ParsedClasses,
  parseTailwindClass,
  parseTailwindClassesToValues,
} from "@/lib/tailwind";
import {useBreakpointContext} from "@/components/side-menu/ui/tabs/breakpoints";

export function useClassname() {
  const { breakpoint } = useBreakpointContext();
  
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
    className: node.data.props.className,
  }));

  function setClassname({
    classKey,
    value,
    category,
  }: {
    classKey?: string;
    value: string;
    category: ClassCategory;
  }) {
    const className = parseTailwindClass({
      currentClassName: props.className,
      classKey: classKey || "",
      value,
      category,
      breakpoint
    });
    
    setProp(
      (props: { className: string; settings: any }) =>
        (props.className = className),
      500
    );
  }

  const [parsedValues, setParsedValues] = useState<ParsedClasses>({});

  useEffect(() => {
    const parsed = parseTailwindClassesToValues(props?.className);
    setParsedValues(parsed);
  }, [props?.className]);

  return {
    props,
    setClassname,
    parsedValues,
  };
}

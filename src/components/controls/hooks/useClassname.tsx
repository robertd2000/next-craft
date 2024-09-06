import { useEffect, useMemo, useState } from "react";
import { useNode } from "@craftjs/core";
import {
  ClassCategory,
  ParsedClasses,
  parseTailwindClass,
  parseTailwindClassesToValues,
} from "@/lib/tailwind";

export function useClassname() {
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

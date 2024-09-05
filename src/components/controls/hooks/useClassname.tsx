import { ClassCategory, parseTailwindClass } from "@/lib/tailwind";
import { useNode } from "@craftjs/core";

export function useClassname() {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
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
    const className = parseTailwindClass(
      props.className,
      classKey || "",
      value,
      category
    ); // classKey ? ` ${classKey}-[${value}]` : ` ${value}`;
    console.log("className", className);

    setProp(
      (props: { className: string; settings: any }) =>
        (props.className = className),
      500
    );
  }

  return {
    props,
    setClassname,
  };
}

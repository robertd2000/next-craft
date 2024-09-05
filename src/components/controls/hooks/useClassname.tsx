import { useNode } from "@craftjs/core";
import { ClassCategory, parseTailwindClass } from "@/lib/tailwind";

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

  return {
    props,
    setClassname,
  };
}

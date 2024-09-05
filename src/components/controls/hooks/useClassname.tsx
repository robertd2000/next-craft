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
  }: {
    classKey?: string;
    value: string;
  }) {
    const className = classKey ? ` ${classKey}-[${value}]` : ` ${value}`;

    setProp(
      (props: { className: string }) =>
        (props.className = props.className + className),
      500
    );
  }

  return {
    props,
    setClassname,
  };
}

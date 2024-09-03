import { Label } from "@/components/ui/label";
import { useNode } from "@craftjs/core";
import { HexColorPicker } from "react-colorful";

export function Backgrounds() {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <div
      className="border-b border-b-
    1 mt-2"
    >
      <h2 className="font-bold">Backgrounds</h2>

      <Label htmlFor="backgroundColor">Color</Label>
      <HexColorPicker
        id="backgroundColor"
        color={props.style?.backgroundColor}
        onChange={(color) => {
          setProp(
            (props: { style: { backgroundColor: string } }) =>
              (props.style = { ...props.style, backgroundColor: color }),
            500
          );
        }}
      />
    </div>
  );
}

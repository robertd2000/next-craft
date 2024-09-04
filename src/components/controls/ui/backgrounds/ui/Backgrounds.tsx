import { useNode } from "@craftjs/core";
import { HexColorPicker } from "react-colorful";
import { Label } from "@/components/ui/label";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Backgrounds() {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <AccordionItem value="Backgrounds">
      <AccordionTrigger>Backgrounds</AccordionTrigger>

      <AccordionContent>
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
      </AccordionContent>
    </AccordionItem>
  );
}

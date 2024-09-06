import { HexColorPicker } from "react-colorful";
import { Label } from "@/components/ui/label";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useClassname } from "@/components/controls/hooks/useClassname";

export function Backgrounds() {
  const { parsedValues, setClassname } = useClassname();

  return (
    <AccordionItem value="Backgrounds">
      <AccordionTrigger>Backgrounds</AccordionTrigger>

      <AccordionContent>
        <Label htmlFor="backgroundColor">Color</Label>
        <HexColorPicker
          id="backgroundColor"
          color={parsedValues?.["backgroundColor"]}
          onChange={(color) => {
            setClassname({
              classKey: "bg",
              value: color,
              category: "backgroundColor",
            });
          }}
        />
      </AccordionContent>
    </AccordionItem>
  );
}

import { Label } from "@/components/ui/label";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { InputMeasure } from "../../input-measure";

export function Size() {
  return (
    <AccordionItem value="Size">
      <AccordionTrigger>Size</AccordionTrigger>

      <AccordionContent>
        <div className="grid grid-cols-2 gap-2 mt-4 mb-4">
          <div>
            <Label htmlFor="w">Width</Label>
            <InputMeasure classKey="w" />
          </div>

          <div>
            <Label htmlFor="h">Height</Label>
            <InputMeasure classKey="h" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4 mb-4">
          <div>
            <Label htmlFor="min-w">Min Width</Label>
            <InputMeasure classKey="min-w" />
          </div>

          <div>
            <Label htmlFor="min-h">Min Height</Label>
            <InputMeasure classKey="min-h" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4 mb-4">
          <div>
            <Label htmlFor="max-w">Max Width</Label>
            <InputMeasure classKey="max-w" />
          </div>

          <div>
            <Label htmlFor="max-h">Max Height</Label>
            <InputMeasure classKey="max-h" />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

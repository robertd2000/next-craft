import { Label } from "@/components/ui/label";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { InputMeasure } from "../../input-measure";

export function Space() {
  return (
    <AccordionItem value="Space">
      <AccordionTrigger>Space</AccordionTrigger>

      <AccordionContent>
        <h2 className="font-bold">Margin</h2>

        <div className="grid grid-cols-2 gap-2 mt-4 mb-4">
          <div>
            <Label htmlFor="mt">Margin Top</Label>
            <InputMeasure classKey="mt" category="marginTop" />
          </div>

          <div>
            <Label htmlFor="mb">Margin Bottom</Label>
            <InputMeasure classKey="mb" category="marginBottom" />
          </div>

          <div>
            <Label htmlFor="marginLeft">Margin Left</Label>
            <InputMeasure classKey="ml" category="marginLeft" />
          </div>

          <div>
            <Label htmlFor="marginRight">Margin Right</Label>
            <InputMeasure classKey="mr" category="marginRight" />
          </div>
        </div>

        <h2 className="font-bold">Padding</h2>

        <div className="grid grid-cols-2 gap-2 mt-4 mb-4">
          <div>
            <Label htmlFor="pt">Padding Top</Label>
            <InputMeasure classKey="pt" category="padding" />
          </div>

          <div>
            <Label htmlFor="paddingBottom">Padding Bottom</Label>
            <InputMeasure classKey="pb" category="padding" />
          </div>

          <div>
            <Label htmlFor="paddingLeft">Padding Left</Label>
            <InputMeasure classKey="pl" category="padding" />
          </div>

          <div>
            <Label htmlFor="paddingRight">Padding Right</Label>
            <InputMeasure classKey="pr" category="padding" />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

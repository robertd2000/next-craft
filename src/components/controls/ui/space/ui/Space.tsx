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
            <InputMeasure classKey="mt" />
          </div>

          <div>
            <Label htmlFor="mb">Margin Bottom</Label>
            <InputMeasure classKey="mb" />
          </div>

          <div>
            <Label htmlFor="marginLeft">Margin Left</Label>
            <InputMeasure classKey="ml" />
          </div>

          <div>
            <Label htmlFor="marginRight">Margin Right</Label>
            <InputMeasure classKey="mr" />
          </div>
        </div>

        <h2 className="font-bold">Padding</h2>

        <div className="grid grid-cols-2 gap-2 mt-4 mb-4">
          <div>
            <Label htmlFor="pt">Padding Top</Label>
            <InputMeasure classKey="pt" />
          </div>

          <div>
            <Label htmlFor="paddingBottom">Padding Bottom</Label>
            <InputMeasure classKey="pb" />
          </div>

          <div>
            <Label htmlFor="paddingLeft">Padding Left</Label>
            <InputMeasure classKey="pl" />
          </div>

          <div>
            <Label htmlFor="paddingRight">Padding Right</Label>
            <InputMeasure classKey="pr" />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

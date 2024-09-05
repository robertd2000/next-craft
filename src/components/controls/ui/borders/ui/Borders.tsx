import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Minus, Ellipsis, ChevronsLeftRightEllipsis } from "lucide-react";
import { HexColorPicker } from "react-colorful";
import { InputMeasure } from "../../input-measure";
import { useClassname } from "@/components/controls/hooks/useClassname";

export function Borders() {
  const { props, setClassname } = useClassname();

  return (
    <AccordionItem value="Borders">
      <AccordionTrigger>Borders</AccordionTrigger>

      <AccordionContent>
        <div className="flex flex-wrap justify-between items-center">
          <div>
            <Label htmlFor="borderStyle">Style</Label>
          </div>
          <Tabs
            defaultValue="start"
            value={props.style?.borderStyle}
            onValueChange={(value) => {
              setClassname({
                value,
              });
            }}
          >
            <TabsList>
              <TabsTrigger value="border-none">
                <X />
              </TabsTrigger>
              <TabsTrigger value="border-solid">
                <Minus />
              </TabsTrigger>
              <TabsTrigger value="border-dashed">
                <ChevronsLeftRightEllipsis />
              </TabsTrigger>
              <TabsTrigger value="border-dotted">
                <Ellipsis />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex flex-wrap justify-between items-center mt-4">
          <Label htmlFor="borderColor">Color</Label>
          <HexColorPicker
            id="borderColor"
            color={props.className?.borderColor}
            onChange={(color) => {
              setClassname({
                value: color,
                classKey: "border",
              });
              // setProp(
              //   (props: { style: { borderColor: string } }) =>
              //     (props.style = { ...props.style, borderColor: color }),
              //   500
              // );
            }}
          />
        </div>

        <div className="mt-4">
          <h2 className="font-bold">Width</h2>

          <div className="grid grid-cols-2 gap-2 mt-4 mb-4">
            <div>
              <Label htmlFor="border-t">Top</Label>
              <InputMeasure classKey="border-t" />
            </div>

            <div>
              <Label htmlFor="border-b">Bottom</Label>
              <InputMeasure classKey="border-b" />
            </div>

            <div>
              <Label htmlFor="border-l">Left</Label>
              <InputMeasure classKey="border-l" />
            </div>

            <div>
              <Label htmlFor="border-r">Right</Label>
              <InputMeasure classKey="border-r" />
            </div>
          </div>

          <h2 className="font-bold">Radius</h2>

          <div className="grid grid-cols-2 gap-2 mt-4 mb-4">
            <div>
              <Label htmlFor="rounded-tl">Top Left</Label>
              <InputMeasure classKey="rounded-tl" />
            </div>

            <div>
              <Label htmlFor="rounded-tr">Top Right</Label>
              <InputMeasure classKey="rounded-tr" />
            </div>

            <div>
              <Label htmlFor="rounded-bl">Bottom Left</Label>
              <InputMeasure classKey="rounded-bl" />
            </div>

            <div>
              <Label htmlFor="rounded-br">Bottom Right</Label>
              <InputMeasure classKey="rounded-br" />
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

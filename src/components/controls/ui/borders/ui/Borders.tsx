import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNode } from "@craftjs/core";
import { X, Minus, Ellipsis, ChevronsLeftRightEllipsis } from "lucide-react";
import { HexColorPicker } from "react-colorful";
import { InputMeasure } from "../../input-measure";

export function Borders() {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

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
            onValueChange={(e) => {
              setProp(
                (props: { style: { borderStyle: string } }) =>
                  (props.style = {
                    ...props.style,
                    borderStyle: e,
                  })
              );
            }}
          >
            <TabsList>
              <TabsTrigger value="none">
                <X />
              </TabsTrigger>
              <TabsTrigger value="solid">
                <Minus />
              </TabsTrigger>
              <TabsTrigger value="dashed">
                <ChevronsLeftRightEllipsis />
              </TabsTrigger>
              <TabsTrigger value="dotted">
                <Ellipsis />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex flex-wrap justify-between items-center mt-4">
          <Label htmlFor="borderColor">Color</Label>
          <HexColorPicker
            id="borderColor"
            color={props.style?.borderColor}
            onChange={(color) => {
              setProp(
                (props: { style: { borderColor: string } }) =>
                  (props.style = { ...props.style, borderColor: color }),
                500
              );
            }}
          />
        </div>

        <div className="mt-4">
          <h2 className="font-bold">Width</h2>

          <div className="grid grid-cols-2 gap-2 mt-4 mb-4">
            <div>
              <Label htmlFor="borderTopWidth">Top</Label>
              <InputMeasure
                id="borderTopWidth"
                value={props.style?.borderTopWidth}
                setProp={setProp}
                propName="borderTopWidth"
              />
            </div>

            <div>
              <Label htmlFor="borderBottomWidth">Bottom</Label>

              <InputMeasure
                id="borderBottomWidth"
                value={props.style?.borderBottomWidth}
                setProp={setProp}
                propName="borderBottomWidth"
              />
            </div>

            <div>
              <Label htmlFor="borderLeftWidth">Left</Label>
              <InputMeasure
                id="borderLeftWidth"
                value={props.style?.borderLeftWidth}
                setProp={setProp}
                propName="borderLeftWidth"
              />
            </div>

            <div>
              <Label htmlFor="borderRightWidth">Right</Label>
              <InputMeasure
                id="borderRightWidth"
                value={props.style?.borderRightWidth}
                setProp={setProp}
                propName="borderRightWidth"
              />
            </div>
          </div>

          <h2 className="font-bold">Radius</h2>

          <div className="grid grid-cols-2 gap-2 mt-4 mb-4">
            <div>
              <Label htmlFor="borderTopLeftRadius">Top Left</Label>
              <InputMeasure
                id="borderTopLeftRadius"
                value={props.style?.borderTopLeftRadius}
                setProp={setProp}
                propName="borderTopLeftRadius"
              />
            </div>

            <div>
              <Label htmlFor="borderTopRightRadius">Top Right</Label>
              <InputMeasure
                id="borderTopRightRadius"
                value={props.style?.borderTopRightRadius}
                setProp={setProp}
                propName="borderTopRightRadius"
              />
            </div>

            <div>
              <Label htmlFor="borderBottomLeftRadius">Bottom Left</Label>
              <InputMeasure
                id="borderBottomLeftRadius"
                value={props.style?.borderBottomLeftRadius}
                setProp={setProp}
                propName="borderBottomLeftRadius"
              />
            </div>

            <div>
              <Label htmlFor="borderBottomRightRadius">Bottom Right</Label>
              <InputMeasure
                id="borderBottomRightRadius"
                value={props.style?.borderBottomRightRadius}
                setProp={setProp}
                propName="borderBottomRightRadius"
              />
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

import { useNode } from "@craftjs/core";
import { Label } from "@/components/ui/label";
import { InputMeasure } from "../../input-measure";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Space() {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <AccordionItem value="Space">
      <AccordionTrigger>Space</AccordionTrigger>

      <AccordionContent>
        <h2 className="font-bold">Margin</h2>

        <div className="grid grid-cols-2 gap-2 mt-4 mb-4">
          <div>
            <Label htmlFor="marginTop">Margin Top</Label>
            <InputMeasure
              id="marginTop"
              value={props.style?.marginTop}
              setProp={setProp}
              propName="marginTop"
            />
          </div>

          <div>
            <Label htmlFor="marginBottom">Margin Bottom</Label>

            <InputMeasure
              id="marginBottom"
              value={props.style?.marginBottom}
              setProp={setProp}
              propName="marginBottom"
            />
          </div>

          <div>
            <Label htmlFor="marginLeft">Margin Left</Label>
            <InputMeasure
              id="marginLeft"
              value={props.style?.marginLeft}
              setProp={setProp}
              propName="marginLeft"
            />
          </div>

          <div>
            <Label htmlFor="marginRight">Margin Right</Label>
            <InputMeasure
              id="marginRight"
              value={props.style?.marginRight}
              setProp={setProp}
              propName="marginRight"
            />
          </div>
        </div>

        <h2 className="font-bold">Padding</h2>

        <div className="grid grid-cols-2 gap-2 mt-4 mb-4">
          <div>
            <Label htmlFor="paddingTop">Padding Top</Label>
            <InputMeasure
              id="paddingTop"
              value={props.style?.paddingTop}
              setProp={setProp}
              propName="paddingTop"
            />
          </div>

          <div>
            <Label htmlFor="paddingBottom">Padding Bottom</Label>
            <InputMeasure
              id="paddingBottom"
              value={props.style?.paddingBottom}
              setProp={setProp}
              propName="paddingBottom"
            />
          </div>

          <div>
            <Label htmlFor="paddingLeft">Padding Left</Label>
            <InputMeasure
              id="paddingLeft"
              value={props.style?.paddingLeft}
              setProp={setProp}
              propName="paddingLeft"
            />
          </div>

          <div>
            <Label htmlFor="paddingRight">Padding Right</Label>
            <InputMeasure
              id="paddingRight"
              value={props.style?.paddingRight}
              setProp={setProp}
              propName="paddingRight"
            />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

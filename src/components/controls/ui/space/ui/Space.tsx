import { Label } from "@/components/ui/label";
import { useNode } from "@craftjs/core";
import { InputMeasure } from "../../input-measure";

export function Space() {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <div className="border-b border-b-1 mt-2">
      <h2 className="font-bold border-b-1 mt-2">Space</h2>
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
          <Input
            id="marginBottom"
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
          <Input
            id="paddingBottom"
            value={props.style?.paddingBotton}
            onChange={(e) => {
              setProp(
                (props: { style: { paddingBottom: string } }) =>
                  (props.style = {
                    ...props.style,
                    paddingBottom: e.target.value,
                  }),
                500
              );
            }}
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
    </div>
  );
}

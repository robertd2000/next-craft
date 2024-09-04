import { useNode } from "@craftjs/core";
import { Label } from "@/components/ui/label";
import { InputMeasure } from "../../input-measure";

export function Size() {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <div className="border-b border-b-1 mt-2">
      <h2 className="font-bold">Size</h2>

      <div className="grid grid-cols-2 gap-2 mt-4 mb-4">
        <div>
          <Label htmlFor="width">Width</Label>
          <InputMeasure
            id="width"
            value={props.style?.width}
            setProp={setProp}
            propName="width"
          />
        </div>

        <div>
          <Label htmlFor="height">Height</Label>
          <InputMeasure
            id="height"
            value={props.style?.height}
            setProp={setProp}
            propName="height"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4 mb-4">
        <div>
          <Label htmlFor="minWidth">Min Width</Label>
          <InputMeasure
            id="minWidth"
            value={props.style?.minWidth}
            setProp={setProp}
            propName="minWidth"
          />
        </div>

        <div>
          <Label htmlFor="minHeight">Min Height</Label>
          <InputMeasure
            id="minHeight"
            value={props.style?.minHeight}
            setProp={setProp}
            propName="minHeight"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4 mb-4">
        <div>
          <Label htmlFor="maxWidth">Max Width</Label>
          <InputMeasure
            id="maxWidth"
            value={props.style?.maxWidth}
            setProp={setProp}
            propName="maxWidth"
          />
        </div>

        <div>
          <Label htmlFor="maxHeight">Max Height</Label>
          <InputMeasure
            id="maxHeight"
            value={props.style?.maxHeight}
            setProp={setProp}
            propName="maxHeight"
          />
        </div>
      </div>
    </div>
  );
}

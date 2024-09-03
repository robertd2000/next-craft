import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNode } from "@craftjs/core";

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
          <Input
            id="width"
            value={props.style?.width}
            onChange={(e) => {
              setProp(
                (props: { style: { width: string } }) =>
                  (props.style = { ...props.style, width: e.target.value }),
                500
              );
            }}
          />
        </div>

        <div>
          <Label htmlFor="height">Height</Label>
          <Input
            id="height"
            value={props.style?.height}
            onChange={(e) => {
              setProp(
                (props: { style: { height: string } }) =>
                  (props.style = { ...props.style, height: e.target.value }),
                500
              );
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4 mb-4">
        <div>
          <Label htmlFor="min-width">Min Width</Label>
          <Input
            id="min-width"
            value={props.style?.minWidth}
            onChange={(e) => {
              setProp(
                (props: { style: { minWidth: string } }) =>
                  (props.style = { ...props.style, minWidth: e.target.value }),
                500
              );
            }}
          />
        </div>

        <div>
          <Label htmlFor="min-height">Min Height</Label>
          <Input
            id="min-height"
            value={props.style?.minHeight}
            onChange={(e) => {
              setProp(
                (props: { style: { minHeight: string } }) =>
                  (props.style = { ...props.style, minHeight: e.target.value }),
                500
              );
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4 mb-4">
        <div>
          <Label htmlFor="max-width">Max Width</Label>
          <Input
            id="max-width"
            value={props.style?.maxWidth}
            onChange={(e) => {
              setProp(
                (props: { style: { maxWidth: string } }) =>
                  (props.style = { ...props.style, maxWidth: e.target.value }),
                500
              );
            }}
          />
        </div>

        <div>
          <Label htmlFor="max-height">Max Height</Label>
          <Input
            id="max-height"
            value={props.style?.maxHeight}
            onChange={(e) => {
              setProp(
                (props: { style: { maxHeight: string } }) =>
                  (props.style = { ...props.style, maxHeight: e.target.value }),
                500
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}

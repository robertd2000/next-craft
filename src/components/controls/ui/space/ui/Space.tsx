import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNode } from "@craftjs/core";

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
          <Input
            id="marginTop"
            value={props.style?.marginTop}
            onChange={(e) => {
              setProp(
                (props: { style: { marginTop: string } }) =>
                  (props.style = { ...props.style, marginTop: e.target.value }),
                500
              );
            }}
          />
        </div>

        <div>
          <Label htmlFor="marginBotton">Margin Bottom</Label>
          <Input
            id="marginBotton"
            value={props.style?.marginBotton}
            onChange={(e) => {
              setProp(
                (props: { style: { marginBotton: string } }) =>
                  (props.style = {
                    ...props.style,
                    marginBotton: e.target.value,
                  }),
                500
              );
            }}
          />
        </div>

        <div>
          <Label htmlFor="marginLeft">Margin Left</Label>
          <Input
            id="marginLeft"
            value={props.style?.marginLeft}
            onChange={(e) => {
              setProp(
                (props: { style: { marginLeft: string } }) =>
                  (props.style = {
                    ...props.style,
                    marginLeft: e.target.value,
                  }),
                500
              );
            }}
          />
        </div>

        <div>
          <Label htmlFor="marginRight">Margin Right</Label>
          <Input
            id="marginRight"
            value={props.style?.marginRight}
            onChange={(e) => {
              setProp(
                (props: { style: { marginRight: string } }) =>
                  (props.style = {
                    ...props.style,
                    marginRight: e.target.value,
                  }),
                500
              );
            }}
          />
        </div>
      </div>

      <h2 className="font-bold">Padding</h2>

      <div className="grid grid-cols-2 gap-2 mt-4 mb-4">
        <div>
          <Label htmlFor="paddingTop">Padding Top</Label>
          <Input
            id="paddingTop"
            value={props.style?.paddingTop}
            onChange={(e) => {
              setProp(
                (props: { style: { paddingTop: string } }) =>
                  (props.style = {
                    ...props.style,
                    paddingTop: e.target.value,
                  }),
                500
              );
            }}
          />
        </div>

        <div>
          <Label htmlFor="paddingBotton">Padding Bottom</Label>
          <Input
            id="paddingBotton"
            value={props.style?.paddingBotton}
            onChange={(e) => {
              setProp(
                (props: { style: { paddingBotton: string } }) =>
                  (props.style = {
                    ...props.style,
                    paddingBotton: e.target.value,
                  }),
                500
              );
            }}
          />
        </div>

        <div>
          <Label htmlFor="paddingLeft">Padding Left</Label>
          <Input
            id="paddingLeft"
            value={props.style?.paddingLeft}
            onChange={(e) => {
              setProp(
                (props: { style: { paddingLeft: string } }) =>
                  (props.style = {
                    ...props.style,
                    paddingLeft: e.target.value,
                  }),
                500
              );
            }}
          />
        </div>

        <div>
          <Label htmlFor="paddingRight">Padding Right</Label>
          <Input
            id="paddingRight"
            value={props.style?.paddingRight}
            onChange={(e) => {
              setProp(
                (props: { style: { paddingRight: string } }) =>
                  (props.style = {
                    ...props.style,
                    paddingRight: e.target.value,
                  }),
                500
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}

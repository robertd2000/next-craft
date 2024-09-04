import { useNode } from "@craftjs/core";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Position() {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <div className="border-b border-b-1 mt-2">
      <h2 className="font-bold">Position</h2>

      <div className="flex gap-2 items-center mt-2 mb-2">
        <Label htmlFor="position">Position</Label>
        <Select
          value={props.style?.position}
          defaultValue="static"
          onValueChange={(e) => {
            setProp(
              (props: { style: { position: string } }) =>
                (props.style = { ...props.style, position: e }),
              500
            );
          }}
        >
          <SelectTrigger className="w-full" id="position">
            <SelectValue placeholder="Select a position" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Position</SelectLabel>
              <SelectItem value="static">static</SelectItem>
              <SelectItem value="relative">relative</SelectItem>
              <SelectItem value="absolute">absolute</SelectItem>
              <SelectItem value="sticky">sticky</SelectItem>
              <SelectItem value="fixed">fixed</SelectItem>
              <SelectItem value="inherit">inherit</SelectItem>
              <SelectItem value="revert">revert</SelectItem>
              <SelectItem value="revert-layer">revert-layer</SelectItem>
              <SelectItem value="unset">unset</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

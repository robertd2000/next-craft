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
import { useNode } from "@craftjs/core";

export function Display() {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <div className="border-b border-b-1 mt-2">
      <h2 className="font-bold">Layout</h2>

      <div className="flex gap-2 items-center mt-2 mb-2">
        <Label htmlFor="display">Display</Label>
        <Select
          value={props.style?.display}
          onValueChange={(e) => {
            setProp(
              (props: { style: { display: string } }) =>
                (props.style = { ...props.style, display: e }),
              500
            );
          }}
        >
          <SelectTrigger className="w-full" id="display">
            <SelectValue placeholder="Select a display" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Display</SelectLabel>
              <SelectItem value="flex">Flex</SelectItem>
              <SelectItem value="block">Block</SelectItem>
              <SelectItem value="grid">Grid</SelectItem>
              <SelectItem value="none">None</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

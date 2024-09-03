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

export function Typography() {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <div
      className="border-b border-b-
    1 mt-2"
    >
      <h2 className="font-bold">Typography</h2>

      <div className="flex gap-2 items-center mt-2 mb-2">
        <Label htmlFor="display">Weight</Label>
        <Select
          value={props.style?.weight}
          onValueChange={(e) => {
            setProp(
              (props: { style: { fontWeight: string } }) =>
                (props.style = { ...props.style, fontWeight: e }),
              500
            );
          }}
        >
          <SelectTrigger className="w-full" id="weight">
            <SelectValue placeholder="Select a Weight" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Weight</SelectLabel>
              <SelectItem value="100">100 - Thin</SelectItem>
              <SelectItem value="200">200 - Extra Light</SelectItem>
              <SelectItem value="300">300 - Light</SelectItem>
              <SelectItem value="400">400 - Normal</SelectItem>
              <SelectItem value="500">500 - Medium</SelectItem>
              <SelectItem value="600">600 - Semi Bold</SelectItem>
              <SelectItem value="700">700 - Bold</SelectItem>
              <SelectItem value="800">800 - Extra Bold</SelectItem>
              <SelectItem value="900">900 - Black</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

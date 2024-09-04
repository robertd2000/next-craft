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
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Display() {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <AccordionItem value="Display">
      <AccordionTrigger>Layout</AccordionTrigger>

      <AccordionContent>
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
      </AccordionContent>
    </AccordionItem>
  );
}

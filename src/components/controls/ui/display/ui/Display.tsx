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
import { useClassname } from "@/components/controls/hooks/useClassname";

export function Display() {
  const { parsedValues, setClassname } = useClassname();

  return (
    <AccordionItem value="Display">
      <AccordionTrigger>Layout</AccordionTrigger>

      <AccordionContent>
        <div className="flex gap-2 items-center mt-2 mb-2">
          <Label htmlFor="display">Display</Label>
          <Select
            value={parsedValues?.["display"]}
            onValueChange={(value) => {
              setClassname({ value, category: "display" });
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
                <SelectItem value="hidden">None</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

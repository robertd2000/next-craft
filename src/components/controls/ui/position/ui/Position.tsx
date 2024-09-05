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

export function Position() {
  const { props, setClassname } = useClassname();

  return (
    <AccordionItem value="Position">
      <AccordionTrigger>Position</AccordionTrigger>

      <AccordionContent>
        <div className="flex gap-2 items-center mt-2 mb-2">
          <Label htmlFor="position">Position</Label>
          <Select
            value={props.style?.position}
            defaultValue="static"
            onValueChange={(value) => {
              setClassname({ value, category: "position" });
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
      </AccordionContent>
    </AccordionItem>
  );
}

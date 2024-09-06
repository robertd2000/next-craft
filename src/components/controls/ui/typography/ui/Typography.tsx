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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Italic,
  Strikethrough,
  Underline,
  X,
} from "lucide-react";
import { HexColorPicker } from "react-colorful";
import { InputMeasure } from "../../input-measure";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useClassname } from "@/components/controls/hooks/useClassname";

export function Typography() {
  const { parsedValues, setClassname } = useClassname();

  return (
    <AccordionItem value="Typography">
      <AccordionTrigger>Typography</AccordionTrigger>

      <AccordionContent>
        <div className="flex gap-2 items-center mt-2 mb-2">
          <Label htmlFor="display">Weight</Label>
          <Select
            value={parsedValues?.["fontWeight"]}
            onValueChange={(value) => {
              setClassname({
                classKey: "font",
                value,
                category: "fontWeight",
              });
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

        <div>
          <Label htmlFor="color">Color</Label>
          <HexColorPicker
            id="color"
            color={parsedValues?.["textColor"]}
            onChange={(color) => {
              setClassname({
                classKey: "text",
                value: color,
                category: "textColor",
              });
            }}
          />
        </div>

        <div className="flex gap-2 items-center mt-2">
          <div className="w-[33%]">
            <Label htmlFor="text">Size</Label>
            <InputMeasure classKey="text" category="fontSize" />
          </div>

          <div className="w-[33%]">
            <Label htmlFor="leading">Height</Label>
            <InputMeasure classKey="leading" category="lineHeight" />
          </div>

          <div className="w-[33%]">
            <Label htmlFor="tracking">Spacing</Label>
            <InputMeasure classKey="tracking" category="letterSpacing" />
          </div>
        </div>

        <div className="mt-2 flex gap-2">
          <Tabs
            defaultValue="start"
            value={parsedValues?.["textAlign"]}
            onValueChange={(value) => {
              setClassname({
                classKey: "text",
                value,
                category: "textAlign",
              });
            }}
          >
            <TabsList>
              <TabsTrigger value="start">
                <AlignLeft />
              </TabsTrigger>
              <TabsTrigger value="end">
                <AlignRight />
              </TabsTrigger>
              <TabsTrigger value="center">
                <AlignCenter />
              </TabsTrigger>
              <TabsTrigger value="justify">
                <AlignJustify />
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Tabs
            defaultValue="none"
            value={parsedValues?.["textDecoration"]}
            onValueChange={(value) => {
              setClassname({
                value,
                category: "textDecoration",
              });
            }}
          >
            <TabsList>
              <TabsTrigger value="none">
                <X />
              </TabsTrigger>
              <TabsTrigger value="underline">
                <Underline />
              </TabsTrigger>
              <TabsTrigger value="line-through">
                <Strikethrough />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="mt-2 flex gap-2">
          <Tabs
            defaultValue="none"
            value={parsedValues?.["textTransform"]}
            onValueChange={(value) => {
              setClassname({
                value,
                category: "textTransform",
              });
            }}
          >
            <TabsList>
              <TabsTrigger value="none">
                <h2 className="text-lg">X</h2>
              </TabsTrigger>
              <TabsTrigger value="uppercase">
                <h2 className="text-lg">AA</h2>
              </TabsTrigger>
              <TabsTrigger value="capitalize">
                <h2 className="text-lg">Aa</h2>
              </TabsTrigger>
              <TabsTrigger value="lowercase">
                <h2 className="text-lg">aa</h2>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Tabs
            defaultValue="normal"
            value={parsedValues?.["fontStyle"]}
            onValueChange={(value) => {
              setClassname({
                value,
                category: "fontStyle",
              });
            }}
          >
            <TabsList>
              <TabsTrigger value="normal">
                <X />
              </TabsTrigger>
              <TabsTrigger value="italic">
                <Italic />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

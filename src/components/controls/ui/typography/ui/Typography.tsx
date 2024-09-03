import { Input } from "@/components/ui/input";
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
import { useNode } from "@craftjs/core";
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

export function Typography() {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <div className="border-b border-b-1 mt-2 pb-2">
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

      <div>
        <Label htmlFor="color">Color</Label>
        <HexColorPicker
          id="color"
          color={props.style?.color}
          onChange={(color) => {
            console.log(color);

            setProp(
              (props: { style: { color: string } }) =>
                (props.style = { ...props.style, color: color }),
              500
            );
          }}
        />
      </div>

      <div className="flex gap-2 items-center mt-2">
        <div className="w-[33%]">
          <Label htmlFor="size">Size</Label>
          <Input
            id="size"
            value={props.style?.fontSize}
            onChange={(e) => {
              setProp(
                (props: { style: { fontSize: string } }) =>
                  (props.style = { ...props.style, fontSize: e.target.value }),
                500
              );
            }}
          />
        </div>

        <div className="w-[33%]">
          <Label htmlFor="height">Height</Label>
          <Input
            id="height"
            value={props.style?.lineHeight}
            onChange={(e) => {
              setProp(
                (props: { style: { lineHeight: string } }) =>
                  (props.style = {
                    ...props.style,
                    lineHeight: e.target.value,
                  }),
                500
              );
            }}
          />
        </div>

        <div className="w-[33%]">
          <Label htmlFor="spacing">Spacing</Label>
          <Input
            id="spacing"
            value={props.style?.lineHeight}
            onChange={(e) => {
              setProp(
                (props: { style: { letterSpacing: string } }) =>
                  (props.style = {
                    ...props.style,
                    letterSpacing: e.target.value,
                  }),
                500
              );
            }}
          />
        </div>
      </div>

      <div className="mt-2 flex gap-2">
        <Tabs
          defaultValue="start"
          value={props.style?.textAlign}
          onValueChange={(e) => {
            setProp(
              (props: { style: { textAlign: string } }) =>
                (props.style = {
                  ...props.style,
                  textAlign: e,
                })
            );
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
          value={props.style?.textDecorationLine}
          onValueChange={(e) => {
            setProp(
              (props: { style: { textDecorationLine: string } }) =>
                (props.style = {
                  ...props.style,
                  textDecorationLine: e,
                })
            );
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
          value={props.style?.textTransform}
          onValueChange={(e) => {
            setProp(
              (props: { style: { textTransform: string } }) =>
                (props.style = {
                  ...props.style,
                  textTransform: e,
                })
            );
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
          defaultValue="none"
          value={props.style?.fontStyle}
          onValueChange={(e) => {
            setProp(
              (props: { style: { fontStyle: string } }) =>
                (props.style = {
                  ...props.style,
                  fontStyle: e,
                })
            );
          }}
        >
          <TabsList>
            <TabsTrigger value="none">
              <X />
            </TabsTrigger>
            <TabsTrigger value="italic">
              <Italic />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}

import React from "react";
import { Input } from "../../../ui/input";
import { Slider } from "../../../ui/slider";
import { RadioGroup, RadioGroupItem } from "../../../ui/radio-group";
import { Select } from "../../../ui/select";
import { useNode } from "@craftjs/core";
export type ToolbarItemProps = {
  prefix?: string;
  label?: string;
  full?: boolean;
  propKey?: string;
  index?: number;
  children?: React.ReactNode;
  type: string;
  onChange?: (value: any) => any;
};

export function ToolbarItem({
  full = false,
  propKey,
  type,
  onChange,
  index,
  ...props
}: ToolbarItemProps) {
  const {
    actions: { setProp },
    propValue,
  } = useNode((node) => ({
    propValue: node.data.props[propKey as string],
  }));
  const value = Array.isArray(propValue)
    ? propValue[index as number]
    : propValue;

  return (
    <div>
      <div className="mb-2">
        {["text", "color", "bg", "number"].includes(type) ? (
          <Input
            {...props}
            type={type}
            value={value}
            onChange={(value) => {
              setProp((props: any) => {
                if (Array.isArray(propValue)) {
                  props[propKey as string][index as number] = onChange
                    ? onChange(value)
                    : value;
                } else {
                  props[propKey as string] = onChange ? onChange(value) : value;
                }
              }, 500);
            }}
          />
        ) : type === "slider" ? (
          <>
            {props.label ? (
              <h4 className="text-sm text-light-gray-2">{props.label}</h4>
            ) : null}
            <Slider
              value={parseInt(value) || 0}
              onChange={
                ((_: any, value: number) => {
                  setProp((props: any) => {
                    if (Array.isArray(propValue)) {
                      props[propKey as string][index as number] = onChange
                        ? onChange(value)
                        : value;
                    } else {
                      props[propKey as string] = onChange
                        ? onChange(value)
                        : value;
                    }
                  }, 1000);
                }) as any
              }
            />
          </>
        ) : type === "radio" ? (
          <>
            {props.label ? (
              <h4 className="text-sm text-light-gray-2">{props.label}</h4>
            ) : null}
            <RadioGroup
              value={value || 0}
              onValueChange={(e) => {
                const value = e;
                setProp((props: any) => {
                  props[propKey as string] = onChange ? onChange(value) : value;
                });
              }}
            >
              {props.children}
            </RadioGroup>
          </>
        ) : null}
      </div>
    </div>
  );
}

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";

type Measurement =
  | "px"
  | "%"
  | "em"
  | "rem"
  | "svw"
  | "svh"
  | "lvh"
  | "lvw"
  | "ch";

const measurementOptions: Measurement[] = [
  "px",
  "%",
  "em",
  "rem",
  "svw",
  "svh",
  "lvh",
  "lvw",
  "ch",
];

interface InputMeasureProps {
  value: string;
  defaultMeasurement?: Measurement;
  id: string;
  propName: string;
  setProp: (cb: any, throttleRate?: number) => void;
}
export function InputMeasure({
  value,
  defaultMeasurement = "px",
  propName,
  id,
  setProp,
}: InputMeasureProps) {
  const [measurement, setMeasurement] =
    useState<Measurement>(defaultMeasurement);
  const [inputValue, setValue] = useState<string>(
    value ? parseFloat(value).toString() : ""
  );

  useEffect(() => {
    setProp(
      (props: { style: { propName: string } }) =>
        (props.style = {
          ...props.style,
          [propName]: parseFloat(inputValue) + measurement,
        }),
      500
    );
  }, [inputValue, measurement]);

  return (
    <div className="flex justify-between rounded-md border border-input">
      <Input
        id={id}
        value={inputValue}
        className="border-none"
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <Select
        value={measurement}
        onValueChange={(e: Measurement) => setMeasurement(e)}
      >
        <SelectTrigger className="w-[70px] border-none">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {measurementOptions.map((i) => (
              <SelectItem value={i}>{i}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

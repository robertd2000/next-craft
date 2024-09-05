import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useClassname } from "@/components/controls/hooks/useClassname";
import { ClassCategory, parseTailwindClassesToValues } from "@/lib/tailwind";

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
  defaultMeasurement?: Measurement;
  classKey: string;
  category: ClassCategory;
}
export function InputMeasure({
  classKey,
  defaultMeasurement = "px",
  category,
}: InputMeasureProps) {
  const { props, setClassname } = useClassname();

  const parsedValues = parseTailwindClassesToValues(props?.className);

  console.log("parsedValues", parsedValues);

  const [measurement, setMeasurement] =
    useState<Measurement>(defaultMeasurement);
  const [inputValue, setValue] = useState<string>(
    props.className?.[classKey]
      ? parseFloat(props.className?.[classKey]).toString()
      : ""
  );

  useEffect(() => {
    if (!isNaN(parseFloat(inputValue))) {
      setClassname({
        classKey,
        value: parseFloat(inputValue) + measurement,
        category,
      });
    }
  }, [inputValue, measurement]);

  useEffect(() => {
    const m = props.className?.[classKey]?.replace(/\d+/g, "");
    if (m) {
      setMeasurement(m as Measurement);
    }
  }, [props.className?.[classKey]]);

  return (
    <div className="flex justify-between rounded-md border border-input">
      <Input
        id={classKey}
        type="number"
        value={inputValue}
        className="border-none ring-offset-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 focus:ring-0 focus:ring-offset-0"
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <Select
        value={measurement}
        onValueChange={(e: Measurement) => setMeasurement(e)}
      >
        <SelectTrigger className="w-[70px] border-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 focus:ring-0 focus:ring-offset-0">
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

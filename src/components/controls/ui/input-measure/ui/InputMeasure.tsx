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
import { ClassCategory } from "@/lib/tailwind";

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
  // const { setClassname, parsedValues } = useClassname();

  // const [measurement, setMeasurement] =
  //   useState<Measurement>(defaultMeasurement);
  // const [inputValue, setValue] = useState<string>(
  //   parsedValues?.[category]
  //     ? parseFloat(parsedValues?.[category]).toString()
  //     : ""
  // );

  // useEffect(() => {
  //   if (!isNaN(parseFloat(inputValue))) {
  //     setClassname({
  //       classKey,
  //       value: parseFloat(inputValue) + measurement,
  //       category,
  //     });
  //   }
  // }, [inputValue, measurement]);

  // useEffect(() => {
  //   const m = parsedValues?.[category]?.replace(/\d+/g, "");
  //   if (m) {
  //     setMeasurement(m as Measurement);
  //   }
  //   const value = parseFloat(parsedValues?.[category] || "")?.toString();

  //   setValue(value);
  // }, [parsedValues?.[category]]);

  const { setClassname, parsedValues } = useClassname();

  const [measurement, setMeasurement] =
    useState<Measurement>(defaultMeasurement);
  const [inputValue, setInputValue] = useState<string>("");

  const extractValueAndMeasurement = (
    value: string
  ): { value: string; unit: Measurement } => {
    const unit = value.replace(/\d+/g, "") as Measurement;
    const numericValue = parseFloat(value)?.toString() || "";
    return { value: numericValue, unit };
  };

  useEffect(() => {
    if (!isNaN(parseFloat(inputValue))) {
      setClassname({
        classKey,
        value: `${parseFloat(inputValue)}${measurement}`,
        category,
      });
    }
  }, [inputValue, measurement]);

  useEffect(() => {
    if (parsedValues?.[category]) {
      const { value, unit } = extractValueAndMeasurement(
        parsedValues[category]
      );
      setInputValue(value);
      setMeasurement(unit);
    } else {
      setInputValue("");
    }
  }, [parsedValues?.[category]]);

  return (
    <div className="flex justify-between rounded-md border border-input">
      <Input
        id={classKey}
        type="number"
        value={inputValue}
        className="border-none ring-offset-background focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 focus:ring-0 focus:ring-offset-0"
        onChange={(e) => {
          setInputValue(e.target.value);
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

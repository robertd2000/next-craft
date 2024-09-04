"use client";

import { Component, ReactNode, useEffect, useState } from "react";
import Select, { MultiValue, components, createFilter } from "react-select";
import { FixedSizeList as List } from "react-window";
import { useEditor, useNode } from "@craftjs/core";
import { Trash2 } from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { suggestions } from "@/lib/tw-classes";
import { Backgrounds } from "./backgrounds";
import { Display } from "./display";
import { Typography } from "./typography";
import { Size } from "./size";
import { Position } from "./position";
import { Space } from "./space";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion } from "@/components/ui/accordion";

const selectOptions = suggestions.map((value) => ({ label: value, value }));

interface SettingsControlProps {
  children?: ReactNode;
}

export function SettingsControl({ children }: SettingsControlProps) {
  const { query, actions } = useEditor();

  const {
    id,
    classNames,
    deletable,
    text,
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
    classNames: node.data.props["className"] as string,
    text: node.data.props["children"] as string,
    deletable: query.node(node.id).isDeletable(),
  }));

  const tailwindcssArr = classNames
    ? classNames.split(" ").filter(Boolean)
    : [];

  const initialOptions = tailwindcssArr.map((value) => ({
    label: value,
    value,
  }));

  useEffect(() => {
    const tailwindcssArr = classNames
      ? classNames.split(" ").filter(Boolean)
      : [];

    const newOptions = tailwindcssArr.map((value) => ({
      label: value,
      value,
    }));

    setValue(newOptions);
  }, [classNames]);

  const [value, setValue] = useState<MultiValue<any>>(initialOptions);

  const height = 35;

  interface MenuListProps {
    options: any[];
    children: any[];
    maxHeight: number;
    getValue: () => any[];
  }

  class MenuList extends Component<MenuListProps> {
    render() {
      const { options, children, maxHeight, getValue } = this.props;
      const [value] = getValue();
      const initialOffset = options.indexOf(value) * height;

      return (
        <List
          width={"100%"}
          height={maxHeight}
          itemCount={children.length}
          itemSize={height}
          initialScrollOffset={initialOffset}
        >
          {({ index, style }) => <div style={style}>{children[index]}</div>}
        </List>
      );
    }
  }

  const CustomOption = ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    innerProps: any;
  }) => {
    // Remove the niceties for mouseover and mousemove to optimize for large lists
    // eslint-disable-next-line no-unused-vars
    const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
    const newProps = { ...props, innerProps: rest };
    return (
      // @ts-ignore
      <components.Option {...newProps}>
        <div className="text-xs">{children}</div>
      </components.Option>
    );
  };

  return (
    <div className="">
      <div className="border-b border-b-1 mt-2 p-4 pb-2">
        {deletable ? (
          <Button
            variant={"destructive"}
            className="cursor-pointer mb-4 w-full"
            onClick={(event) => {
              event.stopPropagation();
              if (parent) {
                actions.delete(id);
              }
            }}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        ) : null}
        {typeof text === "string" ? (
          <Input
            type="text"
            value={text}
            className="mb-4"
            onChange={(e) =>
              setProp(
                (props: { children: ReactNode }) =>
                  (props.children = e.target.value.replace(
                    /<\/?[^>]+(>|$)/g,
                    ""
                  ))
              )
            }
          />
        ) : null}
      </div>
      <Select
        options={selectOptions}
        isSearchable
        isClearable={false}
        // @ts-ignore
        components={{ MenuList, Option: CustomOption }}
        isMulti
        placeholder={"Add new class"}
        value={value}
        filterOption={createFilter({ ignoreAccents: false })}
        className="p-4"
        onChange={(option) => {
          if (option && Array.isArray(option)) {
            const classNames = option.map((item) => item.value).join(" ");
            setProp((props: { className: string }) => {
              props.className = classNames;
            });
          }

          if (!option) {
            setProp((props: { className: string }) => (props.className = ""));
          }

          setValue(option);
        }}
      />
      <ScrollArea className="h-[94vh] w-full p-4">
        <Accordion type="multiple" className="w-full">
          <Display />

          <Space />

          <Size />

          <Position />

          <Typography />

          <Backgrounds />
        </Accordion>

        {children}
      </ScrollArea>{" "}
    </div>
  );
}

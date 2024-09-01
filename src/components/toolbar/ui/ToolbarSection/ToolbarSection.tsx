import { useNode } from "@craftjs/core";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../ui/accordion";
import React from "react";

export const ToolbarSection = ({ title, props, summary, children }: any) => {
  const { nodeProps } = useNode((node) => ({
    nodeProps:
      props &&
      props.reduce((res: any, key: any) => {
        res[key] = node.data.props[key] || null;
        return res;
      }, {}),
  }));
  return (
    <Accordion type="multiple">
      <AccordionTrigger>
        <div className="px-6 w-full">
          <div>
            <div>
              <h5 className="text-sm text-light-gray-1 text-left font-medium text-dark-gray">
                {title}
              </h5>
            </div>
            {summary && props ? (
              <div>
                <h5 className="text-light-gray-2 text-sm text-right text-dark-blue">
                  {summary(
                    props.reduce((acc: any, key: any) => {
                      acc[key] = nodeProps[key];
                      return acc;
                    }, {})
                  )}
                </h5>
              </div>
            ) : null}
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent style={{ padding: "0px 24px 20px" }}>
        <div>{children}</div>
      </AccordionContent>
    </Accordion>
  );
};

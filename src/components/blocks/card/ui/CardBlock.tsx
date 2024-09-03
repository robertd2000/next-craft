import { Element } from "@craftjs/core";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { withNode } from "../../connector";
import { NodeButton } from "../../button/ui/NodeButton";
import { SettingsControl } from "@/components/controls";

interface NodeCardProps extends React.HTMLAttributes<HTMLDivElement> {}

const draggable = true;
const droppable = true;

export const NodeCardHeader = withNode(CardHeader, {
  droppable,
});

export const NodeCardTitle = withNode(CardTitle, {
  draggable,
  droppable,
});

// @ts-ignore
NodeCardTitle.craft = {
  // @ts-ignore
  ...NodeCardTitle.craft,
  related: {
    toolbar: SettingsControl,
  },
};

export const NodeCardDescription = withNode(CardDescription, {
  draggable,
  droppable,
});

// @ts-ignore
NodeCardDescription.craft = {
  // @ts-ignore
  ...NodeCardDescription.craft,
  related: {
    toolbar: SettingsControl,
  },
};

export const NodeCardContent = withNode(CardContent, {
  droppable,
});

export const NodeCardFooter = withNode(CardFooter, {
  droppable,
});

export const NodeCardContainer = withNode(Card, {
  draggable,
  droppable,
});

export const NodeCard = ({ ...props }: NodeCardProps) => {
  return (
    <NodeCardContainer {...props}>
      <Element
        canvas
        id="card-header"
        is={NodeCardHeader as typeof NodeCardHeader & string}
      >
        <NodeCardTitle>Card Title</NodeCardTitle>
        <NodeCardDescription>Card Description</NodeCardDescription>
      </Element>
      <Element
        canvas
        id="card-content"
        is={NodeCardContent as typeof NodeCardContent & string}
      ></Element>
      <Element
        canvas
        id="card-footer"
        is={NodeCardFooter as typeof NodeCardFooter & string}
      >
        <NodeButton>Footer button</NodeButton>
      </Element>
    </NodeCardContainer>
  );
};

// @ts-ignore
NodeCard.craft = {
  ...NodeCard.craft,
  displayName: "Card",
  props: {
    className: "p-6 m-2",
  },
  custom: {
    importPath: "@/components/card",
  },
  related: {
    toolbar: SettingsControl,
  },
};

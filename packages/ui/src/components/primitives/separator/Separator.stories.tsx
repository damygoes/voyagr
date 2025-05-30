import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./Separator";

// Meta configuration
const meta: Meta<typeof Separator> = {
  title: "Components/Separator",
  component: Separator,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
    },
    decorative: {
      control: "boolean",
    },
    className: {
      control: "text",
      description: "Custom className for styling (optional)",
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Separator>;

// Horizontal separator (default)
export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
    decorative: true,
  },
};

// Vertical separator
export const Vertical: Story = {
  args: {
    orientation: "vertical",
    decorative: true,
  },
};

// Non-decorative separator (semantic)
export const Semantic: Story = {
  args: {
    orientation: "horizontal",
    decorative: false,
  },
};

// Custom styled separator
export const CustomStyled: Story = {
  args: {
    orientation: "horizontal",
    className: "border-destructive h-3xl",
  },
};

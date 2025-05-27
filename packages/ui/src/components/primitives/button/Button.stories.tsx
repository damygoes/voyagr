import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

// Meta configuration for Storybook
const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
    variant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
    children: {
      control: "text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

// Default button
export const Default: Story = {
  args: {
    children: "Click me",
    variant: "default",
    size: "default",
  },
};

// Destructive button
export const Destructive: Story = {
  args: {
    children: "Delete",
    variant: "destructive",
  },
};

// Outline button
export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline",
  },
};

// Secondary button
export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

// Ghost button
export const Ghost: Story = {
  args: {
    children: "Ghost",
    variant: "ghost",
  },
};

// Link button
export const Link: Story = {
  args: {
    children: "Link",
    variant: "link",
  },
};

// Small size
export const Small: Story = {
  args: {
    children: "Small",
    size: "sm",
  },
};

// Medium size
export const Medium: Story = {
  args: {
    children: "Medium",
    size: "default",
  },
};

// Large size
export const Large: Story = {
  args: {
    children: "Large",
    size: "lg",
  },
};

// Button with left icon
export const WithLeftIcon: Story = {
  args: {
    children: "Attention",
    iconLeft: { name: "calendar" },
  },
};

// Button with right icon
export const WithRightIcon: Story = {
  args: {
    children: "Trash",
    iconRight: { name: "delete" },
  },
};

// Icon-only button
export const IconOnly: Story = {
  args: {
    iconLeft: { name: "download" },
    size: "icon",
    "aria-label": "Search",
  },
};

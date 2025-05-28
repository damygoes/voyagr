import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Tailwind classes to override or extend the skeleton style",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    className: "h-lg w-40",
  },
};

export const Circle: Story = {
  args: {
    className: "h-3xl w-3xl rounded-full",
  },
};

export const CardPlaceholder: Story = {
  render: () => (
    <div className="space-y-sm p-sm max-w-sm border border-border rounded-md">
      <Skeleton className="h-3xl w-full" />
      <Skeleton className="h-lg w-3/4" />
      <Skeleton className="h-md w-1/2" />
    </div>
  ),
};

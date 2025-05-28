import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  argTypes: {},
  decorators: [
    (Story) => (
      <TooltipProvider>
        <div className="flex justify-center items-center h-64">
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    // We won't pass side directly because it's not a prop on Tooltip
  },
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent side="top">
        <p className="m-0">Add to library</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithDifferentSides: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-3xl">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger asChild>
            <Button variant="outline">
              {side.charAt(0).toUpperCase() + side.slice(1)}
            </Button>
          </TooltipTrigger>
          <TooltipContent side={side}>
            <p>This tooltip appears on the {side}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
};

export const WithVeryLongText: Story = {
  render: () => (
    <div className="flex justify-center items-center w-screen h-screen">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          This is a very long tooltip text that should wrap properly and not
          overflow the viewport. It should demonstrate how the tooltip handles
          long content gracefully. It should also ensure that the text is
          readable and does not cause any layout issues or overflow problems.
          The tooltip should adjust its size based on the content and remain
          within the bounds of the viewport to provide a good user experience.
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

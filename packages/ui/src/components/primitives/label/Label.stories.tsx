import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./Label";

// Meta configuration for Storybook
const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
    },
    htmlFor: {
      control: "text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Label>;

// Default label
export const Default: Story = {
  args: {
    children: "Name",
    htmlFor: "name",
  },
};

// Label with long text
export const LongText: Story = {
  args: {
    children: "Please enter your full legal name",
    htmlFor: "fullname",
  },
};

// Label with disabled style (using peer-disabled)
export const PeerDisabled: Story = {
  render: () => (
    <div>
      <input id="email" disabled className="peer hidden" />
      <Label htmlFor="email">Email</Label>
    </div>
  ),
};

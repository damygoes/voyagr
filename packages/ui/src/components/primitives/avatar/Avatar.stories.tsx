import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional Tailwind classes for the avatar wrapper",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://i.pravatar.cc/150" alt="User avatar" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

export const NoImageFallback: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="" alt="No image" />
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  ),
};

export const CustomSize: Story = {
  render: () => (
    <Avatar className="h-3xl w-3xl">
      <AvatarImage src="https://i.pravatar.cc/300" alt="Large avatar" />
      <AvatarFallback>👤</AvatarFallback>
    </Avatar>
  ),
};

export const WithInitials: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback className="bg-primary text-primary-foreground font-medium">
        AM
      </AvatarFallback>
    </Avatar>
  ),
};

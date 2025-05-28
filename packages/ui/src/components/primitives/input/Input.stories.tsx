import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

// Meta configuration for Storybook
const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "tel", "url", "search"],
    },
    placeholder: {
      control: "text",
    },
    iconLeft: {
      control: "select",
      options: [null, "search", "mail", "lock", "user", "calendar"],
      mapping: {
        null: undefined,
        search: { name: "search" },
        mail: { name: "mail" },
        lock: { name: "lock" },
        user: { name: "user" },
        calendar: { name: "calendar" },
      },
    },
    iconRight: {
      control: "select",
      options: [null, "search", "mail", "lock", "user", "calendar"],
      mapping: {
        null: undefined,
        search: { name: "search" },
        mail: { name: "mail" },
        lock: { name: "lock" },
        user: { name: "user" },
        calendar: { name: "calendar" },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

// Default input
export const Default: Story = {
  args: {
    type: "text",
    placeholder: "Enter your text",
  },
};

// Password input
export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter your password",
  },
};

// Input with left icon
export const WithLeftIcon: Story = {
  args: {
    placeholder: "Search...",
    iconLeft: { name: "search" },
  },
};

// Input with right icon
export const WithRightIcon: Story = {
  args: {
    placeholder: "Search...",
    iconRight: { name: "search" },
  },
};

// Disabled input
export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
  },
};

// Input with email icon left
export const WithEmailLeftIcon: Story = {
  args: {
    placeholder: "Enter your email",
    iconLeft: { name: "email" },
    type: "email",
  },
};

// Input with password icon right
export const WithPasswordRightIcon: Story = {
  args: {
    placeholder: "Enter password",
    type: "password",
    iconRight: { name: "password" },
  },
};

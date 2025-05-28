import type { Meta, StoryObj } from "@storybook/react";
import { iconMap, IconName, iconNames } from "../../assets/utils/icon-mapping";
import { Icon, type IconProps } from "./Icon";

const meta: Meta<typeof Icon> = {
  title: "Components/Icon",
  component: Icon,
  argTypes: {
    name: {
      control: "select",
      options: iconNames,
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "2xl", "3xl", "5xl"],
    },
    color: {
      control: "color",
    },
    // Hide legacy size props
    width: { table: { disable: true } },
    height: { table: { disable: true } },
    strokeWidth: { table: { disable: true } },
  },
  args: {
    name: "dashboard",
    size: "xl",
    color: "currentColor",
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Playground: Story = {
  render: (args: IconProps) => <Icon {...args} />,
};

export const AllIcons: Story = {
  render: (args: IconProps) => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
      {Object.keys(iconMap).map((name) => (
        <div
          key={name}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Icon {...args} name={name as IconName} />
          <span style={{ fontSize: 12, marginTop: 4 }}>{name}</span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args: IconProps) => (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      {(
        ["sm", "md", "lg", "xl", "2xl", "3xl", "5xl"] as IconProps["size"][]
      ).map((size) => (
        <div
          key={size}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Icon {...args} size={size} />
          <span style={{ fontSize: 12, marginTop: 4 }}>{size}</span>
        </div>
      ))}
    </div>
  ),
  args: {
    name: "edit",
    color: "currentColor",
  },
};

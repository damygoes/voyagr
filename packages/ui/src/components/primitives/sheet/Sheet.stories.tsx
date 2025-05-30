"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./Sheet";

// Meta config (no side prop here because it's not on <Sheet />)
const meta: Meta<typeof Sheet> = {
  title: "Components/Sheet",
  component: Sheet,
  tags: ["autodocs"],
};

export default meta;

// Story-specific props to control `side` prop on SheetContent
type SheetStoryProps = {
  side?: "top" | "bottom" | "left" | "right";
};

export const Controllable: StoryObj<SheetStoryProps> = {
  args: {
    side: "right",
  },
  render: ({ side = "right" }) => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open Sheet</Button>
      </SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>
            {(side?.[0] ?? "").toUpperCase() + side?.slice(1)} Sheet
          </SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};

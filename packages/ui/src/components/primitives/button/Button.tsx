"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@voyagr/utils/cn";
import { Icon, type IconProps } from "../icon";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-xs whitespace-nowrap rounded-md text-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-md [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:opacity-70",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:opacity-70",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:opacity-70",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-md hover:underline",
      },
      size: {
        default: "px-sm py-xs",
        sm: "rounded-md px-xs py-2xs text-xs",
        lg: "rounded-md px-md py-md",
        icon: "h-xl w-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  iconLeft?: IconProps;
  iconRight?: IconProps;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      iconLeft,
      iconRight,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    if (iconLeft && iconRight) {
      throw new Error(
        "You can only use one icon at a time. Use either iconLeft or iconRight.",
      );
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {iconLeft && (
          <span className={cn(children && "mr-2xs")}>
            <Icon {...iconLeft} />
          </span>
        )}
        {children}
        {iconRight && (
          <span className={cn(children && "ml-2xs")}>
            <Icon {...iconRight} />
          </span>
        )}
      </Comp>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };

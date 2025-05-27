"use client";

import { cn } from "@voyagr/utils/cn";
import * as React from "react";
import { Icon, type IconProps } from "../../icon";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  iconLeft?: IconProps;
  iconRight?: IconProps;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, iconLeft, iconRight, ...props }, ref) => {
    if (iconLeft && iconRight) {
      throw new Error(
        "You can only use one icon at a time. Use either iconLeft or iconRight.",
      );
    }

    return (
      <div className="flex h-xl w-full items-center rounded-md border border-input bg-transparent px-xs text-base shadow-sm transition-colors focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
        {iconLeft && (
          <span className="mr-xs text-foreground">
            <Icon size="xl" {...iconLeft} />
          </span>
        )}
        <input
          type={type}
          className={cn(
            "flex w-full bg-transparent py-3xs placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
        {iconRight && (
          <span className="ml-xs text-foreground">
            <Icon size="xl" {...iconRight} />
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };

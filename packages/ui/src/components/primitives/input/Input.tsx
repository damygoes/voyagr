/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@voyagr/utils/cn";
import * as React from "react";
import { Icon, type IconProps } from "../icon";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  iconLeft?: IconProps;
  iconRight?: IconProps;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, iconLeft, iconRight, ...props }, ref) => {
    if (iconLeft && iconRight) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "Input: You can only use one icon at a time. Use either iconLeft or iconRight. Defaulting to iconLeft.",
        );
      }
      // Default to iconLeft if both are provided
      iconRight = undefined;
    }

    return (
      <div className="flex h-xl w-full items-center rounded-md border border-input bg-transparent px-xs text-base shadow-sm transition-colors focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
        {iconLeft && (
          <span
            className="mr-xs text-foreground"
            {...(iconLeft.onClick && {
              role: "button",
              tabIndex: 0,
              "aria-label": iconLeft["aria-label"],
              onKeyDown: (e) => {
                if ((e.key === "Enter" || e.key === " ") && iconLeft.onClick) {
                  e.preventDefault();
                  iconLeft.onClick(e as any);
                }
              },
            })}
          >
            <Icon size={iconLeft.size || "xl"} {...iconLeft} />
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
          <span
            className="ml-xs text-foreground"
            {...(iconRight.onClick && {
              role: "button",
              tabIndex: 0,
              "aria-label": iconRight["aria-label"],
              onKeyDown: (e) => {
                if ((e.key === "Enter" || e.key === " ") && iconRight.onClick) {
                  e.preventDefault();
                  iconRight.onClick(e as any);
                }
              },
            })}
          >
            <Icon size={iconRight.size || "xl"} {...iconRight} />
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };

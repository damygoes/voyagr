"use client";

import { cn } from "@voyagr/utils/cn";

type CountIndicatorProps = {
  count: number;
  className?: string;
};

export function CountIndicator({ count, className }: CountIndicatorProps) {
  if (count <= 0) return null;

  return (
    <div
      className={cn(
        "size-md flex items-center justify-center rounded-full text-muted-foreground text-sm border border-solid border-border font-medium",
        className,
      )}
    >
      {count}
    </div>
  );
}

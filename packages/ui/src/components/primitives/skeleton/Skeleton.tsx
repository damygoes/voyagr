import { cn } from "@voyagr/utils/cn";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted-foreground opacity-5",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };

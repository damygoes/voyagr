"use client";

import { CountIndicator } from "@/components/CountIndicator";
import { Button } from "@voyagr/ui";
import { MouseEventHandler } from "react";

type NotificationButtonProps = {
  count?: number;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export function NotificationButton({
  count = 0,
  onClick,
}: NotificationButtonProps) {
  return (
    <Button
      iconLeft={{ name: "notifications", size: "sm" }}
      variant="outline"
      size="sm"
      onClick={onClick}
      aria-label={`Notifications${count > 0 ? ` (${count} unread)` : ""}`}
    >
      Notifications
      <CountIndicator count={count} />
    </Button>
  );
}

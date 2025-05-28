"use client";

import { Button } from "@voyagr/ui";

export const QuickEntryCreationButton = () => {
  return (
    <Button
      variant="outline"
      onClick={() => {
        // Logic to open quick entry creation modal or redirect
        console.log("Quick Entry Creation Clicked");
      }}
      iconLeft={{
        name: "newEntry",
        size: "xl",
        "aria-label": "Create new entry",
      }}
      className="w-full"
    >
      Quick Create
    </Button>
  );
};

"use client";

import { Button } from "@voyagr/ui";

export const QuickEntryCreationButton = () => {
  const handleQuickEntryCreation = () => {
    // TODO: Implement quick entry creation functionality
    // This should either:
    // 1. Open a modal for quick entry creation
    // 2. Navigate to a dedicated entry creation page
    // 3. Show an inline form
    throw new Error("Quick entry creation not implemented yet");
  };

  return (
    <Button
      variant="outline"
      onClick={handleQuickEntryCreation}
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

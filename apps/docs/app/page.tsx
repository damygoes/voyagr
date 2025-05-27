"use client";

import { Button } from "@voyagr/ui";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24 bg-background">
      <h1>DOCS</h1>
      <Button variant="destructive">Go to the Docs</Button>
    </main>
  );
}

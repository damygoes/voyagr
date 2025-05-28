"use client";

import { Button } from "@voyagr/ui";
import Link from "next/link";

export function AuthLayout({
  children,
  title,
  description,
  secondaryLinkText,
  secondaryLinkHref,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
  secondaryLinkText: string;
  secondaryLinkHref: string;
}) {
  return (
    <main className="flex flex-col md:flex-row items-center justify-between h-screen w-full px-lg py-2xl md:px-xl bg-background">
      <section
        className="flex-1 flex flex-col justify-center items-center gap-sm text-center max-w-lg mx-auto md:mx-0"
        aria-labelledby="auth-title"
      >
        <h1 id="auth-title" className="text-3xl font-bold">
          {title}
        </h1>
        <p className="text-muted-foreground mt-sm" role="doc-subtitle">
          {description}
        </p>

        <div className="mt-md">
          <Button variant="link">
            <Link href={secondaryLinkHref}>{secondaryLinkText}</Link>
          </Button>
        </div>
      </section>

      <div className="w-full md:w-2/5 h-auto md:h-full flex justify-center items-center mt-xl md:mt-0 px-md">
        {children}
      </div>
    </main>
  );
}

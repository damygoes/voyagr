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
    <main className="flex flex-col md:flex-row h-screen w-full bg-background py-md">
      {/* Left Section with Background Image */}
      <section
        className="relative flex-1 flex items-center justify-center px-lg py-2xl md:px-xl text-center bg-cover bg-center bg-no-repeat text-white rounded-r-full"
        style={{ backgroundImage: "url('/images/auth-bg.jpg')" }}
        aria-labelledby="auth-title"
      >
        <div className="absolute inset-[0px] bg-[#000] opacity-50 z-0 rounded-r-full" />
        <div className="relative z-10 max-w-lg text-white space-y-sm mb-3xl pb-3xl">
          <h1 id="auth-title" className="text-3xl font-bold">
            {title}
          </h1>
          <p className="text-white opacity-60 mt-sm" role="doc-subtitle">
            {description}
          </p>
          <div className="mt-md">
            <Button variant="ghost" size="sm">
              <Link href={secondaryLinkHref}>{secondaryLinkText}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Right Section with Auth Form */}
      <div className="w-full md:w-2/5 h-auto md:h-full flex justify-center items-center px-md">
        {children}
      </div>
    </main>
  );
}

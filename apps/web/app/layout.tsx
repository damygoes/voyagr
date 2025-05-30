import { ApolloWrapper } from "@/providers/ApolloWrapper";
import { NextAuthSessionProvider } from "@/providers/NextAuthSessionProvider";
import "@voyagr/ui/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Turborepo",
  description: "Generated by create turbo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} w-screen max-h-screen overflow-hidden`}
      >
        <NextAuthSessionProvider>
          <ApolloWrapper>{children}</ApolloWrapper>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}

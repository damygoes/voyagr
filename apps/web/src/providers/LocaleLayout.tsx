"use client";

import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface LocaleLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

export function LocaleLayout({
  children,
  params: { locale },
}: LocaleLayoutProps) {
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    import(`@/messages/${locale}.json`)
      .then((mod) => setMessages(mod.default))
      .catch((error) => {
        console.error(`Locale messages for "${locale}" not found.`, error);
        notFound();
      });
  }, [locale]);

  if (!messages) return null; // Or a loading spinner

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

"use client";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@voyagr/ui";
import { locales } from "middleware";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (nextLocale: string) => {
    if (!pathname) return;

    const segments = pathname.split("/");
    segments[1] = nextLocale; // Replace locale segment
    const newPath = segments.join("/");

    router.replace(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          iconLeft={{ name: "search" }}
          className="bg-primary w-full justify-start"
        >
          {locale.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onSelect={() => changeLanguage(loc)}
            className={locale === loc ? "font-bold bg-accent" : ""}
          >
            {loc.toUpperCase()}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

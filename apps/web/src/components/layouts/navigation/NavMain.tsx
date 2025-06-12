"use client";

import { QuickEntryCreationButton } from "@/features/entry/components/QuickEntryCreationButton";
import { getLocalizedPath } from "@/utils/getLocalizedPath";
import {
  Icon,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
} from "@voyagr/ui";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItems } from "./types";

interface NavMainProps {
  items: NavItems;
}

export function NavMain({ items }: NavMainProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("Navigation");

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-sm">
        <QuickEntryCreationButton />
        <SidebarMenu>
          {items.map((item) => {
            const localizedHref = getLocalizedPath(item.url, locale);
            const isActive = pathname === localizedHref;
            return (
              <Link href={localizedHref} passHref key={item.title}>
                <SidebarMenuButton isActive={isActive} tooltip={item.title}>
                  {item.icon && <Icon name={item.icon} />}
                  <span>{t(item.title)}</span>
                </SidebarMenuButton>
              </Link>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

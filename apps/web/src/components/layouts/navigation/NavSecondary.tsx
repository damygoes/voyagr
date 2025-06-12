"use client";

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
import * as React from "react";
import { NavItems } from "./types";

interface NavSecondaryProps {
  items: NavItems;
}

export function NavSecondary({
  items,
  ...props
}: NavSecondaryProps & {} & React.ComponentPropsWithoutRef<
    typeof SidebarGroup
  >) {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("Navigation");

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const localizedHref = getLocalizedPath(item.url, locale);
            const isActive = pathname === localizedHref;
            return (
              <SidebarMenuButton
                asChild
                isActive={isActive}
                tooltip={item.title}
                key={item.title}
              >
                <Link href={localizedHref}>
                  {item.icon && <Icon name={item.icon} />}
                  <span>{t(item.title)}</span>
                </Link>
              </SidebarMenuButton>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

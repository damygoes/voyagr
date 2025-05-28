"use client";

import { QuickEntryCreationButton } from "@/features/entry/components/QuickEntryCreationButton";
import {
  Icon,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
} from "@voyagr/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItems } from "./types";

interface NavMainProps {
  items: NavItems;
}

export function NavMain({ items }: NavMainProps) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-sm">
        <QuickEntryCreationButton />
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname === item.url;
            return (
              <Link href={item.url} passHref key={item.title}>
                <SidebarMenuButton isActive={isActive} tooltip={item.title}>
                  {item.icon && <Icon name={item.icon} />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

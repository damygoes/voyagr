"use client";

import {
  Icon,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
} from "@voyagr/ui";
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
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuButton
                asChild
                isActive={isActive}
                tooltip={item.title}
                key={item.title}
              >
                <Link href={item.url}>
                  {item.icon && <Icon name={item.icon} />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

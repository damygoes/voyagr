"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  Icon,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  Skeleton,
} from "@voyagr/ui";
import { useSession } from "next-auth/react";
import { NavUserMenuContent } from "./NavUserMenuContent";
import { UserInfo } from "./UserInfo";
import type { NavMenuUser } from "./types";

export function NavUser() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Skeleton className="h-xl w-full rounded-lg" />;
  }

  const user = session?.user as NavMenuUser | undefined;

  if (!user) {
    return null; // TODO: maybe a <FallbackUserMenu /> or a "Sign in" button
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <UserInfo user={user} size="lg" />
              <Icon name="more" className="ml-auto size-sm" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <NavUserMenuContent user={user} />
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

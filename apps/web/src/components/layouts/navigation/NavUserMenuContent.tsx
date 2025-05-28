"use client";

import { LogoutButton } from "@/features/authentication/components/LogoutButton";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  Icon,
  Separator,
  useSidebar,
} from "@voyagr/ui";
import { useRouter } from "next/navigation";
import React from "react";
import { appRoutes } from "./constants";
import { NavMenuUser } from "./types";
import { UserInfo } from "./UserInfo";

type NavUserProps = {
  user: NavMenuUser;
};

export function NavUserMenuContent({ user }: NavUserProps) {
  const { isMobile } = useSidebar();
  const router = useRouter();

  const handleItemClick = (url: string) => {
    router.push(url);
  };

  const menuSections = [
    {
      type: "label",
      content: (
        <div className="flex items-center gap-sm text-left text-sm w-full">
          <UserInfo user={user} size="sm" />
        </div>
      ),
    },
    {
      type: "group",
      items: [
        { icon: "user", label: "Account", url: appRoutes.account },
        { icon: "billing", label: "Billing", url: appRoutes.billing },
      ],
    },
  ] as const;

  return (
    <DropdownMenuContent
      className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
      side={isMobile ? "bottom" : "right"}
      align="end"
      sideOffset={4}
    >
      {menuSections.map((section, idx) => {
        if (section.type === "label") {
          return (
            <DropdownMenuLabel
              key={`label-${idx}`}
              className="p-[0px] font-normal"
            >
              {section.content}
            </DropdownMenuLabel>
          );
        }

        if (section.type === "group") {
          return (
            <React.Fragment key={`group-${idx}`}>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {section.items.map((item, i) => (
                  <DropdownMenuItem
                    key={i}
                    onClick={
                      item.url ? () => handleItemClick(item.url) : undefined
                    }
                  >
                    <Icon name={item.icon} />
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </React.Fragment>
          );
        }

        return null;
      })}
      <Separator className="my-sm" />
      <LogoutButton />
    </DropdownMenuContent>
  );
}

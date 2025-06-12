"use client";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
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
import { useTranslations } from "next-intl";
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
  const t = useTranslations("Navigation");

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
        { icon: "user", label: `${t("profile")}`, url: appRoutes.account },
        { icon: "billing", label: `${t("billing")}`, url: appRoutes.billing },
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
      {menuSections.map((section) => {
        if (section.type === "label") {
          return (
            <DropdownMenuLabel
              key={`label-${section}`}
              className="p-[0px] font-normal"
            >
              {section.content}
            </DropdownMenuLabel>
          );
        }

        if (section.type === "group") {
          return (
            <React.Fragment key={`group-${section}`}>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {section.items.map((item) => (
                  <DropdownMenuItem
                    key={`${item.label}-${item.url}`}
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
      <LanguageSwitcher />
      <Separator className="my-sm" />
      <LogoutButton />
    </DropdownMenuContent>
  );
}

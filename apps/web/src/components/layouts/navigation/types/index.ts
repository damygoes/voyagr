import { IconName } from "@voyagr/ui";

export type NavItem = {
  title: string;
  url: string;
  icon?: IconName;
};

export type NavItems = NavItem[];

export type NavMenuUser = {
  name: string;
  email: string;
  avatar: string;
};

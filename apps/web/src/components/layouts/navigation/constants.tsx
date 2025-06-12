export const appRoutes = {
  dashboard: "/dashboard",
  entries: "/entries",
  map: "/map",
  sharedResources: "/shared-resources",
  settings: "/settings",
  getHelp: "/help",
  feedback: "/feedback",
  account: "/account",
  billing: "/billing",
} as const;

export type AppRoutes = typeof appRoutes;

export const appRouteNames = Object.keys(appRoutes) as (keyof AppRoutes)[];

export const appSidebarData = {
  navMain: [
    {
      title: "dashboard",
      url: appRoutes.dashboard,
      icon: "dashboard" as const,
    },
    {
      title: "entries",
      url: appRoutes.entries,
      icon: "entries" as const,
    },
    {
      title: "map",
      url: appRoutes.map,
      icon: "map" as const,
    },
    {
      title: "sharedResources",
      url: appRoutes.sharedResources,
      icon: "share" as const,
    },
  ],
  navSecondary: [
    {
      title: "settings",
      url: appRoutes.settings,
      icon: "settings" as const,
    },
    {
      title: "getHelp",
      url: appRoutes.getHelp,
      icon: "help" as const,
    },
    {
      title: "feedback",
      url: appRoutes.feedback,
      icon: "feedback" as const,
    },
  ],
};

export type AppSidebarData = typeof appSidebarData;

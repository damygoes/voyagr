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
      title: "Dashboard",
      url: appRoutes.dashboard,
      icon: "dashboard" as const,
    },
    {
      title: "Entries",
      url: appRoutes.entries,
      icon: "entries" as const,
    },
    {
      title: "Map",
      url: appRoutes.map,
      icon: "map" as const,
    },
    {
      title: "Shared Resources",
      url: appRoutes.sharedResources,
      icon: "share" as const,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: appRoutes.settings,
      icon: "settings" as const,
    },
    {
      title: "Get Help",
      url: appRoutes.getHelp,
      icon: "help" as const,
    },
    {
      title: "Feedback",
      url: appRoutes.feedback,
      icon: "feedback" as const,
    },
  ],
};

export type AppSidebarData = typeof appSidebarData;

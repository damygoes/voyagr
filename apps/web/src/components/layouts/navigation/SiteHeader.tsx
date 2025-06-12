"use client";

import { NotificationButton } from "@/features/notification/components/NotificationButton";
import { Separator, SidebarTrigger } from "@voyagr/ui";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export function SiteHeader() {
  const pathname = usePathname();
  const t = useTranslations("Navigation");

  const pageTitle = useMemo(() => {
    if (!pathname) return "Untitled";
    const segments = pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1] || "Untitled";
    try {
      const decoded = decodeURIComponent(lastSegment);
      const title = decoded.charAt(0) + decoded.slice(1);
      const translatedTitle = t(`${title}`) || title;
      return translatedTitle;
    } catch {
      return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
    }
  }, [pathname, t]);

  return (
    <header className="sticky group-has-data-[collapsible=icon]/sidebar-wrapper:h-xl flex h-xl shrink-0 items-center gap-sm pr-sm py-lg border-solid border-b border-border transition-[width,height] ease-linear">
      <div className="flex w-full items-center justify-start gap-3xs lg:gap-sm">
        <SidebarTrigger className="-ml-3xs" />
        <Separator
          orientation="vertical"
          className="data-[orientation=vertical]:h-md"
        />
        <h1 className="text-md font-normal">{pageTitle}</h1>
      </div>
      <div className="flex justify-end items-center gap-sm">
        <NotificationButton count={5} />
      </div>
    </header>
  );
}

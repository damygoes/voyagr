"use client";

import { AppSidebar } from "@/components/layouts/AppSidebar";
import { SiteHeader } from "@/components/layouts/navigation/SiteHeader";
import { SidebarInset, SidebarProvider } from "@voyagr/ui";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar variant="floating" />
      <SidebarInset className="flex flex-col h-screen w-full">
        <SiteHeader />
        <main className="@container/main flex-1 overflow-auto p-sm bg-inherit">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

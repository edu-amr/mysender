"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "./_components/sidebar/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sidebarRoutes } from "./_components/sidebar/sidebar-routes";
import { SidebarMobile } from "./_components/sidebar/sidebar-mobile";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const activeRoute = sidebarRoutes.find((route) => isActive(route.href));

  return (
    <main className="flex h-screen max-h-screen w-full overflow-hidden">
      <Sidebar isActive={isActive} sidebarRoutes={sidebarRoutes} />
      <ScrollArea className="lg:px-12 px-5 h-screen w-full flex-1">
        <div className="lg:pt-8 h-screen w-full flex-1 max-w-7xl mx-auto pt-6">
          <header className="w-full">
            <div className="flex items-center justify-between">
              <div className="flex gap-3 items-center justify-center">
                <div className="flex items-center justify-center p-3 bg-green-1/20 rounded-lg">
                  {activeRoute?.icon && <activeRoute.icon size={24} className="text-green-2" />}
                </div>
                <h1 className="text-2xl font-semibold w-full">{activeRoute?.title}</h1>
              </div>
              <SidebarMobile isActive={isActive} sidebarRoutes={sidebarRoutes} />
            </div>
            <h2 className="text-base text-zinc-800 mt-6 tracking-wider">{activeRoute?.label}</h2>
          </header>
          <main className="mt-7 pb-12">{children}</main>
        </div>
      </ScrollArea>
    </main>
  );
}

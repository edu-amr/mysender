import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { SidebarUser } from "./sidebar-user";
import { SidebarProps } from "./sidebar";
import Link from "next/link";
import Image from "next/image";

export function SidebarMobile({ sidebarRoutes, isActive }: SidebarProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size={"icon"} className="lg:hidden flex">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={"left"}
        aria-description="conteudo"
        aria-describedby="conteudo"
        className="w-64 bg-green-3 border-none flex flex-col p-0 text-primary-foreground"
      >
        <SheetTitle className="sr-only">Menu mobile</SheetTitle>
        <SheetDescription className="sr-only">Menu mobile</SheetDescription>
        <div className="p-5 pt-11">
          <Link href={"/dashboard"}>
            <Image
              src={"/icons/logo.png"}
              alt="logo"
              width={120}
              height={70}
              style={{ width: "auto" }}
            />
          </Link>
        </div>
        <nav className="flex-1 p-5">
          <h2 className="text-white font-semibold text-xs tracking-wider">MENU</h2>
          <ul className="mt-5 flex flex-col gap-7">
            {sidebarRoutes.map(({ title, href, icon: Icon }) => (
              <li
                key={href}
                className={`${
                  isActive(href)
                    ? "before:w-1 before:h-8 before:bg-green-1 before:absolute before:left-0 before:rounded-e-2xl before:mt-[-5px]"
                    : ""
                }`}
              >
                <Link
                  href={href}
                  className={`flex items-center gap-2 text-base ${
                    isActive(href) ? "text-white" : "text-zinc-400"
                  }`}
                >
                  <Icon size={20} className={isActive(href) ? "text-green-1" : undefined} />
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <SheetFooter className="px-3 pb-4">
          <SidebarUser />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

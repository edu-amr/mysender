"use client";

import Image from "next/image";
import Link from "next/link";
import { SidebarUser } from "./sidebar-user";
import { Route } from "./sidebar-routes";

export type SidebarProps = {
  sidebarRoutes: Route[];
  isActive: (path: string) => boolean;
};

export function Sidebar({ sidebarRoutes, isActive }: SidebarProps) {
  return (
    <aside className="lg:flex w-full max-w-64 bg-green-3 hidden flex-col">
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
      <div className="px-3 pb-4">
        <SidebarUser />
      </div>
    </aside>
  );
}

"use client";

import { ChevronsUpDown, CreditCard, Info, LogOut, SquareArrowOutUpRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

interface NavUserProps {
  className?: string;
}

export function SidebarUser({ className }: NavUserProps) {
  const supabase = createClient();
  const [session, setSession] = useState<Session>();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session as Session);
    };

    getUser();
  });

  const signOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const avatarUrl = session?.user.user_metadata?.avatar_url || "";
  const userName = session?.user.user_metadata?.name || "";
  const userEmail = session?.user.email || "";

  if (true) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-full p-1 hover:bg-green-3" variant={"ghost"}>
            <Avatar className={cn(["h-8 w-8 rounded-xl", className])}>
              <AvatarImage src={avatarUrl} alt={userName} />
              <AvatarFallback className="!text-black">{userName[0]}</AvatarFallback>
            </Avatar>

            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold text-white">{userName}</span>
              <span className="truncate text-xs text-white">{userEmail}</span>
            </div>
            <ChevronsUpDown className="ml-auto size-4 text-white" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          side={"bottom"}
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className={cn(["h-8 w-8 rounded-xl", className])}>
                <AvatarImage src={avatarUrl} alt={userName} />
                <AvatarFallback>{userName[0]}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{userName}</span>
                <span className="truncate text-xs">{userEmail}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href={"/assinatura"}>
            <DropdownMenuItem className="cursor-pointer">
              <CreditCard />
              Assinatura
            </DropdownMenuItem>
          </Link>
          <DropdownMenuGroup className="hidden">
            <DropdownMenuItem className="cursor-pointer">
              <Info />
              Termos
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <Link href={"/"}>
            <DropdownMenuItem className="cursor-pointer">
              <SquareArrowOutUpRight />
              Página Inicial
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
            <LogOut />
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}

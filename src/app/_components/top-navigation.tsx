"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Menu } from "lucide-react";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useFocusSection } from "@/hooks/use-focus-section";
import { DialogClose } from "@/components/ui/dialog";

export function TopNavigation() {
  const { focusSection } = useFocusSection();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative">
      <div className="container fixed left-0 right-0 top-3 z-50 px-4 mx-auto">
        <header
          className={`${
            isScrolled ? "bg-white shadow-md" : "bg-transparent"
          } border-border rounded-full w-full transition-colors duration-300 px-4`}
        >
          <div className="container flex items-center h-[8vh] mx-auto justify-between">
            <Link href="/" className="hover:opacity-60">
              <Image
                src="/icons/logo-black.png"
                alt="logo"
                width={140}
                height={80}
                style={{ height: "40px", width: "140px" }}
              />
            </Link>
            <div className="flex flex-grow-0 flex-shrink-0 lg:flex-1">
              <nav className="space-x-3 items-center justify-end flex-1 hidden lg:flex">
                <Button
                  onClick={() => focusSection("sobre")}
                  variant={"ghost"}
                  className="text-lg font-semibold"
                >
                  Sobre
                </Button>
                <Button
                  onClick={() => focusSection("ferramentas")}
                  variant={"ghost"}
                  className="text-lg font-semibold"
                >
                  Ferramentas
                </Button>
                <Button
                  onClick={() => focusSection("precos")}
                  variant={"ghost"}
                  className="text-lg font-semibold"
                >
                  Preços
                </Button>
                <Button
                  onClick={() => focusSection("faq")}
                  variant={"ghost"}
                  className="text-lg font-semibold"
                >
                  FAQ
                </Button>
                <Link href="/login">
                  <Button className="rounded-full py-6 px-10 text-lg font-semibold">Entrar</Button>
                </Link>
              </nav>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size={"icon"}
                    className="lg:hidden flex bg-transparent border-none shadow-none [&_svg]:size-6"
                  >
                    <Menu />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side={"left"}
                  aria-description="conteudo"
                  aria-describedby="conteudo"
                  className="w-64 bg-white border-none flex flex-col p-0"
                >
                  <SheetTitle className="sr-only">Menu mobile</SheetTitle>
                  <SheetDescription className="sr-only">Menu mobile</SheetDescription>
                  <div className="p-5 pt-11">
                    <Link href={"/dashboard"}>
                      <Image
                        src={"/icons/logo-black.png"}
                        alt="logo"
                        width={120}
                        height={70}
                        style={{ width: "auto" }}
                      />
                    </Link>
                  </div>
                  <nav className="flex-1 p-5">
                    <ul className="flex flex-col gap-7">
                      <DialogClose asChild>
                        <Button
                          onClick={() => focusSection("sobre")}
                          variant={"ghost"}
                          className="text-lg font-semibold text-green-2 w-fit"
                        >
                          Sobre
                        </Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button
                          onClick={() => focusSection("ferramentas")}
                          variant={"ghost"}
                          className="text-lg font-semibold text-green-2 w-fit"
                        >
                          Ferramentas
                        </Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button
                          onClick={() => focusSection("precos")}
                          variant={"ghost"}
                          className="text-lg font-semibold text-green-2 w-fit"
                        >
                          Preços
                        </Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button
                          onClick={() => focusSection("faq")}
                          variant={"ghost"}
                          className="text-lg font-semibold text-green-2 w-fit"
                        >
                          FAQ
                        </Button>
                      </DialogClose>
                    </ul>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}

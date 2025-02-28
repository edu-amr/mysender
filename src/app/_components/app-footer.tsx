import Image from "next/image";
import Link from "next/link";
import { Linkedin, Twitter } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function AppFooter() {
  return (
    <footer className="py-12 border-t border-border relative mt-28 mx-auto">
      <div className="container max-w-screen-xl flex flex-col items-center justify-center text-center mx-auto">
        <Image
          alt="Logo"
          width={140}
          height={80}
          className="rounded-md w-10 h-10"
          src="/icons/favicon.png"
        />
        <p className="text-lg text-muted-foreground md:max-w-[40%] mt-4 px-4">
          Transforme seu WhatsApp em sua melhor ferramenta de vendas
        </p>
        <div className="flex items-center space-x-2 mt-8">
          <Link
            href="https://x.com/edu_amr_"
            target="_blank"
            rel="noreferrer"
            className="group rounded-md p-2 transition-colors dark:text-white/60 dark:hover:bg-white/10 dark:active:bg-white/20"
          >
            <span className="sr-only">Twitter</span>
            <Twitter />
          </Link>
          <Separator orientation="vertical" className="h-8" />
          <Link
            href="https://www.linkedin.com/in/edu-amr/"
            target="_blank"
            rel="noreferrer"
            className="rounded-md p-2 transition-colors dark:text-white/60 dark:hover:bg-white/10 dark:active:bg-white/20"
          >
            <span className="sr-only">LinkedIn</span>
            <Linkedin />
          </Link>
        </div>
      </div>
      <div className="border-t border-border mt-6 pt-8 text-sm mx-auto">
        <div className="container max-w-screen-xl flex flex-col md:flex-row text-center md:text-left justify-between opacity-60 mx-auto px-10">
          <p className="mb-8 md:mb-0 mx-auto">
            © {new Date().getFullYear()} Zaptra. Todos os direitos reservados.
          </p>
          {/* <Link href="/termos">Termos de Uso</Link> */}
        </div>
      </div>
    </footer>
  );
}

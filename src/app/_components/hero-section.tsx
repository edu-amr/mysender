import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Button } from "@/components/ui/button";
import { ShineBorder } from "@/components/ui/shine-border";

const people = [
  {
    id: 1,
    name: "João Silva",
    designation: "Gestor de Tráfego",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Roberto Costa",
    designation: "Afiliado Digital",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Juliana Souza",
    designation: "Infoprodutora",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Emily Ferreira",
    designation: "Social Media",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    name: "Tiago Duarte",
    designation: "Dono de Loja Online",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  },
  {
    id: 6,
    name: "Carla Menezes",
    designation: "Consultora de Vendas",
    image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
  },
];

export function HeroSection() {
  return (
    <section className="relative w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-green-5/30 to-green-1/30 rounded-b-3xl">
      <div className="container flex flex-col items-center pt-48 w-full mx-auto px-4">
        <div className="flex flex-col items-center justify-center mb-2 w-full gap-4">
          <div className="flex flex-row items-center justify-center">
            <AnimatedTooltip items={people} />
          </div>
          <p className="text-lg font-normal">Usado por mais de 247 clientes satisfeitos</p>
        </div>
        <h1 className="font-bold text-center max-w-6xl text-4xl leading-[3.2rem] mt-4  md:text-6xl md:leading-[4.2rem]">
          Dispare mensagens no <span className="text-green-2">WhatsApp</span> de forma rápida e
          prática
        </h1>
        <p className="text-center mt-4 max-w-[30rem] md:max-w-2xl text-zinc-900 md:leading-normal font-medium text-base md:text-lg">
          Crie, gerencie e dispare mensagens no WhatsApp com rapidez e eficiência. Ideal para
          empresas que buscam engajamento direto e resultados mensuráveis.
        </p>
        <Link href="/login" className="w-fit mt-14">
          <Button className="rounded-full py-7 px-10 text-lg font-semibold">
            Comece agora
            <MoveRight />
          </Button>
        </Link>

        <div className="relative top-20 w-full ">
          <ShineBorder
            className="relative w-full rounded-lg border md:shadow-xl overflow-hidden p-0"
            color={["#afe230", "#E6FFDA", "#22C55E"]}
            duration={6}
          >
            <Image
              alt="Guides"
              width="1467"
              height="900"
              decoding="async"
              sizes="100vw"
              src="/images/plataform-preview.png"
              style={{
                width: "100%",
                height: "auto",
                color: "transparent",
              }}
            />
          </ShineBorder>
        </div>
      </div>
    </section>
  );
}

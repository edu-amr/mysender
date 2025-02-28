"use client";

import React from "react";

import { Card, Carousel } from "@/components/ui/apple-cards-carousel";

export function SolutionsShowcaseSection() {
  const cards = data.map((card, index) => <Card key={card.src} card={card} index={index} />);

  return (
    <section className="w-full pt-10 pb-10 mt-20" id="ferramentas">
      <div className="px-6">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mx-auto">
            <h2 className="text-sm text-green-2 font-mono font-semibold tracking-wider uppercase">
              Solução
            </h2>
            <h3 className="mx-auto mt-4 text-3xl font-semibold md:text-4xl lg:text-5xl">
              Porque usar a solução da Zaptra?
            </h3>
          </div>
        </div>
      </div>
      <Carousel items={cards} />
    </section>
  );
}

const data = [
  {
    category: "Envio de Cupons",
    title: "Envie cupons de descontos, ofertas e promoções",
    src: "/images/carrousel-1.svg",
    content: (
      <p>
        Crie oportunidades exclusivas para trazer seus leads de volta à jornada ou avançá-los nas
        etapas do funil.
      </p>
    ),
  },
  {
    category: "Lançamentos de Produtos",
    title: "Faça lançamentos de novos produtos e serviços",
    src: "/images/carrousel-2.svg",
    content: (
      <p>
        Identifique os clientes com mais chances de converter novamente e converse com eles na hora
        certa.
      </p>
    ),
  },
  {
    category: "Convites e Reuniões",
    title: "Dispare convites para Eventos, webinars e reuniões",
    src: "/images/carrousel-3.svg",
    content: (
      <p>
        Ajude sua audiência a lembrar dos seus eventos online e aumente a taxa de participação e
        engajamento.
      </p>
    ),
  },
  {
    category: "Materiais Ricos",
    title: "Divulgue materiais ricos e recomende conteúdos",
    src: "/images/carrousel-4.svg",
    content: (
      <p>
        Apoie sua estratégia de Inbound Marketing e envie conteúdos através do canal mais usado
        pelo seu público.
      </p>
    ),
  },
  {
    category: "Segmentação de Contatos",
    title: "Segmentação inteligente para campanhas direcionadas",
    src: "/images/carrousel-5.svg",
    content: (
      <p>
        Alcance diferentes grupos de clientes com mensagens personalizadas e relevantes, aumentando
        suas taxas de conversão.
      </p>
    ),
  },
  {
    category: "Métricas Simples",
    title: "Monitore suas campanhas com facilidade",
    src: "/images/carrousel-6.svg",
    content: (
      <p>
        Visualize o total de mensagens enviadas e acompanhe suas campanhas recentes. Simples e direto,
        para que você foque no que realmente importa: engajar seu público.
      </p>
    ),
  },
];

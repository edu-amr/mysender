export const plans = [
  {
    id: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_START,
    name: "Start",
    price: "R$49,90",
    description: "Ideal para quem está começando e deseja automatizar suas mensagens no WhatsApp.",
    features: [
      "1 Instância de WhatsApp",
      "7.000 disparos por mês (não acumulável)",
      "Suporte 24/7",
    ],
    popular: true,
  },
  {
    id: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_GROWTH,
    name: "Growth",
    price: "R$89,90",
    description: "Para quem precisa de um alcance maior e deseja expandir suas campanhas no WhatsApp.",
    features: [
      "1 Instância de WhatsApp",
      "15.000 disparos por mês (não acumulável)",
      "Suporte 24/7",
    ],
  },
  {
    id: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_SCALE,
    name: "Scale",
    price: "R$109,90",
    description: "Perfeito para escalar suas campanhas e garantir um alto volume de envios no WhatsApp.",
    features: [
      "1 Instância de WhatsApp",
      "25.000 disparos por mês (não acumulável)",
      "Suporte 24/7",
    ],
  },
];
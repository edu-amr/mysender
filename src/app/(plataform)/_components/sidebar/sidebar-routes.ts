import { ChartArea, Send, CreditCard, MessageSquareQuote, LucideIcon, QrCode } from "lucide-react";

export type Route = {
  title: string;
  label: string;
  href: string;
  icon: LucideIcon;
};

export const sidebarRoutes: Route[] = [
  {
    title: "Dashboard",
    label:
      "Acompanhe o número total de mensagens enviadas e os disparos realizados. Visualize rapidamente os dados gerais de uso da sua conta de forma prática e direta.",
    href: "/dashboard",
    icon: ChartArea,
  },
  {
    title: "Instância",
    label:
      "Configure sua conexão com o WhatsApp gerando o QR code e monitorando o status da instância. Gerencie a conexão para evitar interrupções e manter seus disparos ativos.",
    href: "/instancias",
    icon: QrCode,
  },
  {
    title: "disparo",
    label:
      "Faça disparos de mensagens para sua lista de contatos de forma simples e eficiente. Importe arquivos CSV com os números de destino e envie suas campanhas instantaneamente.",
    href: "/disparo",
    icon: Send,
  },
  {
    title: "Feedback",
    label:
      "Envie sua opinião sobre a plataforma para nos ajudar a melhorar. Compartilhe sugestões, problemas encontrados ou elogios para tornar o serviço ainda melhor.",
    href: "/feedback",
    icon: MessageSquareQuote,
  },
  {
    title: "Assinatura",
    label:
      "Gerencie seu plano de assinatura, visualize os limites de disparos disponíveis e aproveite os benefícios exclusivos para sua conta. Escolha o plano que melhor atende às suas necessidades.",
    href: "/assinatura",
    icon: CreditCard,
  },
];

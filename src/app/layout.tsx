import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { CrispChat } from "@/scripts/crisp-chat";
import { GoogleAnalytics } from "@/scripts/google-analytics";
import { MicrosoftClarity } from "@/scripts/microsoft-clarity";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Zaptra - Disparos em Massa no WhatsApp",
  description: `Automatize e escale suas campanhas no WhatsApp com o Zaptra. 
  Envie mensagens em massa de forma segura, rápida e eficiente para alcançar 
  seus clientes com praticidade.`,
  authors: {
    name: "Eduardo Amaro Maciel",
  },
  icons: {
    icon: "/icons/favicon.png",
  },
  keywords: [
    "disparo em massa WhatsApp",
    "envio automatizado de mensagens",
    "marketing no WhatsApp",
    "WhatsApp API",
    "mensagens automáticas",
    "automação de WhatsApp",
    "bot de WhatsApp",
    "Zaptra",
    "blast messages WhatsApp",
    "WhatsApp marketing",
    "mensagens em massa",
    "plataforma de disparo WhatsApp",
    "automação de mensagens WhatsApp",
    "whatsapp bulk sender",
  ],
  openGraph: {
    title: "Zaptra - Disparos em Massa no WhatsApp",
    description: "Automatize e escale suas campanhas no WhatsApp com Zaptra.",
    url: "https://www.zaptra.com.br",
    siteName: "Zaptra",
    images: [
      {
        url: "/images/plataform-preview.png",
        width: 1200,
        height: 630,
        alt: "Zaptra - Disparos em Massa no WhatsApp",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zaptra - Disparos em Massa no WhatsApp",
    description: "Automatize e escale suas campanhas no WhatsApp com Zaptra.",
    images: ["/images/plataform-preview.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.zaptra.com.br",
  },
};

const manrope = Manrope({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={manrope.className}>
        {children}
        <Toaster />
        {process.env.NODE_ENV === "production" && (
          <>
            <CrispChat />
            <GoogleAnalytics />
            <MicrosoftClarity />
          </>
        )}
      </body>
    </html>
  );
}

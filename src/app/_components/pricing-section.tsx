import { Check } from "lucide-react";
import Link from "next/link";

export function PricingSection() {
  return (
    <section className="w-full container mx-auto mt-20 px-4" id="precos">
      <div className="text-center space-y-4 pb-20 mx-auto">
        <h2 className="text-sm text-green-2 font-mono font-semibold tracking-wider uppercase">
          Valores
        </h2>
        <h3 className="mx-auto mt-4 text-3xl font-semibold md:text-4xl lg:text-5xl">
          Escolha o plano ideal e potencialize seu WhatsApp
        </h3>
      </div>
      <div className="flex gap-8 justify-center flex-col lg:flex-row">
        <div className="relative p-8 border border-gray-200 rounded-2xl shadow-sm flex flex-col w-full">
          <div className="flex-1">
            <h3 className="text-xl font-semibold">Start</h3>
            <p className="absolute top-0 py-1.5 px-4 bg-green-3 text-green-1 rounded-full text-xs font-bold uppercase tracking-wide transform -translate-y-1/2">
              Mais Popular
            </p>
            <p className="mt-4 flex items-baseline">
              <span className="text-5xl font-extrabold tracking-tight">R$49,90</span>
              <span className="ml-1 text-xl font-semibold">/mês</span>
            </p>
            <p className="mt-6">
              Ideal para quem está começando e deseja automatizar suas mensagens no WhatsApp de
              forma simples e eficiente.
            </p>
            <ul role="list" className="mt-6 space-y-6">
              <li className="flex">
                <Check size={24} className="text-green-1" />
                <span className="ml-3">1 Instância de WhatsApp</span>
              </li>
              <li className="flex">
                <Check size={24} className="text-green-1" />
                <span className="ml-3">7.000 disparos por mês (não acumulável)</span>
              </li>
              <li className="flex">
                <Check size={24} className="text-green-1" />
                <span className="ml-3">Suport 24/7</span>
              </li>
            </ul>
          </div>
          <Link
            className="bg-green-1 hover:bg-green-1/60 text-green-3 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-bold"
            href="/assinatura"
          >
            Assinar o plano Start
          </Link>
        </div>
        <div className="relative p-8 border border-gray-200 rounded-2xl shadow-sm flex flex-col w-full">
          <div className="flex-1">
            <h3 className="text-xl font-semibold">Growth</h3>
            <p className="mt-4 flex items-baseline">
              <span className="text-5xl font-extrabold tracking-tight">R$89,90</span>
              <span className="ml-1 text-xl font-semibold">/mês</span>
            </p>
            <p className="mt-6">
              Para quem precisa de um alcance maior e deseja expandir suas campanhas no WhatsApp com
              mais eficiência.
            </p>
            <ul role="list" className="mt-6 space-y-6">
              <li className="flex">
                <Check size={24} className="text-green-1" />
                <span className="ml-3">1 Instância de WhatsApp</span>
              </li>
              <li className="flex">
                <Check size={24} className="text-green-1" />
                <span className="ml-3">10.000 disparos por mês (não acumulável)</span>
              </li>
              <li className="flex">
                <Check size={24} className="text-green-1" />
                <span className="ml-3">Suport 24/7</span>
              </li>
            </ul>
          </div>
          <Link
            className="bg-green-1/30 hover:bg-green-1/70 text-green-3 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-bold"
            href="/assinatura"
          >
            Assinar o plano Growth
          </Link>
        </div>
        <div className="relative p-8 border border-gray-200 rounded-2xl shadow-sm flex flex-col w-full">
          <div className="flex-1">
            <h3 className="text-xl font-semibold">Scale</h3>
            <p className="mt-4 flex items-baseline">
              <span className="text-5xl font-extrabold tracking-tight">R$109,90</span>
              <span className="ml-1 text-xl font-semibold">/mês</span>
            </p>
            <p className="mt-6">
              Perfeito para quem deseja escalar suas campanhas e garantir um alto volume de envios
              no WhatsApp.
            </p>
            <ul role="list" className="mt-6 space-y-6">
              <li className="flex">
                <Check size={24} className="text-green-1" />
                <span className="ml-3">1 Instância de WhatsApp</span>
              </li>
              <li className="flex">
                <Check size={24} className="text-green-1" />
                <span className="ml-3">25.000 disparos por mês (não acumulável)</span>
              </li>
              <li className="flex">
                <Check size={24} className="text-green-1" />
                <span className="ml-3">Suport 24/7</span>
              </li>
            </ul>
          </div>
          <Link
            className="bg-green-1/30 hover:bg-green-1/70 text-green-3 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-bold"
            href="/assinatura"
          >
            Assinar o plano Scale
          </Link>
        </div>
      </div>
    </section>
  );
}

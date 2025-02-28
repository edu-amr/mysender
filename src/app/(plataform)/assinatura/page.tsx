"use client";

import { useState, useEffect } from "react";
import { Check, Info } from "lucide-react";
import { plans } from "@/lib/stripe/plans";
import { Loading } from "@/components/loading";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Assinatura() {
  const [loading, setLoading] = useState(false);
  const [checkingSubscription, setCheckingSubscription] = useState(true);
  const [hasSubscription, setHasSubscription] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const res = await fetch("/api/check-subscription");
        const { isActive } = await res.json();
        setHasSubscription(isActive);
      } catch (error) {
        console.error("Erro ao verificar assinatura:", error);
      } finally {
        setCheckingSubscription(false);
      }
    };

    checkSubscription();
  }, []);

  const handleSubscription = async (priceId: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/customer-portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Erro ao acessar o portal do cliente:", error);
    } finally {
      setLoading(false);
    }
  };

  if (checkingSubscription) {
    return (
      <div className="flex justify-center items-center mt-20">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full">
      <Alert className="bg-green-5/20">
        <Info className="mt-2 w-4 h-4" color="#1b6302"/>
        <AlertTitle className="text-green-2 text-lg">Dúvidas?</AlertTitle>
        <AlertDescription className="text-base">
          Caso tenha dúvidas, entre em contato pelo chat localizado no canto inferior
          direito do site.
        </AlertDescription>
      </Alert>

      <div className="2xl:flex-row flex-col flex flex-1 gap-8 justify-center mt-16">
        {plans.map((plan) => (
          <div
            key={plan.price}
            className="relative p-8 border border-gray-200 rounded-2xl shadow-sm flex flex-col w-full"
          >
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              {plan.popular && (
                <p className="absolute top-0 py-1.5 px-4 bg-green-3 text-green-1 rounded-full text-xs font-bold uppercase tracking-wide transform -translate-y-1/2">
                  Mais Popular
                </p>
              )}
              <p className="mt-4 flex items-baseline">
                <span className="text-5xl font-extrabold tracking-tight">{plan.price}</span>
                <span className="ml-1 text-xl font-semibold">/mês</span>
              </p>
              <p className="mt-6">{plan.description}</p>
              <ul role="list" className="mt-6 space-y-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex">
                    <Check size={24} className="text-green-1" />
                    <span className="ml-3">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => handleSubscription(plan.id as string)}
              disabled={loading}
              className="bg-green-1 hover:bg-green-1/60 text-green-3 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-bold"
            >
              {loading ? (
                <p>Carregando...</p>
              ) : hasSubscription ? (
                "Gerenciar assinatura"
              ) : (
                `Assinar o plano ${plan.name}`
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

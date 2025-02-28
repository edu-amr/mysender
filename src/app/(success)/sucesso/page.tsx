"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loading } from "@/components/loading";
import dynamic from "next/dynamic";

const SuccessAnimation = dynamic(() => import("./_components/success-lottie"), { ssr: false });

export default function Success() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [isValidSession, setIsValidSession] = useState<boolean | null>(null);

  useEffect(() => {
    const validateSession = async () => {
      if (!sessionId) {
        router.replace("/assinaturas");
        return;
      }

      try {
        const res = await fetch(`/api/check-payment?session_id=${sessionId}`);
        const data = await res.json();

        if (!data.valid) {
          router.replace("/assinatura");
        } else {
          setIsValidSession(true);
        }
      } catch (error) {
        console.error("Erro ao validar sessão:", error);
        router.replace("/assinatura");
      }
    };

    validateSession();
  }, [sessionId, router]);

  if (isValidSession === null) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex items-center justify-center flex-col">
      <div className="mt-[-300px] flex flex-col justify-center items-center">
        <SuccessAnimation />
        <h1 className="font-bold mt-[-70px] text-4xl text-green-6">Sucesso!</h1>
        <p className="text-gray-600 max-w-2xl text-center mt-10 text-lg">
          Seu pagamento foi aprovado com sucesso! 🎉 Caso tenha alguma dúvida, entre em contato com
          nosso suporte.
        </p>
        <Link href={"/dashboard"}>
          <Button className="bg-green-6 hover:bg-green-6/50 text-white mt-8 py-7 px-6 border border-transparent rounded-md text-center font-bold w-fit text-lg">
            Voltar para o Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}

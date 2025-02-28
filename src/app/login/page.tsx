import Image from "next/image";
import { GoogleBtnLogin } from "./_components/google-btn-login";

export default function Login() {
  return (
    <div className="flex h-svh flex-col justify-between bg-white md:h-screen">
      <main className="flex flex-1 flex-col">
        <div className="flex h-screen items-center justify-center bg-G100">
          <div className="md:w-[50%] flex items-center justify-center ">
            <div className="max-w-[500px] px-[20px]">
              <div className="mb-4">
                <div className="mb-10">
                  <Image
                    src="/icons/logo-black.png"
                    alt="Logo da Zaptra"
                    width={200}
                    height={80}
                    priority
                    style={{
                      width: "200px",
                      height: "55px",
                    }}
                  />
                </div>
                <h1 className="text-zinc-900 font-semibold text-[32px] mb-[16px]">
                  Simplifique suas campanhas no WhatsApp facilmente.
                </h1>
                <p className="font-normal text-zinc-500">
                  Zaptra simplifica suas campanhas no WhatsApp. Faça upload de suas listas e dispare
                  mensagens com facilidade.
                </p>
              </div>
              <GoogleBtnLogin />
              <p className="mt-[24px]">
                Usando a Zaptra, você concorda em utilizar a plataforma de forma responsável.
                {/* Criando uma conta, você concorda com todos os nossos{" "}
                <a className="underline text-primary" href="/termos">
                  termos e condições
                </a>
                . */}
              </p>
            </div>
          </div>
          <div className="md:w-[50%] hidden h-[100%] md:flex items-center justify-center bg-[url('/images/login.jpg')] bg-cover bg-no-repeat bg-center"></div>
        </div>
      </main>
    </div>
  );
}

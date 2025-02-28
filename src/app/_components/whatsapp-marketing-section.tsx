export function WhatsAppMarketingSection() {
  return (
    <section className="container mx-auto px-4 pr-6 pt-16 md:pt-32">
      <div className="text-center space-y-4 pb-16 mx-auto">
        <h2 className="text-sm text-green-2 font-mono font-semibold tracking-wider uppercase">
          WhatsApp para marketing
        </h2>
        <h3 className="mx-auto mt-4 text-3xl font-semibold md:text-4xl lg:text-5xl">
          O que torna as Campanhas WhatsApp tão poderosas?
        </h3>
      </div>
      <div className="w-full pr-2 flex flex-col gap-8  mx-auto">
        <div className="bg-green-1/10 p-7 rounded-3xl message-clip relative w-fit ml-auto">
          <p className="leading-8 w-fit text-base md:text-lg lg:text-xl">
            Com mais de 2 bilhões de usuários ativos e uma taxa de clique de 60%, o WhatsApp é o app
            de mensagens mais usado no mundo, oferecendo comunicação direta e alta taxa de
            engajamento.
          </p>
        </div>
        <div className="bg-green-1/10 p-7 rounded-3xl message-clip relative w-fit ml-auto">
          <p className="leading-8 w-fit text-base md:text-lg lg:text-xl">
            Diferente de outras APIs de WhatsApp Business, que exigem contato inicial do cliente, as
            campanhas WhatsApp da Zaptra permitem enviar mensagens para todos os seus contatos, como
            em campanhas de e-mail ou SMS
          </p>
        </div>
        <div className="bg-green-1/10 p-7 rounded-3xl message-clip relative w-fit ml-auto">
          <p className="leading-8 w-fit text-base md:text-lg lg:text-xl">
            Não é necessário que eles entrem em contato com você primeiro.
          </p>
        </div>
        <div className="bg-green-1/10 p-7 rounded-3xl message-clip relative w-fit ml-auto">
          <p className="leading-8 w-fit text-base md:text-lg lg:text-xl">😉</p>
        </div>
      </div>
    </section>
  );
}

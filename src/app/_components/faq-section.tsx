import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Como faço para conectar minha conta do WhatsApp ao Zaptra?",
    answer:
      "Para conectar sua conta, basta abrir o WhatsApp no seu celular, acessar o menu de configurações e selecionar 'WhatsApp Web'. Em seguida, aponte a câmera do seu telefone para o QR Code exibido na tela do Zaptra e pronto! Sua conta estará conectada e pronta para enviar mensagens.",
  },
  {
    question: "Preciso instalar algum software ou tudo funciona pelo navegador?",
    answer:
      "Não é necessário instalar nenhum software adicional. O Zaptra funciona totalmente pelo navegador, permitindo que você acesse e gerencie seus disparos de qualquer lugar sem precisar instalar programas.",
  },
  {
    question:
      "Preciso manter meu telefone ligado e conectado à internet para os disparos funcionarem?",
    answer:
      "Sim, mas apenas o WhatsApp precisa permanecer conectado à instância para que os disparos sejam realizados. Caso o WhatsApp seja desconectado, os envios podem ser interrompidos.",
  },
  {
    question: "Posso personalizar as mensagens enviadas? Como faço isso?",
    answer:
      "Sim! Você pode personalizar suas mensagens diretamente na ferramenta. No momento do disparo, basta criar um template de mensagem, podendo incluir variáveis para personalização conforme a necessidade da sua campanha.",
  },
  {
    question: "É possível agendar disparos para um horário específico?",
    answer:
      "Ainda não, mas estamos trabalhando para disponibilizar essa funcionalidade em breve. Nosso objetivo é permitir que você programe suas campanhas para envio automático no melhor horário para o seu público.",
  },
  {
    question: "Existe algum limite de mensagens que posso enviar por dia/mês?",
    answer:
      "Sim, o limite de disparos varia conforme o plano contratado. No Plano Start, você pode enviar até 4.000 mensagens por mês, enquanto no Plano Pro o limite é de 10.000 mensagens por mês.",
  },
  {
    question: "Consigo acompanhar o histórico de mensagens enviadas?",
    answer:
      "Sim! O Zaptra oferece uma visualização completa do histórico de campanhas disparadas, permitindo que você acompanhe o desempenho das suas mensagens e tenha mais controle sobre seus envios.",
  },
  {
    question: "O que acontece se eu atingir o limite de disparos do meu plano?",
    answer:
      "Caso você atinja o limite de disparos do seu plano, a ferramenta não enviará mensagens adicionais até que o limite seja renovado no próximo ciclo ou até que você faça um upgrade para um plano superior.",
  },
  {
    question: "Meus contatos e mensagens são armazenados na plataforma?",
    answer:
      "Armazenamos apenas o arquivo CSV com os contatos em um banco de dados criptografado para garantir segurança. Se desejar remover seus contatos da plataforma, basta entrar em contato conosco e faremos a exclusão dos dados.",
  },
];

export function FaqSection() {
  return (
    <section className="px-6 pt-28 lg:pt-32" id="faq">
      <div className="container max-w-screen-xl mx-auto">
        <div className="text-center space-y-4 mx-auto pb-14 lg:pb-20">
          <h2 className="text-sm text-green-2 font-mono font-semibold tracking-wider uppercase">
            FAQ
          </h2>
          <h3 className="mx-auto mt-4 text-3xl font-semibold md:text-4xl lg:text-5xl">
            Perguntas Frequentes
          </h3>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqs &&
            faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index} className="border px-5 rounded-xl">
                <AccordionTrigger className="md:text-xl text-base">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </div>
    </section>
  );
}

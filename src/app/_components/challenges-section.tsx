import { BarChart, ClockAlert, PencilRuler, Users } from "lucide-react";

export function ChallengesSection() {
  return (
    <section className="container mx-auto pt-48 px-4" id="sobre">
      <div className="text-center space-y-4 pb-16 mx-auto">
        <h2 className="text-sm text-green-2 font-mono font-semibold tracking-wider uppercase">
          Problema
        </h2>
        <h3 className="mx-auto mt-4 text-3xl font-semibold md:text-4xl lg:text-5xl">
          Os desafios do envio em massa
        </h3>
      </div>
      <div className="grid gap-12 grid-cols-1 md:gap-20 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border text-card-foreground bg-background border-none shadow-none">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-green-1/20 rounded-full flex items-center justify-center">
              <PencilRuler className="text-green-2" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold">Falta de ferramentas práticas e acessíveis</h3>
            <p className="text-muted-foreground text-base md:text-base">
              Muitas soluções são complexas e caras, dificultando o acesso de pequenos negócios à
              automação de mensagens no WhatsApp.
            </p>
          </div>
        </div>
        <div className="rounded-lg border text-card-foreground bg-background border-none shadow-none">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-green-1/20 rounded-full flex items-center justify-center">
              <Users className="text-green-2" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold">Dificuldade em alcançar todos os clientes</h3>
            <p className="text-muted-foreground text-base md:text-base">
              Enviar mensagens personalizadas para grandes listas de contatos de forma manual é
              trabalhoso e ineficaz.
            </p>
          </div>
        </div>
        <div className="rounded-lg border text-card-foreground bg-background border-none shadow-none">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-green-1/20 rounded-full flex items-center justify-center">
              <BarChart className="text-green-2" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold">Falta de controle sobre campanhas enviadas</h3>
            <p className="text-muted-foreground text-base md:text-base">
              Sem um sistema para acompanhar métricas, é difícil medir o impacto das campanhas e
              melhorar resultados futuros.
            </p>
          </div>
        </div>
        <div className="rounded-lg border text-card-foreground bg-background border-none shadow-none">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-green-1/20 rounded-full flex items-center justify-center">
              <ClockAlert className="text-green-2" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold">Perda de tempo com processos manuais</h3>
            <p className="text-muted-foreground text-base md:text-base">
              Processos manuais para criar, organizar e disparar mensagens consomem tempo e atrasam
              outras atividades importantes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
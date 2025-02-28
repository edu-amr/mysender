"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { sendFeedback } from "./actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Separator } from "@/components/ui/separator";

const feedbackSchema = z.object({
  category: z.string().min(1, { message: "Selecione uma categoria." }),
  message: z.string().min(10, { message: "O feedback deve ter pelo menos 10 caracteres." }),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

const nextSteps = [
  {
    title: "Conexão de Múltiplas Instância",
    description: "Permitir a conexão de várias instâncias de WhatsApp para maior flexibilidade junto a seleção da instância do WhatsApp para cada disparo.",
  },
  {
    title: "Histórico de Campanhas Melhorado",
    description: "Aprimorar a visualização e o gerenciamento do histórico de campanhas e disparos.",
  },
  {
    title: "Agendamento de Mensagens",
    description: "Adicionar a funcionalidade de agendamento para disparo de mensagens futuras.",
  },
  {
    title: "Planos Personalizados",
    description: "Criar novos tipos de planos que atendam diferentes necessidades dos usuários.",
  },
  {
    title: "Pré-visualização de Contatos",
    description:
      "Exibir o conteúdo do CSV e permitir adicionar novos contatos diretamente na plataforma.",
  },
  {
    title: "Templates reutilizáveis e prontos para uso utilizando IA",
    description: "Habilitar a criação e personalização de templates reutilizáveis, além de disponibilizar uma biblioteca de templates prontos para facilitar a criação de campanhas rapidamente."
  },
];

export default function FeedbackForm() {
  const { toast } = useToast();

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      category: "",
      message: "",
    },
  });

  const onSubmit = async (values: FeedbackFormValues) => {
    try {
      await sendFeedback(values.category, values.message);
      toast({
        title: "Seu feedback foi enviado",
        description: "Ficamos felizes em receber o seu feedback!",
      });
      form.reset();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Parece que algo deu errado",
        description: "Houve um problema com sua solicitação.",
      });
    }
  };

  return (
    <div className="w-full flex flex-col gap-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 p-6 border rounded-lg w-full bg-white"
        >
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full py-5">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categorias</SelectLabel>
                        <SelectItem value="bug">Bug</SelectItem>
                        <SelectItem value="sugestao">Sugestão</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mensagem</FormLabel>
                <FormControl>
                  <Textarea placeholder="Descreva seu feedback" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-green-3 py-5">
            Enviar Feedback
          </Button>
        </form>
      </Form>
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-xl">Nós escutamos seu feedback</h2>
        <p className="text-base text-zinc-500">
          Estamos comprometidos em tornar o Zaptra ainda melhor para você. Cada ideia e sugestão que
          recebemos nos ajuda a aprimorar nossos serviços, trazendo mais praticidade e eficiência
          para sua experiência. Confira as melhorias que estamos desenvolvendo com base no seu
          feedback!
        </p>
        <Separator />
        <div className="lg:grid-cols-3 sm:grid-cols-2 grid grid-cols-1 gap-4">
          {nextSteps.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

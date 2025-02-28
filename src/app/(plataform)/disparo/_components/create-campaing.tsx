"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { ArrowDownToLine, CloudUpload, Lock, Send } from "lucide-react";
import Dropzone from "react-dropzone";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loading } from "@/components/loading";

const campaignSchema = z.object({
  name: z.string().min(1, { message: "O nome da campanha é obrigatório." }),
  category: z.string().min(1, { message: "Selecione uma categoria de envio." }),
  message: z.string().min(10, { message: "A mensagem deve ter pelo menos 10 caracteres." }),
  csvFile: z
    .instanceof(File, { message: "O arquivo deve ser um arquivo válido." })
    .refine((file) => file?.type === "text/csv", {
      message: "O arquivo deve ser um CSV.",
    }),
});

type CampaignFormValues = z.infer<typeof campaignSchema>;

export function CreateCampaing() {
  const [text, setText] = useState("");
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const renderPreview = (inputText: string) => {
    const placeholder = "%nome%";
    const parts = inputText.split(placeholder);

    return parts.map((part, index) => (
      <div key={index} className="w-full inline">
        {part.trim()}
        {index < parts.length - 1 && (
          <Badge className="bg-green-300/50 text-green-600 border border-green-600/50 text-center mx-2">
            Nome
          </Badge>
        )}
      </div>
    ));
  };

  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      name: "",
      category: "",
      message: "",
      csvFile: undefined,
    },
  });

  const onSubmit = async (values: CampaignFormValues) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("category", values.category);
    formData.append("message", values.message);
    formData.append("csvFile", values.csvFile);

    try {
      const response = await fetch("/api/instance/create-campaign", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro ${response.status}: ${response.statusText}`);
      }

      toast({
        title: "Campanha enviada com sucesso!",
        description: "As mensagens estão sendo enviadas.",
      });
    } catch (error) {
      console.error("Erro ao enviar campanha:", error);

      toast({
        title: "Erro ao enviar campanha",
        description: error instanceof Error ? error.message : "Ocorreu um erro inesperado.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }

    form.reset();
    setSelectedFileName(null);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-6 bg-white border rounded-lg w-full"
      >
        <div className="md:flex-row flex-col flex gap-5">
          <div className="w-full flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Nome da campanha</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da campanha" {...field} className="py-5" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="csvFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Carregue o arquivo CSV</FormLabel>
                  <FormControl>
                    <Dropzone
                      multiple={false}
                      onDrop={(acceptedFiles) => {
                        if (acceptedFiles.length === 1) {
                          field.onChange(acceptedFiles[0]);
                          setSelectedFileName(acceptedFiles[0].name);
                        } else {
                          field.onChange(undefined);
                          setSelectedFileName(null);
                        }
                      }}
                      accept={{
                        "text/csv": [".csv"],
                      }}
                      maxFiles={1}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div
                          {...getRootProps({
                            className:
                              "border border-dashed border-gray-300 bg-gray-50 rounded-lg text-center cursor-pointer h-52 flex items-center justify-center flex-col",
                          })}
                        >
                          <input {...getInputProps()} />
                          <div className="bg-white border mb-3 p-2 w-fit mx-auto rounded-xl">
                            <CloudUpload size={36} className="text-green-2" />
                          </div>
                          <p className="text-zinc-900 font-semibold text-lg">
                            {selectedFileName
                              ? `Arquivo selecionado: ${selectedFileName}`
                              : "Carregue um arquivo com seus contatos"}
                          </p>
                          <span className="text-gray-500 text-sm mt-3 block">
                            Somente arquivos CSV
                          </span>
                        </div>
                      )}
                    </Dropzone>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Categoria de Envio</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full py-5">
                        <SelectValue placeholder="Selecione uma categoria de envio" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Categorias</SelectLabel>
                          <SelectItem value="lento">
                            Lento 60s por mensagem (Recomendado)
                          </SelectItem>
                          <SelectItem value="medio">Médio 30s por mensagem</SelectItem>
                          <SelectItem value="rapido">Rápido 7s por mensagem</SelectItem>
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
                <FormItem className="flex-1">
                  <FormLabel className="font-bold">Mensagem</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Digite sua mensagem"
                      {...field}
                      className="min-h-44"
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        setText(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="md:max-w-96 md:mt-8 mt-0 w-full flex flex-col">
            <Link href={"/downloads/Modelo de Exemplo.csv"}>
              <Button className="py-5 w-full" variant={"outline"}>
                Baixar CSV de exemplo
                <ArrowDownToLine />
              </Button>
            </Link>
            <ScrollArea className="md:mt-10 min-h-60 mt-6 flex-1 bg-[url('/images/bg-whatsapp.png')] bg-no-repeat bg-cover pr-1 w-full p-2 pl-10 flex rounded-lg justify-end">
              <div className="w-fit p-4 bg-green-5 relative rounded-xl ml-auto break-normal whitespace-pre text-wrap">
                {renderPreview(text)}
              </div>
            </ScrollArea>
          </div>
        </div>
        <div className="flex flex-col w-full justify-end mt-8">
          <div className="bg-green-5/20 border rounded-lg p-4 mb-8">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-green-2" />
              <h3 className="text-sm font-semibold text-green-2">
                Uso de variáveis do CSV no template
              </h3>
            </div>
            <div className="text-base text-green-3 mt-1">
              Para o <strong>Nome</strong> use
              <Badge className="bg-green-300/50 text-green-600 border border-green-600/50 text-center hover:bg-green-300/50 mx-1 w-fit">
                {"%nome%"}
              </Badge>
              na mensagem
            </div>
          </div>
          <Button className="bg-green-4 py-6" type="submit" disabled={loading}>
            {loading ? <Loading className="text-green-1" /> : "Iniciar campanha"}
            {!loading && <Send />}
          </Button>
        </div>
      </form>
    </Form>
  );
}

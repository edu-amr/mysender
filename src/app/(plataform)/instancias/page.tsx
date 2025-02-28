"use client";

import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { QRCodeSVG } from "qrcode.react";
import { Loading } from "@/components/loading";

type Instance = {
  user_id: string;
  instance_id: string;
  instance_name: string;
  hash: string;
  qrcode: string;
  created_at: string;
  number: number;
  status: string;
};

export default function Instances() {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(true);
  const [instance, setInstance] = useState<Instance | null>(null);
  const [userId, setUserId] = useState<null | string>(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (!error && user) {
        setUserId(user.id);
      }
    };

    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel("instance")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "instance",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          setInstance(payload.new as Instance);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    if (userId) {
      const getInstances = async () => {
        const { data, error } = await supabase
          .from("instance")
          .select()
          .eq("user_id", userId)
          .maybeSingle();
        if (error) {
          console.error("Erro ao buscar instâncias:", error.message);
        } else {
          setInstance(data);
        }

        setIsLoading(false);
      };

      getInstances();
    }
  }, [supabase, userId]);

  const createNewInstance = async () => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/instance/create", {
        method: "POST",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Instância criada",
          description: "A sua instância foi criada com sucesso.",
        });
      } else {
        throw new Error(data.error || "Erro desconhecido ao criar instância");
      }
    } catch (error) {
      toast({
        title: "Erro ao criar instância",
        description: error instanceof Error ? error.message : "Ocorreu um erro inesperado.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteInstance = async () => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/instance/disconnect", {
        method: "POST",
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Instância desconectada",
          description: "A sua instância foi desconectada.",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      //console.error("Erro:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loading className="mx-auto" />;

  return (
    <div className="w-full">
      <Card className="border border-gray-200 shadow-none">
        <CardContent className="md:flex-row items-center md:items-start w-full gap-6 p-6 flex flex-col">
          {instance?.qrcode &&
            instance.status !== "conectado" &&
            instance.status !== "desconectado" && (
              <div className="flex-shrink-0">
                <QRCodeSVG
                  value={instance.qrcode}
                  size={256}
                  className="border-4 border-green-1/20 rounded-lg"
                />
                <p className="text-xs text-center text-gray-500 mt-2">
                  O QR code será atualizado em 1 minuto
                </p>
              </div>
            )}

          <div className="flex-grow space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-green-4">Conecte-se ao WhatsApp</h2>
              {instance?.status === "conectado" && (
                <div className="flex gap-2 items-center border-green-2/20 border py-1 px-3 rounded-full">
                  <div className="w-3 h-3 rounded-full bg-green-6 animate-pulse-green"></div>
                  <span className="text-xs font-semibold text-green-6">Conectado</span>
                </div>
              )}
              {!instance && (
                <div className="flex gap-2 items-center border-green-2/20 border py-1 px-3 rounded-full">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse-red"></div>
                  <span className="text-xs font-semibold text-red-500">Desconectado</span>
                </div>
              )}
              {instance?.status === "aguardando" && (
                <div className="flex gap-2 items-center border-green-2/20 border py-1 px-3 rounded-full">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse-yellow"></div>
                  <span className="text-xs font-semibold text-yellow-500">Aguardando</span>
                </div>
              )}
            </div>
            {!instance?.qrcode && (
              <Button
                onClick={createNewInstance}
                variant={"outline"}
                className="w-full text-green-2 py-5"
              >
                Criar Conexão
                <Plus />
              </Button>
            )}

            {(instance?.status === "aguardando" || instance?.status === "conectado") && (
              <Button
                onClick={deleteInstance}
                variant={"outline"}
                className="w-full border-red-500 py-5 text-red-500 font-bold"
              >
                Desconectar <LogOut />
              </Button>
            )}
            {instance?.status !== "conectado" && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Use o WhatsApp no seu computador escaneando o QR code ao lado
                </p>
                <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                  <li>Abra o WhatsApp no seu telefone</li>
                  <li>Toque em Menu ou Configurações e selecione WhatsApp Web</li>
                  <li>Aponte seu telefone para esta tela para capturar o código</li>
                </ol>
              </div>
            )}
            <div className="bg-green-5/20 border rounded-lg p-4">
              <h3 className="text-sm font-semibold text-green-2">
                Mantenha seu telefone conectado
              </h3>
              <p className="text-xs text-green-3 mt-1">
                Certifique-se de que seu telefone esteja conectado para realizar os disparos.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

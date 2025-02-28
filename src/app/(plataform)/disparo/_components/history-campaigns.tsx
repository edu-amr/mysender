"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { ArrowDownToLine } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loading } from "@/components/loading";

type CampaignHistory = {
  id: string;
  campaign_name: string;
  messages_sent: number;
  csv_link: string;
  created_at: string;
};

export function HistoryCampaigns() {
  const [campaigns, setCampaigns] = useState<CampaignHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("campaigns")
        .select("id, campaign_name, csv_link, created_at, messages_sent")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erro ao buscar histórico de campanhas:", error);
        return;
      }

      setCampaigns(data || []);
      setLoading(false);
    };

    fetchCampaigns();
  }, []);

  if (loading) {
    return (
      <div className="p-6 border rounded-lg w-full flex justify-center items-center flex-col">
        <Loading text="Carregando..." />
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div className="p-6 border rounded-lg w-full flex justify-center items-center">
        <p>Nenhuma campanha encontrada.</p>
      </div>
    );
  }

  return (
    <div className="p-6 border rounded-lg w-full">
      <Table>
        <TableCaption>Seu histórico de disparos</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left font-semibold">Identificador</TableHead>
            <TableHead className="font-semibold">Nome da Campanha</TableHead>
            <TableHead className="font-semibold">Mensagens Enviadas</TableHead>
            <TableHead className="font-semibold">Data de Criação</TableHead>
            <TableHead className="text-right font-semibold">Baixar documento</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell className="font-semibold">{campaign.id}</TableCell>
              <TableCell className="font-semibold">{campaign.campaign_name}</TableCell>
              <TableCell className="font-semibold">{campaign.messages_sent}</TableCell>
              <TableCell className="font-semibold">
                {new Date(campaign.created_at).toLocaleDateString("pt-BR")}
              </TableCell>
              <TableCell className="text-right font-semibold">
                <Button variant={"link"} className="p-0">
                  <Link href={campaign.csv_link} className="text-green-2 underline" target="_blank">
                    Baixar
                  </Link>
                  <ArrowDownToLine />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

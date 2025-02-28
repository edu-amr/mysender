"use client";

import { HistoryCampaigns } from "./_components/history-campaigns";
import { CreateCampaing } from "./_components/create-campaing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Campaigns() {
  return (
    <Tabs defaultValue="criar-disparo" className="w-full">
      <TabsList>
        <TabsTrigger value="criar-disparo">Criar Disparo</TabsTrigger>
        <TabsTrigger value="historico">Histórico</TabsTrigger>
      </TabsList>
      <TabsContent value="criar-disparo">
        <CreateCampaing />
      </TabsContent>
      <TabsContent value="historico">
        <HistoryCampaigns />
      </TabsContent>
    </Tabs>
  );
}

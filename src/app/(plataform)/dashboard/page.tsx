import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AreaChartComponent } from "./_components/area-chart";
import { MessageSquareShare, Zap } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function Dashboard() {
  const supabase = await createClient();

  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;

  if (!userId) {
    return <div className="text-red-500">Erro: Usuário não autenticado.</div>;
  }

  const { data: totalMessagesData } = await supabase
    .from("campaigns")
    .select("messages_sent")
    .eq("user_id", userId);

  const totalMessages =
    totalMessagesData?.reduce((sum, campaign) => sum + (campaign.messages_sent || 0), 0) || 0;

  const { data: totalCampaignsData } = await supabase
    .from("campaigns")
    .select("id", { count: "exact" })
    .eq("user_id", userId);

  const totalCampaigns = totalCampaignsData?.length || 0;

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("plan_id")
    .eq("user_id", userId)
    .eq("status", "active")
    .single();

  const planId = subscription?.plan_id;

  let maxMessages = 0;
  if (planId === process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_START) maxMessages = 7000;
  if (planId === process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_GROWTH) maxMessages = 15000;
  if (planId === process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_SCALE) maxMessages = 25000;

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const { data: messagesThisMonthData } = await supabase
    .from("campaigns")
    .select("messages_sent, created_at")
    .eq("user_id", userId);

  const messagesThisMonth =
    messagesThisMonthData?.reduce((sum, campaign) => {
      const campaignDate = new Date(campaign.created_at);
      if (
        campaignDate.getMonth() + 1 === currentMonth &&
        campaignDate.getFullYear() === currentYear
      ) {
        return sum + (campaign.messages_sent || 0);
      }
      return sum;
    }, 0) || 0;

  const messagesByDate: Record<string, number> = {};

  messagesThisMonthData?.forEach((campaign) => {
    const date = new Date(campaign.created_at).toISOString().split("T")[0];
    messagesByDate[date] = (messagesByDate[date] || 0) + campaign.messages_sent;
  });

  const chartData = Object.keys(messagesByDate).map((date) => ({
    date,
    messages: messagesByDate[date],
  }));

  return (
    <div className="w-full flex gap-8 flex-col">
      <div className="w-full flex flex-col gap-8">
        <Card className="flex-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-normal flex justify-between items-center w-full">
              <span>Mensagens enviadas este mês</span>
              <span className="text-lg">
                {messagesThisMonth} / {maxMessages}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress
              value={maxMessages > 0 ? (messagesThisMonth / maxMessages) * 100 : 0}
              max={100}
              className="h-4 bg-zinc-300"
              indicatorColor="bg-green-4"
            />
          </CardContent>
        </Card>
        <div className="sm:flex-row flex-col w-full flex gap-8">
          <Card className="flex-1 relative">
            <MessageSquareShare className="absolute right-6 top-6" color="#092C1C" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-normal">Total de mensagens enviadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMessages}</div>
            </CardContent>
          </Card>
          <Card className="flex-1 relative">
            <Zap className="absolute right-6 top-6" color="#092C1C" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-normal">Total de disparos feitos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCampaigns}</div>
            </CardContent>
          </Card>
        </div>
      </div>
      <AreaChartComponent chartData={chartData} />
    </div>
  );
}

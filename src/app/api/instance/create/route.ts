import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { v4 as uuidv4 } from "uuid";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(req: NextRequest) {
  try {
    //const body = await req.json();
    const supabase = await createClient();
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;
    const radomInstanceId = `${uuidv4()}`;

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("id")
      .eq("user_id", userId)
      .eq("status", "active")
      .single();

    if (!subscription) {
      return NextResponse.json(
        { message: "Usuário não possui uma assinatura ativa" },
        { status: 403 }
      );
    }

    const instancePayload = {
      instanceName: radomInstanceId,
      qrcode: true,
      integration: "WHATSAPP-BAILEYS",
      reject_call: true,
      groupsIgnore: true,
      alwaysOnline: false,
      readMessages: false,
      readStatus: false,
      syncFullHistory: false,
    };

    const createResponse = await fetch(`${process.env.EVOLUTION_URL}/instance/create`, {
      method: "POST",
      headers: {
        apikey: process.env.EVOLUTION_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(instancePayload),
    });

    if (!createResponse.ok) {
      throw new Error(`Erro ao criar instância na Evolution`);
    }

    const createResponseParse = await createResponse.json();

    const webhookPayload = {
      webhook: {
        enabled: true,
        url: `${process.env.WEBHOOK_SET}`,
        webhookByEvents: false,
        webhookBase64: false,
        events: ["CONNECTION_UPDATE", "QRCODE_UPDATED", "REMOVE_INSTANCE"],
      },
    }; //"LOGOUT_INSTANCE",

    const webhookResponse = await fetch(
      `${process.env.EVOLUTION_URL}/webhook/set/${radomInstanceId}`,
      {
        method: "POST",
        headers: {
          apikey: process.env.EVOLUTION_API_KEY!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookPayload),
      }
    );

    if (!webhookResponse.ok) {
      throw new Error(`Erro ao criar instância na Evolution`);
    }

    const instanceData = {
      user_id: userId,
      instance_id: radomInstanceId,
      instance_name: `${radomInstanceId}`,
      hash: createResponseParse.hash,
      qrcode: createResponseParse.qrcode.code,
      number: "indefinido",
      status: "aguardando",
    };

    const { error } = await supabase.from("instance").insert(instanceData);

    if (error) {
      console.error("Erro ao inserir dados mockados:", error.message);
      return NextResponse.json({ success: false, error: error.message });
    }

    return NextResponse.json(
      { success: true, message: "Instancia criada com sucesso!" },
      { status: 201 }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import csvParser from "csv-parser";
import { createClient } from "@/lib/supabase/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const message = formData.get("message") as string;
    const csvFile = formData.get("csvFile") as File;

    const { data: userData } = await supabase.auth.getUser();

    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("monthly_credits")
      .eq("user_id", userData.user?.id)
      .eq("status", "active")
      .single();

    if (!subscription) {
      return NextResponse.json(
        { status: "error", message: "Você precisa de uma assinatura ativa para fazer disparos." },
        { status: 403 }
      );
    }

    const availableCredits = subscription.monthly_credits;

    const { data: instanceData } = await supabase
      .from("instance")
      .select("hash, instance_id, status")
      .eq("user_id", userData.user?.id)
      .maybeSingle();

    if (instanceData?.status !== "conectado") {
      return NextResponse.json(
        { status: "error", message: "Você precisa conectar a instância antes de criar o disparo." },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        { status: "error", message: "O nome da campanha é obrigatório." },
        { status: 400 }
      );
    }

    if (!category) {
      return NextResponse.json(
        { status: "error", message: "A categoria é obrigatória." },
        { status: 400 }
      );
    }

    if (!message) {
      return NextResponse.json(
        { status: "error", message: "A mensagem é obrigatória." },
        { status: 400 }
      );
    }

    if (!csvFile) {
      return NextResponse.json(
        { status: "error", message: "O arquivo CSV é obrigatório." },
        { status: 400 }
      );
    }

    const tmpDir = path.join(process.cwd(), "tmp");
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir);
    }

    const csvPath = path.join(tmpDir, csvFile.name);
    const fileBuffer = await csvFile.arrayBuffer();
    fs.writeFileSync(csvPath, Buffer.from(fileBuffer));

    const rows: Array<unknown> = [];
    const readStream = fs.createReadStream(csvPath).pipe(csvParser());
    for await (const row of readStream) {
      rows.push(row);
    }

    fs.unlinkSync(csvPath);

    if (rows.length === 0) {
      return NextResponse.json(
        {
          status: "error",
          message: "O arquivo CSV deve conter pelo menos uma linha de conteúdo.",
        },
        { status: 400 }
      );
    }

    if (rows.length > availableCredits) {
      return NextResponse.json(
        {
          status: "error",
          message: `Você tem apenas ${availableCredits} disparos disponíveis, mas tentou enviar ${rows.length}.`,
        },
        { status: 400 }
      );
    }

    const randomFolder = crypto.randomBytes(16).toString("hex");
    const storagePath = `${randomFolder}/${csvFile.name}`;

    const { error: uploadError } = await supabase.storage
      .from("zaptra")
      .upload(storagePath, Buffer.from(fileBuffer), {
        contentType: csvFile.type,
        upsert: false,
      });

    if (uploadError) {
      throw new Error("Erro ao fazer upload para o storage: " + uploadError.message);
    }

    const { data: publicUrl } = supabase.storage.from("zaptra").getPublicUrl(storagePath);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${process.env.N8N_JWT}`);
    myHeaders.append("Content-Type", "application/json");

    const formattedMessage = JSON.stringify(message).slice(1, -1);

    const externalResponse = await fetch(process.env.N8N_URL!, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        name,
        userId: userData.user?.id,
        category,
        message: formattedMessage,
        fileUrl: publicUrl?.publicUrl,
        hash: instanceData?.hash,
        instanceId: instanceData?.instance_id,
      }),
    });

    if (!externalResponse.ok) {
      throw new Error(`Falha na integração com o serviço externo`);
    }

    await supabase
      .from("subscriptions")
      .update({ monthly_credits: availableCredits - rows.length })
      .eq("user_id", userData.user?.id);

    await supabase.from("campaigns").insert([
      {
        user_id: userData.user?.id,
        campaign_name: name,
        csv_link: publicUrl?.publicUrl,
        messages_sent: rows.length,
      },
    ]);

    const data = await externalResponse.json();

    return NextResponse.json({ status: "success", data: data });
  } catch (error) {
    console.error("Erro ao processar a campanha:", error);
    return NextResponse.json(
      { status: "error", message: "Erro ao processar a campanha." },
      { status: 500 }
    );
  }
}

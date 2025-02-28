import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  const body = await req.json();
  const instanceId = body.instance;

  switch (body.event) {
    case "qrcode.updated":
      await supabase
        .from("instance")
        .update({ qrcode: body.data.qrcode.code, status: "aguardando" })
        .eq("instance_id", instanceId);
      break;

    case "connection.update":
      if (body.data.state === "connecting") {
        //console.log("Entrando no evento connecting\n\n:", body);
        await supabase
          .from("instance")
          .update({ status: "aguardando" })
          .eq("instance_id", instanceId);
      }

      if (body.data.state === "open") {
        //console.log("Entrando no evento open\n\n:", body);
        await supabase
          .from("instance")
          .update({ status: "conectado" })
          .eq("instance_id", instanceId);
      }

      if (body.data.state === "close") {
        //console.log("Entrando no evento close\n\n:", body);
      }

      if (body.data.state === "close" && body.data.statusReason === 401) {
        //console.log("Entrando no evento close 401\n\n:", body);

        await fetch(`${process.env.EVOLUTION_URL}/instance/delete/${instanceId}`, {
          method: "DELETE",
          headers: {
            apikey: process.env.EVOLUTION_API_KEY || "",
          },
        });

        await supabase.from("instance").delete().eq("instance_id", instanceId);
      }

      break;

    case "remove.instance":
      //console.log("Entrando no evento remove\n\n:", body);
      //await supabase.from("instance").delete().eq("instance_id", instanceId);
      break;

    default:
      //console.log("Evento desconhecido:\n\n:", body);
      break;
  }

  return NextResponse.json({ success: true, message: "Operação concluída com sucesso." });
}

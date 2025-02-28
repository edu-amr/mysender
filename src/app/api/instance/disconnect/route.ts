import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const supabase = await createClient();
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const { data: instanceData } = await supabase
      .from("instance")
      .select("instance_name")
      .eq("user_id", userId)
      .maybeSingle();

    if (!instanceData?.instance_name) {
      return NextResponse.json({ error: "No instance found." }, { status: 404 });
    }

    const instanceName = instanceData.instance_name;

    const logoutResponse = await fetch(
      `${process.env.EVOLUTION_URL}/instance/logout/${instanceName}`,
      {
        method: "DELETE",
        headers: {
          apikey: process.env.EVOLUTION_API_KEY || "",
        },
      }
    );

    if (!logoutResponse.ok) {
      const text = await logoutResponse.text();
      throw new Error(`Erro ao dar logout na Evolution: ${text}`);
    }

    const deleteResponse = await fetch(
      `${process.env.EVOLUTION_URL}/instance/delete/${instanceName}`,
      {
        method: "DELETE",
        headers: {
          apikey: process.env.EVOLUTION_API_KEY || "",
        },
      }
    );

    if (!deleteResponse.ok) {
      const text = await deleteResponse.text();
      throw new Error(`Erro ao deletar na Evolution: ${text}`);
    }

    await supabase.from("instance").delete().eq("instance_id", instanceName);

    return NextResponse.json({ success: true });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

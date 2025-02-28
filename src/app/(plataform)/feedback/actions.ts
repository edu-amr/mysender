"use server";

import { createClient } from "@/lib/supabase/server";

export async function sendFeedback(category: string, message: string): Promise<void> {
  if (!category || !message) {
    throw new Error("Todos os campos são obrigatórios.");
  }

  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    throw new Error("Usuário não autenticado.");
  }

  const { error } = await supabase.from("feedback").insert({
    category,
    message,
    user_id: data.user.id,
  });

  if (error) {
    console.error("Erro ao enviar feedback:", error.message);
    throw new Error("Erro ao enviar o feedback. Tente novamente.");
  }
}

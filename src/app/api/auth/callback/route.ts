import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const code = request.nextUrl.searchParams.get("code") ?? "";

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/login`);
  }

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`);
}

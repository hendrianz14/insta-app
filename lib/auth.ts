import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function requireSession() {
  const supabase = createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return session;
}

export async function getSession() {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase.auth.getSession();
  return data.session ?? null;
}

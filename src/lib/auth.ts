import { redirect } from "next/navigation";

import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { Database } from "@/types";

type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

export async function getCurrentUser() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function getCurrentProfile(): Promise<ProfileRow | null> {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const supabase = await getSupabaseServerClient();
  const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();

  return data;
}

export async function requireUser(nextPath: string) {
  const user = await getCurrentUser();

  if (!user) {
    redirect(`/login?next=${encodeURIComponent(nextPath)}&message=${encodeURIComponent("로그인이 필요한 페이지입니다.")}`);
  }

  return user;
}

export async function isCurrentUserAdmin() {
  const profile = await getCurrentProfile();
  return profile?.role === "admin";
}

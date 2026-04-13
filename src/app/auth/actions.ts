"use server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getSupabaseServerClient } from "@/lib/supabase/server";

function encodeMessage(message: string) {
  return encodeURIComponent(message);
}

function getSafeNextPath(value: FormDataEntryValue | null) {
  const nextPath = typeof value === "string" && value.startsWith("/") ? value : "/";
  return nextPath;
}

async function getEmailRedirectTo(nextPath: string) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL ?? null;

  if (siteUrl) {
    const normalizedSiteUrl = siteUrl.startsWith("http") ? siteUrl : `https://${siteUrl}`;
    return `${normalizedSiteUrl.replace(/\/$/, "")}/auth/confirm?next=${encodeURIComponent(nextPath)}`;
  }

  const headerStore = await headers();
  const origin = headerStore.get("origin");

  if (origin) {
    return `${origin}/auth/confirm?next=${encodeURIComponent(nextPath)}`;
  }

  const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host");
  const protocol = headerStore.get("x-forwarded-proto") ?? "http";

  if (!host) {
    return `http://localhost:3000/auth/confirm?next=${encodeURIComponent(nextPath)}`;
  }

  return `${protocol}://${host}/auth/confirm?next=${encodeURIComponent(nextPath)}`;
}

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const nextPath = getSafeNextPath(formData.get("next"));

  const supabase = await getSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(`/login?next=${encodeURIComponent(nextPath)}&error=${encodeMessage(error.message)}`);
  }

  redirect(nextPath);
}

export async function signupAction(formData: FormData) {
  const nickname = String(formData.get("nickname") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const nextPath = getSafeNextPath(formData.get("next"));

  if (!nickname) {
    redirect(`/signup?next=${encodeURIComponent(nextPath)}&error=${encodeMessage("닉네임을 입력해 주세요.")}`);
  }

  const supabase = await getSupabaseServerClient();
  const emailRedirectTo = await getEmailRedirectTo(nextPath);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo,
      data: {
        nickname,
      },
    },
  });

  if (error) {
    redirect(`/signup?next=${encodeURIComponent(nextPath)}&error=${encodeMessage(error.message)}`);
  }

  if (data.session) {
    redirect(nextPath);
  }

  redirect(
    `/login?next=${encodeURIComponent(nextPath)}&message=${encodeMessage("회원가입이 완료되었습니다. 이메일 인증 후 로그인해 주세요.")}`
  );
}

export async function signOutAction() {
  const supabase = await getSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/");
}

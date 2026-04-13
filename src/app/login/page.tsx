import Link from "next/link";
import { redirect } from "next/navigation";

import { loginAction } from "@/app/auth/actions";
import { AuthMessage } from "@/components/auth/AuthMessage";
import { getCurrentUser } from "@/lib/auth";

type LoginPageProps = {
  searchParams: Promise<{
    next?: string;
    error?: string;
    message?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const [{ next, error, message }, user] = await Promise.all([searchParams, getCurrentUser()]);

  if (user) {
    redirect(next && next.startsWith("/") ? next : "/");
  }

  const nextPath = next && next.startsWith("/") ? next : "/";

  return (
    <div className="page-shell">
      <div className="mx-auto max-w-md">
        <div className="panel p-6 sm:p-8">
          <h1 className="text-2xl font-extrabold tracking-tight text-ink">로그인</h1>
          <p className="mt-3 text-sm leading-6 text-slate">
            이메일과 비밀번호로 로그인합니다.
          </p>
          <form action={loginAction} className="mt-6 space-y-4">
            <AuthMessage error={error} message={message} />
            <input type="hidden" name="next" value={nextPath} />
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-ink">
                이메일
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="input"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold text-ink">
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="input"
                placeholder="비밀번호 입력"
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              로그인
            </button>
          </form>
          <p className="mt-5 text-sm text-slate">
            계정이 없나요?{" "}
            <Link href="/signup" className="font-semibold text-navy-800">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

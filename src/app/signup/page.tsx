import Link from "next/link";
import { redirect } from "next/navigation";

import { signupAction } from "@/app/auth/actions";
import { AuthMessage } from "@/components/auth/AuthMessage";
import { getCurrentUser } from "@/lib/auth";

type SignupPageProps = {
  searchParams: Promise<{
    next?: string;
    error?: string;
    message?: string;
  }>;
};

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const [{ next, error, message }, user] = await Promise.all([searchParams, getCurrentUser()]);

  if (user) {
    redirect(next && next.startsWith("/") ? next : "/");
  }

  const nextPath = next && next.startsWith("/") ? next : "/";

  return (
    <div className="page-shell">
      <div className="mx-auto max-w-md">
        <div className="panel p-6 sm:p-8">
          <h1 className="text-2xl font-extrabold tracking-tight text-ink">회원가입</h1>
          <p className="mt-3 text-sm leading-6 text-slate">
            이메일 회원가입 후 `profiles.nickname`이 자동 생성되도록 연결했습니다.
          </p>
          <form action={signupAction} className="mt-6 space-y-4">
            <AuthMessage error={error} message={message} />
            <input type="hidden" name="next" value={nextPath} />
            <div>
              <label htmlFor="nickname" className="mb-2 block text-sm font-semibold text-ink">
                닉네임
              </label>
              <input id="nickname" name="nickname" className="input" placeholder="닉네임 입력" />
            </div>
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
              가입하기
            </button>
          </form>
          <p className="mt-5 text-sm text-slate">
            이미 계정이 있나요?{" "}
            <Link href="/login" className="font-semibold text-navy-800">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

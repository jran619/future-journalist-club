import Link from "next/link";

import { signOutAction } from "@/app/auth/actions";
import { getCurrentProfile } from "@/lib/auth";

const navItems = [
  { href: "/boards/notices", label: "공지사항" },
  { href: "/boards/jobs", label: "채용·공채" },
  { href: "/boards/qa", label: "준비 Q&A" },
  { href: "/write", label: "글쓰기" },
];

export async function Header() {
  const profile = await getCurrentProfile();

  return (
    <header className="border-b border-line bg-white">
      <div className="page-shell flex min-h-16 items-center justify-between gap-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-lg font-extrabold tracking-tight text-ink">
            Press Community
          </Link>
          <nav className="hidden items-center gap-5 text-sm text-slate md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-navy-800">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {profile ? (
            <>
              <span className="hidden text-sm font-medium text-slate sm:inline">
                {profile.nickname}님
              </span>
              <form action={signOutAction}>
                <button type="submit" className="btn-secondary">
                  로그아웃
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-slate transition hover:text-ink"
              >
                로그인
              </Link>
              <Link href="/signup" className="btn-primary">
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

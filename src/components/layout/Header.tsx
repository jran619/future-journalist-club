import Link from "next/link";

const navItems = [
  { href: "#features", label: "특징" },
  { href: "#about", label: "소개" },
  { href: "#join", label: "참여" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="page-shell flex min-h-16 items-center justify-between gap-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-slate-950">
          미래 기자 클럽
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-blue-700">
                {item.label}
              </Link>
            ))}
          </nav>

          <Link href="#join" className="btn-primary">
            참여하기
          </Link>
        </div>
      </div>
    </header>
  );
}

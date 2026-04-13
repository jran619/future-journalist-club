import Link from "next/link";

import type { Board } from "@/types";

type BoardCardProps = {
  board: Board;
};

export function BoardCard({ board }: BoardCardProps) {
  return (
    <Link
      href={`/boards/${board.slug}`}
      className="panel group block p-5 transition hover:-translate-y-0.5 hover:border-navy-100 hover:shadow-lg"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-ink">{board.name}</h3>
          <p className="mt-2 text-sm leading-6 text-slate">{board.description}</p>
        </div>
        {typeof board.postCount === "number" ? (
          <span className="rounded-full bg-navy-50 px-3 py-1 text-xs font-semibold text-navy-800">
            {board.postCount}개 글
          </span>
        ) : null}
      </div>
      <span className="text-sm font-medium text-navy-800">게시판 보기</span>
    </Link>
  );
}

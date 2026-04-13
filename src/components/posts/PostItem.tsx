import Link from "next/link";

import { formatDate, truncateText } from "@/lib/utils";
import type { Post } from "@/types";

type PostItemProps = {
  post: Post;
  showBoard?: boolean;
};

export function PostItem({ post, showBoard = false }: PostItemProps) {
  return (
    <li className="border-b border-line last:border-b-0">
      <Link href={`/posts/${post.id}`} className="block px-5 py-4 transition hover:bg-gray-50">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              {post.isPinned ? (
                <span className="rounded-full bg-navy-800 px-2.5 py-1 text-xs font-semibold text-white">
                  공지
                </span>
              ) : null}
              {showBoard && post.boardName ? (
                <span className="text-xs font-semibold text-navy-800">[{post.boardName}]</span>
              ) : null}
            </div>
            <h3 className="truncate text-base font-semibold text-ink">{post.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate">{truncateText(post.content, 100)}</p>
          </div>
          <div className="shrink-0 text-sm text-slate sm:w-40 sm:text-right">
            <p>{post.authorName}</p>
            <p className="mt-1">{formatDate(post.createdAt)}</p>
            {typeof post.commentCount === "number" ? (
              <p className="mt-1">댓글 {post.commentCount}</p>
            ) : null}
          </div>
        </div>
      </Link>
    </li>
  );
}

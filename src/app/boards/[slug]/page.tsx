import Link from "next/link";
import { notFound } from "next/navigation";

import { CommunityGuidelines, PostList } from "@/components";
import { getBoardBySlug } from "@/lib/boards";
import { listPostsByBoardSlug, mapPostRecordToPost } from "@/lib/posts";

type BoardPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ error?: string }>;
};

export default async function BoardPage({ params, searchParams }: BoardPageProps) {
  const [{ slug }, { error }] = await Promise.all([params, searchParams]);
  const [boardResult, postsResult] = await Promise.all([
    getBoardBySlug(slug),
    listPostsByBoardSlug({ boardSlug: slug }),
  ]);

  if (!boardResult.data) {
    notFound();
  }

  const posts = postsResult.data?.map(mapPostRecordToPost) ?? [];

  return (
    <div className="page-shell space-y-6">
      <section className="panel px-6 py-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-navy-800">BOARD</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">
              {boardResult.data.name}
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate">
              {boardResult.data.description}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-gray-100 px-3 py-2 text-sm font-medium text-slate">
              최신순 정렬
            </span>
            <Link href={`/write?board=${boardResult.data.slug}`} className="btn-primary">
              글쓰기
            </Link>
          </div>
        </div>
      </section>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          {postsResult.error ? (
            <div className="panel px-5 py-10 text-center text-sm text-slate">
              게시글을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
            </div>
          ) : (
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="section-title">글 목록</h2>
                <p className="text-sm text-slate">공지글은 일반 글보다 위에 표시됩니다.</p>
              </div>
              <PostList posts={posts} emptyMessage="이 게시판에는 아직 글이 없습니다." />
            </section>
          )}
        </div>

        <CommunityGuidelines />
      </div>
    </div>
  );
}

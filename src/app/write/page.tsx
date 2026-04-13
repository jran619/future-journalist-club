import Link from "next/link";

import { createPostAction } from "@/app/community/actions";
import { CommunityGuidelines } from "@/components";
import { getCurrentProfile, requireUser } from "@/lib/auth";
import { listBoards } from "@/lib/boards";

type WritePageProps = {
  searchParams: Promise<{
    board?: string;
    error?: string;
  }>;
};

export default async function WritePage({ searchParams }: WritePageProps) {
  await requireUser("/write");
  const [{ board, error }, boardsResult, profile] = await Promise.all([
    searchParams,
    listBoards(),
    getCurrentProfile(),
  ]);
  const boards = boardsResult.data ?? [];
  const selectedBoard =
    board && boards.some((item) => item.slug === board) ? board : boards[0]?.slug;
  const canPinNotice = profile?.role === "admin";

  return (
    <div className="page-shell">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-6">
        <section className="panel px-6 py-7">
          <h1 className="text-3xl font-extrabold tracking-tight text-ink">글쓰기</h1>
          <p className="mt-3 text-sm leading-6 text-slate">
            로그인한 사용자만 접근할 수 있는 기본 작성 화면입니다.
          </p>
        </section>

        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {boardsResult.error ? (
          <div className="panel px-5 py-10 text-center text-sm text-slate">
            게시판 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
          </div>
        ) : null}

        {!boardsResult.error && boards.length > 0 ? (
          <form action={createPostAction} className="panel p-6">
            <div className="space-y-5">
              <div>
                <label htmlFor="boardSlug" className="mb-2 block text-sm font-semibold text-ink">
                  게시판
                </label>
                <select
                  id="boardSlug"
                  name="boardSlug"
                  className="input"
                  defaultValue={selectedBoard}
                >
                  {boards.map((boardItem) => (
                    <option key={boardItem.id} value={boardItem.slug}>
                      {boardItem.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="title" className="mb-2 block text-sm font-semibold text-ink">
                  제목
                </label>
                <input
                  id="title"
                  name="title"
                  className="input"
                  placeholder="제목을 입력하세요"
                  defaultValue=""
                />
              </div>

              <div>
                <label htmlFor="content" className="mb-2 block text-sm font-semibold text-ink">
                  내용
                </label>
                <textarea
                  id="content"
                  name="content"
                  className="input min-h-80 resize-y"
                  placeholder="내용을 입력하세요"
                  defaultValue=""
                />
              </div>

              {canPinNotice ? (
                <label className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink">
                  <input type="checkbox" name="isPinned" className="h-4 w-4" />
                  공지사항 게시판에서 공지글로 상단 고정하기
                </label>
              ) : null}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Link
                href={selectedBoard ? `/boards/${selectedBoard}` : "/"}
                className="btn-secondary"
              >
                취소
              </Link>
              <button type="submit" className="btn-primary">
                등록하기
              </button>
            </div>
          </form>
        ) : null}
        </div>

        <div className="space-y-6">
          <CommunityGuidelines />
          {profile?.role === "admin" ? (
            <div className="panel-muted p-5 text-sm leading-6 text-slate">
              <h2 className="text-sm font-bold text-ink">운영자 메모</h2>
              <p className="mt-3">
                공지 상단 고정은 공지사항 게시판에서만 사용할 수 있도록 제한했습니다.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

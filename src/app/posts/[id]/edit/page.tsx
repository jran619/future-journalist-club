import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { updatePostAction } from "@/app/community/actions";
import { CommunityGuidelines } from "@/components";
import { getCurrentProfile, requireUser } from "@/lib/auth";
import { getPostDetailById } from "@/lib/posts";

type EditPostPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
};

export default async function EditPostPage({ params, searchParams }: EditPostPageProps) {
  const user = await requireUser("/write");
  const [{ id }, { error }] = await Promise.all([params, searchParams]);
  const postResult = await getPostDetailById(id);
  const profile = await getCurrentProfile();

  if (!postResult.data) {
    notFound();
  }

  if (postResult.data.author_id !== user.id) {
    redirect(`/posts/${id}?error=${encodeURIComponent("본인 글만 수정할 수 있습니다.")}`);
  }

  return (
    <div className="page-shell">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-6">
        <section className="panel px-6 py-7">
          <h1 className="text-3xl font-extrabold tracking-tight text-ink">글 수정</h1>
          <p className="mt-3 text-sm leading-6 text-slate">
            제목과 내용을 수정한 뒤 저장할 수 있습니다.
          </p>
        </section>

        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <form action={updatePostAction} className="panel p-6">
          <input type="hidden" name="postId" value={postResult.data.id} />

          <div className="space-y-5">
            <div>
              <p className="mb-2 block text-sm font-semibold text-ink">게시판</p>
              <div className="rounded-xl border border-line bg-surface px-4 py-3 text-sm text-slate">
                {postResult.data.boards?.name ?? "알 수 없음"}
              </div>
            </div>

            <div>
              <label htmlFor="title" className="mb-2 block text-sm font-semibold text-ink">
                제목
              </label>
              <input
                id="title"
                name="title"
                className="input"
                defaultValue={postResult.data.title}
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
                defaultValue={postResult.data.content}
              />
            </div>

            {profile?.role === "admin" && postResult.data.boards?.slug === "notices" ? (
              <label className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink">
                <input
                  type="checkbox"
                  name="isPinned"
                  className="h-4 w-4"
                  defaultChecked={postResult.data.is_pinned}
                />
                공지글로 상단 고정하기
              </label>
            ) : null}
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Link href={`/posts/${postResult.data.id}`} className="btn-secondary">
              취소
            </Link>
            <button type="submit" className="btn-primary">
              저장하기
            </button>
          </div>
        </form>
        </div>

        <CommunityGuidelines />
      </div>
    </div>
  );
}

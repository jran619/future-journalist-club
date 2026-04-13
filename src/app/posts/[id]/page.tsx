import Link from "next/link";
import { notFound } from "next/navigation";

import { deletePostAction } from "@/app/community/actions";
import { CommentForm, CommentList, CommunityGuidelines, ReportForm } from "@/components";
import { getCurrentUser } from "@/lib/auth";
import { mapCommentRecord } from "@/lib/comments";
import { getPostDetailById, mapPostRecordToPost } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

type PostDetailPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; message?: string }>;
};

export default async function PostDetailPage({ params, searchParams }: PostDetailPageProps) {
  const [{ id }, { error, message }, user] = await Promise.all([
    params,
    searchParams,
    getCurrentUser(),
  ]);
  const postResult = await getPostDetailById(id);

  if (!postResult.data) {
    notFound();
  }

  const post = mapPostRecordToPost(postResult.data);
  const comments = postResult.data.comments.map(mapCommentRecord);
  const isOwner = user?.id === post.authorId;

  return (
    <div className="page-shell space-y-6">
      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {message ? (
        <div className="rounded-xl border border-navy-100 bg-navy-50 px-4 py-3 text-sm text-navy-800">
          {message}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-6">
          <article className="panel overflow-hidden">
            <div className="border-b border-line px-5 py-5 sm:px-6 sm:py-6">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                {post.boardName ? (
                  <Link
                    href={`/boards/${post.boardSlug}`}
                    className="rounded-full bg-navy-50 px-3 py-1 text-xs font-semibold text-navy-800"
                  >
                    {post.boardName}
                  </Link>
                ) : null}
                {post.isPinned ? (
                  <span className="rounded-full bg-navy-800 px-3 py-1 text-xs font-semibold text-white">
                    공지
                  </span>
                ) : null}
              </div>

              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                    {post.title}
                  </h1>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate">
                    <span>작성자 {post.authorName}</span>
                    <span>작성일 {formatDate(post.createdAt)}</span>
                    {post.updatedAt && post.updatedAt !== post.createdAt ? (
                      <span>수정일 {formatDate(post.updatedAt)}</span>
                    ) : null}
                  </div>
                </div>

                {isOwner ? (
                  <div className="flex items-center gap-3">
                    <Link href={`/posts/${post.id}/edit`} className="btn-secondary">
                      수정
                    </Link>
                    <form action={deletePostAction}>
                      <input type="hidden" name="postId" value={post.id} />
                      <button type="submit" className="btn-secondary">
                        삭제
                      </button>
                    </form>
                  </div>
                ) : (
                  <ReportForm
                    targetType="post"
                    targetId={post.id}
                    nextPath={`/posts/${post.id}`}
                    canReport={Boolean(user)}
                  />
                )}
              </div>
            </div>

            <div className="px-5 py-6 sm:px-6 sm:py-7">
              <p className="whitespace-pre-line text-[15px] leading-8 text-ink">{post.content}</p>
            </div>
          </article>

          <CommentList comments={comments} currentUserId={user?.id} postId={post.id} />
          <CommentForm
            canWrite={Boolean(user)}
            loginHref={`/login?next=/posts/${post.id}`}
            postId={post.id}
          />
        </div>

        <CommunityGuidelines />
      </div>
    </div>
  );
}

import Link from "next/link";

import { createCommentAction } from "@/app/community/actions";

type CommentFormProps = {
  canWrite?: boolean;
  loginHref?: string;
  postId: string;
};

export function CommentForm({
  canWrite = false,
  loginHref = "/login?next=/write",
  postId,
}: CommentFormProps) {
  return (
    <form action={createCommentAction} className="panel p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-base font-bold text-ink">댓글 작성</h2>
        {canWrite ? (
          <span className="text-sm text-slate">로그인한 상태입니다.</span>
        ) : (
          <Link href={loginHref} className="text-sm font-medium text-navy-800">
            로그인 후 작성 가능
          </Link>
        )}
      </div>
      <input type="hidden" name="postId" value={postId} />
      <textarea
        name="content"
        className="input min-h-28 resize-y"
        placeholder="의견을 남겨보세요."
        disabled={!canWrite}
      />
      <div className="mt-4 flex justify-end">
        <button type="submit" className="btn-primary" disabled={!canWrite}>
          댓글 등록
        </button>
      </div>
    </form>
  );
}

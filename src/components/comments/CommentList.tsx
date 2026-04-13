import { deleteCommentAction } from "@/app/community/actions";
import { ReportForm } from "@/components/community/ReportForm";
import { formatDate } from "@/lib/utils";
import type { Comment } from "@/types";

type CommentListProps = {
  comments: Comment[];
  currentUserId?: string;
  postId: string;
};

export function CommentList({ comments, currentUserId, postId }: CommentListProps) {
  return (
    <div className="panel overflow-hidden">
      <div className="border-b border-line px-5 py-4">
        <h2 className="text-base font-bold text-ink">댓글 {comments.length}</h2>
      </div>
      {comments.length === 0 ? (
        <div className="px-5 py-8 text-sm text-slate">첫 댓글을 남겨보세요.</div>
      ) : (
        <ul>
          {comments.map((comment) => {
            const isOwner = currentUserId && currentUserId === comment.authorId;

            return (
              <li key={comment.id} className="border-b border-line px-5 py-4 last:border-b-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-ink">{comment.authorName}</p>
                    <p className="mt-1 text-sm text-slate">{formatDate(comment.createdAt)}</p>
                  </div>

                  {isOwner ? (
                    <form action={deleteCommentAction}>
                      <input type="hidden" name="commentId" value={comment.id} />
                      <input type="hidden" name="postId" value={postId} />
                      <button
                        type="submit"
                        className="text-sm font-medium text-slate transition hover:text-ink"
                      >
                        삭제
                      </button>
                    </form>
                  ) : (
                    <ReportForm
                      targetType="comment"
                      targetId={comment.id}
                      nextPath={`/posts/${postId}`}
                      compact
                      canReport={Boolean(currentUserId)}
                    />
                  )}
                </div>

                <p className="mt-2 text-sm leading-6 text-slate">{comment.content}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

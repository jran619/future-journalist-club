import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { Comment, Database } from "@/types";

type CommentRow = Database["public"]["Tables"]["comments"]["Row"];
type CommentInsert = Database["public"]["Tables"]["comments"]["Insert"];
type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

export type CommentRecord = CommentRow & {
  profiles: Pick<ProfileRow, "id" | "nickname" | "role"> | null;
};

export type CreateCommentInput = {
  post_id: string;
  author_id: string;
  content: string;
};

export function mapCommentRecord(comment: CommentRecord): Comment {
  return {
    id: comment.id,
    postId: comment.post_id,
    authorId: comment.author_id,
    authorName: comment.profiles?.nickname ?? "알 수 없음",
    content: comment.content,
    createdAt: comment.created_at,
  };
}

export async function createComment(
  input: CreateCommentInput,
  source: "server" | "browser" = "server"
) {
  const client =
    source === "server" ? await getSupabaseServerClient() : getSupabaseBrowserClient();
  const payload: CommentInsert = {
    post_id: input.post_id,
    author_id: input.author_id,
    content: input.content,
  };

  return client
    .from("comments")
    .insert(payload)
    .select(
      `
        id,
        post_id,
        author_id,
        content,
        created_at,
        profiles:author_id!inner ( id, nickname, role )
      `
    )
    .single()
    .returns<CommentRecord>();
}

export async function deleteComment(id: string, source: "server" | "browser" = "server") {
  const client =
    source === "server" ? await getSupabaseServerClient() : getSupabaseBrowserClient();

  return client.from("comments").delete().eq("id", id).select("id").single();
}

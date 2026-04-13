import type { Database, Post } from "@/types";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { getSupabaseServerClient } from "@/lib/supabase/server";

type PostRow = Database["public"]["Tables"]["posts"]["Row"];
type PostInsert = Database["public"]["Tables"]["posts"]["Insert"];
type PostUpdate = Database["public"]["Tables"]["posts"]["Update"];
type CommentRow = Database["public"]["Tables"]["comments"]["Row"];
type BoardRow = Database["public"]["Tables"]["boards"]["Row"];
type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

export type PostListItemRecord = PostRow & {
  boards: Pick<BoardRow, "id" | "slug" | "name"> | null;
  profiles: Pick<ProfileRow, "id" | "nickname" | "role"> | null;
};

export type PostDetailRecord = PostRow & {
  boards: Pick<BoardRow, "id" | "slug" | "name" | "description"> | null;
  profiles: Pick<ProfileRow, "id" | "nickname" | "role"> | null;
  comments: Array<
    CommentRow & {
      profiles: Pick<ProfileRow, "id" | "nickname" | "role"> | null;
    }
  >;
};

export function mapPostRecordToPost(post: PostListItemRecord | PostDetailRecord): Post {
  return {
    id: post.id,
    boardSlug: post.boards?.slug,
    boardName: post.boards?.name,
    title: post.title,
    content: post.content,
    authorId: post.author_id,
    authorName: post.profiles?.nickname ?? "알 수 없음",
    createdAt: post.created_at,
    updatedAt: post.updated_at,
    isPinned: post.is_pinned,
  };
}

export type ListPostsOptions = {
  boardSlug: string;
  limit?: number;
  offset?: number;
};

export type CreatePostInput = {
  board_id: string;
  author_id: string;
  title: string;
  content: string;
  is_pinned?: boolean;
};

export type UpdatePostInput = {
  id: string;
  title?: string;
  content?: string;
  is_pinned?: boolean;
};

const postListSelect = `
  id,
  board_id,
  author_id,
  title,
  content,
  view_count,
  like_count,
  is_pinned,
  created_at,
  updated_at,
  boards:board_id!inner ( id, slug, name ),
  profiles:author_id!inner ( id, nickname, role )
`;

const postDetailSelect = `
  id,
  board_id,
  author_id,
  title,
  content,
  view_count,
  like_count,
  is_pinned,
  created_at,
  updated_at,
  boards:board_id!inner ( id, slug, name, description ),
  profiles:author_id!inner ( id, nickname, role ),
  comments (
    id,
    post_id,
    author_id,
    content,
    created_at,
    profiles:author_id!inner ( id, nickname, role )
  )
`;

export async function listPostsByBoardSlug(
  options: ListPostsOptions,
  source: "server" | "browser" = "server"
) {
  const client =
    source === "server" ? await getSupabaseServerClient() : getSupabaseBrowserClient();
  const limit = options.limit ?? 20;
  const offset = options.offset ?? 0;

  const query = client
    .from("posts")
    .select(postListSelect)
    .eq("boards.slug", options.boardSlug)
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  return query.returns<PostListItemRecord[]>();
}

export async function listRecentPosts(limit = 6, source: "server" | "browser" = "server") {
  const client =
    source === "server" ? await getSupabaseServerClient() : getSupabaseBrowserClient();

  return client
    .from("posts")
    .select(postListSelect)
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(limit)
    .returns<PostListItemRecord[]>();
}

export async function getPostDetailById(
  id: string,
  source: "server" | "browser" = "server"
) {
  const client =
    source === "server" ? await getSupabaseServerClient() : getSupabaseBrowserClient();

  return client
    .from("posts")
    .select(postDetailSelect)
    .eq("id", id)
    .order("created_at", { referencedTable: "comments", ascending: true })
    .single()
    .returns<PostDetailRecord>();
}

export async function createPost(
  input: CreatePostInput,
  source: "server" | "browser" = "server"
) {
  const client =
    source === "server" ? await getSupabaseServerClient() : getSupabaseBrowserClient();
  const payload: PostInsert = {
    board_id: input.board_id,
    author_id: input.author_id,
    title: input.title,
    content: input.content,
    is_pinned: input.is_pinned ?? false,
  };

  return client.from("posts").insert(payload).select(postListSelect).single();
}

export async function updatePost(
  input: UpdatePostInput,
  source: "server" | "browser" = "server"
) {
  const client =
    source === "server" ? await getSupabaseServerClient() : getSupabaseBrowserClient();
  const payload: PostUpdate = {
    title: input.title,
    content: input.content,
    is_pinned: input.is_pinned,
  };

  return client
    .from("posts")
    .update(payload)
    .eq("id", input.id)
    .select(postListSelect)
    .single();
}

export async function deletePost(
  id: string,
  source: "server" | "browser" = "server"
) {
  const client =
    source === "server" ? await getSupabaseServerClient() : getSupabaseBrowserClient();

  return client.from("posts").delete().eq("id", id).select("id").single();
}

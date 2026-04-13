"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireUser } from "@/lib/auth";
import { getBoardBySlug } from "@/lib/boards";
import { createComment, deleteComment } from "@/lib/comments";
import {
  createPost,
  deletePost,
  getPostDetailById,
  mapPostRecordToPost,
  updatePost,
} from "@/lib/posts";
import { createReport } from "@/lib/reports";
import { isCurrentUserAdmin } from "@/lib/auth";

export async function createPostAction(formData: FormData) {
  const user = await requireUser("/write");
  const boardSlug = String(formData.get("boardSlug") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const wantsPinned = String(formData.get("isPinned") ?? "") === "on";
  const isAdmin = await isCurrentUserAdmin();

  if (!boardSlug || !title || !content) {
    redirect(
      `/write?board=${encodeURIComponent(boardSlug)}&error=${encodeURIComponent("게시판, 제목, 내용을 모두 입력해 주세요.")}`
    );
  }

  const boardResult = await getBoardBySlug(boardSlug);

  if (boardResult.error || !boardResult.data) {
    redirect(`/write?error=${encodeURIComponent("게시판 정보를 불러오지 못했습니다.")}`);
  }

  const result = await createPost({
    board_id: boardResult.data.id,
    author_id: user.id,
    title,
    content,
    is_pinned: isAdmin && boardSlug === "notices" ? wantsPinned : false,
  });

  if (result.error || !result.data) {
    redirect(
      `/write?board=${encodeURIComponent(boardSlug)}&error=${encodeURIComponent(result.error?.message ?? "게시글 저장에 실패했습니다.")}`
    );
  }

  revalidatePath("/");
  revalidatePath(`/boards/${boardSlug}`);
  redirect(`/posts/${result.data.id}`);
}

export async function updatePostAction(formData: FormData) {
  const user = await requireUser("/write");
  const postId = String(formData.get("postId") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const wantsPinned = String(formData.get("isPinned") ?? "") === "on";
  const isAdmin = await isCurrentUserAdmin();

  if (!postId || !title || !content) {
    redirect(`/posts/${postId}/edit?error=${encodeURIComponent("제목과 내용을 입력해 주세요.")}`);
  }

  const postResult = await getPostDetailById(postId);

  if (postResult.error || !postResult.data) {
    redirect(`/boards/notices?error=${encodeURIComponent("게시글 정보를 찾지 못했습니다.")}`);
  }

  if (postResult.data.author_id !== user.id) {
    redirect(`/posts/${postId}?error=${encodeURIComponent("본인 글만 수정할 수 있습니다.")}`);
  }

  const result = await updatePost({
    id: postId,
    title,
    content,
    is_pinned:
      isAdmin && postResult.data.boards?.slug === "notices"
        ? wantsPinned
        : postResult.data.is_pinned,
  });

  if (result.error || !result.data) {
    redirect(
      `/posts/${postId}/edit?error=${encodeURIComponent(result.error?.message ?? "게시글 수정에 실패했습니다.")}`
    );
  }

  const mapped = mapPostRecordToPost(result.data);
  revalidatePath("/");
  if (mapped.boardSlug) {
    revalidatePath(`/boards/${mapped.boardSlug}`);
  }
  revalidatePath(`/posts/${postId}`);
  redirect(`/posts/${postId}`);
}

export async function deletePostAction(formData: FormData) {
  const user = await requireUser("/write");
  const postId = String(formData.get("postId") ?? "");

  const postResult = await getPostDetailById(postId);

  if (postResult.error || !postResult.data) {
    redirect(`/boards/notices?error=${encodeURIComponent("게시글 정보를 찾지 못했습니다.")}`);
  }

  if (postResult.data.author_id !== user.id) {
    redirect(`/posts/${postId}?error=${encodeURIComponent("본인 글만 삭제할 수 있습니다.")}`);
  }

  const boardSlug = postResult.data.boards?.slug ?? "free";
  const result = await deletePost(postId);

  if (result.error) {
    redirect(`/posts/${postId}?error=${encodeURIComponent(result.error.message)}`);
  }

  revalidatePath("/");
  revalidatePath(`/boards/${boardSlug}`);
  redirect(`/boards/${boardSlug}`);
}

export async function createCommentAction(formData: FormData) {
  const postId = String(formData.get("postId") ?? "");
  const content = String(formData.get("content") ?? "").trim();
  const user = await requireUser(`/posts/${postId}`);

  if (!postId || !content) {
    redirect(`/posts/${postId}?error=${encodeURIComponent("댓글 내용을 입력해 주세요.")}`);
  }

  const result = await createComment({
    post_id: postId,
    author_id: user.id,
    content,
  });

  if (result.error) {
    redirect(`/posts/${postId}?error=${encodeURIComponent(result.error.message)}`);
  }

  revalidatePath(`/posts/${postId}`);
  redirect(`/posts/${postId}`);
}

export async function deleteCommentAction(formData: FormData) {
  const postId = String(formData.get("postId") ?? "");
  await requireUser(`/posts/${postId}`);
  const commentId = String(formData.get("commentId") ?? "");

  const result = await deleteComment(commentId);

  if (result.error) {
    redirect(`/posts/${postId}?error=${encodeURIComponent(result.error.message)}`);
  }

  revalidatePath(`/posts/${postId}`);
  redirect(`/posts/${postId}`);
}

export async function createReportAction(formData: FormData) {
  const targetType = String(formData.get("targetType") ?? "") as "post" | "comment";
  const targetId = String(formData.get("targetId") ?? "");
  const nextPath = String(formData.get("nextPath") ?? "/");
  const reason = String(formData.get("reason") ?? "").trim();
  const user = await requireUser(nextPath);

  if (!targetId || !reason || !["post", "comment"].includes(targetType)) {
    redirect(`${nextPath}?error=${encodeURIComponent("신고 사유를 입력해 주세요.")}`);
  }

  const result = await createReport({
    target_type: targetType,
    target_id: targetId,
    reporter_id: user.id,
    reason,
  });

  if (result.error) {
    redirect(`${nextPath}?error=${encodeURIComponent(result.error.message)}`);
  }

  redirect(`${nextPath}?message=${encodeURIComponent("신고가 접수되었습니다.")}`);
}

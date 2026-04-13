import type { Post } from "@/types";

import { PostItem } from "./PostItem";

type PostListProps = {
  posts: Post[];
  showBoard?: boolean;
  emptyMessage?: string;
};

export function PostList({
  posts,
  showBoard = false,
  emptyMessage = "아직 등록된 글이 없습니다.",
}: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="panel px-5 py-10 text-center text-sm text-slate">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="panel overflow-hidden">
      <ul>
        {posts.map((post) => (
          <PostItem key={post.id} post={post} showBoard={showBoard} />
        ))}
      </ul>
    </div>
  );
}

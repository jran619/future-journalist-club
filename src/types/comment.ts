export type Comment = {
  id: string;
  postId: string;
  authorId?: string;
  authorName: string;
  content: string;
  createdAt: string;
};

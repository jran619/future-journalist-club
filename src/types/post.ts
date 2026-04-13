export type Post = {
  id: string;
  boardSlug?: string;
  boardName?: string;
  title: string;
  content: string;
  authorId?: string;
  authorName: string;
  createdAt: string;
  updatedAt?: string;
  isPinned?: boolean;
  commentCount?: number;
};

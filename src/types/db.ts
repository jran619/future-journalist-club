export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      boards: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          description?: string;
          sort_order: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          description?: string;
          sort_order?: number;
          created_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          nickname: string;
          role: "member" | "admin";
          created_at: string;
        };
        Insert: {
          id: string;
          nickname: string;
          role?: "member" | "admin";
          created_at?: string;
        };
        Update: {
          id?: string;
          nickname?: string;
          role?: "member" | "admin";
          created_at?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          board_id: string;
          author_id: string;
          title: string;
          content: string;
          view_count: number;
          like_count: number;
          is_pinned: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          board_id: string;
          author_id: string;
          title: string;
          content: string;
          view_count?: number;
          like_count?: number;
          is_pinned?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          board_id?: string;
          author_id?: string;
          title?: string;
          content?: string;
          view_count?: number;
          like_count?: number;
          is_pinned?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      comments: {
        Row: {
          id: string;
          post_id: string;
          author_id: string;
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          author_id: string;
          content: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          author_id?: string;
          content?: string;
          created_at?: string;
        };
      };
      reports: {
        Row: {
          id: string;
          target_type: "post" | "comment";
          target_id: string;
          reporter_id: string;
          reason: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          target_type: "post" | "comment";
          target_id: string;
          reporter_id: string;
          reason: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          target_type?: "post" | "comment";
          target_id?: string;
          reporter_id?: string;
          reason?: string;
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

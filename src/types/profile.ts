export type UserRole = "member" | "admin";

export type Profile = {
  id: string;
  nickname: string;
  role: UserRole;
  created_at: string;
};

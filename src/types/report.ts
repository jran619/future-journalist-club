export type ReportTargetType = "post" | "comment";

export type Report = {
  id: string;
  target_type: ReportTargetType;
  target_id: string;
  reporter_id: string;
  reason: string;
  created_at: string;
};

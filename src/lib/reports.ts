import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { Database } from "@/types";

type ReportInsert = Database["public"]["Tables"]["reports"]["Insert"];

export type CreateReportInput = {
  target_type: "post" | "comment";
  target_id: string;
  reporter_id: string;
  reason: string;
};

export async function createReport(
  input: CreateReportInput,
  source: "server" | "browser" = "server"
) {
  const client =
    source === "server" ? await getSupabaseServerClient() : getSupabaseBrowserClient();

  const payload: ReportInsert = {
    target_type: input.target_type,
    target_id: input.target_id,
    reporter_id: input.reporter_id,
    reason: input.reason,
  };

  return client.from("reports").insert(payload).select("id").single();
}

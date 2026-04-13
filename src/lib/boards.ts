import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { Board, Database } from "@/types";

type BoardRow = Database["public"]["Tables"]["boards"]["Row"];

function mapBoard(row: BoardRow): Board {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
  };
}

export async function listBoards(source: "server" | "browser" = "server") {
  const client =
    source === "server" ? await getSupabaseServerClient() : getSupabaseBrowserClient();

  const result = await client.from("boards").select("*").order("sort_order", { ascending: true });

  return {
    ...result,
    data: result.data?.map(mapBoard) ?? null,
  };
}

export async function getBoardBySlug(slug: string, source: "server" | "browser" = "server") {
  const client =
    source === "server" ? await getSupabaseServerClient() : getSupabaseBrowserClient();

  const result = await client.from("boards").select("*").eq("slug", slug).maybeSingle();

  return {
    ...result,
    data: result.data ? mapBoard(result.data) : null,
  };
}

import Link from "next/link";

import { createReportAction } from "@/app/community/actions";

type ReportFormProps = {
  targetType: "post" | "comment";
  targetId: string;
  nextPath: string;
  compact?: boolean;
  canReport?: boolean;
};

export function ReportForm({
  targetType,
  targetId,
  nextPath,
  compact = false,
  canReport = false,
}: ReportFormProps) {
  if (!canReport) {
    return (
      <Link
        href={`/login?next=${encodeURIComponent(nextPath)}`}
        className="text-sm font-medium text-slate transition hover:text-ink"
      >
        신고
      </Link>
    );
  }

  return (
    <details className={compact ? "text-right" : ""}>
      <summary className="cursor-pointer list-none text-sm font-medium text-slate transition hover:text-ink">
        신고
      </summary>
      <form action={createReportAction} className="mt-3 space-y-3 rounded-xl border border-line bg-white p-3 text-left">
        <input type="hidden" name="targetType" value={targetType} />
        <input type="hidden" name="targetId" value={targetId} />
        <input type="hidden" name="nextPath" value={nextPath} />
        <textarea
          name="reason"
          className="input min-h-24 resize-y"
          placeholder="신고 사유를 간단히 입력해 주세요."
          required
        />
        <div className="flex justify-end">
          <button type="submit" className="btn-secondary">
            신고 접수
          </button>
        </div>
      </form>
    </details>
  );
}

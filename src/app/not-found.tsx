import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="page-shell">
      <div className="mx-auto max-w-2xl panel px-6 py-12 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink">페이지를 찾을 수 없습니다</h1>
        <p className="mt-3 text-sm leading-6 text-slate">
          요청하신 게시판이나 게시글이 아직 없거나 주소가 잘못되었습니다.
        </p>
        <div className="mt-6">
          <Link href="/" className="btn-primary">
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}

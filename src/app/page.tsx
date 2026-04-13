import Link from "next/link";

import { BoardCard, PostList } from "@/components";
import { listBoards } from "@/lib/boards";
import { listRecentPosts, mapPostRecordToPost } from "@/lib/posts";

export default async function HomePage() {
  const [boardsResult, recentPostsResult] = await Promise.all([listBoards(), listRecentPosts(6)]);
  const boards = boardsResult.data ?? [];
  const recentPosts = recentPostsResult.data?.map(mapPostRecordToPost) ?? [];

  return (
    <div className="page-shell space-y-10">
      <section className="panel overflow-hidden">
        <div className="grid gap-8 px-6 py-8 lg:grid-cols-[1.5fr_1fr] lg:px-8 lg:py-10">
          <div>
            <span className="rounded-full bg-navy-50 px-3 py-1 text-sm font-semibold text-navy-800">
              언론인 지망생 커뮤니티
            </span>
            <h1 className="mt-4 max-w-2xl text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              준비 과정의 질문, 정보, 피드백을 한곳에 모은 커뮤니티 MVP
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate">
              공지, 채용 정보, 기사 첨삭, 면접 후기까지 핵심 게시판 10개를 먼저 담았습니다.
              정보가 많은 커뮤니티처럼 보이되 복잡하지 않게 구성했습니다.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/boards/qa" className="btn-primary">
                질문 보러 가기
              </Link>
              <Link href="/write" className="btn-secondary">
                글 쓰러 가기
              </Link>
            </div>
          </div>
          <div className="panel-muted p-5">
            <h2 className="text-sm font-bold text-ink">빠른 링크</h2>
            <ul className="mt-4 grid gap-3 text-sm text-slate">
              <li>
                <Link href="/boards/notices" className="transition hover:text-navy-800">
                  운영 공지 확인하기
                </Link>
              </li>
              <li>
                <Link href="/boards/jobs" className="transition hover:text-navy-800">
                  채용·공채 정보 보기
                </Link>
              </li>
              <li>
                <Link href="/boards/article-feedback" className="transition hover:text-navy-800">
                  기사 첨삭 게시판 보기
                </Link>
              </li>
              <li>
                <Link href="/boards/interview-reviews" className="transition hover:text-navy-800">
                  면접 후기 읽기
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="section-title">게시판</h2>
          <p className="text-sm text-slate">핵심 게시판을 한눈에 볼 수 있습니다.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {boards.map((board) => (
            <BoardCard key={board.id} board={board} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="section-title">최신 글</h2>
          <Link href="/boards/free" className="text-sm font-medium text-navy-800">
            더 보기
          </Link>
        </div>
        <PostList posts={recentPosts} showBoard emptyMessage="아직 등록된 게시글이 없습니다." />
      </section>
    </div>
  );
}

import Link from "next/link";

// 반복되는 카드와 목록 데이터는 배열로 분리해 두면
// 초보자도 구조를 쉽게 읽고 수정할 수 있습니다.
const features = [
  {
    title: "실전 중심 글쓰기",
    description:
      "기사의 기본 구조를 익히고 짧은 글부터 차근차근 써 보며 저널리즘의 기초를 다질 수 있습니다.",
  },
  {
    title: "신뢰할 수 있는 교류",
    description:
      "같은 목표를 가진 예비 기자들과 차분하게 정보를 나누고 서로의 성장을 응원할 수 있습니다.",
  },
  {
    title: "준비 과정 안내",
    description:
      "포트폴리오, 취재 감각, 진로 설계처럼 준비 과정에서 중요한 주제를 한곳에서 정리해 제공합니다.",
  },
];

const audience = [
  "기자를 꿈꾸지만 어디서부터 준비해야 할지 막막한 학생",
  "글쓰기와 취재 역량을 꾸준히 키우고 싶은 예비 언론인",
  "혼자보다 함께 배우고 피드백을 나누며 성장하고 싶은 사람",
];

export default function HomePage() {
  return (
    <div className="page-shell py-6 sm:py-8">
      {/* 사이트의 첫인상을 만드는 히어로 섹션입니다. */}
      <section className="hero-section">
        <div className="hero-badge">Aspiring Journalists Community</div>
        <h1 className="hero-title">미래 기자 클럽</h1>
        <p className="hero-description">
          미래 기자 클럽은 예비 기자들이 함께 배우고 성장할 수 있도록 돕는 커뮤니티입니다.
          신뢰할 수 있는 분위기 안에서 글쓰기, 취재 감각, 진로 준비에 필요한 이야기를
          차분하게 나눕니다.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link href="#join" className="btn-primary">
            참여하기
          </Link>
          <Link href="#features" className="btn-secondary">
            더 알아보기
          </Link>
        </div>
      </section>

      {/* 같은 형태의 카드를 간단히 반복해서 보여 줍니다. */}
      <section id="features" className="section-block">
        <div className="section-heading">
          <p className="section-kicker">핵심 특징</p>
          <h2 className="section-title">예비 기자에게 필요한 내용을 단정하게 담았습니다</h2>
          <p className="section-copy">
            복잡한 기능보다, 준비 과정에서 실제로 도움이 되는 핵심 정보를 중심으로 구성했습니다.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="feature-card">
              <div className="feature-accent" />
              <h3 className="text-xl font-semibold tracking-tight text-slate-950">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* 이 섹션은 커뮤니티가 어떤 사람에게 맞는지 설명합니다. */}
      <section id="about" className="section-block">
        <div className="section-panel">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="section-kicker">이런 분을 위한 커뮤니티</p>
              <h2 className="section-title">혼자 준비하는 막막함을 덜고 싶은 예비 기자에게</h2>
              <p className="section-copy mt-4">
                저널리즘을 진지하게 준비하는 사람에게는 꾸준한 연습과 건강한 피드백 환경이
                중요합니다. 미래 기자 클럽은 방향을 잃지 않고 준비를 이어 갈 수 있도록 돕는
                안정적인 출발점이 되고자 합니다.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <h3 className="text-lg font-semibold tracking-tight text-slate-950">추천 대상</h3>
              <ul className="mt-5 space-y-4 text-sm leading-7 text-slate-600 sm:text-base">
                {audience.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-blue-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 마지막에는 행동을 유도하는 CTA를 다시 배치했습니다. */}
      <section id="join" className="section-block pt-0">
        <div className="cta-panel">
          <p className="section-kicker">함께 시작해 보세요</p>
          <h2 className="section-title">첫걸음을 내딛는 데 필요한 연결이 여기 있습니다</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
            커뮤니티에 참여해 예비 기자들과 함께 배우고, 글쓰기와 진로 준비의 흐름을
            차근차근 만들어 보세요.
          </p>
          <div className="mt-8">
            <Link href="#top" className="btn-primary">
              참여하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

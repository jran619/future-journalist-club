const guidelines = [
  "허위 정보 및 비방 금지",
  "개인정보 노출 금지",
  "채용 정보는 출처 표기 권장",
  "면접 후기 게시판은 기업 기밀 유출 금지",
  "첨삭 게시판 글은 작성자 동의 없는 외부 공유 금지",
];

export function CommunityGuidelines() {
  return (
    <aside className="panel-muted p-5">
      <h2 className="text-sm font-bold text-ink">운영 원칙</h2>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate">
        {guidelines.map((item) => (
          <li key={item}>- {item}</li>
        ))}
      </ul>
    </aside>
  );
}

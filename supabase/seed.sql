insert into public.boards (slug, name, description, sort_order)
values
  ('notices', '공지사항', '운영 공지와 서비스 업데이트를 확인하세요.', 1),
  ('jobs', '채용·공채 정보', '언론사 채용 일정과 공채 정보를 빠르게 공유합니다.', 2),
  ('qa', '기자 준비 Q&A', '준비 과정의 궁금증을 묻고 답하는 공간입니다.', 3),
  ('portfolio-feedback', '자소서·포트폴리오 피드백', '자기소개서와 포트폴리오에 대한 조언을 받아보세요.', 4),
  ('article-feedback', '기사 첨삭', '기사 초안과 리드문을 올리고 피드백을 받으세요.', 5),
  ('interview-reviews', '면접 후기', '면접 경험과 분위기를 정리해 공유합니다.', 6),
  ('media-info', '언론사별 정보', '언론사 문화와 직무별 특징을 모아봅니다.', 7),
  ('current-issues', '시사 토론', '주요 이슈를 바탕으로 관점과 논리를 정리합니다.', 8),
  ('pro-advice', '현직자 조언', '현직자 경험과 실무 조언을 읽을 수 있습니다.', 9),
  ('free', '자유게시판', '편하게 이야기 나누는 자유 공간입니다.', 10)
on conflict (slug) do update
set
  name = excluded.name,
  description = excluded.description,
  sort_order = excluded.sort_order;

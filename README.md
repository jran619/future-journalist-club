# Press Community MVP

언론인 지망생을 위한 커뮤니티 사이트 MVP입니다.  
Next.js App Router, Tailwind CSS, Supabase, Vercel 조합으로 구성했고, 게시판형 커뮤니티의 핵심 기능만 먼저 구현했습니다.

현재 포함된 주요 기능:

- 게시판 10개
- 이메일 기반 회원가입 / 로그인
- 게시글 작성 / 수정 / 삭제
- 댓글 작성 / 삭제
- 공지사항 게시판 공지글 상단 고정
- 게시글 / 댓글 신고 접수
- 운영 원칙 안내 문구

## 기술 스택

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Supabase
  - Auth
  - Postgres
  - Row Level Security 기반 설계
- Vercel

## 로컬 실행 방법

1. Node.js 20 이상 설치
2. 저장소 루트에서 의존성 설치

```bash
npm install
```

3. `.env.example`를 참고해 `.env.local` 생성
4. 개발 서버 실행

```bash
npm run dev
```

5. 브라우저에서 `http://localhost:3000` 접속

## 환경변수 설정 방법

`.env.local` 파일에 아래 값을 넣습니다.

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

설명:

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase 프로젝트 URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: Supabase publishable key
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: 구버전 호환용 fallback 값
- `NEXT_PUBLIC_SITE_URL`: 인증 이메일 리디렉션 기준 URL

로컬에서는 `NEXT_PUBLIC_SITE_URL=http://localhost:3000`을 사용하고, 배포 후에는 실제 도메인으로 바꿉니다.

## Supabase 설정 순서

1. Supabase 프로젝트 생성
2. Authentication 사용 설정 확인
3. SQL Editor에서 아래 파일 순서대로 실행

```text
supabase/migrations/20260413_init_schema.sql
supabase/migrations/20260413_auth_profiles.sql
supabase/seed.sql
```

4. Auth URL 설정
   - `Authentication > URL Configuration > Site URL`
   - 로컬: `http://localhost:3000`
   - 배포 후: 실제 Vercel 도메인

5. Redirect URL 설정
   - `http://localhost:3000/auth/confirm`
   - `https://your-domain.vercel.app/auth/confirm`
   - 커스텀 도메인을 쓸 경우 해당 도메인도 추가

6. Email provider 확인
   - Hosted Supabase는 이메일 인증이 기본 활성화일 수 있음
   - 이메일 인증을 유지할 경우 회원가입 후 메일 확인이 필요함

7. 배포 전 확인
   - `profiles` 자동 생성 트리거 정상 적용
   - `boards` 시드 10개 정상 삽입
   - 공지사항 게시판 slug가 `notices`인지 확인

## Supabase 연결 체크리스트

- `boards`, `profiles`, `posts`, `comments`, `reports` 테이블 생성 완료
- `handle_new_user()` 트리거 적용 완료
- `set_updated_at()` 트리거 적용 완료
- `boards` 시드 데이터 10개 삽입 완료
- `Site URL` 설정 완료
- `Redirect URLs` 설정 완료
- Auth Email provider 활성화 확인
- 테스트 계정 회원가입 / 로그인 확인
- 관리자 계정의 `profiles.role` 값을 `admin`으로 수동 변경

예시 SQL:

```sql
update public.profiles
set role = 'admin'
where nickname = 'admin-nickname';
```

## Vercel 배포 방법

1. Git 저장소를 Vercel에 연결
2. Framework Preset은 Next.js 선택
3. Environment Variables에 아래 값 등록
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL`

4. `NEXT_PUBLIC_SITE_URL`은 배포 도메인으로 설정
   - 예: `https://your-project.vercel.app`

5. 배포 완료 후 Supabase 대시보드에서 아래 재확인
   - `Site URL`
   - `Redirect URLs`

6. 실제 배포 주소에서 점검
   - 회원가입
   - 이메일 인증
   - 로그인 / 로그아웃
   - 게시글 작성
   - 댓글 작성
   - 신고 접수
   - 관리자 공지 상단 고정

## 프로젝트 구조

```text
src/
  app/
    auth/
    boards/[slug]/
    posts/[id]/
    write/
    login/
    signup/
  components/
    layout/
    boards/
    posts/
    comments/
    community/
  lib/
    supabase/
    auth.ts
    boards.ts
    posts.ts
    comments.ts
    reports.ts
  types/
supabase/
  migrations/
  seed.sql
```

## 현재 구현 범위

- 실데이터 기반 게시판 / 게시글 / 댓글 CRUD
- 로그인한 사용자만 글쓰기 / 댓글쓰기 가능
- 본인 글만 수정 / 삭제 가능
- 본인 댓글만 삭제 가능
- 관리자만 공지사항 게시판에서 공지 상단 고정 가능
- 게시글 / 댓글 신고 접수 가능

## 현재 한계

- 관리자 신고 처리 화면 없음
- 댓글 수정 기능 없음
- 좋아요 / 조회수 증가 로직 미구현
- 검색 / 페이지네이션 미구현
- 이미지 업로드 미구현
- 실행 검증은 로컬 Node 환경이 필요함

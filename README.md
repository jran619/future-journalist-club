# 미래 기자 클럽

`Next.js`로 만든 매우 단순한 한국어 랜딩 페이지입니다.  
예비 기자를 위한 커뮤니티를 소개하는 한 페이지 사이트이며, 로그인, 데이터베이스, 백엔드 기능은 포함하지 않았습니다.

## 주요 구성

- 히어로 섹션
- 특징 카드 3개
- 커뮤니티 대상 설명 섹션
- `참여하기` CTA 버튼
- 심플한 푸터

## 사용 기술

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS

## 폴더 구조

```text
src/
  app/
    globals.css      # 전체 스타일
    layout.tsx       # 공통 레이아웃
    page.tsx         # 한 페이지 랜딩 페이지
  components/
    layout/
      Footer.tsx     # 하단 푸터
      Header.tsx     # 상단 헤더
```

## 로컬 실행 방법

1. PowerShell 또는 터미널을 엽니다.

2. 프로젝트 폴더로 이동합니다.

```powershell
cd "C:\Users\pcuser\Documents\New project"
```

3. 패키지를 설치합니다.

```powershell
npm install
```

4. 개발 서버를 실행합니다.

```powershell
npm run dev
```

5. 브라우저에서 아래 주소를 엽니다.

```text
http://localhost:3000
```

## 참고 파일

- 메인 페이지: [src/app/page.tsx](C:\Users\pcuser\Documents\New project\src\app\page.tsx)
- 레이아웃: [src/app/layout.tsx](C:\Users\pcuser\Documents\New project\src\app\layout.tsx)
- 전역 스타일: [src/app/globals.css](C:\Users\pcuser\Documents\New project\src\app\globals.css)

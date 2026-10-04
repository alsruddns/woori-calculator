# woori-tools

woori.today에서 운영할 검색 중심 계산기·생활 도구 서비스입니다. 각 계산기는 독립 URL을 가지며, 계산 로직은 브라우저에서 즉시 실행하는 방향으로 구성합니다. MoneyBook과는 별개의 서비스입니다.

## 기술 스택

- Next.js App Router, React, TypeScript (strict)
- Tailwind CSS 4
- pnpm
- Vitest
- Docker multi-stage production image (Next.js standalone output)

Backend, 데이터베이스, 로그인 및 글로벌 상태 라이브러리는 사용하지 않습니다.

## 로컬 실행

Node.js 20 이상과 pnpm이 필요합니다.

```sh
pnpm install
pnpm dev
```

개발 서버는 `http://localhost:3000`에서 실행됩니다.

## 주요 명령어

```sh
pnpm dev        # 개발 서버
pnpm lint       # ESLint
pnpm test       # Vitest 단위 테스트
pnpm typecheck  # TypeScript 검사
pnpm build      # Production 빌드
pnpm start      # Production 서버
```

## 주요 구조

```text
src/
  app/                    # App Router 페이지, sitemap, robots
  components/layout/      # 공통 헤더와 푸터
  components/seo/         # JSON-LD 기반
  constants/              # 사이트 설정
  data/calculators/       # 계산기 카테고리와 Registry
  lib/formatter/          # 숫자 및 KRW formatter
  lib/seo/                # 페이지 metadata helper
  types/                  # 계산기 및 정책 데이터 타입
```

새 계산기는 순수 계산 함수와 단위 테스트를 먼저 정의하고 UI와 분리하세요. 상세 페이지를 완성하고 Registry에서 공개 처리한 항목만 목록과 sitemap에 노출되어야 합니다. 자세한 원칙은 `AGENTS.md`를 참고하세요.

## 브랜치 전략

`main` → `release` → `develop` → `feature/dev` 흐름을 사용하며, 작업은 현재 지정된 브랜치에서 진행합니다. 커밋 제목 형식은 `Type : [scope] 작업 내용`입니다.

## Production build

```sh
pnpm build
pnpm start
```

## Docker

프로젝트 루트에서 production 이미지를 빌드하고 실행합니다.

```sh
docker build -t woori-tools .
docker run --rm -p 3000:3000 woori-tools
```

컨테이너는 standalone 서버를 non-root 사용자로 실행합니다.

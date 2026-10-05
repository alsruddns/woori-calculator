# woori-tools

woori.today의 검색 중심 계산기·생활 도구 서비스입니다. MoneyBook과 별개의 Next.js frontend이며 계산은 사용자의 브라우저에서 처리합니다.

## 기술 스택

- Next.js App Router, React, TypeScript strict
- Tailwind CSS 4, pnpm
- Vitest 단위 테스트
- Docker multi-stage build, Next.js standalone output

Backend, DB, 로그인, 관리자, 글로벌 상태 라이브러리는 사용하지 않습니다.

## 실행

Node.js 20 이상과 pnpm이 필요합니다.

```sh
pnpm install
pnpm dev
```

개발 서버와 production 서버의 기본 주소는 **http://localhost:3001**입니다. MoneyBook의 3000 포트와 분리해 사용합니다.

## 명령어

```sh
pnpm dev        # 개발 서버 (3001)
pnpm lint       # ESLint
pnpm test       # Vitest
pnpm typecheck  # TypeScript
pnpm build      # production build
pnpm start      # production 서버 (3001)
```

## 계산기 구조

현재는 35개 계산기를 공개하고 있습니다. 결과 숫자는 공통 formatter로 천 단위 쉼표와 원화 `원` 접미사를 적용합니다. 사용자 입력은 브라우저에서만 계산합니다.

숫자 입력은 최대 1,000조, 목록 입력은 최대 500개 항목과 30,000자로 제한합니다. 대출 상환 계산은 최대 1,200개월, 저축 납입 계산은 최대 2,400개월이며, 날짜 범위는 최대 200년입니다. 반복 계산은 가능한 경우 수학식으로 계산하고 결과의 유한성 및 안전 정수 범위를 검사합니다.

```text
src/
  app/calculators/[slug]/       # 공통 SEO 상세 route, 정적 생성
  calculators/                  # React와 분리한 계산 로직 및 순수 함수 테스트
  components/calculator/        # 계산 입력과 결과 Client Component
  data/calculator-content/      # 계산기별 콘텐츠를 카테고리별로 관리
  data/calculators/             # Registry와 카테고리
  data/policies/                # 연도와 출처가 있는 정책 자료
  lib/formatter/                # 천 단위 숫자·KRW formatter
  lib/seo/                      # canonical 및 metadata helper
```

## 계산기 추가 방법

1. `src/calculators/<분야>/`에 React와 분리된 순수 계산 함수와 경계값 테스트를 추가합니다.
2. `src/data/calculator-content/`의 분야 파일에 독립 slug, 고유 설명·공식·예제·FAQ·관련 링크·입력 정의를 등록합니다.
3. 새 분야면 콘텐츠 배열을 `index.ts`에 연결합니다. Registry, 계산기 목록, 정적 상세 페이지와 sitemap은 공개 콘텐츠 정의에서 생성됩니다.
4. 정책값은 UI나 계산 함수에 직접 넣지 말고 `src/data/policies/`에 기준 연도·버전·유효기간·출처를 분리합니다. 확인되지 않은 정책 계산기는 공개하지 않습니다.
5. 숫자 입력은 공통 formatter를 사용하고, 결과 계산은 단위 테스트로 확인합니다.

공개 계산기의 계산 예제는 실제 계산 함수 결과와 일치해야 합니다. 0으로 나누는 경우, 잘못된 기간·단위, 반올림, 경계 날짜 등을 테스트하고 정책형 계산기는 확인 가능한 공식 출처와 적용기간을 기록합니다.

SEO는 각 계산기의 실제 URL, 고유 metadata/canonical/H1, 공식과 설명, 예제, FAQ 및 관련 링크를 하나의 기능으로 관리합니다. sitemap에는 공개된 페이지만 들어갑니다.

## Docker

```sh
docker build -t woori-tools .
docker run --rm -p 3001:3001 woori-tools
```

컨테이너 내부 앱도 3001 포트에서 standalone 서버를 non-root 사용자로 실행합니다.

## 브랜치와 커밋

`main` → `release` → `develop` → `feature/dev` 흐름을 사용합니다. 커밋 제목은 `Type : [scope] 작업 내용` 형식입니다. 프로젝트 원칙은 `AGENTS.md`에 정리되어 있습니다.

## Internationalized URLs and content

- Supported locales: Korean (`ko`), English (`en`), Japanese (`ja`), and Simplified Chinese (`zh`).
- Korean keeps existing paths such as `/calculators/...`; other locales use `/en/...`, `/ja/...`, or `/zh/...` prefixes.
- `src/i18n/config.ts` lists calculators with complete translated pages. Policy calculators based on Korean rules remain Korean-only until a separately reviewed translation clearly identifies the South Korea basis.
- Add locale content under `src/i18n/dictionaries/` with a unique title, description, keywords, instructions, formula, example, FAQ, and translated input/result labels before publishing its slug.
- Each localized page uses its own canonical URL and hreflang links only to available translations. Do not publish incomplete or mixed-language pages.

## Production deployment

- Production origin and canonical host: `https://woori.today` (apex host). `www.woori.today` should redirect to the apex host at the edge.
- The Next.js server listens on port `3001`; keep MoneyBook on `3000`. Build with `pnpm build`, or use the standalone Docker image.
- A Caddy site-only example is shown below. Caddy terminates HTTPS and owns HSTS; Next.js sets the other baseline response headers. Do not duplicate HSTS at the application layer.

```caddyfile
www.woori.today {
    redir https://woori.today{uri} permanent
}

woori.today {
    encode zstd gzip
    header Strict-Transport-Security "max-age=31536000"
    reverse_proxy 127.0.0.1:3001
}
```

The app currently does not set a Content-Security-Policy. A production CSP needs a deliberate nonce/hash strategy for Next.js static rendering and its inline bootstrap scripts; do not add broad `unsafe-eval` or third-party script allowances as a shortcut.

## Search engine and release checklist

- [ ] `pnpm test`, `pnpm lint`, `pnpm typecheck`, and `pnpm build` pass.
- [ ] Build and run the Docker image; confirm it listens on container port `3001` and reports healthy.
- [ ] Configure DNS, Caddy HTTPS, apex canonical host, and `www` redirect.
- [ ] Check `https://woori.today/`, `/sitemap.xml`, `/robots.txt`, and a missing URL returns 404.
- [ ] Inspect canonical, hreflang, locale `lang`, and page titles on representative ko/en/ja/zh pages.
- [ ] Submit the sitemap in Google Search Console and Naver Search Advisor after ownership verification.
- [ ] Add real Google/Naver verification values through the `verification` metadata in the root route-group layout when available; never commit placeholder tokens.
- [ ] Revisit the privacy notice before adding analytics, advertising, or other data collection.

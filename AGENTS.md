# woori-tools 개발 가이드

## 프로젝트 개요

woori-tools는 woori.today에서 운영할 검색 중심 계산기·생활 도구 서비스다. MoneyBook과 별도 서비스이며 별도 저장소다.

## Frontend 원칙

- Next.js App Router, TypeScript, Tailwind CSS, pnpm을 사용한다.
- Server Component를 우선하고 Client Component는 상호작용이 필요한 곳에만 쓴다.
- Backend가 없는 계산기에 API 계층을 억지로 만들지 않는다.
- Redux, RTK Query, Zustand는 필요해지기 전까지 도입하지 않는다.
- frontend만 변경한다. Backend 변경은 금지한다.

## 계산기 구조 원칙

계산기 UI와 React 없이 테스트할 수 있는 순수 계산 함수를 분리한다 (Page → Calculator UI → pure calculation function). 계산기 추가는 URL, Registry, metadata, canonical, H1, description, UI/result, 계산 방법, 공식, 예제, FAQ, 기준 연도, 업데이트일, 출처, 관련 계산기, unit test, sitemap 노출을 함께 고려한다. 정책과 무관하면 `STATIC`, 연도별 제도·세율·보험료·정책에 의존하면 `POLICY`로 분류한다.

## SEO 원칙

SEO는 핵심 제품 기능이다. 각 계산기는 독립 URL과 고유 title, description, canonical, H1, 콘텐츠, FAQ, 관련 계산기를 가진다. 얇은 복제 콘텐츠를 만들지 않는다.

## Policy Data 원칙

정책 데이터는 초기에는 TypeScript/static data로 관리할 수 있다. UI에 정책 숫자를 하드코딩하지 않는다. 가능한 경우 `id`, `policyYear`, `version`, `effectiveFrom`, `effectiveTo`, `updatedAt`, `sourceName`, `sourceUrl`을 기록한다.

## Testing 원칙

공식 테스트에는 일반 입력, 0, 음수, 큰 숫자, 소수, 경계값, 반올림, 정책 연도 변경을 고려한다.

```sh
pnpm test
pnpm lint
pnpm exec tsc --noEmit
pnpm build
git diff --check
```

## 작업 안전 규칙

Backend를 변경하지 않는다. 다른 작업자의 변경사항을 reset, checkout, stash, clean으로 되돌리지 않는다. 검증 후 이번 작업 파일만 commit하고 push한다.

# woori-calculator 공통 규칙

## 프로젝트
- 프로젝트명: woori-calculator
- 서비스명: 계산기
- 운영 도메인: https://www.woori.today
- 기본 경로: `/{locale}/calculators`
- Docker service: `calculator`
- 내부 PORT: `3001`
- GHCR: `ghcr.io/alsruddns/woori-calculator:latest`

## 기술
- Next.js App Router
- TypeScript
- Tailwind
- pnpm
- Vitest
- 브라우저 계산 우선
- 불필요한 backend 금지

## 브랜치
- `main`: 운영
- `release`: 스테이징
- `develop`: 개발 통합
- 일반 작업은 `develop` 기준

실제 현재 브랜치 구조를 임의로 변경하지 않는다.

## Commit
`Type : [Scope] Description`

## locale
15 locales: `ko`, `en`, `ja`, `zh`, `es`, `pt-br`, `de`, `fr`, `vi`, `id`, `th`, `zh-tw`, `it`, `nl`, `hi`

hreflang 표기:
- `pt-BR`
- `zh-TW`

## URL
- `/{locale}/calculators`
- `/{locale}/calculators/{slug}`

Legacy: `/calculator` → `/ko/calculators`

## 숫자 UX
- 사용자 표시 숫자는 천 단위 separator를 우선한다.
- `NaN`, `Infinity`를 차단한다.
- `-0`을 정리한다.
- 금액뿐 아니라 일반 숫자에도 일관성 있게 적용한다.

## 정책 계산기
법률, 세금, 보험, 연금, 대출 규제, 국가 정책 등에 영향을 받는 계산기는 `service-catalog.md`의 정책확인필요 컬럼으로 관리한다. 가능하면 기준연도와 정책출처도 함께 관리한다.

정책 확인이 완료되지 않은 계산 결과를 확정적인 공식 기준처럼 표현하지 않는다.

## SEO
- canonical
- 15 locale hreflang 및 x-default
- sitemap에는 public calculator만 포함
- service catalog 공개 상태와 registry 상태 일치

외부 sitemap: https://www.woori.today/calculator-sitemap.xml

내부: http://calculator:3001/sitemap.xml

## 광고
승인 전 광고는 완전히 숨긴다. placeholder도 두지 않는다. `NEXT_PUBLIC_ADS_ENABLED` 정책을 유지한다.

## 배포
`main` push 시 GitHub Actions가 Docker build, GHCR push, server SSH, `docker compose pull calculator`, `docker compose up -d calculator`를 수행한다.

서버에서 source clone/build를 하지 않는다.

```yaml
calculator:
  image: ghcr.io/alsruddns/woori-calculator:latest
  container_name: calculator
  restart: unless-stopped
```

## Nginx
실제 production source of truth는 `/opt/services/nginx/conf.d/default.conf`다.

저장소의 `nginx/woori-calculator.conf`는 참고/reference 용도이며 production에 자동 적용되지 않는다.

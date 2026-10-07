const siteOrigin = (process.env.SITE_URL ?? "https://www.woori.today").replace(/\/+$/, "");

export const siteConfig = {
  name: "우리의 오늘",
  shortName: "woori.today",
  url: siteOrigin,
  serviceBaseUrl: `${siteOrigin}/calculator`,
  description: "일상에 필요한 계산과 생활 도구를 쉽고 빠르게 이용하세요.",
  locale: "ko_KR",
  language: "ko",
} as const;

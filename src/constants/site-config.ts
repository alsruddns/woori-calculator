const configuredSiteUrl = new URL(process.env.SITE_URL ?? "https://www.woori.today");
const siteOrigin = ["woori.today", "www.woori.today"].includes(configuredSiteUrl.hostname.toLowerCase())
  ? "https://www.woori.today"
  : configuredSiteUrl.origin;

export const siteConfig = {
  name: "우리의 오늘",
  shortName: "woori.today",
  url: siteOrigin,
  serviceBaseUrl: siteOrigin,
  description: "일상에 필요한 계산과 생활 도구를 쉽고 빠르게 이용하세요.",
  locale: "ko_KR",
  language: "ko",
} as const;

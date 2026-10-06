export const siteConfig = {
  name: "우리의 오늘",
  shortName: "woori.today",
  url: "https://www.woori.today",
  description: "일상에 필요한 계산과 생활 도구를 쉽고 빠르게 이용하세요.",
  locale: "ko_KR",
  language: "ko",
} as const;

export const siteBasePath = "/calculator";

export function siteUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(`${siteBasePath}${normalized === "/" ? "" : normalized}`, siteConfig.url).toString();
}

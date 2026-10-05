export const locales = ["ko", "en", "ja", "zh"] as const;
export type Locale = (typeof locales)[number];
export const prefixedLocales = ["en", "ja", "zh"] as const satisfies readonly Locale[];
export type PrefixedLocale = (typeof prefixedLocales)[number];

export const localeConfig: Record<Locale, { htmlLang: string; ogLocale: string; languageName: string }> = {
  ko: { htmlLang: "ko", ogLocale: "ko_KR", languageName: "한국어" },
  en: { htmlLang: "en", ogLocale: "en_US", languageName: "English" },
  ja: { htmlLang: "ja", ogLocale: "ja_JP", languageName: "日本語" },
  zh: { htmlLang: "zh-CN", ogLocale: "zh_CN", languageName: "中文" },
};

export const localizedCalculatorSlugs = [
  "percentage", "discount", "loan-interest", "compound-interest", "vat", "date-difference", "age", "area",
] as const;
export type LocalizedCalculatorSlug = (typeof localizedCalculatorSlugs)[number];
export const hasLocale = (value: string): value is Locale => locales.includes(value as Locale);
export const hasLocalizedCalculator = (slug: string): slug is LocalizedCalculatorSlug => localizedCalculatorSlugs.includes(slug as LocalizedCalculatorSlug);

export function localePath(locale: Locale, path = "") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return locale === "ko" ? (normalized === "/" ? "/" : normalized) : `/${locale}${normalized === "/" ? "" : normalized}`;
}

export function languageSwitchPath(pathname: string, target: Locale) {
  const path = pathname.replace(/^\/(en|ja|zh)(?=\/|$)/, "") || "/";
  const slug = path.match(/^\/calculators\/([^/]+)/)?.[1];
  if ((slug && !hasLocalizedCalculator(slug)) || /^\/(about|privacy|terms)(\/|$)/.test(path)) return localePath(target, "/calculators");
  return localePath(target, path);
}

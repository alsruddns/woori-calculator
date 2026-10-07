export const locales = ["ko", "en", "ja", "zh"] as const;
export type Locale = (typeof locales)[number];
export const dictionaryLocales = ["en", "ja", "zh"] as const satisfies readonly Locale[];
export type DictionaryLocale = (typeof dictionaryLocales)[number];

export const localeConfig: Record<Locale, { htmlLang: string; ogLocale: string; languageName: string }> = {
  ko: { htmlLang: "ko", ogLocale: "ko_KR", languageName: "한국어" },
  en: { htmlLang: "en", ogLocale: "en_US", languageName: "English" },
  ja: { htmlLang: "ja", ogLocale: "ja_JP", languageName: "日本語" },
  zh: { htmlLang: "zh-CN", ogLocale: "zh_CN", languageName: "中文" },
};

export const localizedCalculatorSlugs = [
  "percentage", "discount", "loan-interest", "compound-interest", "vat", "date-difference", "age", "area",
  "ratio", "average", "weighted-average", "cagr", "unit-price", "unit-converter", "change-rate",
  "simple-interest", "savings-interest", "deposit-interest", "ltv", "dti", "dsr", "margin", "markup",
  "dday", "workdays", "bmi", "pace", "fuel-cost", "calorie-per-serving",
] as const;
export type LocalizedCalculatorSlug = (typeof localizedCalculatorSlugs)[number];
export const hasLocale = (value: string): value is Locale => locales.includes(value as Locale);
export const hasLocalizedCalculator = (slug: string): slug is LocalizedCalculatorSlug => localizedCalculatorSlugs.includes(slug as LocalizedCalculatorSlug);

export function localePath(locale: Locale, path = "") {
  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  const normalized = withLeadingSlash === "/" ? "" : withLeadingSlash.replace(/\/+$/, "");
  return `/${locale}${normalized}`;
}

export function languageSwitchPath(pathname: string, target: Locale) {
  const path = pathname.replace(/^\/(ko|en|ja|zh)(?=\/|$)/, "") || "/";
  const slug = path.match(/^\/calculators\/([^/]+)/)?.[1];
  if ((slug && !hasLocalizedCalculator(slug)) || /^\/(about|privacy|terms)(\/|$)/.test(path)) return localePath(target, "/calculators");
  return localePath(target, path);
}

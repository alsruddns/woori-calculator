export const locales = ["ko", "en", "ja", "zh", "es", "pt-br", "de", "fr", "vi", "id", "th", "zh-tw", "it", "nl", "hi"] as const;
export type Locale = (typeof locales)[number];
export const existingLocales = ["ko", "en", "ja", "zh"] as const;
export type ExistingLocale = (typeof existingLocales)[number];
export const dictionaryLocales = locales.filter((locale) => locale !== "ko") as readonly Exclude<Locale, "ko">[];
export type DictionaryLocale = Exclude<Locale, "ko">;

const localeDetails: Record<Locale, { intlLocale: string; hreflang: string; openGraphLocale: string; nativeName: string }> = {
  ko: { intlLocale: "ko-KR", hreflang: "ko", openGraphLocale: "ko_KR", nativeName: "한국어" },
  en: { intlLocale: "en-US", hreflang: "en", openGraphLocale: "en_US", nativeName: "English" },
  ja: { intlLocale: "ja-JP", hreflang: "ja", openGraphLocale: "ja_JP", nativeName: "日本語" },
  zh: { intlLocale: "zh-CN", hreflang: "zh", openGraphLocale: "zh_CN", nativeName: "简体中文" },
  es: { intlLocale: "es-ES", hreflang: "es", openGraphLocale: "es_ES", nativeName: "Español" },
  "pt-br": { intlLocale: "pt-BR", hreflang: "pt-BR", openGraphLocale: "pt_BR", nativeName: "Português (Brasil)" },
  de: { intlLocale: "de-DE", hreflang: "de", openGraphLocale: "de_DE", nativeName: "Deutsch" },
  fr: { intlLocale: "fr-FR", hreflang: "fr", openGraphLocale: "fr_FR", nativeName: "Français" },
  vi: { intlLocale: "vi-VN", hreflang: "vi", openGraphLocale: "vi_VN", nativeName: "Tiếng Việt" },
  id: { intlLocale: "id-ID", hreflang: "id", openGraphLocale: "id_ID", nativeName: "Bahasa Indonesia" },
  th: { intlLocale: "th-TH", hreflang: "th", openGraphLocale: "th_TH", nativeName: "ไทย" },
  "zh-tw": { intlLocale: "zh-TW", hreflang: "zh-TW", openGraphLocale: "zh_TW", nativeName: "繁體中文" },
  it: { intlLocale: "it-IT", hreflang: "it", openGraphLocale: "it_IT", nativeName: "Italiano" },
  nl: { intlLocale: "nl-NL", hreflang: "nl", openGraphLocale: "nl_NL", nativeName: "Nederlands" },
  hi: { intlLocale: "hi-IN", hreflang: "hi", openGraphLocale: "hi_IN", nativeName: "हिन्दी" },
};
export const localeConfig = Object.fromEntries(locales.map((routeLocale) => {
  const detail = localeDetails[routeLocale];
  return [routeLocale, { routeLocale, ...detail, htmlLang: routeLocale === "zh" ? "zh-CN" : detail.intlLocale, ogLocale: detail.openGraphLocale, languageName: detail.nativeName }];
})) as Record<Locale, { routeLocale: Locale; hreflang: string; nativeName: string; intlLocale: string; openGraphLocale: string; htmlLang: string; ogLocale: string; languageName: string }>;

export const localizedCalculatorSlugs = [
  "percentage", "discount", "loan-interest", "compound-interest", "vat", "date-difference", "age", "area",
  "ratio", "average", "weighted-average", "cagr", "unit-price", "unit-converter", "change-rate",
  "simple-interest", "savings-interest", "deposit-interest", "ltv", "dti", "dsr", "margin", "markup", "fraction",
  "dday", "workdays", "bmi", "pace", "fuel-cost", "fuel-efficiency", "calorie-per-serving", "decimal-fraction", "standard-deviation",
  "median", "percentile", "probability", "stock-average-price", "dividend", "profit-loss", "loan-refinance", "prepayment-fee",
  "loan-affordability", "salary-conversion", "hourly-wage", "annual-leave-allowance", "product-margin", "withholding-tax-3-3",
  "tenure", "time-arithmetic", "pregnancy", "utility-bill", "vehicle-cost", "taxi-fare", "trip-split", "tip-calculator",
  "unemployment-benefit", "minimum-wage", "severance-pay", "social-insurance",
] as const;
export type LocalizedCalculatorSlug = (typeof localizedCalculatorSlugs)[number];
export const hasLocale = (value: string): value is Locale => locales.includes(value as Locale);
export const hasLocalizedCalculator = (slug: string): slug is LocalizedCalculatorSlug => localizedCalculatorSlugs.includes(slug as LocalizedCalculatorSlug);

export const phaseOneTranslatedCalculatorSlugs = ["age", "annual-leave-allowance", "area", "average", "bmi", "cagr", "calorie-per-serving", "change-rate", "compound-interest", "date-difference"] as const satisfies readonly LocalizedCalculatorSlug[];
export const phaseTwoTranslatedCalculatorSlugs = ["dday", "decimal-fraction", "deposit-interest", "discount", "dividend", "dsr", "dti", "fraction", "fuel-cost", "fuel-efficiency"] as const satisfies readonly LocalizedCalculatorSlug[];
export const phaseThreeTranslatedCalculatorSlugs = ["hourly-wage", "loan-affordability", "loan-interest", "loan-refinance", "ltv", "margin", "markup", "median", "minimum-wage", "pace", "percentage", "percentile", "pregnancy", "prepayment-fee", "probability", "product-margin", "profit-loss", "ratio", "salary-conversion", "savings-interest", "severance-pay", "simple-interest", "social-insurance", "standard-deviation", "stock-average-price", "taxi-fare", "tenure", "time-arithmetic", "tip-calculator", "trip-split", "unemployment-benefit", "unit-converter", "unit-price", "utility-bill", "vat", "vehicle-cost", "weighted-average", "withholding-tax-3-3", "workdays"] as const satisfies readonly LocalizedCalculatorSlug[];
export const phaseTranslatedCalculatorSlugs = [...phaseOneTranslatedCalculatorSlugs, ...phaseTwoTranslatedCalculatorSlugs, ...phaseThreeTranslatedCalculatorSlugs] as const;
export const isPhaseOneTranslatedCalculator = (slug: string): slug is (typeof phaseOneTranslatedCalculatorSlugs)[number] => phaseOneTranslatedCalculatorSlugs.includes(slug as (typeof phaseOneTranslatedCalculatorSlugs)[number]);
export const isPhaseTwoTranslatedCalculator = (slug: string): slug is (typeof phaseTwoTranslatedCalculatorSlugs)[number] => phaseTwoTranslatedCalculatorSlugs.includes(slug as (typeof phaseTwoTranslatedCalculatorSlugs)[number]);
export const isPhaseThreeTranslatedCalculator = (slug: string): slug is (typeof phaseThreeTranslatedCalculatorSlugs)[number] => phaseThreeTranslatedCalculatorSlugs.includes(slug as (typeof phaseThreeTranslatedCalculatorSlugs)[number]);
export const isPhaseTranslatedCalculator = (slug: string): slug is (typeof phaseTranslatedCalculatorSlugs)[number] => isPhaseOneTranslatedCalculator(slug) || isPhaseTwoTranslatedCalculator(slug) || isPhaseThreeTranslatedCalculator(slug);
export const supportedLocalesForCalculator = (slug: string): readonly Locale[] => hasLocalizedCalculator(slug) ? locales : ["ko"];
export const calculatorSupportsLocale = (slug: string, locale: Locale) => supportedLocalesForCalculator(slug).includes(locale);
export function missingCalculatorTranslationReport(slugs: readonly string[]): string[] {
  return slugs.flatMap((slug) => {
    const supported = new Set(supportedLocalesForCalculator(slug));
    const missing = locales.filter((locale) => !supported.has(locale));
    return missing.length ? [`- ${slug}: ${missing.join(", ")}`] : [];
  });
}
export const localizedIndexSlugs = (locale: Locale) => {
  void locale;
  return localizedCalculatorSlugs;
};

export function localePath(locale: Locale, path = "") {
  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  const normalized = withLeadingSlash === "/" ? "" : withLeadingSlash.replace(/\/+$/, "");
  return `/${locale}${normalized}`;
}

export function languageSwitchPath(pathname: string, target: Locale) {
  const path = pathname.replace(/^\/(ko|en|ja|zh|es|pt-br|de|fr|vi|id|th|zh-tw|it|nl|hi)(?=\/|$)/, "") || "/";
  const slug = path.match(/^\/calculators\/([^/]+)/)?.[1];
  if ((slug && !calculatorSupportsLocale(slug, target)) || /^\/(about|privacy|terms)(\/|$)/.test(path)) {
    const fallback: Locale = slug && calculatorSupportsLocale(slug, "en") ? "en" : "ko";
    return localePath(fallback, slug ? `/calculators/${slug}` : "/calculators");
  }
  return localePath(target, path);
}

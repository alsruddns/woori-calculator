export const routingLocales = ["ko", "en", "ja", "zh", "es", "pt-br", "de", "fr", "vi", "id", "th", "zh-tw", "it", "nl", "hi", "ru", "tr", "pl", "fil", "bn", "uk", "ms", "sv", "cs", "ro", "el"] as const;
export type RoutingLocale = (typeof routingLocales)[number];

/** Locales whose general dictionary catalog is complete; partial publications are listed separately below. */
export const locales = ["ko", "en", "ja", "zh", "es", "pt-br", "de", "fr", "vi", "id", "th", "zh-tw", "it", "nl", "hi"] as const satisfies readonly RoutingLocale[];
export type TranslatedLocale = (typeof locales)[number];
/** Backwards-compatible name for a locale whose shared UI and page catalogue are complete. */
export type Locale = TranslatedLocale;
/** Public locales can include languages with a deliberately partial set of fully translated pages. */
export const supportedLocales = [...locales, "ru"] as const satisfies readonly RoutingLocale[];
export type SupportedLocale = (typeof supportedLocales)[number];
export const existingLocales = ["ko", "en", "ja", "zh"] as const;
export type ExistingLocale = (typeof existingLocales)[number];
export const dictionaryLocales = supportedLocales.filter((locale) => locale !== "ko") as readonly Exclude<SupportedLocale, "ko">[];
export type DictionaryLocale = Exclude<Locale, "ko">;

const localeDetails: Record<RoutingLocale, { intlLocale: string; hreflang: string; openGraphLocale: string; nativeName: string }> = {
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
  ru: { intlLocale: "ru-RU", hreflang: "ru", openGraphLocale: "ru_RU", nativeName: "Русский" },
  tr: { intlLocale: "tr-TR", hreflang: "tr", openGraphLocale: "tr_TR", nativeName: "Türkçe" },
  pl: { intlLocale: "pl-PL", hreflang: "pl", openGraphLocale: "pl_PL", nativeName: "Polski" },
  fil: { intlLocale: "fil-PH", hreflang: "fil", openGraphLocale: "fil_PH", nativeName: "Filipino" },
  bn: { intlLocale: "bn-BD", hreflang: "bn", openGraphLocale: "bn_BD", nativeName: "বাংলা" },
  uk: { intlLocale: "uk-UA", hreflang: "uk", openGraphLocale: "uk_UA", nativeName: "Українська" },
  ms: { intlLocale: "ms-MY", hreflang: "ms", openGraphLocale: "ms_MY", nativeName: "Bahasa Melayu" },
  sv: { intlLocale: "sv-SE", hreflang: "sv", openGraphLocale: "sv_SE", nativeName: "Svenska" },
  cs: { intlLocale: "cs-CZ", hreflang: "cs", openGraphLocale: "cs_CZ", nativeName: "Čeština" },
  ro: { intlLocale: "ro-RO", hreflang: "ro", openGraphLocale: "ro_RO", nativeName: "Română" },
  el: { intlLocale: "el-GR", hreflang: "el", openGraphLocale: "el_GR", nativeName: "Ελληνικά" },
};
export const routingLocaleConfig = Object.fromEntries(routingLocales.map((routeLocale) => {
  const detail = localeDetails[routeLocale];
  return [routeLocale, { routeLocale, ...detail, htmlLang: routeLocale === "zh" ? "zh-CN" : detail.intlLocale, ogLocale: detail.openGraphLocale, languageName: detail.nativeName }];
})) as Record<RoutingLocale, { routeLocale: RoutingLocale; hreflang: string; nativeName: string; intlLocale: string; openGraphLocale: string; htmlLang: string; ogLocale: string; languageName: string }>;
export const localeConfig = Object.fromEntries(supportedLocales.map((locale) => [locale, routingLocaleConfig[locale]])) as Record<SupportedLocale, typeof routingLocaleConfig[RoutingLocale]>;

export const localizedCalculatorSlugs = [
  "percentage", "discount", "loan-interest", "compound-interest", "vat", "date-difference", "age", "area",
  "ratio", "proportion", "aspect-ratio", "scale-ratio", "average", "weighted-average", "cagr", "unit-price", "unit-converter", "change-rate",
  "simple-interest", "savings-interest", "deposit-interest", "ltv", "dti", "dsr", "margin", "markup", "fraction",
  "dday", "workdays", "bmi", "pace", "fuel-cost", "fuel-efficiency", "calorie-per-serving", "decimal-fraction", "standard-deviation",
  "median", "percentile", "probability", "stock-average-price", "dividend", "profit-loss", "loan-refinance", "prepayment-fee",
  "loan-affordability", "salary-conversion", "hourly-wage", "annual-leave-allowance", "product-margin", "withholding-tax-3-3",
  "tenure", "time-arithmetic", "pregnancy", "utility-bill", "vehicle-cost", "taxi-fare", "trip-split", "tip-calculator",
  "unemployment-benefit", "minimum-wage", "severance-pay", "social-insurance",
  "japan-consumption-tax-calculator", "japan-annual-salary-calculator", "japan-monthly-salary-calculator", "japan-overtime-pay-calculator", "japan-night-holiday-pay-calculator",
  "germany-gross-net-salary-calculator", "germany-income-tax-calculator", "germany-vat-calculator", "germany-overtime-pay-calculator", "germany-vacation-pay-calculator",
  "spain-gross-net-salary-calculator", "spain-irpf-calculator", "spain-vat-calculator", "spain-severance-pay-calculator",
  "france-gross-net-salary-calculator", "france-income-tax-calculator", "france-vat-calculator", "france-overtime-pay-calculator",
  "netherlands-gross-net-salary-calculator", "netherlands-vat-calculator", "netherlands-30-percent-ruling-calculator", "netherlands-holiday-allowance-calculator",
  "india-gst-calculator", "india-sip-calculator", "india-ppf-calculator", "india-nps-calculator", "india-gross-net-salary-calculator", "india-income-tax-calculator",
  "brazil-gross-net-salary-calculator", "brazil-inss-calculator", "brazil-irrf-calculator", "brazil-fgts-calculator", "brazil-thirteenth-salary-calculator",
  "vietnam-gross-net-salary-calculator", "vietnam-personal-income-tax-calculator", "vietnam-social-insurance-calculator",
  "china-gross-net-salary-calculator", "china-individual-income-tax-calculator", "china-social-insurance-calculator", "china-vat-calculator",
  "taiwan-gross-net-salary-calculator", "taiwan-income-tax-calculator", "taiwan-labor-insurance-calculator", "taiwan-vat-calculator",
  "italy-gross-net-salary-calculator", "italy-income-tax-calculator", "italy-vat-calculator",
  "spain-freelancer-tax-calculator", "france-social-contribution-calculator",
  "us-paycheck-calculator", "us-income-tax-calculator", "us-sales-tax-calculator", "us-401k-calculator", "us-roth-ira-calculator", "us-capital-gains-tax-calculator",
  "uk-gross-net-salary-calculator", "uk-income-tax-calculator", "uk-national-insurance-calculator", "uk-vat-calculator", "uk-stamp-duty-calculator", "uk-pension-calculator",
  "canada-gross-net-salary-calculator", "canada-income-tax-calculator", "canada-gst-hst-calculator", "canada-cpp-ei-calculator", "canada-rrsp-calculator",
  "australia-gross-net-salary-calculator", "australia-income-tax-calculator", "australia-gst-calculator", "australia-superannuation-calculator", "australia-stamp-duty-calculator",
  "singapore-gross-net-salary-calculator", "singapore-income-tax-calculator", "singapore-cpf-calculator", "singapore-gst-calculator",
  "hong-kong-salary-tax-calculator", "hong-kong-mpf-calculator", "hong-kong-stamp-duty-calculator",
  "malaysia-income-tax-calculator", "malaysia-epf-calculator", "malaysia-socso-calculator", "malaysia-sst-calculator",
  "philippines-gross-net-salary-calculator", "philippines-income-tax-calculator", "philippines-sss-calculator", "philippines-philhealth-calculator", "philippines-pagibig-calculator",
  "uae-gratuity-calculator", "uae-end-of-service-calculator", "uae-vat-calculator", "uae-corporate-tax-calculator",
  "new-zealand-gross-net-salary-calculator", "new-zealand-income-tax-calculator", "new-zealand-gst-calculator", "new-zealand-kiwisaver-calculator",
  "fire-retirement-calculator", "dividend-growth-calculator", "inflation-adjusted-return-calculator",
  "position-size-calculator", "stop-loss-take-profit-calculator", "stock-profit-after-fees-calculator", "loan-early-repayment-calculator",
  "rent-vs-buy-calculator", "electricity-cost-calculator", "travel-budget-calculator", "freelancer-hourly-rate-calculator", "break-even-point-calculator",
] as const;
export type LocalizedCalculatorSlug = (typeof localizedCalculatorSlugs)[number];
export const hasLocale = (value: string): value is SupportedLocale => supportedLocales.includes(value as SupportedLocale);
export const hasRoutingLocale = (value: string): value is RoutingLocale => routingLocales.includes(value as RoutingLocale);
export const hasLocalizedCalculator = (slug: string): slug is LocalizedCalculatorSlug => localizedCalculatorSlugs.includes(slug as LocalizedCalculatorSlug);

export const phaseOneTranslatedCalculatorSlugs = ["age", "annual-leave-allowance", "area", "average", "bmi", "cagr", "calorie-per-serving", "change-rate", "compound-interest", "date-difference"] as const satisfies readonly LocalizedCalculatorSlug[];
export const phaseTwoTranslatedCalculatorSlugs = ["dday", "decimal-fraction", "deposit-interest", "discount", "dividend", "dsr", "dti", "fraction", "fuel-cost", "fuel-efficiency"] as const satisfies readonly LocalizedCalculatorSlug[];
export const phaseThreeTranslatedCalculatorSlugs = ["hourly-wage", "loan-affordability", "loan-interest", "loan-refinance", "ltv", "margin", "markup", "median", "minimum-wage", "pace", "percentage", "percentile", "pregnancy", "prepayment-fee", "probability", "product-margin", "profit-loss", "ratio", "salary-conversion", "savings-interest", "severance-pay", "simple-interest", "social-insurance", "standard-deviation", "stock-average-price", "taxi-fare", "tenure", "time-arithmetic", "tip-calculator", "trip-split", "unemployment-benefit", "unit-converter", "unit-price", "utility-bill", "vat", "vehicle-cost", "weighted-average", "withholding-tax-3-3", "workdays"] as const satisfies readonly LocalizedCalculatorSlug[];
export const phaseFourTranslatedCalculatorSlugs = ["japan-consumption-tax-calculator", "japan-annual-salary-calculator", "japan-monthly-salary-calculator", "japan-overtime-pay-calculator", "japan-night-holiday-pay-calculator"] as const satisfies readonly LocalizedCalculatorSlug[];
export const phaseFiveTranslatedCalculatorSlugs = [
  "germany-gross-net-salary-calculator", "germany-income-tax-calculator", "germany-vat-calculator", "germany-overtime-pay-calculator", "germany-vacation-pay-calculator",
  "spain-gross-net-salary-calculator", "spain-irpf-calculator", "spain-vat-calculator", "spain-severance-pay-calculator",
  "france-gross-net-salary-calculator", "france-income-tax-calculator", "france-vat-calculator", "france-overtime-pay-calculator",
  "netherlands-gross-net-salary-calculator", "netherlands-vat-calculator", "netherlands-30-percent-ruling-calculator", "netherlands-holiday-allowance-calculator",
  "india-gst-calculator", "india-sip-calculator", "india-ppf-calculator", "india-nps-calculator", "india-gross-net-salary-calculator", "india-income-tax-calculator",
  "brazil-gross-net-salary-calculator", "brazil-inss-calculator", "brazil-irrf-calculator", "brazil-fgts-calculator", "brazil-thirteenth-salary-calculator",
  "vietnam-gross-net-salary-calculator", "vietnam-personal-income-tax-calculator", "vietnam-social-insurance-calculator",
  "china-gross-net-salary-calculator", "china-individual-income-tax-calculator", "china-social-insurance-calculator", "china-vat-calculator",
  "taiwan-gross-net-salary-calculator", "taiwan-income-tax-calculator", "taiwan-labor-insurance-calculator", "taiwan-vat-calculator",
  "italy-gross-net-salary-calculator", "italy-income-tax-calculator", "italy-vat-calculator",
] as const satisfies readonly LocalizedCalculatorSlug[];
export const phaseSixTranslatedCalculatorSlugs = ["spain-freelancer-tax-calculator", "france-social-contribution-calculator", "us-paycheck-calculator", "us-income-tax-calculator", "us-sales-tax-calculator", "us-401k-calculator", "us-roth-ira-calculator", "us-capital-gains-tax-calculator", "uk-gross-net-salary-calculator", "uk-income-tax-calculator", "uk-national-insurance-calculator", "uk-vat-calculator", "uk-stamp-duty-calculator", "uk-pension-calculator", "canada-gross-net-salary-calculator", "canada-income-tax-calculator", "canada-gst-hst-calculator", "canada-cpp-ei-calculator", "canada-rrsp-calculator", "australia-gross-net-salary-calculator", "australia-income-tax-calculator", "australia-gst-calculator", "australia-superannuation-calculator", "australia-stamp-duty-calculator", "singapore-gross-net-salary-calculator", "singapore-income-tax-calculator", "singapore-cpf-calculator", "singapore-gst-calculator", "hong-kong-salary-tax-calculator", "hong-kong-mpf-calculator", "hong-kong-stamp-duty-calculator", "malaysia-income-tax-calculator", "malaysia-epf-calculator", "malaysia-socso-calculator", "malaysia-sst-calculator", "philippines-gross-net-salary-calculator", "philippines-income-tax-calculator", "philippines-sss-calculator", "philippines-philhealth-calculator", "philippines-pagibig-calculator", "uae-gratuity-calculator", "uae-end-of-service-calculator", "uae-vat-calculator", "uae-corporate-tax-calculator", "new-zealand-gross-net-salary-calculator", "new-zealand-income-tax-calculator", "new-zealand-gst-calculator", "new-zealand-kiwisaver-calculator"] as const satisfies readonly LocalizedCalculatorSlug[];
export const phaseSevenTranslatedCalculatorSlugs = ["fire-retirement-calculator", "dividend-growth-calculator", "inflation-adjusted-return-calculator", "position-size-calculator", "stop-loss-take-profit-calculator", "stock-profit-after-fees-calculator", "loan-early-repayment-calculator", "rent-vs-buy-calculator", "electricity-cost-calculator", "travel-budget-calculator", "freelancer-hourly-rate-calculator", "break-even-point-calculator"] as const satisfies readonly LocalizedCalculatorSlug[];
export const phaseEightTranslatedCalculatorSlugs = ["proportion", "aspect-ratio", "scale-ratio"] as const satisfies readonly LocalizedCalculatorSlug[];
export const phaseTranslatedCalculatorSlugs = [...phaseOneTranslatedCalculatorSlugs, ...phaseTwoTranslatedCalculatorSlugs, ...phaseThreeTranslatedCalculatorSlugs, ...phaseFourTranslatedCalculatorSlugs, ...phaseFiveTranslatedCalculatorSlugs, ...phaseSixTranslatedCalculatorSlugs, ...phaseSevenTranslatedCalculatorSlugs, ...phaseEightTranslatedCalculatorSlugs] as const;
export const isPhaseOneTranslatedCalculator = (slug: string): slug is (typeof phaseOneTranslatedCalculatorSlugs)[number] => phaseOneTranslatedCalculatorSlugs.includes(slug as (typeof phaseOneTranslatedCalculatorSlugs)[number]);
export const isPhaseTwoTranslatedCalculator = (slug: string): slug is (typeof phaseTwoTranslatedCalculatorSlugs)[number] => phaseTwoTranslatedCalculatorSlugs.includes(slug as (typeof phaseTwoTranslatedCalculatorSlugs)[number]);
export const isPhaseThreeTranslatedCalculator = (slug: string): slug is (typeof phaseThreeTranslatedCalculatorSlugs)[number] => phaseThreeTranslatedCalculatorSlugs.includes(slug as (typeof phaseThreeTranslatedCalculatorSlugs)[number]);
export const isPhaseFourTranslatedCalculator = (slug: string): slug is (typeof phaseFourTranslatedCalculatorSlugs)[number] => phaseFourTranslatedCalculatorSlugs.includes(slug as (typeof phaseFourTranslatedCalculatorSlugs)[number]);
export const isPhaseFiveTranslatedCalculator = (slug: string): slug is (typeof phaseFiveTranslatedCalculatorSlugs)[number] => phaseFiveTranslatedCalculatorSlugs.includes(slug as (typeof phaseFiveTranslatedCalculatorSlugs)[number]);
export const isPhaseSixTranslatedCalculator = (slug: string): slug is (typeof phaseSixTranslatedCalculatorSlugs)[number] => phaseSixTranslatedCalculatorSlugs.includes(slug as (typeof phaseSixTranslatedCalculatorSlugs)[number]);
export const isPhaseTranslatedCalculator = (slug: string): slug is (typeof phaseTranslatedCalculatorSlugs)[number] => isPhaseOneTranslatedCalculator(slug) || isPhaseTwoTranslatedCalculator(slug) || isPhaseThreeTranslatedCalculator(slug) || isPhaseFourTranslatedCalculator(slug) || isPhaseFiveTranslatedCalculator(slug) || isPhaseSixTranslatedCalculator(slug) || phaseSevenTranslatedCalculatorSlugs.includes(slug as (typeof phaseSevenTranslatedCalculatorSlugs)[number]) || phaseEightTranslatedCalculatorSlugs.includes(slug as (typeof phaseEightTranslatedCalculatorSlugs)[number]);
export const russianTranslatedCalculatorSlugs = [
  "compound-interest", "percentage", "discount", "date-difference", "age", "area", "average", "weighted-average", "bmi", "cagr", "change-rate", "simple-interest", "savings-interest",
  "median", "percentile", "probability", "fraction", "decimal-fraction", "unit-price", "unit-converter", "dday", "workdays", "time-arithmetic",
  "tip-calculator", "trip-split", "fuel-efficiency", "vehicle-cost", "taxi-fare", "dividend", "profit-loss", "margin", "markup", "calorie-per-serving",
  "loan-interest", "deposit-interest", "loan-refinance", "prepayment-fee", "loan-affordability", "ltv", "dti", "dsr", "break-even-point-calculator", "inflation-adjusted-return-calculator",
  "fuel-cost", "salary-conversion", "hourly-wage", "tenure", "pregnancy", "fire-retirement-calculator", "dividend-growth-calculator", "stock-profit-after-fees-calculator", "position-size-calculator", "freelancer-hourly-rate-calculator",
  "ratio", "proportion", "aspect-ratio", "scale-ratio",
  "vat", "pace", "standard-deviation", "stock-average-price",
  "stop-loss-take-profit-calculator", "loan-early-repayment-calculator", "rent-vs-buy-calculator", "electricity-cost-calculator", "travel-budget-calculator",
  "product-margin", "withholding-tax-3-3", "annual-leave-allowance", "utility-bill",
] as const satisfies readonly LocalizedCalculatorSlug[];
export const supportedLocalesForCalculator = (slug: string): readonly SupportedLocale[] => hasLocalizedCalculator(slug) ? [...locales, ...(russianTranslatedCalculatorSlugs.includes(slug as (typeof russianTranslatedCalculatorSlugs)[number]) ? ["ru" as const] : [])] : ["ko"];
export const calculatorSupportsLocale = (slug: string, locale: SupportedLocale) => supportedLocalesForCalculator(slug).includes(locale);
export function missingCalculatorTranslationReport(slugs: readonly string[]): string[] {
  return slugs.flatMap((slug) => {
    const supported = new Set(supportedLocalesForCalculator(slug));
    const missing = locales.filter((locale) => !supported.has(locale));
    return missing.length ? [`- ${slug}: ${missing.join(", ")}`] : [];
  });
}
export const localizedIndexSlugs = (locale: SupportedLocale) => {
  return locale === "ru" ? russianTranslatedCalculatorSlugs : localizedCalculatorSlugs;
};

export function localePath(locale: SupportedLocale, path = "") {
  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  const normalized = withLeadingSlash === "/" ? "" : withLeadingSlash.replace(/\/+$/, "");
  return `/${locale}${normalized}`;
}

export function languageSwitchPath(pathname: string, target: SupportedLocale) {
  const path = pathname.replace(/^\/(ko|en|ja|zh|es|pt-br|de|fr|vi|id|th|zh-tw|it|nl|hi|ru)(?=\/|$)/, "") || "/";
  const slug = path.match(/^\/calculators\/([^/]+)/)?.[1];
  if ((slug && !calculatorSupportsLocale(slug, target)) || /^\/(about|privacy|terms)(\/|$)/.test(path)) {
    const fallback: SupportedLocale = slug && calculatorSupportsLocale(slug, "en") ? "en" : "ko";
    return localePath(fallback, slug ? `/calculators/${slug}` : "/calculators");
  }
  return localePath(target, path);
}

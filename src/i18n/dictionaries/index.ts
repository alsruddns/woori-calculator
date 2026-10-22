import { en } from "@/i18n/dictionaries/en";
import { ja } from "@/i18n/dictionaries/ja";
import { zh } from "@/i18n/dictionaries/zh";
import { calculatorCategoryOrder } from "@/data/calculators/categories";
import { additionalCalculatorContent } from "@/i18n/dictionaries/additional";
import type { LocaleDictionary, LocalizedCalculatorContent } from "@/i18n/dictionaries/types";
import { contentPatterns } from "@/i18n/dictionaries/content-patterns";
import { phaseOneLocaleDictionary } from "@/i18n/dictionaries/phase-one";
import { phaseFourLocaleContent } from "@/i18n/dictionaries/phase-four";
import { phaseFiveLocaleContent } from "@/i18n/dictionaries/phase-five";
import { phaseSixLocaleContent } from "@/i18n/dictionaries/phase-six";
import { newToolsLocaleContent } from "@/i18n/dictionaries/new-tools";
import { ratioLocaleContent } from "@/i18n/dictionaries/ratio-tools";
import { improveKoreanContent } from "@/i18n/dictionaries/korean-content-improvements";
import { publishedCalculatorPages } from "@/data/calculator-content";
import { improveLocalizedQualityContent } from "@/i18n/dictionaries/locale-quality-followup";
import { ru } from "@/i18n/dictionaries/ru";
import { tr } from "@/i18n/dictionaries/tr";
import { pl } from "@/i18n/dictionaries/pl";
import { fil } from "@/i18n/dictionaries/fil";
import { buildBengaliDictionary } from "@/i18n/dictionaries/bn";
import { uk } from "@/i18n/dictionaries/uk";
import { buildMalayDictionary } from "@/i18n/dictionaries/ms";
import type { SupportedLocale } from "@/i18n/config";

const ko: LocaleDictionary = {
  locale: "ko", siteName: "우리의 오늘", description: "일상에 필요한 계산과 생활 도구를 쉽고 빠르게 이용하세요.",
  common: { calculate: "계산하기", reset: "초기화", copy: "복사", copied: "복사했습니다", result: "계산 결과", input: "입력", formula: "계산 공식", example: "예제", faq: "자주 묻는 질문", relatedCalculators: "관련 계산기", search: "검색", category: "분야", previous: "이전", next: "다음", error: "오류", invalidInput: "입력값을 확인해 주세요.", required: "필수 입력", copyError: "복사하지 못했습니다.", resetDone: "입력값을 초기화했습니다.", unit: "단위", noResults: "검색 결과가 없습니다." },
  nav: { home: "홈", calculators: "계산기", menu: "계산기 메뉴", search: "계산기 검색", close: "메뉴 닫기", searchEmpty: "검색 결과가 없습니다.", language: "언어", skip: "본문으로 건너뛰기" },
  categories: { math: "수학·도구", finance: "금융", tax: "세금·가격", "date-time": "날짜·시간", life: "생활", salary: "급여·직장" },
  calculatorList: { title: "계산기와 생활 도구", description: "필요한 계산기를 골라 바로 계산해 보세요.", breadcrumbHome: "홈", breadcrumbCalculators: "계산기", count: "개", noResults: "검색 결과가 없습니다." },
  detail: { home: "홈", calculators: "계산기", howTo: "사용 방법", formula: "계산 공식", example: "계산 예제", notes: "참고 사항", faqs: "자주 묻는 질문", related: "관련 계산기", result: "계산 결과", calculate: "계산하기", invalid: "입력값을 확인하고 다시 계산해 주세요.", updated: "마지막 업데이트" },
  home: { title: "일상에 필요한 계산을 쉽고 빠르게", description: "계산과 생활 도구를 한곳에서 간편하게 이용하세요." },
  units: { won: "원", number: "숫자", year: "년", month: "개월", durationLabel: "기간" },
  categoriesOrder: calculatorCategoryOrder,
  calculators: {} as LocaleDictionary["calculators"],
};

const landingLabels = {
  ko: { featured: "추천 계산기", categories: "계산 분야" },
  en: { featured: "Featured calculators", categories: "Browse by category" },
  ja: { featured: "おすすめの計算ツール", categories: "カテゴリから探す" },
  zh: { featured: "推荐计算器", categories: "按类别浏览" },
} as const;
const categoryOverrides = {
  ko: { finance: "금융", salary: "급여·직장", tax: "세금", life: "생활", "date-time": "날짜·시간", math: "수학·도구" },
  en: { finance: "Finance", salary: "Salary & Work", tax: "Tax", life: "Lifestyle", "date-time": "Date & Time", math: "Math & Conversion" },
  ja: { finance: "金融", salary: "給与・仕事", tax: "税金", life: "生活", "date-time": "日付・時間", math: "数学・変換" },
  zh: { finance: "金融", salary: "工资与职场", tax: "税费", life: "生活", "date-time": "日期与时间", math: "数学与换算" },
} as const;
const seedKeywords = {
  en: { percentage: ["percentage calculator", "percent of a number", "percentage increase"], discount: ["discount calculator", "sale price", "discount percentage"], "loan-interest": ["loan repayment calculator", "monthly payment", "loan interest"], "compound-interest": ["compound interest calculator", "compounding frequency", "investment growth"], vat: ["VAT calculator", "add VAT", "extract VAT"], "date-difference": ["date difference calculator", "days between dates", "date duration"], age: ["age calculator", "age on a date", "completed years"], area: ["square meter to pyeong", "area converter", "pyeong calculator"] },
  ja: { percentage: ["パーセント 計算", "割合 計算", "増減率"], discount: ["割引 計算", "割引率", "セール価格"], "loan-interest": ["ローン返済 計算", "毎月返済額", "ローン利息"], "compound-interest": ["複利 計算", "複利運用", "複利利息"], vat: ["付加価値税 計算", "税抜 税込 計算", "VAT 計算"], "date-difference": ["日付 差 計算", "日数 計算", "日付間の日数"], age: ["年齢 計算", "満年齢 計算", "生年月日 年齢"], area: ["平米 坪 変換", "坪 計算", "面積 単位 変換"] },
  zh: { percentage: ["百分比计算", "百分数计算器", "百分比增减"], discount: ["折扣计算器", "折后价格", "折扣率计算"], "loan-interest": ["贷款还款计算", "每月还款额", "贷款利息"], "compound-interest": ["复利计算器", "复利收益", "复利利息"], vat: ["增值税计算器", "含税未税计算", "增值税拆分"], "date-difference": ["日期间隔计算", "相隔天数", "日期差计算"], age: ["年龄计算器", "周岁计算", "出生日期年龄"], area: ["平方米坪换算", "坪计算", "面积单位换算"] },
} as const;

const sources = { en, ja, zh } as const;
function buildDictionary(locale: SupportedLocale): LocaleDictionary {
  if (locale === "uk") return uk;
  if (locale === "ms") return buildMalayDictionary(getDictionary("en"));
  if (locale === "ru") return ru;
  if (locale === "tr") return tr;
  if (locale === "pl") return pl;
  if (locale === "fil") return fil;
  if (locale === "bn") return buildBengaliDictionary(getDictionary("en"));
  if (locale === "ko") return { ...ko, home: { ...ko.home, ...landingLabels.ko }, categories: { ...ko.categories, ...categoryOverrides.ko }, calculators: { ...ko.calculators, ...phaseFourLocaleContent("ko"), ...phaseFiveLocaleContent("ko"), ...phaseSixLocaleContent("ko"), ...newToolsLocaleContent("ko"), ...ratioLocaleContent("ko") } };
  if (locale !== "en" && locale !== "ja" && locale !== "zh") {
    const base = phaseOneLocaleDictionary(locale, getDictionary("en"))!;
    return { ...base, calculators: { ...base.calculators, ...newToolsLocaleContent(locale), ...ratioLocaleContent(locale) } };
  }
  const source = sources[locale];
  const translatedSeeds = Object.fromEntries(Object.entries(source.calculators).map(([slug, page]) => [slug, { ...page, keywords: page.keywords ?? seedKeywords[locale][slug as keyof (typeof seedKeywords)[typeof locale]] ?? [page.name] }]));
  return {
    ...source,
    home: { ...source.home, ...landingLabels[locale] },
    categories: { ...source.categories, ...categoryOverrides[locale] },
    common: source.common,
    calculators: { ...translatedSeeds, ...additionalCalculatorContent[locale], ...phaseFourLocaleContent(locale), ...phaseFiveLocaleContent(locale), ...phaseSixLocaleContent(locale), ...newToolsLocaleContent(locale), ...ratioLocaleContent(locale) },
  };
}

const dictionaryCache = new Map<SupportedLocale, LocaleDictionary>();
function distinguishRepeatedGuidance(dictionary: LocaleDictionary): LocaleDictionary {
  if (dictionary.locale === "ru" || dictionary.locale === "tr" || dictionary.locale === "pl" || dictionary.locale === "bn" || dictionary.locale === "ms") return dictionary;
  const entries = Object.entries(dictionary.calculators).filter((entry): entry is [string, LocalizedCalculatorContent] => Boolean(entry[1]));
  const counts = (select: (content: LocalizedCalculatorContent) => string) => {
    const values = new Map<string, number>();
    for (const [, content] of entries) {
      const key = select(content);
      values.set(key, (values.get(key) ?? 0) + 1);
    }
    return values;
  };
  const guideCounts = counts((content) => content.howTo);
  const faqCounts = counts((content) => content.faqs.map(({ question, answer }) => `${question}:${answer}`).join("|"));
  const labels = contentPatterns[dictionary.locale];
  const calculators = Object.fromEntries(entries.map(([slug, content]) => {
    const fields = Object.values(content.fields).map((field) => field.label).join(", ");
    const repeatedGuide = (guideCounts.get(content.howTo) ?? 0) > 1;
    const repeatedFaq = (faqCounts.get(content.faqs.map(({ question, answer }) => `${question}:${answer}`).join("|")) ?? 0) > 1;
    return [slug, {
      ...content,
      howTo: repeatedGuide ? `${content.howTo} ${content.name}: ${labels.inputs}: ${fields}.` : content.howTo,
      faqs: repeatedFaq ? [{ question: `${content.name}: ${labels.inputQuestion}`, answer: `${labels.inputAnswer} ${fields}.` }, ...content.faqs] : content.faqs,
    } satisfies LocalizedCalculatorContent];
  })) as LocaleDictionary["calculators"];
  return { ...dictionary, calculators };
}
export function getDictionary(locale: SupportedLocale): LocaleDictionary {
  const cached = dictionaryCache.get(locale);
  if (cached) return cached;
  if (locale === "ru") {
    dictionaryCache.set(locale, ru);
    return ru;
  }
  if (locale === "tr") {
    dictionaryCache.set(locale, tr);
    return tr;
  }
  if (locale === "pl") {
    dictionaryCache.set(locale, pl);
    return pl;
  }
  if (locale === "fil") {
    dictionaryCache.set(locale, fil);
    return fil;
  }
  if (locale === "bn") {
    const bengali = buildBengaliDictionary(getDictionary("en"));
    dictionaryCache.set(locale, bengali);
    return bengali;
  }
  if (locale === "uk") {
    dictionaryCache.set(locale, uk);
    return uk;
  }
  if (locale === "ms") {
    const malay = buildMalayDictionary(getDictionary("en"));
    dictionaryCache.set(locale, malay);
    return malay;
  }
  const distinguished = distinguishRepeatedGuidance(buildDictionary(locale));
  let dictionary = distinguished;
  if (locale === "ko") {
    const completeKoreanContent = Object.fromEntries(publishedCalculatorPages.map((page) => [
      page.slug,
      distinguished.calculators[page.slug as keyof typeof distinguished.calculators]
        ?? { ...Object.fromEntries(Object.entries(page).filter(([key]) => key !== "calculate")), related: page.relatedCalculatorIds, options: {} },
    ])) as LocaleDictionary["calculators"];
    dictionary = { ...distinguished, calculators: improveKoreanContent(completeKoreanContent) };
  } else {
    dictionary = { ...distinguished, calculators: improveLocalizedQualityContent(locale, distinguished.calculators) };
  }
  dictionaryCache.set(locale, dictionary);
  return dictionary;
}

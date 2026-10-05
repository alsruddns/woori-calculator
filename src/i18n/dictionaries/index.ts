import { en } from "@/i18n/dictionaries/en";
import { ja } from "@/i18n/dictionaries/ja";
import { zh } from "@/i18n/dictionaries/zh";
import type { LocaleDictionary } from "@/i18n/dictionaries/types";
import type { Locale } from "@/i18n/config";

const ko: LocaleDictionary = {
  locale: "ko", siteName: "우리의 오늘", description: "일상에 필요한 계산과 생활 도구를 쉽고 빠르게 이용하세요.",
  nav: { home: "홈", calculators: "계산기", menu: "계산기 메뉴", search: "계산기 검색", close: "메뉴 닫기", searchEmpty: "검색 결과가 없습니다.", language: "언어", skip: "본문으로 건너뛰기" },
  categories: { math: "수학·변환", finance: "금융", tax: "세금·가격", "date-time": "날짜·시간", life: "생활", salary: "급여·직장" },
  calculatorList: { title: "계산기와 생활 도구", description: "필요한 계산기를 골라 바로 계산해 보세요.", breadcrumbHome: "홈", breadcrumbCalculators: "계산기", count: "개", noResults: "검색 결과가 없습니다." },
  detail: { home: "홈", calculators: "계산기", howTo: "사용 방법", formula: "계산 공식", example: "계산 예제", notes: "참고 사항", faqs: "자주 묻는 질문", related: "관련 계산기", result: "계산 결과", calculate: "계산하기", invalid: "입력값을 확인하고 다시 계산해 주세요.", updated: "마지막 업데이트" },
  home: { title: "일상에 필요한 계산을 쉽고 빠르게", description: "계산과 생활 도구를 한곳에서 간편하게 이용하세요." },
  units: { won: "원", number: "숫자", year: "년", month: "개월", durationLabel: "기간" },
  categoriesOrder: ["math", "finance", "tax", "date-time", "life", "salary"],
  calculators: {} as LocaleDictionary["calculators"],
};

const dictionaries: Record<Locale, LocaleDictionary> = { ko, en, ja, zh };
export function getDictionary(locale: Locale) { return dictionaries[locale]; }

import type { LocalizedCalculatorSlug, Locale } from "@/i18n/config";

export type LocalizedCalculatorContent = {
  name: string;
  shortName: string;
  title: string;
  description: string;
  keywords?: readonly string[];
  howTo: string;
  formula: string;
  example: { question: string; answer: string };
  faqs: readonly { question: string; answer: string }[];
  related: readonly LocalizedCalculatorSlug[];
  fields: Record<string, { label: string; unit?: string; placeholder?: string }>;
  options: Record<string, Record<string, string>>;
  resultLabels: Record<string, string>;
  validation: string;
  resultNote: string;
};

export type LocaleDictionary = {
  locale: Locale;
  siteName: string;
  description: string;
  nav: { home: string; calculators: string; menu: string; search: string; close: string; searchEmpty: string; language: string; skip: string };
  categories: Record<string, string>;
  calculatorList: { title: string; description: string; breadcrumbHome: string; breadcrumbCalculators: string; count: string; noResults: string };
  detail: { home: string; calculators: string; howTo: string; formula: string; example: string; notes: string; faqs: string; related: string; result: string; calculate: string; invalid: string; updated: string };
  home: { title: string; description: string; featured?: string; categories?: string };
  units: { won: string; number: string; year: string; month: string; durationLabel: string };
  categoriesOrder: readonly string[];
  calculators: Partial<Record<LocalizedCalculatorSlug, LocalizedCalculatorContent>>;
};

import { en } from "@/i18n/dictionaries/en";
import { additionalCalculatorContent } from "@/i18n/dictionaries/additional";
import { phaseFourLocaleContent } from "@/i18n/dictionaries/phase-four";
import { phaseFiveLocaleContent } from "@/i18n/dictionaries/phase-five";
import { phaseSixLocaleContent } from "@/i18n/dictionaries/phase-six";
import { newToolsLocaleContent } from "@/i18n/dictionaries/new-tools";
import { ratioLocaleContent } from "@/i18n/dictionaries/ratio-tools";
import type { LocalizedCalculatorSlug } from "@/i18n/config";
import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";

type UkrainianPageSpec = {
  name: string; title: string; description: string; keywords: readonly string[]; howTo: string; formula: string;
  example: { question: string; answer: string }; fields: Record<string, string>; options?: Record<string, Record<string, string>>;
  results: readonly string[]; related: LocalizedCalculatorContent["related"];
};

export function ukPage(slug: LocalizedCalculatorSlug, spec: UkrainianPageSpec): LocalizedCalculatorContent {
  const dictionaries: Partial<Record<LocalizedCalculatorSlug, LocalizedCalculatorContent>>[] = [en.calculators, additionalCalculatorContent.en, phaseFourLocaleContent("en"), phaseFiveLocaleContent("en"), phaseSixLocaleContent("en"), newToolsLocaleContent("en"), ratioLocaleContent("en")];
  const source = dictionaries.map((dictionary) => dictionary[slug]).find((page) => page !== undefined);
  if (!source) throw new Error("Missing English calculator source: " + slug);
  for (const [key, field] of Object.entries(source.fields)) if (!spec.fields[key] || spec.fields[key] === field.label) throw new Error(`Missing Ukrainian field: ${slug}.${key}`);
  if (Object.keys(spec.fields).length !== Object.keys(source.fields).length) throw new Error("Unexpected Ukrainian field: " + slug);
  for (const [group, values] of Object.entries(source.options)) for (const [key, label] of Object.entries(values)) if (!spec.options?.[group]?.[key] || spec.options[group][key] === label) throw new Error(`Missing Ukrainian option: ${slug}.${group}.${key}`);
  if (Object.keys(spec.options ?? {}).length !== Object.keys(source.options).length) throw new Error("Unexpected Ukrainian option group: " + slug);
  if (spec.results.length !== Object.keys(source.resultLabels).length || spec.results.some((label) => !label)) throw new Error("Ukrainian result schema mismatch: " + slug);
  const unitNames: Record<string, string> = { years: "років", months: "місяців", days: "днів", hours: "годин" };
  return {
    name: spec.name, shortName: spec.name, title: spec.title, description: spec.description, keywords: spec.keywords,
    howTo: spec.howTo, formula: spec.formula, example: spec.example,
    faqs: [spec.example, { question: `Які дані потрібні для розрахунку «${spec.name}»?`, answer: `Введіть значення у відповідні поля: ${Object.values(spec.fields).join(", ")}. Результат залежить від цих даних і наведених припущень.` }],
    related: spec.related,
    fields: Object.fromEntries(Object.entries(source.fields).map(([key, field]) => [key, { ...field, ...(field.unit && unitNames[field.unit] ? { unit: unitNames[field.unit] } : {}), label: spec.fields[key]!, placeholder: spec.fields[key]! }])),
    options: Object.fromEntries(Object.entries(source.options).map(([group, values]) => [group, Object.fromEntries(Object.keys(values).map((key) => [key, spec.options![group]![key]]))])),
    resultLabels: Object.fromEntries(Object.keys(source.resultLabels).map((key, index) => [key, spec.results[index]!])),
    validation: "Перевірте введені значення: вони мають бути коректними для обраного способу розрахунку.",
    resultNote: "Результат є розрахунковою оцінкою за введеними даними та не враховує обставини, яких немає у полях калькулятора.",
  };
}

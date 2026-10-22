import { en } from "@/i18n/dictionaries/en";
import { additionalCalculatorContent } from "@/i18n/dictionaries/additional";
import { phaseFourLocaleContent } from "@/i18n/dictionaries/phase-four";
import { phaseFiveLocaleContent } from "@/i18n/dictionaries/phase-five";
import { phaseSixLocaleContent } from "@/i18n/dictionaries/phase-six";
import { newToolsLocaleContent } from "@/i18n/dictionaries/new-tools";
import { ratioLocaleContent } from "@/i18n/dictionaries/ratio-tools";
import type { LocalizedCalculatorSlug } from "@/i18n/config";
import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";

type BengaliPageSpec = {
  name: string; title: string; description: string; keywords: readonly string[]; howTo: string; formula: string;
  example: { question: string; answer: string }; fields: Record<string, string>; options?: Record<string, Record<string, string>>;
  results?: readonly string[]; resultLabels?: Record<string, string>; related: LocalizedCalculatorContent["related"];
};

export function bnPage(slug: LocalizedCalculatorSlug, spec: BengaliPageSpec): LocalizedCalculatorContent {
  const dictionaries: Partial<Record<LocalizedCalculatorSlug, LocalizedCalculatorContent>>[] = [en.calculators, additionalCalculatorContent.en, phaseFourLocaleContent("en"), phaseFiveLocaleContent("en"), phaseSixLocaleContent("en"), newToolsLocaleContent("en"), ratioLocaleContent("en")];
  const source = dictionaries.map((dictionary) => dictionary[slug]).find((page) => page !== undefined);
  if (!source) throw new Error("Missing English calculator source: " + slug);
  for (const [key, field] of Object.entries(source.fields)) if (!spec.fields[key] || spec.fields[key] === field.label) throw new Error(`Missing Bengali field: ${slug}.${key}`);
  if (Object.keys(spec.fields).length !== Object.keys(source.fields).length) throw new Error("Unexpected Bengali field: " + slug);
  for (const [group, values] of Object.entries(source.options)) for (const [key, label] of Object.entries(values)) if (!spec.options?.[group]?.[key] || spec.options[group][key] === label) throw new Error(`Missing Bengali option: ${slug}.${group}.${key}`);
  if (Object.keys(spec.options ?? {}).length !== Object.keys(source.options).length) throw new Error("Unexpected Bengali option group: " + slug);
  if (spec.resultLabels) {
    for (const key of Object.keys(source.resultLabels)) if (!spec.resultLabels[key]) throw new Error(`Missing Bengali result label: ${slug}.${key}`);
    if (Object.keys(spec.resultLabels).length !== Object.keys(source.resultLabels).length) throw new Error("Unexpected Bengali result label: " + slug);
  } else if (!spec.results || spec.results.length !== Object.keys(source.resultLabels).length || spec.results.some((label) => !label)) {
    throw new Error("Bengali result schema mismatch: " + slug);
  }
  return {
    name: spec.name, shortName: spec.name, title: spec.title, description: spec.description, keywords: spec.keywords,
    howTo: spec.howTo, formula: spec.formula, example: spec.example,
    faqs: [spec.example, { question: "এই ফলাফল কি নিশ্চিত বা সরকারি হিসাব?", answer: "না। এটি দেওয়া তথ্য ও সরলীকৃত সূত্রের ভিত্তিতে একটি অনুমান; প্রযোজ্য নিয়ম ও তথ্য যাচাই করুন।" }],
    related: spec.related,
    fields: Object.fromEntries(Object.entries(source.fields).map(([key, field]) => [key, { ...field, label: spec.fields[key]! }])),
    options: Object.fromEntries(Object.entries(source.options).map(([group, values]) => [group, Object.fromEntries(Object.keys(values).map((key) => [key, spec.options![group]![key]]))])),
    resultLabels: spec.resultLabels ?? Object.fromEntries(Object.keys(source.resultLabels).map((key, index) => [key, spec.results![index]!])),
    validation: "প্রতিটি ইনপুট যাচাই করে বৈধ সংখ্যা ও বিকল্প নির্বাচন করুন।", resultNote: "এই হিসাব বিনিময় হার বা ব্যক্তিগত আর্থিক পরামর্শ দেয় না।",
  };
}

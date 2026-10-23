import { en } from "@/i18n/dictionaries/en";
import { additionalCalculatorContent } from "@/i18n/dictionaries/additional";
import { phaseFourLocaleContent } from "@/i18n/dictionaries/phase-four";
import { phaseFiveLocaleContent } from "@/i18n/dictionaries/phase-five";
import { phaseSixLocaleContent } from "@/i18n/dictionaries/phase-six";
import { newToolsLocaleContent } from "@/i18n/dictionaries/new-tools";
import { ratioLocaleContent } from "@/i18n/dictionaries/ratio-tools";
import type { LocalizedCalculatorSlug } from "@/i18n/config";
import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";

type MalayPageSpec = {
  name: string;
  title: string;
  description: string;
  keywords: readonly string[];
  howTo: string;
  formula: string;
  example: { question: string; answer: string };
  fields: Record<string, string>;
  options?: Record<string, Record<string, string>>;
  results: readonly string[];
  related: LocalizedCalculatorContent["related"];
};

const dictionaries: Partial<Record<LocalizedCalculatorSlug, LocalizedCalculatorContent>>[] = [
  en.calculators, additionalCalculatorContent.en, phaseFourLocaleContent("en"),
  phaseFiveLocaleContent("en"), phaseSixLocaleContent("en"), newToolsLocaleContent("en"), ratioLocaleContent("en"),
];

export function msPage(slug: LocalizedCalculatorSlug, spec: MalayPageSpec): LocalizedCalculatorContent {
  const source = dictionaries.map((dictionary) => dictionary[slug]).find((page) => page !== undefined);
  if (!source) throw new Error(`Missing English calculator source: ${slug}`);
  for (const [key, field] of Object.entries(source.fields)) {
    if (!spec.fields[key] || spec.fields[key] === field.label) throw new Error(`Missing Malay field: ${slug}.${key}`);
  }
  if (Object.keys(spec.fields).length !== Object.keys(source.fields).length) throw new Error(`Unexpected Malay field: ${slug}`);
  for (const [group, values] of Object.entries(source.options)) {
    for (const [key, label] of Object.entries(values)) {
      if (!spec.options?.[group]?.[key] || spec.options[group][key] === label) throw new Error(`Missing Malay option: ${slug}.${group}.${key}`);
    }
  }
  if (Object.keys(spec.options ?? {}).length !== Object.keys(source.options).length) throw new Error(`Unexpected Malay option group: ${slug}`);
  if (spec.results.length !== Object.keys(source.resultLabels).length || spec.results.some((label) => !label)) {
    throw new Error(`Malay result schema mismatch: ${slug}`);
  }
  const unitNames: Record<string, string> = { "currency units": "unit mata wang", years: "tahun", months: "bulan", days: "hari", hours: "jam" };
  const fieldNames = Object.values(spec.fields).join(", ");
  return {
    name: spec.name,
    shortName: spec.name,
    title: spec.title,
    description: spec.description,
    keywords: spec.keywords,
    howTo: spec.howTo,
    formula: spec.formula,
    example: spec.example,
    faqs: [spec.example, {
      question: `Apakah maklumat yang diperlukan untuk ${spec.name.toLocaleLowerCase("ms-MY")}?`,
      answer: `Masukkan nilai bagi ${fieldNames}. Hasil dikira daripada input dan kaedah yang dipilih; semak andaian sebelum menggunakannya untuk keputusan kewangan.`,
    }],
    related: spec.related,
    fields: Object.fromEntries(Object.entries(source.fields).map(([key, field]) => [key, {
      ...field,
      ...(field.unit && unitNames[field.unit] ? { unit: unitNames[field.unit] } : {}),
      label: spec.fields[key]!,
      placeholder: spec.fields[key]!,
    }])),
    options: Object.fromEntries(Object.entries(source.options).map(([group, values]) => [group,
      Object.fromEntries(Object.keys(values).map((key) => [key, spec.options![group]![key]])),
    ])),
    resultLabels: Object.fromEntries(Object.keys(source.resultLabels).map((key, index) => [key, spec.results[index]!])),
    validation: "Semak semua input dan gunakan nilai dalam julat yang dinyatakan pada medan.",
    resultNote: "Keputusan ialah anggaran berdasarkan input dan andaian yang dipaparkan. Pengiraan ini tidak menukar nilai wang menggunakan kadar pertukaran mata wang.",
  };
}

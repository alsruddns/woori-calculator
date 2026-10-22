import { en } from "@/i18n/dictionaries/en";
import { additionalCalculatorContent } from "@/i18n/dictionaries/additional";
import { phaseFourLocaleContent } from "@/i18n/dictionaries/phase-four";
import { phaseFiveLocaleContent } from "@/i18n/dictionaries/phase-five";
import { phaseSixLocaleContent } from "@/i18n/dictionaries/phase-six";
import { newToolsLocaleContent } from "@/i18n/dictionaries/new-tools";
import { ratioLocaleContent } from "@/i18n/dictionaries/ratio-tools";
import type { LocalizedCalculatorSlug } from "@/i18n/config";
import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";

type RomanianPageSpec = {
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
  faqs?: LocalizedCalculatorContent["faqs"];
  validation?: string;
  resultNote?: string;
};

const catalogs: Partial<Record<LocalizedCalculatorSlug, LocalizedCalculatorContent>>[] = [
  en.calculators, additionalCalculatorContent.en, phaseFourLocaleContent("en"), phaseFiveLocaleContent("en"),
  phaseSixLocaleContent("en"), newToolsLocaleContent("en"), ratioLocaleContent("en"),
];

export function roPage(slug: LocalizedCalculatorSlug, spec: RomanianPageSpec): LocalizedCalculatorContent {
  const source = catalogs.map((catalog) => catalog[slug]).find((page) => page !== undefined);
  if (!source) throw new Error(`Missing English calculator source: ${slug}`);
  for (const [key, field] of Object.entries(source.fields)) {
    if (!spec.fields[key] || spec.fields[key] === field.label) throw new Error(`Missing Romanian field: ${slug}.${key}`);
  }
  if (Object.keys(spec.fields).length !== Object.keys(source.fields).length) throw new Error(`Unexpected Romanian field: ${slug}`);
  for (const [group, values] of Object.entries(source.options)) {
    for (const [key, label] of Object.entries(values)) {
      if (!spec.options?.[group]?.[key] || spec.options[group][key] === label) throw new Error(`Missing Romanian option: ${slug}.${group}.${key}`);
    }
  }
  if (Object.keys(spec.options ?? {}).length !== Object.keys(source.options).length) throw new Error(`Unexpected Romanian option group: ${slug}`);
  if (spec.results.length !== Object.keys(source.resultLabels).length || spec.results.some((label) => !label)) {
    throw new Error(`Romanian result schema mismatch: ${slug}: expected ${Object.keys(source.resultLabels).length}, received ${spec.results.length}`);
  }
  const inputNames = Object.values(spec.fields).join(", ");
  return {
    name: spec.name, shortName: spec.name, title: spec.title, description: spec.description, keywords: spec.keywords,
    howTo: spec.howTo, formula: spec.formula, example: spec.example,
    faqs: spec.faqs ?? [spec.example, {
      question: `Ce date sunt necesare pentru ${spec.name.toLocaleLowerCase("ro-RO")}?`,
      answer: `Introduceți valorile: ${inputNames}. Rezultatul este calculat pe baza datelor și ipotezelor menționate. Verificați dacă acestea se potrivesc situației dumneavoastră.`,
    }],
    related: spec.related,
    fields: Object.fromEntries(Object.entries(source.fields).map(([key, field]) => [key, { ...field, label: spec.fields[key]!, placeholder: spec.fields[key]! }])),
    options: Object.fromEntries(Object.entries(source.options).map(([group, values]) => [group,
      Object.fromEntries(Object.keys(values).map((key) => [key, spec.options![group]![key]])),
    ])),
    resultLabels: Object.fromEntries(Object.keys(source.resultLabels).map((key, index) => [key, spec.results[index]!])),
    validation: spec.validation ?? "Verificați dacă ați completat toate câmpurile obligatorii și dacă valorile se încadrează în limitele indicate.",
    resultNote: spec.resultNote ?? "Rezultatul este o estimare bazată pe datele introduse și pe ipotezele menționate. Schimbarea monedei modifică doar unitatea de afișare; nu se efectuează conversie valutară.",
  };
}

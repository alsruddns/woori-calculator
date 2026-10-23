import { en } from "@/i18n/dictionaries/en";
import { additionalCalculatorContent } from "@/i18n/dictionaries/additional";
import { phaseFourLocaleContent } from "@/i18n/dictionaries/phase-four";
import { phaseFiveLocaleContent } from "@/i18n/dictionaries/phase-five";
import { phaseSixLocaleContent } from "@/i18n/dictionaries/phase-six";
import { newToolsLocaleContent } from "@/i18n/dictionaries/new-tools";
import { ratioLocaleContent } from "@/i18n/dictionaries/ratio-tools";
import type { LocalizedCalculatorSlug } from "@/i18n/config";
import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";

type SwedishPageSpec = {
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

export function svPage(slug: LocalizedCalculatorSlug, spec: SwedishPageSpec): LocalizedCalculatorContent {
  const source = dictionaries.map((dictionary) => dictionary[slug]).find((page) => page !== undefined);
  if (!source) throw new Error(`Missing English calculator source: ${slug}`);
  for (const [key, field] of Object.entries(source.fields)) {
    if (!spec.fields[key] || spec.fields[key] === field.label) throw new Error(`Missing Swedish field: ${slug}.${key}`);
  }
  if (Object.keys(spec.fields).length !== Object.keys(source.fields).length) throw new Error(`Unexpected Swedish field: ${slug}`);
  for (const [group, values] of Object.entries(source.options)) {
    for (const [key, label] of Object.entries(values)) {
      if (!spec.options?.[group]?.[key] || spec.options[group][key] === label) throw new Error(`Missing Swedish option: ${slug}.${group}.${key}`);
    }
  }
  if (Object.keys(spec.options ?? {}).length !== Object.keys(source.options).length) throw new Error(`Unexpected Swedish option group: ${slug}`);
  if (spec.results.length !== Object.keys(source.resultLabels).length || spec.results.some((label) => !label)) throw new Error(`Swedish result schema mismatch: ${slug}: expected ${Object.keys(source.resultLabels).length}, received ${spec.results.length}`);
  const unitNames: Record<string, string> = { "currency units": "valutaenheter", years: "år", months: "månader", days: "dagar", hours: "timmar" };
  const inputNames = Object.values(spec.fields).join(", ");
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
      question: `Vilka uppgifter behövs i ${spec.name.toLocaleLowerCase("sv-SE")}?`,
      answer: `Ange värdena för ${inputNames}. Resultatet beräknas utifrån dina uppgifter och val; kontrollera antagandena innan du använder det som beslutsunderlag.`,
    }],
    related: spec.related,
    fields: Object.fromEntries(Object.entries(source.fields).map(([key, field]) => [key, {
      ...field,
      ...(field.unit && unitNames[field.unit] ? { unit: unitNames[field.unit] } : {}),
      label: spec.fields[key]!,
      placeholder: spec.fields[key]!,
    }])) ,
    options: Object.fromEntries(Object.entries(source.options).map(([group, values]) => [group,
      Object.fromEntries(Object.keys(values).map((key) => [key, spec.options![group]![key]])),
    ])),
    resultLabels: Object.fromEntries(Object.keys(source.resultLabels).map((key, index) => [key, spec.results[index]!])) ,
    validation: "Kontrollera att alla obligatoriska värden är giltiga och ligger inom fältens angivna gränser.",
    resultNote: "Resultatet är en uppskattning utifrån dina uppgifter och de visade antagandena. Byte av valuta ändrar bara visningsenheten och innebär ingen valutakonvertering.",
  };
}

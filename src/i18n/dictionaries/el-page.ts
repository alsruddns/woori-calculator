import { en } from "@/i18n/dictionaries/en";
import { additionalCalculatorContent } from "@/i18n/dictionaries/additional";
import { phaseFourLocaleContent } from "@/i18n/dictionaries/phase-four";
import { phaseFiveLocaleContent } from "@/i18n/dictionaries/phase-five";
import { phaseSixLocaleContent } from "@/i18n/dictionaries/phase-six";
import { newToolsLocaleContent } from "@/i18n/dictionaries/new-tools";
import { ratioLocaleContent } from "@/i18n/dictionaries/ratio-tools";
import type { LocalizedCalculatorSlug } from "@/i18n/config";
import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";

export type GreekPageSpec = {
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
  faqs: readonly { question: string; answer: string }[];
  validation: string;
  resultNote: string;
};

export const elGlobalCountryResultLabels: Record<string, string> = {
  "Tax-exclusive amount": "Ποσό προ φόρου",
  "Estimated tax": "Εκτιμώμενος φόρος",
  "Tax-inclusive total": "Σύνολο με φόρο",
  "Gross annual salary": "Μικτός ετήσιος μισθός",
  "Estimated employee contributions": "Εκτιμώμενες εισφορές εργαζομένου",
  "Estimated annual take-home pay": "Εκτιμώμενο καθαρό ετήσιο εισόδημα",
  "Estimated monthly take-home pay": "Εκτιμώμενο καθαρό μηνιαίο εισόδημα",
  "Average tax rate": "Μέσος φορολογικός συντελεστής",
  "Base pay": "Βασική αμοιβή",
  "Overtime premium": "Προσαύξηση υπερωρίας",
  "Estimated allowance": "Εκτιμώμενο επίδομα",
  "Applied rate": "Εφαρμοζόμενος συντελεστής",
  "Service years": "Έτη υπηρεσίας",
  "Estimated severance": "Εκτιμώμενη αποζημίωση αποχώρησης",
  "Total contributions": "Συνολικές εισφορές",
  "Estimated gains": "Εκτιμώμενα κέρδη",
  "Projected balance": "Προβλεπόμενο υπόλοιπο",
  "Potential tax-free allowance": "Πιθανό αφορολόγητο ποσό",
  "Taxable salary remainder": "Φορολογητέο υπόλοιπο μισθού",
  "Monthly employer deposit": "Μηνιαία κατάθεση εργοδότη",
  "Annual employer deposits": "Ετήσιες καταθέσεις εργοδότη",
  "Eligible months": "Επιλέξιμοι μήνες",
};

const sourceCatalogs: Partial<Record<LocalizedCalculatorSlug, LocalizedCalculatorContent>>[] = [
  en.calculators, additionalCalculatorContent.en, phaseFourLocaleContent("en"), phaseFiveLocaleContent("en"),
  phaseSixLocaleContent("en"), newToolsLocaleContent("en"), ratioLocaleContent("en"),
];

export function elPage(slug: LocalizedCalculatorSlug, spec: GreekPageSpec): LocalizedCalculatorContent {
  const source = sourceCatalogs.map((catalog) => catalog[slug]).find((page) => page !== undefined);
  if (!source) throw new Error(`Missing English calculator source: ${slug}`);
  for (const [key, field] of Object.entries(source.fields)) {
    if (!spec.fields[key] || spec.fields[key] === field.label) throw new Error(`Missing Greek field: ${slug}.${key}`);
  }
  if (Object.keys(spec.fields).length !== Object.keys(source.fields).length) throw new Error(`Unexpected Greek field: ${slug}`);
  for (const [group, values] of Object.entries(source.options)) {
    for (const [key, label] of Object.entries(values)) {
      if (!spec.options?.[group]?.[key] || spec.options[group][key] === label) throw new Error(`Missing Greek option: ${slug}.${group}.${key}`);
    }
  }
  if (Object.keys(spec.options ?? {}).length !== Object.keys(source.options).length) throw new Error(`Unexpected Greek option group: ${slug}`);
  if (spec.results.length !== Object.keys(source.resultLabels).length || spec.results.some((label, index) => !label || label === Object.values(source.resultLabels)[index])) {
    throw new Error(`Greek result schema mismatch: ${slug}`);
  }

  return {
    name: spec.name,
    shortName: spec.name,
    title: spec.title,
    description: spec.description,
    keywords: spec.keywords,
    howTo: spec.howTo,
    formula: spec.formula,
    example: spec.example,
    faqs: spec.faqs,
    related: spec.related,
    fields: Object.fromEntries(Object.entries(source.fields).map(([key, field]) => [key, {
      ...field,
      label: spec.fields[key]!,
      placeholder: spec.fields[key]!,
    }])),
    options: Object.fromEntries(Object.entries(source.options).map(([group, values]) => [group,
      Object.fromEntries(Object.keys(values).map((key) => [key, spec.options![group]![key]])),
    ])),
    resultLabels: Object.fromEntries(Object.keys(source.resultLabels).map((key, index) => [key, spec.results[index]!])),
    validation: spec.validation,
    resultNote: spec.resultNote,
  };
}

export function elCountryPage(slug: LocalizedCalculatorSlug, spec: Omit<GreekPageSpec, "results">): LocalizedCalculatorContent {
  const source = sourceCatalogs.map((catalog) => catalog[slug]).find((page) => page !== undefined);
  if (!source) throw new Error(`Missing English calculator source: ${slug}`);
  const results = Object.values(source.resultLabels).map((label) => {
    const translation = elGlobalCountryResultLabels[label];
    if (!translation) throw new Error(`Missing Greek country result label: ${label}`);
    return translation;
  });
  return elPage(slug, { ...spec, results });
}

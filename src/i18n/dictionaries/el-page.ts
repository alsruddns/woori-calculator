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

export const elUsCountryResultLabels: Record<string, string> = {
  "VAT Calculator": "Υπολογιστής φόρου συναλλαγών",
  Amount: "Ποσό",
  "Annual taxable income": "Ετήσιο φορολογητέο εισόδημα",
  "Applied rate or return": "Εφαρμοζόμενος συντελεστής ή απόδοση",
  Salary: "Μισθός",
  "Social contribution rate": "Ποσοστό κοινωνικών εισφορών",
  "National Insurance Calculator": "Υπολογιστής National Insurance",
  "Stamp Duty Calculator": "Υπολογιστής τέλους χαρτοσήμου",
  "Pension Calculator": "Υπολογιστής σύνταξης",
  "Capital Gains Tax Calculator": "Υπολογιστής φόρου υπεραξίας",
  "CPP and EI Calculator": "Υπολογιστής CPP και EI",
  "CPF Calculator": "Υπολογιστής CPF",
  "MPF Calculator": "Υπολογιστής MPF",
  "EPF Calculator": "Υπολογιστής EPF",
  "SOCSO Calculator": "Υπολογιστής SOCSO",
  "SSS Calculator": "Υπολογιστής SSS",
  "PhilHealth Calculator": "Υπολογιστής PhilHealth",
  "Pag-IBIG Calculator": "Υπολογιστής Pag-IBIG",
  "Gratuity Calculator": "Υπολογιστής αποζημίωσης υπηρεσίας",
  "Corporate Tax Calculator": "Υπολογιστής εταιρικού φόρου",
  "Freelancer Tax Calculator": "Υπολογιστής φόρου ελεύθερου επαγγελματία",
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

export function elPhaseSixCountryPage(slug: LocalizedCalculatorSlug, spec: Omit<GreekPageSpec, "results">): LocalizedCalculatorContent {
  const source = sourceCatalogs.map((catalog) => catalog[slug]).find((page) => page !== undefined);
  if (!source) throw new Error(`Missing English calculator source: ${slug}`);
  const results = Object.values(source.resultLabels).map((label) => {
    const translation = elUsCountryResultLabels[label];
    if (!translation) throw new Error(`Missing Greek US result label: ${label}`);
    return translation;
  });
  return elPage(slug, { ...spec, results });
}

export const elUsCountryPage = elPhaseSixCountryPage;

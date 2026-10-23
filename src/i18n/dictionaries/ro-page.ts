import { en } from "@/i18n/dictionaries/en";
import { additionalCalculatorContent } from "@/i18n/dictionaries/additional";
import { phaseFourLocaleContent } from "@/i18n/dictionaries/phase-four";
import { phaseFiveLocaleContent } from "@/i18n/dictionaries/phase-five";
import { phaseSixLocaleContent } from "@/i18n/dictionaries/phase-six";
import { newToolsLocaleContent } from "@/i18n/dictionaries/new-tools";
import { ratioLocaleContent } from "@/i18n/dictionaries/ratio-tools";
import type { LocalizedCalculatorSlug } from "@/i18n/config";
import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";

export type RomanianPageSpec = {
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

export const roGlobalCountryResultLabels: Record<string, string> = {
  "Tax-exclusive amount": "Sumă fără taxe",
  "Taxable annual income": "Venit anual impozabil",
  Tax: "Impozit estimat",
  "Tax-inclusive total": "Total cu taxe incluse",
  "Gross annual salary": "Salariu brut anual",
  "Estimated income tax": "Impozit pe venit estimat",
  "Estimated employee contributions": "Contribuții estimate ale angajatului",
  "Estimated annual take-home pay": "Venit net anual estimat",
  "Estimated monthly take-home pay": "Venit net lunar estimat",
  "Average tax rate": "Cota medie de impozitare",
  "Base pay": "Salariu de bază",
  "Overtime premium": "Spor pentru ore suplimentare",
  "Estimated overtime pay": "Plată estimată pentru ore suplimentare",
  "Annual base pay": "Salariu de bază anual",
  "Allowance rate": "Cota alocației",
  "Estimated allowance": "Alocație estimată",
  "Daily salary basis": "Baza salarială zilnică",
  "Service years": "Ani de vechime",
  "Estimated severance": "Compensație estimată la încetarea activității",
  "Total contributions": "Contribuții totale",
  "Estimated gains": "Câștig estimat",
  "Projected balance": "Sold estimat",
  "Potential tax-free allowance": "Alocație posibil neimpozabilă",
  "Taxable salary remainder": "Rest de salariu impozabil",
  "Monthly employer FGTS deposit": "Depunere FGTS lunară a angajatorului",
  "Annual employer FGTS deposits": "Depuneri FGTS anuale ale angajatorului",
  "Eligible months": "Număr de luni eligibile",
  "Estimated monthly INSS contribution": "Contribuție INSS lunară estimată",
  "Estimated monthly IRRF": "Impozit IRRF lunar estimat",
  "Contribution base": "Baza de calcul a contribuției",
  "Employee rate": "Cota angajatului",
};

export const roUsResultLabels = [
  "Sumă fără taxe", "Impozit", "Total cu taxe incluse", "Venit impozabil", "Impozit pe venit estimat", "Cotă medie de impozitare",
  "Venit brut anual", "Contribuții ale angajatului", "Alte rețineri estimate", "Venit net anual estimat", "Venit net lunar estimat",
  "Contribuție lunară National Insurance", "Contribuție anuală National Insurance", "Taxă estimată de transfer al proprietății",
  "Contribuții ale angajatorului", "Creștere estimată a investiției", "Sold estimat", "Câștig de capital impozabil",
  "Impozit federal estimat pe câștigurile de capital", "Impozit statal introdus", "GST federal", "Componentă provincială suplimentară",
  "Total la cota GST/HST selectată", "Contribuție CPP a angajatului", "Contribuție CPP2 a angajatului", "Contribuție EI a angajatului",
  "Contribuții CPP și EI ale angajatorului", "Contribuție CPF a angajatului", "Contribuție CPF a angajatorului", "Total CPF lunar",
  "Contribuție MPF a angajatului", "Contribuție MPF a angajatorului", "Contribuții MPF totale", "Contribuție EPF a angajatului",
  "Contribuție EPF a angajatorului", "Contribuții EPF totale", "Contribuție SOCSO estimată a angajatului", "Baza salarială pentru contribuții",
  "Contribuție SSS a angajatului", "Contribuție SSS a angajatorului", "Partea PhilHealth a angajatului", "Partea PhilHealth a angajatorului",
  "Primă totală", "Contribuție Pag-IBIG a angajatului", "Contribuție Pag-IBIG a angajatorului", "Economii lunare totale",
  "Ani de serviciu eligibili", "Indemnizație estimată", "Salariu lunar de bază", "Beneficiu pentru primii cinci ani",
  "Beneficiu pentru anii suplimentari de serviciu", "Indemnizație plafonată la încetarea activității", "Profit impozabil",
  "Impozit pe profit estimat", "CSG deductibilă", "CSG nedeductibilă", "Contribuție de rambursare a datoriei sociale (CRDS)", "Contribuție de bază pentru pensia de limită de vârstă",
  "Contribuții totale estimate", "Venit net estimat înainte de impozitul pe venit", "Profit impozabil estimat din activitate independentă",
  "IRPF estimat", "Contribuții sociale anuale estimate", "Estimare după impozite și contribuții",
] as const;

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

export function roCountryPage(slug: LocalizedCalculatorSlug, spec: Omit<RomanianPageSpec, "results">): LocalizedCalculatorContent {
  const source = catalogs.map((catalog) => catalog[slug]).find((page) => page !== undefined);
  if (!source) throw new Error(`Missing English calculator source: ${slug}`);
  if (Object.keys(source.resultLabels).length === roUsResultLabels.length) {
    return roPage(slug, { ...spec, results: roUsResultLabels });
  }
  const results = Object.keys(source.resultLabels).map((label) => {
    const translation = roGlobalCountryResultLabels[label];
    if (!translation) throw new Error(`Missing Romanian country result label: ${label}`);
    return translation;
  });
  return roPage(slug, { ...spec, results });
}

export function roUsCountryPage(slug: LocalizedCalculatorSlug, spec: Omit<RomanianPageSpec, "results">): LocalizedCalculatorContent {
  return roCountryPage(slug, spec);
}

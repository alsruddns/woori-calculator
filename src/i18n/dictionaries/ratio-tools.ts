import { getCalculatorPage } from "@/data/calculator-content";
import { type LocalizedCalculatorSlug, type Locale } from "@/i18n/config";
import { ratioCopy } from "@/i18n/dictionaries/ratio-copy";
import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";

const slugs = ["ratio", "proportion", "aspect-ratio", "scale-ratio"] as const;
const modeValues = ["simplify", "find", "split", "proportion", "to-percentage", "from-percentage", "compare"] as const;
const fieldNames = ["parts", "knownSide", "knownValue", "total", "unknown", "a", "b", "c", "d", "percentages", "firstRatio", "secondRatio", "width", "height", "scaleDrawing", "scaleActual", "direction", "length", "inputUnit", "outputUnit"] as const;
const modeLabels: Record<Locale, string> = {
  ko: "계산 방식", en: "Calculation method", ja: "計算方法", zh: "计算方式", es: "Método de cálculo", "pt-br": "Tipo de cálculo", de: "Berechnungsart", fr: "Mode de calcul", vi: "Cách tính", id: "Metode perhitungan", th: "วิธีคำนวณ", "zh-tw": "計算方式", it: "Metodo di calcolo", nl: "Berekeningswijze", hi: "गणना विधि",
};

export function ratioLocaleContent(locale: Locale): Partial<Record<LocalizedCalculatorSlug, LocalizedCalculatorContent>> {
  const copy = ratioCopy(locale);
  const fields = Object.fromEntries(fieldNames.map((field, index) => [field, { label: copy.fields[index]!, ...(field === "parts" || field === "percentages" || field === "firstRatio" || field === "secondRatio" ? { placeholder: field === "parts" ? "2:3:5" : field === "percentages" ? "20:30:50" : "2:3" } : {}) }]));
  fields.mode = { label: modeLabels[locale] };
  const options = {
    mode: Object.fromEntries(modeValues.map((value, index) => [value, copy.modes[index]!])),
    knownSide: { first: copy.options[0]!, second: copy.options[1]! },
    unknown: { c: copy.options[2]!, d: copy.options[3]! },
    direction: { "drawing-to-actual": copy.options[4]!, "actual-to-drawing": copy.options[5]! },
    inputUnit: { cm: "cm", m: "m" }, outputUnit: { cm: "cm", m: "m" },
  };
  const resultLabels: Record<string, string> = {
    simplifiedRatio: copy.results[0]!, greatestDivisor: copy.results[1]!, matchingValue: copy.results[3]!,
    firstDecimal: `${copy.options[0]} · ${copy.results[6]}`, secondDecimal: `${copy.options[1]} · ${copy.results[6]}`,
    comparison: copy.results[7]!, unknownValue: copy.results[8]!, proportionEquation: copy.results[9]!,
    aspectRatio: copy.results[10]!, decimalRatio: copy.results[6]!, convertedLength: copy.results[11]!, scale: copy.results[12]!,
  };
  for (let index = 1; index <= 6; index++) {
    resultLabels[`part${index}`] = `${copy.results[2]} ${index}`;
    resultLabels[`share${index}`] = `${copy.results[4]} ${index}`;
    resultLabels[`percent${index}`] = `${copy.results[5]} ${index}`;
    resultLabels[`decimal${index}`] = `${copy.results[6]} ${index}`;
  }
  return Object.fromEntries(slugs.map((slug, index) => {
    const source = getCalculatorPage(slug);
    if (!source) throw new Error(`Missing ratio calculator: ${slug}`);
    const example = index === 0
      ? { question: `${copy.modes[2]}: 120; 2:3`, answer: `${copy.results[4]}: 120 × 2 ÷ 5 = 48; 120 × 3 ÷ 5 = 72.` }
      : index === 1 ? { question: `${copy.names[1]}: 2:5 = x:20`, answer: `${copy.results[8]}: x = 2 × 20 ÷ 5 = 8.` }
        : index === 2 ? { question: `${copy.names[2]}: 1920 × 1080`, answer: `${copy.results[10]}: 1920 ÷ 120 : 1080 ÷ 120 = 16 : 9.` }
          : { question: `${copy.names[3]}: 1:100; 5 cm`, answer: `${copy.results[11]}: 5 × 100 = 500 cm = 5 m.` };
    const formula = index === 0
      ? "g = gcd(a,b); a:b = (a÷g):(b÷g) · vᵢ = T×rᵢ÷Σr · pᵢ = rᵢ÷Σr×100%"
      : index === 1 ? "a:b=x:d ⇒ x=a×d÷b · a:b=c:x ⇒ x=b×c÷a"
        : index === 2 ? "g = gcd(w,h); w:h = (w÷g):(h÷g)"
          : "L₂ = L₁×s₂÷s₁ · L₁ = L₂×s₁÷s₂ · 1m=100cm";
    const faqs = index === 0 ? copy.faqs : index === 1 ? [copy.faqs[4]!, copy.extras[0]!] : index === 2 ? [copy.faqs[3]!, copy.extras[1]!] : [copy.extras[2]!, copy.extras[0]!];
    return [slug, {
      name: copy.names[index]!, shortName: copy.names[index]!, title: copy.titles[index]!, description: copy.descriptions[index]!,
      keywords: index === 0 ? [copy.names[index]!, ...copy.modes, copy.names[1]!, copy.names[2]!, copy.names[3]!] : [copy.names[index]!, copy.titles[index]!, copy.names[0]!],
      howTo: index === 0 ? `${copy.guides[index]} ${copy.useCases}` : copy.guides[index]!, formula: `${copy.names[index]}: ${formula}`, example, faqs,
      related: source.relatedCalculatorIds as LocalizedCalculatorContent["related"], fields, options, resultLabels,
      validation: copy.validation, resultNote: copy.useCases,
    } satisfies LocalizedCalculatorContent];
  })) as Partial<Record<LocalizedCalculatorSlug, LocalizedCalculatorContent>>;
}

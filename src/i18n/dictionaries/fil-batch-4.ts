import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";
import { filPage } from "@/i18n/dictionaries/fil-batch-2";

const fields = {
  parts: "Mga bahagi ng ratio, paghiwalayin sa tutuldok",
  knownSide: "Posisyon ng kilalang value",
  knownValue: "Kilalang value",
  total: "Kabuuang halagang paghahatian",
  unknown: "Posisyon ng value na hahanapin",
  a: "Unang value ng unang ratio",
  b: "Ikalawang value ng unang ratio",
  c: "Unang value ng ikalawang ratio",
  d: "Ikalawang value ng ikalawang ratio",
  percentages: "Mga porsiyento, paghiwalayin sa tutuldok",
  firstRatio: "Unang ratio",
  secondRatio: "Ikalawang ratio",
  width: "Lapad",
  height: "Taas",
  scaleDrawing: "Sukat sa drawing",
  scaleActual: "Aktuwal na sukat",
  direction: "Direksiyon ng conversion",
  length: "Haba",
  inputUnit: "Yunit ng input",
  outputUnit: "Yunit ng resulta",
  mode: "Uri ng pagkukuwenta",
};
const options = {
  mode: { simplify: "Pasimplehin ang ratio", find: "Hanapin ang nawawalang value", split: "Hatiin ang kabuuan", proportion: "Lutasin ang proportion", "to-percentage": "Ratio papuntang porsiyento", "from-percentage": "Porsiyento papuntang ratio", compare: "Ihambing ang mga ratio" },
  knownSide: { first: "Unang value", second: "Ikalawang value" },
  unknown: { c: "Ikatlong value", d: "Ikaapat na value" },
  direction: { "drawing-to-actual": "Drawing papuntang aktuwal na sukat", "actual-to-drawing": "Aktuwal na sukat papuntang drawing" },
  inputUnit: { cm: "Sentimetro (cm)", m: "Metro (m)" },
  outputUnit: { cm: "Sentimetro (cm)", m: "Metro (m)" },
};
const results = [
  "Ratio sa pinakasimpleng anyo", "Pinakamalaking common divisor", "Katumbas na value", "Decimal ng unang ratio", "Decimal ng ikalawang ratio", "Paghahambing ng ratio",
  "Nawawalang value", "Equation ng proportion", "Aspect ratio", "Decimal na ratio", "Na-convert na haba", "Scale factor",
  "Bahagi 1", "Halaga ng bahagi 1", "Porsiyento ng bahagi 1", "Decimal ng bahagi 1",
  "Bahagi 2", "Halaga ng bahagi 2", "Porsiyento ng bahagi 2", "Decimal ng bahagi 2",
  "Bahagi 3", "Halaga ng bahagi 3", "Porsiyento ng bahagi 3", "Decimal ng bahagi 3",
  "Bahagi 4", "Halaga ng bahagi 4", "Porsiyento ng bahagi 4", "Decimal ng bahagi 4",
  "Bahagi 5", "Halaga ng bahagi 5", "Porsiyento ng bahagi 5", "Decimal ng bahagi 5",
  "Bahagi 6", "Halaga ng bahagi 6", "Porsiyento ng bahagi 6", "Decimal ng bahagi 6",
];
function ratioPage(slug: "ratio" | "proportion" | "aspect-ratio" | "scale-ratio", content: {
  name: string; title: string; description: string; keywords: readonly string[]; howTo: string; formula: string;
  example: { question: string; answer: string }; related: LocalizedCalculatorContent["related"];
  faq: { question: string; answer: string };
}): LocalizedCalculatorContent {
  return filPage(slug, {
    ...content, shortName: content.name, fields, options, results,
    validation: "Tiyaking wasto at hindi negatibo ang mga value. Hindi maaaring sero ang denominator o kabuuang halagang paghahatian.",
    resultNote: "Arithmetic result ito batay sa mga value at yunit na inilagay mo; tingnan ang ipinapakitang rounding para sa decimal.",
  });
}

export const filBatchFour: Record<string, LocalizedCalculatorContent> = {
  ratio: ratioPage("ratio", {
    name: "Kalkulador ng ratio", title: "Kalkulador ng ratio: pasimplehin, ihambing at hatiin ang halaga",
    description: "Pasimplehin ang ratio, hanapin ang katumbas na value, hatiin ang kabuuan o i-convert ang ratio sa porsiyento.",
    keywords: ["kalkulador ng ratio", "pasimplehin ang ratio", "hati ayon sa ratio"],
    howTo: "Piliin ang uri ng pagkukuwenta at ilagay lamang ang mga value na hinihingi sa napiling mode.",
    formula: "Pinapasimple ang ratio sa pamamagitan ng greatest common divisor; ang bahagi ng total ay kinukuwenta ayon sa proporsiyon ng bawat bahagi.",
    example: { question: "Paano hahatiin ang 100 sa ratio na 2:3?", answer: "May limang bahagi sa kabuuan. Makakakuha ang unang bahagi ng 40 at ang ikalawa ng 60." },
    related: ["proportion", "percentage", "unit-price"],
    faq: { question: "Kailangan bang whole number ang ratio?", answer: "Hindi. Maaaring maglagay ng mga decimal value; susundin ng calculator ang mga value na ibinigay." },
  }),
  proportion: ratioPage("proportion", {
    name: "Kalkulador ng proportion", title: "Lutasin ang proportion at hanapin ang nawawalang value",
    description: "Kuwentahin ang nawawalang value sa magkapantay na ratio o paghambingin ang dalawang proportion.",
    keywords: ["proportion calculator", "lutasin ang proportion", "nawawalang value sa ratio"],
    howTo: "Ilagay ang tatlong kilalang value at piliin kung aling posisyon ang hahanapin.",
    formula: "Kung a:b = c:d, ginagamit ang cross multiplication: a × d = b × c.",
    example: { question: "Kung 2:3 = 8:x, ano ang x?", answer: "Mula sa 2x = 24, x = 12." },
    related: ["ratio", "percentage", "fraction"],
    faq: { question: "Ano ang proportion?", answer: "Pahayag ito na magkapantay ang dalawang ratio. Maaaring hanapin ang isang nawawalang value kung alam ang tatlo pa." },
  }),
  "aspect-ratio": ratioPage("aspect-ratio", {
    name: "Kalkulador ng aspect ratio", title: "Kuwentahin at paghambingin ang aspect ratio",
    description: "Kuwentahin ang lapad at taas bilang ratio at ihambing ito sa ibang aspect ratio.",
    keywords: ["aspect ratio calculator", "lapad at taas ratio", "screen aspect ratio"],
    howTo: "Ilagay ang lapad at taas; maaari ring ihambing ang dalawang pares ng sukat.",
    formula: "Aspect ratio = lapad:taas na pinasimple ayon sa greatest common divisor; ipinapakita rin ang decimal ratio.",
    example: { question: "Ano ang aspect ratio ng 1920 × 1080?", answer: "Ang ratio na 1920:1080 ay 16:9 kapag pinasimple." },
    related: ["ratio", "proportion", "scale-ratio"],
    faq: { question: "Ano ang gamit ng aspect ratio?", answer: "Ipinapakita nito ang proporsiyon ng lapad at taas ng screen, larawan o sukat; hindi nito binabago ang resolution." },
  }),
  "scale-ratio": ratioPage("scale-ratio", {
    name: "Kalkulador ng scale ratio", title: "I-convert ang sukat sa drawing tungo sa aktuwal na sukat",
    description: "Gamitin ang scale ratio upang tantiyahin ang aktuwal na haba mula sa drawing o ang katumbas na sukat sa drawing.",
    keywords: ["scale ratio calculator", "drawing scale", "aktuwal na sukat"],
    howTo: "Piliin ang direksiyon, ilagay ang haba at scale ratio, at piliin ang mga yunit.",
    formula: "Aktuwal na sukat = sukat sa drawing × scale factor; ginagamit ang parehong ratio sa kabaligtarang direksiyon.",
    example: { question: "Kung 1 cm sa drawing ay 100 cm sa aktuwal, gaano kahaba ang 4 cm sa drawing?", answer: "4 × 100 = 400 cm, o 4 m sa aktuwal." },
    related: ["ratio", "proportion", "unit-converter"],
    faq: { question: "Awtomatiko bang sinusukat ang drawing?", answer: "Hindi. Ipasok ang haba na nabasa mo sa drawing at ang scale ratio na nakasaad dito." },
  }),
};

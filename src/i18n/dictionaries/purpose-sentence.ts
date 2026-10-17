import type { Locale } from "@/i18n/config";

const patterns: Record<Locale, string> = {
  ko: "{inputs}을(를) 바탕으로 {outputs}을(를) 계산합니다.",
  en: "Calculate {outputs} from {inputs}.",
  ja: "{inputs}から{outputs}を計算します。",
  zh: "根据{inputs}计算{outputs}。",
  es: "Calcula {outputs} a partir de {inputs}.",
  "pt-br": "Calcule {outputs} a partir de {inputs}.",
  de: "Berechnen Sie {outputs} aus {inputs}.",
  fr: "Calculez {outputs} à partir de {inputs}.",
  vi: "Tính {outputs} từ {inputs}.",
  id: "Hitung {outputs} dari {inputs}.",
  th: "คำนวณ{outputs}จาก{inputs}",
  "zh-tw": "依據{inputs}計算{outputs}。",
  it: "Calcola {outputs} a partire da {inputs}.",
  nl: "Bereken {outputs} op basis van {inputs}.",
  hi: "{inputs} से {outputs} की गणना करें।",
};

export function purposeSentence(locale: Locale, inputs: readonly string[], outputs: readonly string[]) {
  return patterns[locale].replace("{inputs}", inputs.join(", ")).replace("{outputs}", outputs.join(", "));
}

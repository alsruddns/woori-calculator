import type { Locale } from "@/i18n/config";
import { ratioCopy } from "@/i18n/dictionaries/ratio-copy";

const useCaseHeading: Record<Locale, string> = {
  ko: "어디에 쓸 수 있나요?", en: "When is this useful?", ja: "どんな場面で使えますか？", zh: "适用于哪些场景？", es: "¿Cuándo sirve?", "pt-br": "Quando usar?", de: "Wofür ist das nützlich?", fr: "Dans quels cas l’utiliser ?", vi: "Dùng khi nào?", id: "Kapan digunakan?", th: "ใช้เมื่อใด?", "zh-tw": "適用於哪些情況？", it: "Quando si usa?", nl: "Wanneer is dit nuttig?", hi: "यह कब उपयोगी है?",
};

export function RatioExamples({ locale, heading }: { locale: Locale; heading: string }) {
  const copy = ratioCopy(locale);
  const examples = [
    { question: `${copy.modes[0]}: 12:18`, answer: copy.faqs[0]!.answer },
    { question: `${copy.modes[2]}: 120; 2:3`, answer: "120 × 2 ÷ 5 = 48; 120 × 3 ÷ 5 = 72." },
    { question: `${copy.modes[3]}: 3:5 = x:20`, answer: "x = 3 × 20 ÷ 5 = 12." },
    { question: `${copy.names[2]}: 1920 × 1080`, answer: copy.faqs[3]!.answer },
  ];
  return <>
    <section aria-labelledby="ratio-examples-heading">
      <h2 id="ratio-examples-heading" className="text-xl font-bold text-slate-950">{heading}</h2>
      <div className="mt-3 grid min-w-0 gap-3 sm:grid-cols-2">
        {examples.map(({ question, answer }) => <div key={question} className="min-w-0 rounded-xl border border-slate-200 bg-white p-4"><h3 className="break-words font-semibold [overflow-wrap:anywhere]">{question}</h3><p className="mt-2 break-words leading-7 text-slate-700 [overflow-wrap:anywhere]">{answer}</p></div>)}
      </div>
    </section>
    <section aria-labelledby="ratio-use-cases-heading">
      <h2 id="ratio-use-cases-heading" className="text-xl font-bold text-slate-950">{useCaseHeading[locale]}</h2>
      <p className="mt-3 leading-7 text-slate-700">{copy.useCases}</p>
    </section>
  </>;
}

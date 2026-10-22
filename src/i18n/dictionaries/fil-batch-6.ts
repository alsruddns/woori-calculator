import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";
import { filPage } from "@/i18n/dictionaries/fil-batch-2";

export const filBatchSix: Record<string, LocalizedCalculatorContent> = {
  pace: filPage("pace", {
    name: "Kalkulador ng running pace", shortName: "Running pace", title: "Kuwentahin ang running pace at average speed",
    description: "Kuwentahin ang average na minuto kada kilometro at bilis mula sa distansiya at oras ng pagtakbo.",
    keywords: ["running pace calculator", "pace kada kilometro", "average running speed"],
    howTo: "Ilagay ang distansiya at kabuuang oras ng pagtakbo sa oras, minuto at segundo.",
    formula: "Pace = kabuuang oras ÷ distansiya; average speed = distansiya ÷ kabuuang oras.",
    example: { question: "Ano ang pace kung tumakbo ng 5 km sa loob ng 27 minuto at 30 segundo?", answer: "27.5 minuto ÷ 5 km = 5 minuto at 30 segundo kada kilometro." },
    related: ["fuel-efficiency", "bmi", "calorie-per-serving"],
    fields: { distance: "Distansiya ng takbo", hours: "Oras", minutes: "Minuto" },
    results: ["Average na pace", "Pace kada kilometro", "Average na bilis", "Bilis kada oras"],
    validation: "Dapat positibo ang distansiya at hindi negatibo ang oras; dapat may kabuuang oras na higit sa sero.",
    resultNote: "Average pace at bilis lamang ito. Hindi nito isinasaalang-alang ang elevation, terrain o paghinto habang tumatakbo.",
    faq: { question: "Ano ang ibig sabihin ng 5:30 min/km?", answer: "Ibig sabihin, tinatayang 5 minuto at 30 segundo ang kailangan para sa bawat kilometro sa parehong average pace." },
  }),
};

import { createCalculatorPage } from "@/data/calculator-content/create-page";
import { calculateAverage, calculateCagr, calculateChangeRate, calculateDiscount, calculatePercentage, calculateRatio, calculateWeightedAverage } from "@/calculators/math/calculate";
import type { CalculatorPageDefinition } from "@/types/calculator-page";

const input = (name: string, label: string, extra: object = {}) => ({ name, label, type: "number" as const, min: 0, step: 0.01, ...extra });
const mode = (options: readonly { label: string; value: string }[], defaultValue = options[0]?.value) => ({ name: "mode", label: "계산 방식", type: "select" as const, options, defaultValue });

export const mathCalculatorPages: readonly CalculatorPageDefinition[] = [
  createCalculatorPage({
    slug: "percentage", name: "퍼센트 계산기", shortName: "퍼센트", category: "math", description: "A의 B%부터 비율, 증가율, 감소 후 값까지 간단히 계산합니다.", title: "퍼센트 계산기: 비율·증가·감소 계산", keywords: ["퍼센트 계산", "비율 계산", "증가율"], relatedCalculatorIds: ["discount", "change-rate", "ratio"],
    fields: [mode([{ label: "A의 B%", value: "of" }, { label: "A는 B의 몇 %", value: "what-percent" }, { label: "A에서 B% 증가", value: "increase" }, { label: "A에서 B% 감소", value: "decrease" }]), input("a", "A 값"), input("b", "B 값", { defaultValue: "10" })], calculate: calculatePercentage,
    howTo: "계산 유형을 고른 뒤 A와 B 값을 입력하세요. 비율 계산에서는 A를 비교할 값, B를 기준값으로 사용합니다.", formula: "A의 B% = A × B ÷ 100 · A가 B의 몇 %인지 = A ÷ B × 100 · 증가/감소 후 값 = A × (1 ± B ÷ 100)", example: { question: "200의 15%는 얼마인가요?", answer: "200 × 15 ÷ 100 = 30입니다." },
    faqs: [{ question: "A는 B의 몇 퍼센트인지 어떻게 계산하나요?", answer: "A를 B로 나눈 뒤 100을 곱합니다. 기준값 B가 0이면 비율을 계산할 수 없습니다." }, { question: "15% 증가와 15% 감소는 원래 값으로 돌아오나요?", answer: "아닙니다. 증가 후 값의 15%는 처음 값의 15%보다 커서 같은 비율로 감소해도 원래 값과 달라집니다." }],
  }),
  createCalculatorPage({
    slug: "discount", name: "할인율 계산기", shortName: "할인율", category: "math", description: "정가와 할인율로 할인 금액과 최종 가격을 구하거나 실제 할인율을 역산합니다.", title: "할인율 계산기: 할인 금액과 최종 가격", keywords: ["할인 계산기", "할인 가격", "할인율 계산"], relatedCalculatorIds: ["percentage", "change-rate", "unit-price"],
    fields: [mode([{ label: "정가와 할인율로 계산", value: "rate" }, { label: "정가와 판매가로 역산", value: "actual" }]), input("price", "정가", { step: 1 }), input("rate", "할인율 (%)", { step: 0.1, defaultValue: "20", showWhen: { field: "mode", value: "rate" } }), input("sale", "판매가", { step: 1, showWhen: { field: "mode", value: "actual" } })], calculate: calculateDiscount,
    howTo: "할인율 계산 또는 실제 할인율 역산을 선택하고 필요한 금액을 입력하세요. 원 단위 할인 금액은 반올림합니다.", formula: "할인 금액 = 정가 × 할인율 ÷ 100 · 최종 가격 = 정가 − 할인 금액 · 실제 할인율 = (정가 − 판매가) ÷ 정가 × 100", example: { question: "정가 50,000원에서 20% 할인하면?", answer: "할인 금액은 10,000원이고 최종 가격은 40,000원입니다." },
    faqs: [{ question: "할인 금액은 어떻게 반올림하나요?", answer: "계산 결과를 원 단위 정수로 반올림해 표시합니다." }, { question: "판매가를 알고 있을 때 할인율도 구할 수 있나요?", answer: "실제 할인율 역산 모드를 선택하면 정가와 판매가로 계산할 수 있습니다." }],
  }),
  createCalculatorPage({
    slug: "change-rate", name: "증감률 계산기", shortName: "증감률", category: "math", description: "기존 값과 변경 값을 비교해 증가량·감소량과 변화율을 계산합니다.", title: "증감률 계산기: 증가량과 감소율 계산", keywords: ["증감률 계산", "증가율 계산", "감소율"], relatedCalculatorIds: ["percentage", "discount", "cagr"],
    fields: [input("old", "기존 값"), input("current", "변경 값")], calculate: calculateChangeRate,
    howTo: "기존 값과 비교할 변경 값을 입력하세요. 감소율은 음수로 나타내어 변화 방향을 구분합니다.", formula: "변화량 = 변경 값 − 기존 값 · 변화율(%) = 변화량 ÷ |기존 값| × 100", example: { question: "100에서 120으로 바뀌었다면?", answer: "20 증가했고 증가율은 20%입니다." },
    faqs: [{ question: "기존 값이 0이면 왜 계산할 수 없나요?", answer: "변화율은 기존 값을 분모로 나누므로 기준값이 0이면 정의되지 않습니다." }, { question: "감소율은 어떻게 표시되나요?", answer: "감소량은 양수 크기로 표시하고 감소율에는 음수 부호를 붙여 방향을 알 수 있게 합니다." }],
  }),
  createCalculatorPage({
    slug: "ratio", name: "비율 계산기", shortName: "비율", category: "math", description: "A:B 비율을 단순화하고 A를 기준으로 비례하는 B 값을 계산합니다.", title: "비율 계산기: 비율 단순화와 비례값", keywords: ["비율 계산기", "비율 단순화", "비례식 계산"], relatedCalculatorIds: ["percentage", "average", "weighted-average"],
    fields: [input("a", "비율 A"), input("b", "비율 B"), input("known", "기준 A 값")], calculate: calculateRatio,
    howTo: "비율 A와 B를 입력하면 간단한 정수 비율과 기준 A 값에 대응하는 B 값을 계산합니다.", formula: "단순 비율 = A와 B를 최대공약수로 나눈 값 · 대응 B = 기준 A × B ÷ A", example: { question: "12:18을 단순화하면?", answer: "최대공약수 6으로 나누면 2:3입니다. A가 10일 때 B는 15입니다." },
    faqs: [{ question: "비율의 두 값이 소수여도 되나요?", answer: "소수 비율은 계산기에 입력할 수 있으며, 단순화 결과는 숫자로 표시됩니다." }, { question: "비율과 퍼센트는 같은가요?", answer: "비율은 두 값의 상대 관계이고, 퍼센트는 기준값 대비 비율을 100을 기준으로 표현한 값입니다." }],
  }),
  createCalculatorPage({
    slug: "average", name: "평균 계산기", shortName: "평균", category: "math", description: "여러 숫자의 합계와 개수, 산술평균을 한 번에 계산합니다.", title: "평균 계산기: 여러 숫자의 합계와 평균", keywords: ["평균 계산기", "산술 평균", "숫자 평균"], relatedCalculatorIds: ["weighted-average", "ratio", "cagr"],
    fields: [{ name: "numbers", label: "계산할 숫자", type: "textarea", placeholder: "예: 1,000; 2,000; 2,400" }], calculate: calculateAverage,
    howTo: "숫자를 쉼표나 공백으로 나누거나, 천 단위 쉼표가 포함된 숫자는 세미콜론(;) 또는 줄바꿈으로 구분해 입력하세요. 비어 있는 항목은 건너뜁니다.", formula: "합계 = 입력한 모든 값의 합 · 산술평균 = 합계 ÷ 숫자 개수", example: { question: "10, 20, 30의 평균은?", answer: "합계 60을 3개로 나누므로 평균은 20입니다." },
    faqs: [{ question: "음수와 소수도 입력할 수 있나요?", answer: "가능합니다. 입력한 숫자를 그대로 합산해 산술평균을 계산합니다." }, { question: "빈 값은 평균에 포함되나요?", answer: "쉼표나 줄바꿈 사이의 빈 칸은 계산에서 제외합니다." }],
  }),
  createCalculatorPage({
    slug: "weighted-average", name: "가중평균 계산기", shortName: "가중평균", category: "math", description: "각 값에 중요도나 비중을 반영해 가중평균을 계산합니다.", title: "가중평균 계산기: 값과 가중치로 평균 계산", keywords: ["가중평균", "가중 평균 계산", "비중 평균"], relatedCalculatorIds: ["average", "ratio", "percentage"],
    fields: [{ name: "values", label: "값 목록", type: "textarea", placeholder: "예: 80; 100" }, { name: "weights", label: "가중치 목록", type: "textarea", placeholder: "예: 1; 3" }], calculate: calculateWeightedAverage,
    howTo: "값과 가중치를 같은 순서로 입력하세요. 쉼표·공백으로 나누거나 천 단위 쉼표가 포함되면 세미콜론(;) 또는 줄바꿈으로 구분합니다. 두 목록 개수는 같아야 합니다.", formula: "가중평균 = Σ(값 × 가중치) ÷ Σ가중치", example: { question: "80점에 가중치 1, 100점에 가중치 3을 주면?", answer: "(80×1 + 100×3) ÷ 4 = 95점입니다." },
    faqs: [{ question: "가중치는 꼭 퍼센트여야 하나요?", answer: "아닙니다. 가중치의 상대적인 비율만 중요하므로 25%와 75% 대신 1과 3을 입력해도 결과는 같습니다." }, { question: "가중치가 0이어도 되나요?", answer: "개별 가중치 0은 가능하지만 모든 가중치의 합이 0이면 평균을 정의할 수 없습니다." }],
  }),
  createCalculatorPage({
    slug: "cagr", name: "연평균 성장률 계산기", shortName: "CAGR", category: "math", description: "초기값과 최종값, 기간을 바탕으로 복리 기준 연평균 성장률을 계산합니다.", title: "CAGR 계산기: 연평균 성장률 계산", keywords: ["CAGR 계산기", "연평균 성장률", "복합 연간 성장률"], relatedCalculatorIds: ["change-rate", "compound-interest", "average"],
    fields: [input("initial", "초기값", { min: 0.01 }), input("final", "최종값", { min: 0.01 }), input("years", "기간", { min: 0.01 })], calculate: calculateCagr,
    howTo: "초기값과 최종값, 경과한 연수를 입력하세요. 기간은 0보다 큰 소수 연수도 사용할 수 있습니다.", formula: "CAGR(%) = ((최종값 ÷ 초기값)^(1 ÷ 연수) − 1) × 100", example: { question: "100이 2년 뒤 121이 되었다면?", answer: "연평균 복리 성장률은 10%입니다." },
    faqs: [{ question: "CAGR은 매년 같은 수익을 의미하나요?", answer: "시작과 끝 사이의 변화를 일정한 복리 성장률 하나로 환산한 값입니다. 실제 연도별 변동이 같았다는 뜻은 아닙니다." }, { question: "초기값이나 최종값이 0 또는 음수여도 되나요?", answer: "이 계산기는 일반적인 양수 성장률만 다루므로 두 값 모두 0보다 커야 합니다." }],
  }),
];

import { createCalculatorPage } from "@/data/calculator-content/create-page";
import { calculateMargin, calculateMarkup, calculateProductMargin, calculateUnitPrice, calculateVat, calculateWithholdingTax33 } from "@/calculators/tax/calculate";
import type { CalculatorPageDefinition } from "@/types/calculator-page";

const amount = (name: string, label: string, extra: object = {}) => ({ name, label, type: "number" as const, min: 0, step: 1, ...extra });
const select = (name: string, label: string, options: readonly { label: string; value: string }[]) => ({ name, label, type: "select" as const, options, defaultValue: options[0]?.value });

export const taxCalculatorPages: readonly CalculatorPageDefinition[] = [
  createCalculatorPage({
    slug: "vat", name: "부가세 계산기", shortName: "부가세", category: "tax", description: "공급가액에서 부가세와 합계를 구하거나 부가세 포함 금액을 나누어 계산합니다.", title: "부가세 계산기: 공급가액·부가세·합계 계산", keywords: ["부가세 계산기", "부가가치세 계산", "공급가액 계산"], relatedCalculatorIds: ["discount", "unit-price", "margin"],
    fields: [select("mode", "계산 방식", [{ label: "공급가액에서 계산", value: "supply" }, { label: "부가세 포함 합계에서 역산", value: "gross" }]), amount("amount", "공급가액 (원)", { showWhen: { field: "mode", value: "supply" } }), amount("gross", "부가세 포함 합계 (원)", { showWhen: { field: "mode", value: "gross" } })], calculate: calculateVat,
    howTo: "공급가액에서 계산하거나 부가세 포함 합계에서 역산하는 방식을 고르고 금액을 입력하세요. 부가세율은 10%로 계산하고 원 단위로 반올림합니다.", formula: "공급가액 기준 부가세 = 공급가액 × 10% · 합계 = 공급가액 + 부가세 · 합계 역산 공급가액 = 합계 ÷ 1.1", example: { question: "공급가액 10,000원이라면?", answer: "부가세는 1,000원이고 합계는 11,000원입니다." },
    notes: ["일반적인 10% 계산을 제공합니다. 면세·영세율·특례 등 개별 거래의 세무 판단은 포함하지 않습니다."], faqs: [{ question: "부가세 포함 금액에서 세액은 어떻게 구하나요?", answer: "합계 금액을 1.1로 나누어 공급가액을 구한 뒤, 합계와 공급가액의 차이를 부가세로 봅니다." }, { question: "모든 거래에 10%가 적용되나요?", answer: "아닙니다. 과세 유형에 따라 다를 수 있으므로 이 결과는 일반적인 10% 계산 참고용입니다." }],
  }),
  createCalculatorPage({
    slug: "unit-price", name: "단가 계산기", shortName: "단가", category: "math", description: "총 가격과 수량으로 개당 단가를 구하거나 단가와 수량으로 총액을 계산합니다.", title: "단가 계산기: 개당 가격과 총액 계산", keywords: ["단가 계산기", "개당 가격", "단위 가격 비교"], relatedCalculatorIds: ["discount", "margin", "markup"],
    fields: [select("mode", "계산 방식", [{ label: "총 가격에서 단가 계산", value: "unit" }, { label: "단가에서 총 가격 계산", value: "total" }]), amount("total", "총 가격 (원)", { showWhen: { field: "mode", value: "unit" } }), amount("unitPrice", "단가 (원)", { showWhen: { field: "mode", value: "total" } }), amount("quantity", "수량", { step: 0.01 })], calculate: calculateUnitPrice,
    howTo: "총액에서 단가를 구하거나 단가로 총액을 구하는 방식을 선택한 뒤 가격과 수량을 입력하세요.", formula: "개당 단가 = 총 가격 ÷ 수량 · 총 가격 = 단가 × 수량", example: { question: "10,000원짜리 상품 3개의 개당 가격은?", answer: "개당 약 3,333.33원입니다." },
    faqs: [{ question: "수량에 무게나 용량을 넣어도 되나요?", answer: "가능합니다. 가격과 수량에 같은 단위 기준을 사용하면 단위당 가격을 비교할 수 있습니다." }, { question: "개당 가격은 원 단위로 반올림하나요?", answer: "소수점 둘째 자리까지 표시해 작은 단가 차이도 확인할 수 있습니다." }],
  }),
  createCalculatorPage({
    slug: "margin", name: "마진율 계산기", shortName: "마진율", category: "finance", description: "매입가와 판매가로 마진 금액과 판매가 기준 마진율을 계산합니다.", title: "마진율 계산기: 마진 금액과 판매가 기준 비율", keywords: ["마진율 계산기", "매출 마진 계산", "마진 금액"], relatedCalculatorIds: ["markup", "unit-price", "discount"],
    fields: [amount("cost", "매입가 (원)"), amount("sale", "판매가 (원)")], calculate: calculateMargin,
    howTo: "매입가와 판매가를 입력하면 차액과 판매가를 기준으로 한 마진율을 계산합니다.", formula: "마진 금액 = 판매가 − 매입가 · 마진율(%) = 마진 금액 ÷ 판매가 × 100", example: { question: "매입가 60원, 판매가 100원이면?", answer: "마진은 40원이고 마진율은 40%입니다." },
    notes: ["수수료, 배송비, 세금 등 추가 비용은 반영하지 않습니다."], faqs: [{ question: "마진율과 마크업률은 어떻게 다른가요?", answer: "마진율은 판매가를 분모로, 마크업률은 원가를 분모로 사용합니다. 같은 차액이어도 비율은 달라집니다." }, { question: "판매가보다 매입가가 높으면 어떻게 되나요?", answer: "마진 금액과 마진율이 음수로 표시되어 손실 크기를 확인할 수 있습니다." }],
  }),
  createCalculatorPage({
    slug: "markup", name: "마크업률 계산기", shortName: "마크업률", category: "finance", description: "원가에 대한 판매가의 차액 비율인 마크업률을 계산하고 마진율과 비교합니다.", title: "마크업률 계산기: 원가 대비 판매가 비율", keywords: ["마크업률 계산기", "원가 대비 마크업", "마진율 차이"], relatedCalculatorIds: ["margin", "unit-price", "discount"],
    fields: [amount("cost", "원가 (원)", { step: 1 }), amount("sale", "판매가 (원)", { step: 1 })], calculate: calculateMarkup,
    howTo: "0보다 큰 원가와 판매가를 입력하면 차액과 원가 기준 마크업률을 계산합니다.", formula: "마크업 금액 = 판매가 − 원가 · 마크업률(%) = 마크업 금액 ÷ 원가 × 100", example: { question: "원가 60원에서 판매가 100원으로 정하면?", answer: "마크업은 40원, 마크업률은 약 66.67%입니다." },
    notes: ["수수료, 세금, 인건비 등 다른 비용은 포함하지 않습니다."], faqs: [{ question: "마크업률 50%면 마진율도 50%인가요?", answer: "아닙니다. 원가 100원에 50% 마크업을 더한 판매가는 150원이고 마진율은 50÷150, 약 33.33%입니다." }, { question: "원가가 0원일 수 있나요?", answer: "원가가 분모이므로 마크업률을 계산하려면 0보다 커야 합니다." }],
  }),
  createCalculatorPage({
    slug: "product-margin", name: "판매 수익·목표 마진 계산기", shortName: "판매 수익", category: "finance", description: "판매가와 수수료, 배송비, 기타 비용을 반영해 예상 순이익과 실질 마진율을 계산하거나 목표 마진율에 필요한 판매가를 구합니다.", title: "판매 수익 계산기: 수수료·배송비 반영 순이익과 목표 판매가", keywords: ["판매 수익 계산기", "상품 마진 계산기", "목표 마진 판매가", "수수료 포함 순이익"], relatedCalculatorIds: ["margin", "markup", "unit-price"],
    fields: [select("mode", "계산 방식", [{ label: "판매 수익 계산", value: "profit" }, { label: "목표 마진 판매가 계산", value: "target" }]), amount("cost", "상품 원가 (원)"), { ...amount("sale", "판매가 (원)"), showWhen: { field: "mode", value: "profit" } }, { name: "feeRate", label: "판매 수수료율 (%)", type: "number", min: 0, step: 0.1, defaultValue: "0" }, amount("shipping", "배송비 (원)", { defaultValue: "0" }), amount("otherCost", "기타 비용 (원)", { defaultValue: "0" }), { name: "targetMargin", label: "목표 마진율 (%)", type: "number", min: 0, step: 0.1, defaultValue: "30", showWhen: { field: "mode", value: "target" } }], calculate: calculateProductMargin,
    howTo: "판매 수익 계산에서는 판매가와 원가, 판매 수수료율, 배송비와 기타 비용을 입력합니다. 목표 마진 판매가 계산에서는 목표 마진율을 입력하면 필요한 판매가를 구합니다.", formula: "순이익 = 판매가 − 원가 − (판매가 × 수수료율) − 배송비 − 기타 비용 · 실질 마진율(%) = 순이익 ÷ 판매가 × 100 · 목표 판매가 = (원가 + 배송비 + 기타 비용) ÷ (1 − 수수료율 − 목표 마진율)", example: { question: "원가 10,000원, 판매가 20,000원, 수수료율 10%, 배송비 3,000원이면?", answer: "예상 순이익은 5,000원이며 실질 마진율은 25%입니다." },
    notes: ["입력한 비용만 반영하는 단순 추정치입니다. 광고비, 세금, 반품 등 입력하지 않은 비용은 포함하지 않습니다."], faqs: [{ question: "마진율과 마크업률은 같은가요?", answer: "아닙니다. 마진율은 판매가를 기준으로 하고 마크업률은 원가를 기준으로 차액의 비율을 계산합니다." }, { question: "필요한 판매가에는 어떤 비용이 반영되나요?", answer: "상품 원가, 입력한 수수료율, 배송비와 기타 비용을 반영합니다. 입력하지 않은 비용은 포함되지 않습니다." }],
  }),
  createCalculatorPage({
    slug: "withholding-tax-3-3", name: "3.3% 원천징수 계산기", shortName: "3.3% 원천징수", category: "tax", description: "사업소득 지급액을 기준으로 소득세 3%와 지방소득세 0.3%, 예상 실수령액을 계산하는 참고용 도구입니다.", title: "3.3% 원천징수 계산기: 사업소득 세금과 실수령액", keywords: ["3.3 원천징수 계산기", "프리랜서 세금 계산", "사업소득 실수령액", "원천징수 계산"], relatedCalculatorIds: ["vat", "margin", "product-margin"],
    fields: [amount("amount", "지급액 (원)", { step: 1 })], calculate: calculateWithholdingTax33,
    howTo: "사업소득 지급액을 입력하면 소득세 3%, 지방소득세 0.3%와 단순 계산한 예상 실수령액을 확인할 수 있습니다.", formula: "소득세 = 지급액 × 3% (원 미만 버림) · 지방소득세 = 지급액 × 0.3% (원 미만 버림) · 예상 실수령액 = 지급액 − 두 세액의 합", example: { question: "지급액이 1,000,000원이면?", answer: "소득세 30,000원, 지방소득세 3,000원, 예상 실수령액은 967,000원입니다." },
    notes: ["사업소득 3.3%를 가정한 단순 참고 계산입니다. 개인별 공제, 신고 및 최종 세액은 반영하지 않습니다."], faqs: [{ question: "모든 프리랜서 지급에 3.3%가 적용되나요?", answer: "지급의 성격과 개인 상황에 따라 달라질 수 있습니다. 이 계산기는 사업소득 3.3%를 가정한 참고용입니다." }, { question: "세액은 어떻게 원 단위로 처리하나요?", answer: "소득세와 지방소득세를 각각 계산한 뒤 원 미만을 버리는 방식으로 추정합니다." }],
  }),
];

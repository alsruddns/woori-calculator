import { createCalculatorPage } from "@/data/calculator-content/create-page";
import { calculateCompoundInterest, calculateDepositInterest, calculateDsr, calculateDti, calculateLoanInterest, calculateLtv, calculateSavingsInterest, calculateSimpleInterest, calculateStockAveragePrice } from "@/calculators/finance/calculate";
import type { CalculatorPageDefinition } from "@/types/calculator-page";

const amount = (name: string, label: string, extra: object = {}) => ({ name, label, type: "number" as const, min: 0, step: 10000, ...extra });
const months = (name: string, label: string, min = 1) => ({ name, label, type: "number" as const, min, step: 1 });
const select = (name: string, label: string, options: readonly { label: string; value: string }[], defaultValue = options[0]?.value) => ({ name, label, type: "select" as const, options, defaultValue });

export const financeCalculatorPages: readonly CalculatorPageDefinition[] = [
  createCalculatorPage({
    slug: "compound-interest", name: "복리 계산기", shortName: "복리", category: "finance", description: "원금과 연이율, 기간, 복리 주기로 세전 예상 최종 금액과 이자를 계산합니다.", title: "복리 계산기: 복리 주기별 최종 금액과 이자", keywords: ["복리 계산기", "복리 이자 계산", "복리 계산 공식"], relatedCalculatorIds: ["simple-interest", "deposit-interest", "savings-interest", "cagr"],
    fields: [amount("principal", "원금"), { name: "rate", label: "연이율 (%)", type: "number", min: 0, step: 0.01 }, { name: "years", label: "기간 (년)", type: "number", min: 0, step: 0.1 }, select("frequency", "복리 적용 횟수", [{ label: "연 1회", value: "1" }, { label: "연 2회", value: "2" }, { label: "연 4회", value: "4" }, { label: "연 12회 (월 복리)", value: "12" }, { label: "연 365회 (일 복리)", value: "365" }], "12")], calculate: calculateCompoundInterest,
    howTo: "원금, 연이율, 투자 기간과 이자가 원금에 합산되는 횟수를 선택하세요. 정기 추가 납입은 계산에 포함하지 않습니다.", formula: "최종 금액 = 원금 × (1 + 연이율 ÷ 복리 횟수)^(복리 횟수 × 연수)", example: { question: "100만 원을 연 12%, 월 복리로 1년 예치하면?", answer: "세전 최종 금액은 약 1,126,825원, 이자는 약 126,825원입니다." },
    notes: ["세금, 수수료, 변동 금리와 상품별 계산 방식은 포함하지 않은 이론상 결과입니다."], faqs: [{ question: "복리 주기가 짧으면 결과가 달라지나요?", answer: "같은 명목 연이율에서 이자를 더 자주 원금에 합산하면 계산상 최종 금액이 조금 커집니다." }, { question: "세후 이자도 계산하나요?", answer: "현재 결과는 세전 기준입니다. 세금은 상품과 적용 요건에 따라 다를 수 있어 포함하지 않습니다." }],
  }),
  createCalculatorPage({
    slug: "simple-interest", name: "단리 계산기", shortName: "단리", category: "finance", description: "원금에 대해서만 이자가 붙는 단리 방식의 이자와 원리금을 계산합니다.", title: "단리 계산기: 원금과 기간별 이자 계산", keywords: ["단리 계산기", "단리 이자", "단리 공식"], relatedCalculatorIds: ["compound-interest", "deposit-interest", "savings-interest"],
    fields: [amount("principal", "원금"), { name: "rate", label: "연이율 (%)", type: "number", min: 0, step: 0.01 }, { name: "years", label: "기간 (년)", type: "number", min: 0, step: 0.1 }], calculate: calculateSimpleInterest,
    howTo: "원금, 연이율과 기간을 입력하면 원금에 비례하는 단리 이자를 계산합니다.", formula: "이자 = 원금 × 연이율 × 기간 · 원리금 = 원금 + 이자", example: { question: "100만 원을 연 5%로 2년간 단리 운용하면?", answer: "이자는 100,000원이고 원리금은 1,100,000원입니다." },
    faqs: [{ question: "단리와 복리의 차이는 무엇인가요?", answer: "단리는 처음 원금에 대해서만 이자를 계산하고, 복리는 이전 기간의 이자까지 원금에 합산해 다음 이자를 계산합니다." }, { question: "기간을 6개월로 계산할 수 있나요?", answer: "기간 입력에 0.5년처럼 소수 연수를 넣으면 계산할 수 있습니다." }],
  }),
  createCalculatorPage({
    slug: "savings-interest", name: "적금 이자 계산기", shortName: "적금 이자", category: "finance", description: "매월 같은 금액을 납입할 때 세전 원금과 예상 이자, 만기 금액을 계산합니다.", title: "적금 이자 계산기: 월 납입액과 세전 만기액", keywords: ["적금 이자 계산기", "적금 만기 금액", "월 적금 계산"], relatedCalculatorIds: ["deposit-interest", "compound-interest", "simple-interest"],
    fields: [amount("monthly", "월 납입액"), { name: "rate", label: "연이율 (%)", type: "number", min: 0, step: 0.01 }, months("months", "납입 기간 (개월)")], calculate: calculateSavingsInterest,
    howTo: "매월 납입액, 연이율, 납입 개월 수를 입력하세요. 매월 말 납입을 가정하고 각 납입액의 남은 기간에 단리를 적용합니다.", formula: "납입 원금 = 월 납입액 × 개월 수 · 회차별 이자 = 월 납입액 × 연이율 × 남은 개월 ÷ 12", example: { question: "월 10만 원씩 연 12%로 12개월 적립하면?", answer: "납입 원금은 1,200,000원, 단순 세전 이자는 약 66,000원입니다." },
    notes: ["예상 이자는 세전이며, 실제 금융상품의 일수 계산·세금·우대금리와 다를 수 있습니다."], faqs: [{ question: "왜 복리 적금과 결과가 다를 수 있나요?", answer: "상품의 이자 계산, 납입일과 만기일에 따라 실제 이자가 달라집니다. 이 도구는 각 납입액에 남은 기간만큼 단리를 적용한 간단한 예상치입니다." }, { question: "세후 만기 금액인가요?", answer: "아닙니다. 세금은 상품과 가입 조건에 따라 달라질 수 있어 세전 금액을 표시합니다." }],
  }),
  createCalculatorPage({
    slug: "deposit-interest", name: "예금 이자 계산기", shortName: "예금 이자", category: "finance", description: "예치금과 연이율, 개월 수로 세전 단리 이자와 예상 만기 금액을 구합니다.", title: "예금 이자 계산기: 예치 기간별 세전 이자", keywords: ["예금 이자 계산기", "정기예금 만기", "예금 세전 이자"], relatedCalculatorIds: ["savings-interest", "simple-interest", "compound-interest"],
    fields: [amount("principal", "예치금"), { name: "rate", label: "연이율 (%)", type: "number", min: 0, step: 0.01 }, months("months", "예치 기간 (개월)", 0)], calculate: calculateDepositInterest,
    howTo: "예치금, 연이율과 예치 개월 수를 입력하세요. 연 단리를 적용한 세전 예상 금액입니다.", formula: "세전 이자 = 예치금 × 연이율 × 예치 개월 ÷ 12 · 만기 금액 = 예치금 + 이자", example: { question: "1,000만 원을 연 3.6%로 12개월 예치하면?", answer: "단순 세전 이자는 360,000원이며 예상 만기 금액은 10,360,000원입니다." },
    notes: ["실제 상품의 일수 산정, 복리, 세금, 우대 조건은 반영하지 않습니다."], faqs: [{ question: "세후 이자를 확인할 수 있나요?", answer: "현재는 세전 이자만 계산합니다. 세금은 가입 조건 등에 따라 달라질 수 있습니다." }, { question: "기간을 6개월로 입력해도 되나요?", answer: "개월 단위로 입력하므로 6개월 예치라면 6을 입력하면 됩니다." }],
  }),
  createCalculatorPage({
    slug: "loan-interest", name: "대출 상환 계산기", shortName: "대출 상환", category: "finance", description: "원리금균등·원금균등·만기일시 방식의 첫 납입액과 총 이자, 상환액을 비교합니다.", title: "대출 상환 계산기: 원리금균등·원금균등·만기일시", keywords: ["대출 상환 계산기", "대출 이자 계산", "월 상환액"], relatedCalculatorIds: ["ltv", "dti", "dsr", "simple-interest"],
    fields: [amount("principal", "대출 원금"), { name: "rate", label: "연이율 (%)", type: "number", min: 0, step: 0.01 }, months("months", "상환 기간 (개월)"), select("method", "상환 방식", [{ label: "원리금균등", value: "equal-payment" }, { label: "원금균등", value: "equal-principal" }, { label: "만기일시", value: "bullet" }])], calculate: calculateLoanInterest,
    howTo: "대출 원금, 연이율, 전체 개월 수와 상환 방식을 선택하세요. 월 이율은 연이율을 12로 나누어 적용하고 매월 이자를 원 단위로 반올림합니다.", formula: "원리금균등 월 납입액 = P × r ÷ (1 − (1+r)^−n) · 원금균등 원금 = P ÷ n · 월 이자 = 잔액 × r", example: { question: "1,200만 원을 무이자로 12개월 원리금균등 상환하면?", answer: "매월 약 1,000,000원씩 상환하며 총 이자는 0원입니다." },
    notes: ["추정 결과이며 실제 금융기관의 납입일, 금리 변동, 수수료, 상환 규칙에 따라 달라집니다."], faqs: [{ question: "원리금균등과 원금균등의 차이는 무엇인가요?", answer: "원리금균등은 납입액을 비슷하게 유지하고, 원금균등은 원금을 일정하게 갚아 초기에 더 많이 납입합니다." }, { question: "만기일시 상환은 무엇인가요?", answer: "기간 중 이자를 납부하고 만기에 원금을 한 번에 갚는 방식으로 계산합니다." }],
  }),
  createCalculatorPage({
    slug: "ltv", name: "LTV 계산기", shortName: "LTV", category: "finance", description: "주택 가격 대비 대출 금액의 비율인 LTV를 계산합니다.", title: "LTV 계산기: 주택 가격 대비 대출 비율", keywords: ["LTV 계산기", "담보인정비율", "주택 대출 비율"], relatedCalculatorIds: ["loan-interest", "dti", "dsr"],
    fields: [amount("homePrice", "주택 가격"), amount("loan", "대출 금액")], calculate: calculateLtv,
    howTo: "주택 가격과 계산하려는 대출 금액을 입력하세요. 규제 한도나 대출 가능 여부가 아닌 단순 비율을 계산합니다.", formula: "LTV(%) = 대출 금액 ÷ 주택 가격 × 100", example: { question: "주택 가격 5억 원, 대출 2억 원이면?", answer: "LTV는 40%입니다." },
    notes: ["담보 평가액과 적용 규제, 차주 조건에 따른 실제 심사 결과를 대신하지 않습니다."], faqs: [{ question: "LTV가 높으면 대출이 승인되나요?", answer: "아닙니다. 이 계산기는 비율만 구하며 실제 한도와 승인 여부는 금융기관 심사와 적용 규제에 따라 달라집니다." }, { question: "주택 가격은 어떤 값을 넣나요?", answer: "비율을 확인하려는 기준 주택 가격을 직접 입력하세요." }],
  }),
  createCalculatorPage({
    slug: "dti", name: "DTI 계산기", shortName: "DTI", category: "finance", description: "연간 소득과 주택담보대출 원리금, 기타 대출 이자로 기본 DTI 비율을 구합니다.", title: "DTI 계산기: 소득 대비 대출 상환 비율", keywords: ["DTI 계산기", "총부채상환비율", "주택 대출 DTI"], relatedCalculatorIds: ["loan-interest", "ltv", "dsr"],
    fields: [amount("income", "연간 소득"), amount("mortgage", "주택담보대출 연간 원리금"), amount("otherInterest", "기타 대출 연간 이자")], calculate: calculateDti,
    howTo: "연간 소득과 주택담보대출의 연간 원리금, 기타 대출의 연간 이자를 같은 통화 단위로 입력하세요.", formula: "기본 DTI(%) = (주택담보대출 연간 원리금 + 기타 대출 연간 이자) ÷ 연간 소득 × 100", example: { question: "연소득 5,000만 원, 주담대 원리금 1,000만 원, 기타 이자 100만 원이면?", answer: "단순 산식 기준 DTI는 22%입니다." },
    notes: ["금융기관과 규정별 실제 DTI 산정·소득 인정·부채 반영 방식은 다를 수 있습니다. 대출 가능 여부를 판정하지 않습니다."], faqs: [{ question: "DTI가 DSR과 어떻게 다른가요?", answer: "이 페이지의 단순 DTI는 주택담보대출 원리금과 기타 대출 이자를 입력해 계산하고, 기본 DSR은 전체 대출의 연간 원리금을 사용합니다." }, { question: "한도가 자동으로 계산되나요?", answer: "아닙니다. 사용자가 입력한 금액의 비율만 계산하며 규제 한도는 적용하지 않습니다." }],
  }),
  createCalculatorPage({
    slug: "dsr", name: "DSR 계산기", shortName: "DSR", category: "finance", description: "연소득 대비 전체 대출의 연간 원리금 상환액 비율을 계산합니다.", title: "DSR 계산기: 연소득 대비 연간 상환액", keywords: ["DSR 계산기", "총부채원리금상환비율", "대출 DSR 계산"], relatedCalculatorIds: ["loan-interest", "ltv", "dti"],
    fields: [amount("income", "연소득"), amount("repayment", "연간 전체 대출 원리금 상환액")], calculate: calculateDsr,
    howTo: "연소득과 모든 대출의 연간 원금·이자 상환액 합계를 입력하세요. 두 값은 같은 통화 단위를 사용해야 합니다.", formula: "기본 DSR(%) = 연간 전체 대출 원리금 상환액 ÷ 연소득 × 100", example: { question: "연소득 5,000만 원, 연간 원리금 1,000만 원이면?", answer: "단순 산식 기준 DSR은 20%입니다." },
    notes: ["금융기관별 산정 방식, 만기 환산, 스트레스 DSR 등 규제는 반영하지 않습니다. 대출 가능 여부를 판정하지 않습니다."], faqs: [{ question: "스트레스 DSR도 계산하나요?", answer: "아닙니다. 입력한 연간 상환액으로 기본 비율만 계산하고 규제 가산금리는 적용하지 않습니다." }, { question: "대출 한도를 알 수 있나요?", answer: "이 계산기는 비율 안내용이며 금융기관의 한도 심사와 승인 결과를 대신하지 않습니다." }],
  }),
  createCalculatorPage({
    slug: "stock-average-price", name: "주식 물타기 계산기", shortName: "주식 물타기", category: "finance", description: "기존 보유 주식과 추가 매수 주식의 투자금액을 합산해 새로운 평균 매입단가와 변화율을 계산합니다.", title: "주식 물타기 계산기: 추가 매수 후 평단가 계산", keywords: ["주식 물타기 계산기", "주식 평단가 계산기", "주식 추가 매수 평균단가", "주식 평균 매입단가"], relatedCalculatorIds: ["cagr", "change-rate", "average"],
    fields: [
      { name: "existingQuantity", label: "기존 보유 수량 (주)", type: "number", min: 0, step: 0.000001 },
      { name: "existingAveragePrice", label: "기존 평균단가 (원)", type: "number", min: 0, step: 1 },
      { name: "additionalQuantity", label: "추가 매수 수량 (주)", type: "number", min: 0, step: 0.000001 },
      { name: "additionalPrice", label: "추가 매수가 (원)", type: "number", min: 0, step: 1 },
    ], calculate: calculateStockAveragePrice,
    howTo: "기존 보유 수량과 평균단가, 새로 매수할 수량과 매수가를 입력하세요. 기존 투자금액과 추가 투자금액을 더해 총 보유 수량으로 나눈 평단가를 계산합니다.",
    formula: "기존 투자금액 = 기존 수량 × 기존 평균단가 · 추가 투자금액 = 추가 수량 × 추가 매수가 · 새로운 평균단가 = (기존 투자금액 + 추가 투자금액) ÷ (기존 수량 + 추가 수량)",
    example: { question: "10주를 평균 10,000원에 보유 중이고, 10주를 8,000원에 더 사면 새 평단가는?", answer: "기존 투자금액은 100,000원, 추가 투자금액은 80,000원입니다. 총 20주와 투자금액 180,000원을 기준으로 새 평단가는 9,000원입니다." },
    notes: ["수수료, 세금, 환전 비용은 포함하지 않습니다.", "평균단가 변화율은 기존 평균단가 대비 새 평균단가의 변화 비율입니다."],
    faqs: [
      { question: "주식 물타기 후 평단가는 어떻게 계산하나요?", answer: "기존 투자금액과 추가 매수 금액을 합산한 뒤 총 보유 수량으로 나눕니다. 각 매수 가격이 다르므로 수량을 반영한 가중평균입니다." },
      { question: "추가 매수가가 기존 평단가보다 높아도 계산되나요?", answer: "네. 추가 매수가가 높으면 새 평단가가 올라가고, 낮으면 내려갑니다." },
      { question: "수수료와 세금도 반영되나요?", answer: "현재 계산은 입력한 수량과 가격만 사용하며 매매 수수료, 세금, 환전 비용은 포함하지 않습니다." },
    ],
  }),
];

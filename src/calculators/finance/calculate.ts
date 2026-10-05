import type { CalculatorFunction, CalculatorOutcome } from "@/types/calculator-page";
import { readNumber } from "@/lib/calculators/input";
import { minimumWage2026 } from "@/data/policies/minimum-wage/2026";

function read(input: Record<string, string>, keys: readonly [string, string][]): { error: string; field: string } | { values: Record<string, number> } {
  const result: Record<string, number> = {};
  for (const [key, label] of keys) {
    const value = readNumber(input, key);
    if (value === undefined) return { error: `${label}을(를) 올바르게 입력해 주세요.`, field: key };
    result[key] = value;
  }
  return { values: result };
}

const won = (label: string, value: number) => ({ label, value: Math.round(value), unit: "원" });
const percent = (label: string, value: number) => ({ label, value: Number(value.toFixed(2)), unit: "%" });

export const calculateCompoundInterest: CalculatorFunction = (input) => {
  const parsed = read(input, [["principal", "원금"], ["rate", "연이율"], ["years", "기간"]]);
  if ("error" in parsed) return parsed;
  const { principal, rate, years } = parsed.values;
  const frequency = Number(input.frequency ?? "12");
  if (principal < 0 || rate < 0 || years < 0 || ![1, 2, 4, 12, 365].includes(frequency)) return { error: "원금·이율·기간과 복리 주기를 확인해 주세요." };
  const total = principal * Math.pow(1 + rate / 100 / frequency, frequency * years);
  return { results: [won("최종 금액", total), won("총 이자", total - principal)], note: "세금과 수수료를 반영하지 않은 이론상 계산입니다. 추가 납입은 포함하지 않습니다." };
};

export const calculateSimpleInterest: CalculatorFunction = (input) => {
  const parsed = read(input, [["principal", "원금"], ["rate", "연이율"], ["years", "기간"]]);
  if ("error" in parsed) return parsed;
  const { principal, rate, years } = parsed.values;
  if (principal < 0 || rate < 0 || years < 0) return { error: "원금·이율·기간은 0 이상이어야 합니다." };
  const interest = principal * rate / 100 * years;
  return { results: [won("단리 이자", interest), won("원리금", principal + interest)], note: "이자는 원금에 대해서만 계산하며 세금과 수수료는 포함하지 않습니다." };
};

export const calculateDepositInterest: CalculatorFunction = (input) => {
  const parsed = read(input, [["principal", "예치금"], ["rate", "연이율"], ["months", "예치 기간"]]);
  if ("error" in parsed) return parsed;
  const { principal, rate, months } = parsed.values;
  if (principal < 0 || rate < 0 || months < 0) return { error: "예치금·이율·기간은 0 이상이어야 합니다." };
  const interest = principal * rate / 100 * months / 12;
  return { results: [won("세전 이자", interest), won("세전 만기 금액", principal + interest)], note: "연 단리 기준의 단순 예상치이며 실제 상품의 일수 계산·세금·우대금리는 반영하지 않습니다." };
};

export const calculateSavingsInterest: CalculatorFunction = (input) => {
  const parsed = read(input, [["monthly", "월 납입액"], ["rate", "연이율"], ["months", "납입 기간"]]);
  if ("error" in parsed) return parsed;
  const { monthly, rate, months } = parsed.values;
  if (monthly < 0 || rate < 0 || months < 1 || months > 1200 || !Number.isInteger(months)) return { error: "월 납입액과 이율은 0 이상, 납입 기간은 1~1,200개월의 정수로 입력해 주세요." };
  const principal = monthly * months;
  const interest = Array.from({ length: months }, (_, index) => monthly * (rate / 100) * (months - index - 1) / 12).reduce((sum, value) => sum + value, 0);
  return { results: [won("납입 원금", principal), won("예상 세전 이자", interest), won("세전 만기 금액", principal + interest)], note: "매월 말 납입하고, 각 납입액에 남은 기간만큼 연 단리를 적용한 단순 예상치입니다. 세금·우대금리·상품별 일수 계산은 제외합니다." };
};

export const calculateLoanInterest: CalculatorFunction = (input) => {
  const parsed = read(input, [["principal", "대출 원금"], ["rate", "연이율"], ["months", "상환 기간"]]);
  if ("error" in parsed) return parsed;
  const { principal, rate, months } = parsed.values;
  const method = input.method ?? "equal-payment";
  if (!["equal-payment", "equal-principal", "bullet"].includes(method)) return { error: "상환 방식을 선택해 주세요.", field: "method" };
  if (principal <= 0 || rate < 0 || months < 1 || !Number.isInteger(months) || months > 1200) return { error: "원금은 0보다 크게, 이율은 0 이상, 기간은 1~1,200개월로 입력해 주세요." };
  const monthlyRate = rate / 1200;
  const scheduledPayment = monthlyRate === 0 ? principal / months : principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -months));
  let balance = principal;
  let interestTotal = 0;
  let firstPayment = 0;
  let totalPayment = 0;
  const equalPrincipal = Math.round(principal / months);
  for (let month = 1; month <= months; month += 1) {
    const interest = Math.round(balance * monthlyRate);
    let principalPaid: number;
    if (method === "equal-principal") principalPaid = month === months ? balance : Math.min(balance, equalPrincipal);
    else if (method === "bullet") principalPaid = month === months ? balance : 0;
    else principalPaid = month === months ? balance : Math.min(balance, Math.max(0, Math.round(scheduledPayment) - interest));
    const payment = principalPaid + interest;
    if (month === 1) firstPayment = payment;
    balance = Math.max(0, balance - principalPaid);
    interestTotal += interest;
    totalPayment += payment;
  }
  const firstLabel = method === "bullet" ? (months === 1 ? "만기 상환액" : "월 이자 납입액") : "첫 회차 납입액";
  return { results: [{ label: firstLabel, value: firstPayment, unit: "원" }, won("총 이자", interestTotal), won("총 상환액", totalPayment)], note: "매월 이자를 원 단위로 반올림해 추정했습니다. 실제 금융기관의 상환일·수수료·금리 변동에 따라 달라질 수 있습니다." };
};

export const calculateLtv: CalculatorFunction = (input) => {
  const parsed = read(input, [["homePrice", "주택 가격"], ["loan", "대출 금액"]]);
  if ("error" in parsed) return parsed;
  const { homePrice, loan } = parsed.values;
  if (homePrice <= 0 || loan < 0) return { error: "주택 가격은 0보다 크고 대출 금액은 0 이상이어야 합니다." };
  return { results: [percent("LTV", loan / homePrice * 100)], note: "주택 가격 대비 대출 금액의 비율을 계산합니다. 실제 대출 가능 여부나 규제 한도를 판정하지 않습니다." };
};

export const calculateDti: CalculatorFunction = (input) => {
  const parsed = read(input, [["income", "연간 소득"], ["mortgage", "주택담보대출 연간 원리금"], ["otherInterest", "기타 대출 연간 이자"]]);
  if ("error" in parsed) return parsed;
  const { income, mortgage, otherInterest } = parsed.values;
  if (income <= 0 || mortgage < 0 || otherInterest < 0) return { error: "연간 소득은 0보다 크고 상환액은 0 이상이어야 합니다." };
  return { results: [percent("기본 DTI", (mortgage + otherInterest) / income * 100)], note: "입력한 주택담보대출 원리금과 기타 대출 이자만 단순 합산합니다. 실제 금융기관의 DTI 산정 및 규제와 다를 수 있습니다." };
};

export const calculateDsr: CalculatorFunction = (input) => {
  const parsed = read(input, [["income", "연소득"], ["repayment", "연간 전체 대출 원리금"]]);
  if ("error" in parsed) return parsed;
  const { income, repayment } = parsed.values;
  if (income <= 0 || repayment < 0) return { error: "연소득은 0보다 크고 연간 상환액은 0 이상이어야 합니다." };
  return { results: [percent("기본 DSR", repayment / income * 100)], note: "입력한 연간 대출 원리금 합계를 연소득으로 나눈 값입니다. 금융기관별 산정 방식이나 스트레스 DSR 등 규제 심사를 대신하지 않습니다." };
};

export const calculateMinimumWage: CalculatorFunction = (input) => {
  const wage = readNumber(input, "hourlyWage");
  if (wage === undefined || wage < 0) return { error: "비교할 시급을 0 이상으로 입력해 주세요.", field: "hourlyWage" };
  return { results: [won("2026년 법정 최저 시급", minimumWage2026.hourlyWon), won("입력 시급과 기준 차이", wage - minimumWage2026.hourlyWon), won("8시간 기준 일급", minimumWage2026.dailyWon), won("월 환산액 (209시간 기준)", minimumWage2026.monthlyWon)], note: "2026년 적용 기준 참고용 비교입니다. 근로시간·수당·적용 제외 등 개별 조건을 반영한 법률 판단이나 임금 체불 판정이 아닙니다." };
};

export const financeCalculators: Record<string, CalculatorFunction> = {
  "compound-interest": calculateCompoundInterest,
  "simple-interest": calculateSimpleInterest,
  "deposit-interest": calculateDepositInterest,
  "savings-interest": calculateSavingsInterest,
  "loan-interest": calculateLoanInterest,
  ltv: calculateLtv,
  dti: calculateDti,
  dsr: calculateDsr,
  "minimum-wage": calculateMinimumWage,
};

export function runFinanceCalculator(slug: string, input: Record<string, string>): CalculatorOutcome | undefined {
  return financeCalculators[slug]?.(input);
}

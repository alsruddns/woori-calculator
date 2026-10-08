import type { CalculatorFunction, CalculatorOutcome } from "@/types/calculator-page";
import { MAX_MONEY, MAX_QUANTITY, MAX_RATE, readNumber } from "@/lib/calculators/input";
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
  if (principal < 0 || rate < 0 || rate > 1000 || years < 0 || years > 200 || ![1, 2, 4, 12, 365].includes(frequency)) return { error: "원금은 0~1,000조 원, 연이율은 0~1,000%, 기간은 0~200년으로 입력해 주세요." };
  const total = principal * Math.pow(1 + rate / 100 / frequency, frequency * years);
  if (!Number.isFinite(total) || !Number.isFinite(total - principal)) return { error: "결과가 계산 범위를 벗어났습니다. 금리나 기간을 줄여 주세요." };
  const monthly = years * 12 <= 24;
  const periods = Math.min(200, Math.ceil(monthly ? years * 12 : years));
  const rows = Array.from({ length: periods }, (_, index) => { const elapsed = monthly ? Math.min(years, (index + 1) / 12) : Math.min(years, index + 1); const previousElapsed = monthly ? Math.min(years, index / 12) : Math.min(years, index); const end = principal * Math.pow(1 + rate / 100 / frequency, frequency * elapsed); const start = principal * Math.pow(1 + rate / 100 / frequency, frequency * previousElapsed); return [monthly ? Math.min(years * 12, index + 1) : elapsed, start, end - start, end - principal, end]; });
  return { results: [won("최종 금액", total), won("총 이자", total - principal)], note: "세금과 수수료를 반영하지 않은 이론상 계산입니다. 추가 납입은 포함하지 않습니다.", table: { title: "periodDetails", periodUnit: monthly ? "month" : "year", columns: ["period", "openingBalance", "periodInterest", "cumulativeInterest", "endingBalance"], rows } };
};

export const calculateSimpleInterest: CalculatorFunction = (input) => {
  const parsed = read(input, [["principal", "원금"], ["rate", "연이율"], ["years", "기간"]]);
  if ("error" in parsed) return parsed;
  const { principal, rate, years } = parsed.values;
  if (principal < 0 || rate < 0 || rate > 1000 || years < 0 || years > 200) return { error: "원금은 0~1,000조 원, 연이율은 0~1,000%, 기간은 0~200년으로 입력해 주세요." };
  const interest = principal * rate / 100 * years;
  if (!Number.isFinite(interest) || !Number.isFinite(principal + interest)) return { error: "결과가 계산 범위를 벗어났습니다. 입력 범위를 줄여 주세요." };
  const monthly = years * 12 <= 24;
  const periods = Math.min(200, Math.ceil(monthly ? years * 12 : years));
  const rows = Array.from({ length: periods }, (_, index) => { const elapsed = monthly ? Math.min(years, (index + 1) / 12) : Math.min(years, index + 1); const previous = monthly ? Math.min(years, index / 12) : Math.min(years, index); const cumulative = principal * rate / 100 * elapsed; return [monthly ? Math.min(years * 12, index + 1) : elapsed, principal, cumulative - principal * rate / 100 * previous, cumulative, principal + cumulative]; });
  return { results: [won("단리 이자", interest), won("원리금", principal + interest)], note: "이자는 원금에 대해서만 계산하며 세금과 수수료는 포함하지 않습니다.", table: { title: "periodDetails", periodUnit: monthly ? "month" : "year", columns: ["period", "openingBalance", "periodInterest", "cumulativeInterest", "endingBalance"], rows } };
};

export const calculateDepositInterest: CalculatorFunction = (input) => {
  const parsed = read(input, [["principal", "예치금"], ["rate", "연이율"], ["months", "예치 기간"]]);
  if ("error" in parsed) return parsed;
  const { principal, rate, months } = parsed.values;
  if (principal < 0 || rate < 0 || rate > 1000 || months < 0 || months > 2400) return { error: "예치금은 0~1,000조 원, 연이율은 0~1,000%, 기간은 0~2,400개월로 입력해 주세요." };
  const interest = principal * rate / 100 * months / 12;
  if (!Number.isFinite(interest) || !Number.isFinite(principal + interest)) return { error: "결과가 계산 범위를 벗어났습니다. 입력 범위를 줄여 주세요." };
  const monthly = months <= 24;
  const periods = Math.min(200, Math.ceil(monthly ? months : months / 12));
  const rows = Array.from({ length: periods }, (_, index) => { const elapsed = monthly ? Math.min(months, index + 1) : Math.min(months, (index + 1) * 12); const previous = index ? (monthly ? Math.min(months, index) : Math.min(months, index * 12)) : 0; const cumulative = principal * rate / 100 * elapsed / 12; const prior = principal * rate / 100 * previous / 12; return [monthly ? elapsed : elapsed / 12, principal, cumulative - prior, cumulative, principal + cumulative]; });
  return { results: [won("세전 이자", interest), won("세전 만기 금액", principal + interest)], note: "연 단리 기준의 단순 예상치이며 실제 상품의 일수 계산·세금·우대금리는 반영하지 않습니다.", table: { title: "periodDetails", periodUnit: monthly ? "month" : "year", columns: ["period", "openingBalance", "periodInterest", "cumulativeInterest", "endingBalance"], rows } };
};

export const calculateSavingsInterest: CalculatorFunction = (input) => {
  const parsed = read(input, [["monthly", "월 납입액"], ["rate", "연이율"], ["months", "납입 기간"]]);
  if ("error" in parsed) return parsed;
  const { monthly, rate, months } = parsed.values;
  if (monthly < 0 || rate < 0 || rate > 1000 || months < 1 || months > 2400 || !Number.isInteger(months)) return { error: "월 납입액은 0~1,000조 원, 연이율은 0~1,000%, 납입 기간은 1~2,400개월의 정수로 입력해 주세요." };
  const principal = monthly * months;
  const interest = monthly * (rate / 100) * months * (months - 1) / 24;
  if (!Number.isFinite(principal) || !Number.isFinite(interest) || !Number.isFinite(principal + interest)) return { error: "결과가 계산 범위를 벗어났습니다. 입력 범위를 줄여 주세요." };
  const yearly = months > 24;
  const periods = Math.min(200, Math.ceil(yearly ? months / 12 : months));
  const rows = Array.from({ length: periods }, (_, index) => { const month = yearly ? Math.min(months, (index + 1) * 12) : index + 1; const previousMonth = index ? (yearly ? Math.min(months, index * 12) : index) : 0; const paid = monthly * month; const accrued = monthly * (rate / 100) * month * (month - 1) / 24; const prior = monthly * (rate / 100) * previousMonth * (previousMonth - 1) / 24; return [yearly ? month / 12 : month, monthly, paid, accrued - prior, accrued, paid + accrued]; });
  return { results: [won("납입 원금", principal), won("예상 세전 이자", interest), won("세전 만기 금액", principal + interest)], note: "매월 말 납입하고, 각 납입액에 남은 기간만큼 연 단리를 적용한 단순 예상치입니다. 세금·우대금리·상품별 일수 계산은 제외합니다.", table: { title: "periodDetails", periodUnit: yearly ? "year" : "month", columns: ["period", "monthlyDeposit", "cumulativePrincipal", "periodInterest", "cumulativeInterest", "endingBalance"], rows } };
};

export const calculateLoanInterest: CalculatorFunction = (input) => {
  const parsed = read(input, [["principal", "대출 원금"], ["rate", "연이율"], ["months", "상환 기간"]]);
  if ("error" in parsed) return parsed;
  const { principal, rate, months } = parsed.values;
  const method = input.method ?? "equal-payment";
  if (!["equal-payment", "equal-principal", "bullet"].includes(method)) return { error: "상환 방식을 선택해 주세요.", field: "method" };
  if (principal <= 0 || rate < 0 || rate > 100 || months < 1 || !Number.isInteger(months) || months > 1200) return { error: "원금은 0~1,000조 원, 연이율은 0~100%, 기간은 1~1,200개월의 정수로 입력해 주세요." };
  const monthlyRate = rate / 1200;
  const scheduledPayment = monthlyRate === 0 ? principal / months : principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -months));
  if (!Number.isFinite(scheduledPayment)) return { error: "상환액을 계산할 수 없습니다. 입력 범위를 확인해 주세요." };
  let balance = principal;
  let interestTotal = 0;
  let firstPayment = 0;
  let totalPayment = 0;
  const rows: number[][] = [];
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
    rows.push([month, payment, principalPaid, interest, balance]);
  }
  const firstLabel = method === "bullet" ? (months === 1 ? "만기 상환액" : "월 이자 납입액") : "첫 회차 납입액";
  return { results: [{ label: firstLabel, value: firstPayment, unit: "원" }, won("총 이자", interestTotal), won("총 상환액", totalPayment)], note: "매월 이자를 원 단위로 반올림해 추정했습니다. 실제 금융기관의 상환일·수수료·금리 변동에 따라 달라질 수 있습니다.", table: { title: "repaymentSchedule", periodUnit: "month", columns: ["period", "payment", "principal", "interest", "remainingBalance"], rows } };
};

export const calculateLtv: CalculatorFunction = (input) => {
  const parsed = read(input, [["homePrice", "주택 가격"], ["loan", "대출 금액"]]);
  if ("error" in parsed) return parsed;
  const { homePrice, loan } = parsed.values;
  if (homePrice <= 0 || loan < 0 || loan > MAX_MONEY) return { error: "주택 가격은 0~1,000조 원, 대출 금액은 0~1,000조 원으로 입력해 주세요." };
  const ratio = loan / homePrice * 100;
  if (!Number.isFinite(ratio) || ratio > MAX_RATE) return { error: "LTV 결과는 100,000% 이하 범위에서 계산할 수 있습니다." };
  return { results: [percent("LTV", ratio)], note: "주택 가격 대비 대출 금액의 비율을 계산합니다. 실제 대출 가능 여부나 규제 한도를 판정하지 않습니다." };
};

export const calculateDti: CalculatorFunction = (input) => {
  const parsed = read(input, [["income", "연간 소득"], ["mortgage", "주택담보대출 연간 원리금"], ["otherInterest", "기타 대출 연간 이자"]]);
  if ("error" in parsed) return parsed;
  const { income, mortgage, otherInterest } = parsed.values;
  if (income <= 0 || mortgage < 0 || otherInterest < 0 || mortgage + otherInterest > MAX_MONEY) return { error: "연간 소득은 0~1,000조 원, 상환액 합계는 0~1,000조 원으로 입력해 주세요." };
  const ratio = (mortgage + otherInterest) / income * 100;
  if (!Number.isFinite(ratio) || ratio > MAX_RATE) return { error: "DTI 결과는 100,000% 이하 범위에서 계산할 수 있습니다." };
  return { results: [percent("기본 DTI", ratio)], note: "입력한 주택담보대출 원리금과 기타 대출 이자만 단순 합산합니다. 실제 금융기관의 DTI 산정 및 규제와 다를 수 있습니다." };
};

export const calculateDsr: CalculatorFunction = (input) => {
  const parsed = read(input, [["income", "연소득"], ["repayment", "연간 전체 대출 원리금"]]);
  if ("error" in parsed) return parsed;
  const { income, repayment } = parsed.values;
  if (income <= 0 || repayment < 0) return { error: "연소득은 0~1,000조 원, 연간 상환액은 0~1,000조 원으로 입력해 주세요." };
  const ratio = repayment / income * 100;
  if (!Number.isFinite(ratio) || ratio > MAX_RATE) return { error: "DSR 결과는 100,000% 이하 범위에서 계산할 수 있습니다." };
  return { results: [percent("기본 DSR", ratio)], note: "입력한 연간 대출 원리금 합계를 연소득으로 나눈 값입니다. 금융기관별 산정 방식이나 스트레스 DSR 등 규제 심사를 대신하지 않습니다." };
};

export const calculateMinimumWage: CalculatorFunction = (input) => {
  const wage = readNumber(input, "hourlyWage");
  if (wage === undefined || wage < 0) return { error: "비교할 시급을 0 이상으로 입력해 주세요.", field: "hourlyWage" };
  return { results: [won("2026년 법정 최저 시급", minimumWage2026.hourlyWon), won("입력 시급과 기준 차이", wage - minimumWage2026.hourlyWon), won("8시간 기준 일급", minimumWage2026.dailyWon), won("월 환산액 (209시간 기준)", minimumWage2026.monthlyWon)], note: "2026년 적용 기준 참고용 비교입니다. 근로시간·수당·적용 제외 등 개별 조건을 반영한 법률 판단이나 임금 체불 판정이 아닙니다." };
};

export const calculateStockAveragePrice: CalculatorFunction = (input) => {
  const mode = input.mode ?? (input.existingQuantity !== undefined ? "manual" : "target");
  if (mode !== "target" && mode !== "manual") return { error: "계산 방식을 선택해 주세요.", field: "mode" };

  if (mode === "target") {
    const quantity = readNumber(input, "currentQuantity");
    const averagePrice = readNumber(input, "currentAveragePrice");
    const targetReturn = readNumber(input, "targetReturn");
    if (quantity === undefined || averagePrice === undefined || targetReturn === undefined) return { error: "보유 수량, 평균단가, 목표 손익률을 입력해 주세요." };
    if (quantity <= 0 || quantity > MAX_QUANTITY) return { error: "현재 보유 수량은 0보다 크고 10억 주 이하여야 합니다.", field: "currentQuantity" };
    if (averagePrice <= 0) return { error: "현재 평균단가는 0보다 커야 합니다.", field: "currentAveragePrice" };
    if (targetReturn <= -100 || Math.abs(targetReturn) > MAX_RATE) return { error: "목표 손익률은 -100% 초과, 100,000% 이하 범위로 입력해 주세요.", field: "targetReturn" };

    const priceMode = input.priceMode ?? "price";
    if (priceMode !== "price" && priceMode !== "return") return { error: "현재 주가 입력 방식을 선택해 주세요.", field: "priceMode" };
    let currentPrice: number;
    let currentReturn: number;
    if (priceMode === "price") {
      const value = readNumber(input, "currentPrice");
      if (value === undefined) return { error: "현재 주가를 입력해 주세요.", field: "currentPrice" };
      currentPrice = value;
      currentReturn = (currentPrice - averagePrice) / averagePrice * 100;
    } else {
      const inputReturn = readNumber(input, "currentReturn");
      if (inputReturn === undefined) return { error: "현재 손익률을 입력해 주세요.", field: "currentReturn" };
      if (inputReturn <= -100 || Math.abs(inputReturn) > MAX_RATE) return { error: "현재 손익률은 -100% 초과, 100,000% 이하 범위로 입력해 주세요.", field: "currentReturn" };
      currentReturn = inputReturn;
      currentPrice = averagePrice * (1 + inputReturn / 100);
    }
    if (!Number.isFinite(currentPrice) || currentPrice <= 0) return { error: "현재 주가는 0보다 커야 합니다.", field: priceMode === "price" ? "currentPrice" : "currentReturn" };
    if (currentPrice * quantity > MAX_MONEY) return { error: "현재 보유 평가액은 1,000조 원 이하여야 합니다." };
    if (!Number.isFinite(currentReturn)) return { error: "현재 손익률을 계산할 수 없습니다." };
    if (targetReturn === currentReturn) {
      return { results: [{ label: "계산상 필요한 추가 매수수량", value: 0, unit: "주", precision: 2 }, { label: "정수 주식 기준 필요한 매수수량", value: 0, unit: "주" }], note: "목표 손익률이 현재 손익률과 같아 추가 매수가 필요하지 않습니다." };
    }
    if (targetReturn === 0 || (currentReturn < 0 && targetReturn > 0)) {
      return { error: "현재 가격으로 추가 매수하는 것만으로는 유한한 매수수량으로 해당 목표 손익률에 정확히 도달할 수 없습니다.", field: "targetReturn" };
    }
    if ((currentReturn < 0 && (targetReturn < currentReturn || targetReturn >= 0)) || (currentReturn > 0 && (targetReturn <= 0 || targetReturn >= currentReturn))) {
      return { error: "목표 손익률이 현재 상황에서 추가 매수로 맞출 수 있는 범위를 벗어났습니다.", field: "targetReturn" };
    }

    const targetAverage = currentPrice / (1 + targetReturn / 100);
    const denominator = targetAverage - currentPrice;
    const requiredQuantity = quantity * (averagePrice - targetAverage) / denominator;
    if (!Number.isFinite(requiredQuantity) || requiredQuantity <= 0 || !Number.isFinite(targetAverage) || denominator === 0) {
      return { error: "현재 가격으로 추가 매수하는 것만으로는 유한한 매수수량으로 해당 목표 손익률에 정확히 도달할 수 없습니다.", field: "targetReturn" };
    }

    const nearestInteger = Math.round(requiredQuantity);
    const isNumericallyInteger = nearestInteger > 0 && Math.abs(requiredQuantity - nearestInteger) < 1e-10 * Math.max(1, Math.abs(requiredQuantity));
    const wholeQuantity = isNumericallyInteger ? nearestInteger : Math.ceil(requiredQuantity);
    if (wholeQuantity > MAX_QUANTITY || wholeQuantity + quantity > MAX_QUANTITY) return { error: "목표 수익률에 도달하려면 비현실적으로 큰 추가 매수가 필요합니다.", field: "targetReturn" };
    const addedInvestment = wholeQuantity * currentPrice;
    const totalQuantity = quantity + wholeQuantity;
    const totalInvestment = quantity * averagePrice + addedInvestment;
    if (totalInvestment > MAX_MONEY) return { error: "계산되는 총 투자금액이 1,000조 원을 초과합니다.", field: "targetReturn" };
    const newAverage = totalInvestment / totalQuantity;
    const actualReturn = (currentPrice / newAverage - 1) * 100;
    const values = [requiredQuantity, addedInvestment, totalQuantity, totalInvestment, newAverage, actualReturn];
    if (!values.every(Number.isFinite)) return { error: "입력값이 너무 커서 결과를 계산할 수 없습니다." };
    return { results: [
      { label: "계산상 필요한 추가 매수수량", value: Number(requiredQuantity.toFixed(2)), unit: "주", precision: 2 },
      { label: "정수 주식 기준 필요한 매수수량", value: wholeQuantity, unit: "주" },
      { label: "정수 수량 기준 추가 투자금액", value: Math.round(addedInvestment), unit: "원" },
      { label: "물타기 후 총 보유수량", value: Number(totalQuantity.toFixed(6)), unit: "주", precision: 6 },
      { label: "물타기 후 새로운 평균단가", value: Number(newAverage.toFixed(2)), unit: "원", precision: 2 },
      { label: "정수 수량 매수 후 실제 예상 손익률", value: Number(actualReturn.toFixed(2)), unit: "%", precision: 2 },
    ], note: "정수 매수수량은 계산상 필요수량을 올림해 산정합니다. 수수료, 세금, 환전 비용은 포함하지 않습니다." };
  }

  const existingQuantity = readNumber(input, "existingQuantity");
  const existingAveragePrice = readNumber(input, "existingAveragePrice");
  const additionalQuantity = readNumber(input, "additionalQuantity");
  const additionalPrice = readNumber(input, "additionalPrice");
  if (existingQuantity === undefined || existingAveragePrice === undefined || additionalQuantity === undefined || additionalPrice === undefined) return { error: "네 항목을 모두 입력해 주세요." };
  if (existingQuantity > MAX_QUANTITY || additionalQuantity > MAX_QUANTITY || [existingQuantity, existingAveragePrice, additionalQuantity, additionalPrice].some((value) => value < 0)) return { error: "수량은 각각 0~10억 주, 매수가는 0~1,000조 원으로 입력해 주세요." };
  const totalQuantity = existingQuantity + additionalQuantity;
  if (totalQuantity <= 0 || totalQuantity > MAX_QUANTITY) return { error: "총 보유 수량은 0보다 크고 10억 주 이하여야 합니다." };
  if (existingQuantity > 0 && existingAveragePrice <= 0) return { error: "평균단가 변화율을 계산하려면 기존 평균단가가 0보다 커야 합니다.", field: "existingAveragePrice" };
  const existingInvestment = existingQuantity * existingAveragePrice;
  const additionalInvestment = additionalQuantity * additionalPrice;
  const totalInvestment = existingInvestment + additionalInvestment;
  if (totalInvestment > MAX_MONEY) return { error: "총 투자금액은 1,000조 원 이하여야 합니다." };
  const average = totalInvestment / totalQuantity;
  const change = existingQuantity > 0 ? average - existingAveragePrice : 0;
  const changePercent = existingQuantity > 0 ? change / existingAveragePrice * 100 : 0;
  if (![existingInvestment, additionalInvestment, totalInvestment, average, change, changePercent].every(Number.isFinite)) return { error: "입력값이 너무 커서 결과를 계산할 수 없습니다." };
  return { results: [
    { label: "기존 투자금액", value: Math.round(existingInvestment), unit: "원" },
    { label: "추가 투자금액", value: Math.round(additionalInvestment), unit: "원" },
    { label: "총 보유 수량", value: Number(totalQuantity.toFixed(6)), unit: "주", precision: 6 },
    { label: "총 투자금액", value: Math.round(totalInvestment), unit: "원" },
    { label: "새로운 평균단가", value: Number(average.toFixed(2)), unit: "원", precision: 2 },
    { label: "평균단가 변화액", value: Number(change.toFixed(2)), unit: "원", precision: 2 },
    { label: "평균단가 변화율", value: Number(changePercent.toFixed(2)), unit: "%", precision: 2 },
  ], note: "수수료, 세금, 환전 비용은 포함하지 않습니다. 평균단가 변화액과 변화율은 기존 평균단가를 기준으로 계산합니다." };
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
  "stock-average-price": calculateStockAveragePrice,
};

export function runFinanceCalculator(slug: string, input: Record<string, string>): CalculatorOutcome | undefined {
  return financeCalculators[slug]?.(input);
}

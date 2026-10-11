import type { CalculatorFunction, CalculatorOutcome } from "@/types/calculator-page";

function n(input: Record<string, string>, key: string): number | undefined {
  const raw = input[key]?.replace(/,/g, "").trim();
  if (!raw) return undefined;
  const value = Number(raw);
  return Number.isFinite(value) ? value : undefined;
}
function values(input: Record<string, string>, keys: readonly string[]): number[] | undefined {
  const result = keys.map((key) => n(input, key));
  return result.some((value) => value === undefined) ? undefined : result as number[];
}
const money = (label: string, value: number) => ({ label, value: Math.round(value), unit: "원" });
const error: CalculatorOutcome = { error: "모든 입력을 유효한 숫자로 입력해 주세요." };

export const calculateSalaryConversion: CalculatorFunction = (input) => {
  const amount = n(input, "amount");
  if (amount === undefined || amount < 0 || amount > 1_000_000_000) return error;
  const annual = input.mode === "monthly" ? amount * 12 : amount;
  const monthly = annual / 12;
  return { results: [money("월 환산 급여", monthly), money("연 환산 급여", annual)], note: "12개월 기준 단순 환산이며 상여금, 세금, 보험료는 반영하지 않습니다." };
};

export const calculateHourlyWage: CalculatorFunction = (input) => {
  const pay = n(input, "pay"), hours = n(input, "monthlyHours");
  if (pay === undefined || hours === undefined || pay < 0 || pay > 1_000_000_000 || hours <= 0 || hours > 1000) return error;
  if (input.mode === "monthly-to-hourly") return { results: [{ label: "단순 환산 시급", value: Number((pay / hours).toFixed(2)), unit: "원/시간", precision: 2 }] };
  if (input.mode === "annual-to-hourly") return { results: [{ label: "단순 환산 시급", value: Number((pay / (hours * 12)).toFixed(2)), unit: "원/시간", precision: 2 }] };
  if (input.mode === "hourly-to-monthly") return { results: [money("월 환산 급여", pay * hours), money("연 환산 급여", pay * hours * 12)] };
  return error;
};

export const calculateAnnualLeaveAllowance: CalculatorFunction = (input) => {
  const dailyWage = n(input, "dailyWage"), days = n(input, "days");
  if (dailyWage === undefined || days === undefined || dailyWage < 0 || dailyWage > 100_000_000 || days < 0 || days > 500) return error;
  return { results: [money("입력한 1일 통상임금", dailyWage), { label: "미사용 일수", value: days, unit: "일" }, money("산술상 예상액", dailyWage * days)], note: "입력한 1일 통상임금과 일수를 곱한 산술 예시입니다. 연차 발생·사용촉진·수당 지급 여부 등 법적 요건은 판단하지 않습니다." };
};

export const calculateDividend: CalculatorFunction = (input) => {
  const v = values(input, ["shares", "perShare", "payments", "price"]);
  if (!v) return error;
  const [shares, perShare, payments, price] = v;
  if (shares < 0 || shares > 100_000_000 || perShare < 0 || perShare > 1_000_000_000 || payments < 1 || payments > 365 || !Number.isInteger(payments) || price < 0 || price > 1_000_000_000) return error;
  const annual = shares * perShare * payments;
  if (!Number.isFinite(annual) || annual > Number.MAX_SAFE_INTEGER) return error;
  return { results: [money("1회 예상 배당금", shares * perShare), money("연간 세전 배당금", annual), { label: "입력 주가 기준 배당수익률", value: price > 0 ? Number((perShare * payments / price * 100).toFixed(2)) : 0, unit: "%" }], note: "입력한 주당 배당금과 연간 지급 횟수를 사용한 세전 단순 추정입니다. 세금과 배당 변동은 반영하지 않습니다." };
};

export const calculateProfitLoss: CalculatorFunction = (input) => {
  const v = values(input, ["buy", "sell", "quantity", "buyCost", "sellCost"]);
  if (!v) return error;
  const [buy, sell, quantity, buyCost, sellCost] = v;
  if (buy <= 0 || sell < 0 || quantity <= 0 || quantity > 1_000_000_000 || [buy, sell, buyCost, sellCost].some((x) => x > 1_000_000_000_000) || buyCost < 0 || sellCost < 0) return error;
  const invested = buy * quantity + buyCost;
  const proceeds = sell * quantity - sellCost;
  if (!Number.isFinite(invested) || invested <= 0 || !Number.isFinite(proceeds)) return error;
  const profit = proceeds - invested;
  return { results: [money("매수 총액", invested), money("매도·평가 순액", proceeds), money("손익", profit), { label: "손익률", value: Number((profit / invested * 100).toFixed(2)), unit: "%" }, money("손익분기 가격(매도비용 포함)", (invested + sellCost) / quantity)] };
};

export const calculateRefinance: CalculatorFunction = (input) => {
  const v = values(input, ["balance", "oldRate", "oldMonths", "newRate", "newMonths", "fees"]);
  if (!v) return error;
  const [balance, oldRate, oldMonths, newRate, newMonths, fees] = v;
  if (balance <= 0 || balance > 1_000_000_000_000 || oldRate < 0 || oldRate > 100 || newRate < 0 || newRate > 100 || oldMonths < 1 || oldMonths > 1200 || newMonths < 1 || newMonths > 1200 || !Number.isInteger(oldMonths) || !Number.isInteger(newMonths) || fees < 0 || fees > 1_000_000_000) return error;
  const repayment = (rate: number, months: number) => {
    const r = rate / 1200;
    const p = r === 0 ? balance / months : balance * r / (1 - (1 + r) ** -months);
    return { monthlyPayment: p, totalPayment: p * months };
  };
  const oldLoan = repayment(oldRate, oldMonths), newLoan = repayment(newRate, newMonths);
  const interestDifference = (oldLoan.totalPayment - balance) - (newLoan.totalPayment - balance);
  const netSavings = interestDifference - fees;
  const monthlyPaymentDifference = oldLoan.monthlyPayment - newLoan.monthlyPayment;
  const breakEvenMonths = netSavings > 0 && monthlyPaymentDifference > 0 ? Math.ceil(fees / monthlyPaymentDifference) : undefined;
  return { results: [money("기존 대출 잔여 총이자", oldLoan.totalPayment - balance), money("신규 대출 예상 총이자", newLoan.totalPayment - balance), money("전환 비용", fees), money("비용 반영 예상 절감액", netSavings), { label: "월 납입액 차이(기존 − 신규)", value: Math.round(monthlyPaymentDifference), unit: "원" }, { label: "월 납입액 기준 손익분기", value: breakEvenMonths ?? "산출 불가", ...(breakEvenMonths ? { unit: "개월" } : {}) }], note: "두 대출 모두 원리금균등 상환과 고정금리를 가정합니다. 손익분기는 신규 월 납입액이 낮고 절감액이 양수일 때 전환 비용을 월 납입 차이로 나눈 값입니다. 실제 약정과 상품 수수료는 반영되지 않습니다." };
};

export const calculatePrepaymentFee: CalculatorFunction = (input) => {
  const v = values(input, ["amount", "rate"]);
  if (!v) return error;
  const [amount, rate] = v;
  if (amount < 0 || amount > 1_000_000_000_000 || rate < 0 || rate > 100) return error;
  return { results: [money("입력 수수료율 기준 예상 수수료", amount * rate / 100)], note: "상환금액에 사용자가 입력한 수수료율을 적용한 단순 계산입니다. 면제 조건과 상품별 산식은 대출 약정을 확인하세요." };
};

export const calculateAffordableLoan: CalculatorFunction = (input) => {
  const v = values(input, ["payment", "rate", "months"]);
  if (!v) return error;
  const [payment, rate, months] = v;
  if (payment < 0 || payment > 1_000_000_000 || rate < 0 || rate > 100 || months < 1 || months > 1200 || !Number.isInteger(months)) return error;
  const r = rate / 1200;
  const principal = r === 0 ? payment * months : payment * (1 - (1 + r) ** -months) / r;
  if (!Number.isFinite(principal) || principal > 1_000_000_000_000) return error;
  return { results: [money("월 납입액 기준 대출원금", principal), money("기간 전체 납입액", payment * months), money("계산상 총 이자", payment * months - principal)], note: "원리금균등 상환과 고정금리를 가정한 산술 추정입니다. 대출 가능액이나 승인 여부를 의미하지 않습니다." };
};

export const extendedFinance: Record<string, CalculatorFunction> = { "salary-conversion": calculateSalaryConversion, "hourly-wage": calculateHourlyWage, "annual-leave-allowance": calculateAnnualLeaveAllowance, dividend: calculateDividend, "profit-loss": calculateProfitLoss, "loan-refinance": calculateRefinance, "prepayment-fee": calculatePrepaymentFee, "loan-affordability": calculateAffordableLoan };

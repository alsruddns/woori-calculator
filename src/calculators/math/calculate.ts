import type { CalculatorFunction, CalculatorOutcome } from "@/types/calculator-page";
import { MAX_RATE, readNumber, result, splitNumbers } from "@/lib/calculators/input";

function values(input: Record<string, string>, names: Record<string, string>): { error: string; field: string } | { values: Record<string, number> } {
  const found: Record<string, number> = {};
  for (const [key, label] of Object.entries(names)) {
    const value = readNumber(input, key);
    if (value === undefined) return { error: `${label}을(를) 올바르게 입력해 주세요.`, field: key };
    found[key] = value;
  }
  return { values: found };
}

export const calculatePercentage: CalculatorFunction = (input) => {
  const mode = input.mode ?? "of";
  if (!["of", "what-percent", "increase", "decrease"].includes(mode)) return { error: "계산 방식을 선택해 주세요.", field: "mode" };
  const fields = values(input, { a: "A 값", b: "B 값" });
  if ("error" in fields) return fields;
  const { a, b } = fields.values;
  if (Math.abs(a) > Number.MAX_SAFE_INTEGER || Math.abs(b) > MAX_RATE) return { error: "A 값은 안전한 정수 범위, 비율은 ±100,000% 이내로 입력해 주세요." };
  if (mode === "of") {
    const value = a * b / 100;
    if (!Number.isFinite(value)) return { error: "계산 결과가 안전한 범위를 벗어났습니다." };
    return { results: [result("A의 B%", value)] };
  }
  if (mode === "what-percent") {
    if (b === 0) return { error: "기준이 되는 B 값은 0일 수 없습니다.", field: "b" };
    const value = a / b * 100;
    if (!Number.isFinite(value) || Math.abs(value) > MAX_RATE) return { error: "계산 비율은 ±100,000% 범위에서 입력해 주세요." };
    return { results: [result("A는 B의", value, "%")] };
  }
  const value = a * (1 + (mode === "increase" ? 1 : -1) * b / 100);
  if (!Number.isFinite(value)) return { error: "계산 결과가 안전한 범위를 벗어났습니다." };
  return { results: [result(mode === "increase" ? "증가 후 값" : "감소 후 값", value)] };
};

export const calculateDiscount: CalculatorFunction = (input) => {
  const mode = input.mode ?? "rate";
  if (mode !== "rate" && mode !== "actual") return { error: "계산 방식을 선택해 주세요.", field: "mode" };
  if (mode === "rate") {
    const parsed = values(input, { price: "정가", rate: "할인율" });
    if ("error" in parsed) return parsed;
    const { price, rate } = parsed.values;
    if (price < 0 || rate < 0 || rate > 100) return { error: "정가는 0~1,000조 원, 할인율은 0~100 사이로 입력해 주세요." };
    const discount = Math.round(price * rate / 100);
    return { results: [result("할인 금액", discount, "원", 0), result("최종 가격", price - discount, "원", 0)] };
  }
  const parsed = values(input, { price: "정가", sale: "판매가" });
  if ("error" in parsed) return parsed;
  const { price, sale } = parsed.values;
  if (price <= 0 || sale < 0 || sale > price) return { error: "정가는 0보다 커야 하고 판매가는 0~정가로 입력해 주세요." };
  return { results: [result("할인 금액", price - sale, "원", 0), result("실제 할인율", (price - sale) / price * 100, "%")] };
};

export const calculateChangeRate: CalculatorFunction = (input) => {
  const parsed = values(input, { old: "기존 값", current: "변경 값" });
  if ("error" in parsed) return parsed;
  const { old, current } = parsed.values;
  if (old < -MAX_RATE || old > MAX_RATE || current < -MAX_RATE || current > MAX_RATE) return { error: "기존 값과 변경 값은 ±100,000 이내로 입력해 주세요." };
  if (old === 0) return { error: "증감률을 구하려면 기존 값이 0이 아니어야 합니다.", field: "old" };
  const change = current - old;
  const rate = change / Math.abs(old) * 100;
  if (!Number.isFinite(rate) || Math.abs(rate) > MAX_RATE) return { error: "증감률은 ±100,000% 범위에서 계산할 수 있습니다." };
  return { results: [result(change >= 0 ? "증가량" : "감소량", Math.abs(change)), result(change >= 0 ? "증가율" : "감소율", rate, "%")] };
};

function gcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : gcd(b, a % b);
}

export const calculateRatio: CalculatorFunction = (input) => {
  const parsed = values(input, { a: "A", b: "B", known: "기준 값" });
  if ("error" in parsed) return parsed;
  const { a, b, known } = parsed.values;
  if (a === 0 || b === 0) return { error: "비율의 A와 B는 0이 아닌 값으로 입력해 주세요." };
  if (Math.abs(a) > MAX_RATE || Math.abs(b) > MAX_RATE) return { error: "비율 A와 B는 ±100,000 이내로 입력해 주세요." };
  const precision = 1_000_000;
  const scaledA = Math.round(Math.abs(a) * precision);
  const scaledB = Math.round(Math.abs(b) * precision);
  if (!Number.isSafeInteger(scaledA) || !Number.isSafeInteger(scaledB) || scaledA === 0 || scaledB === 0) {
    return { error: "비율 값은 6자리 이내의 소수이며 안전한 범위로 입력해 주세요." };
  }
  const divisor = gcd(scaledA, scaledB);
  const derived = known * b / a;
  if (!Number.isFinite(derived) || Math.abs(derived) > Number.MAX_SAFE_INTEGER) return { error: "계산 결과가 안전한 정수 범위를 벗어났습니다." };
  return { results: [result("단순화한 A", Math.round(a * precision) / divisor), result("단순화한 B", Math.round(b * precision) / divisor), result("기준 A일 때 B", derived)] };
};

export const calculateAverage: CalculatorFunction = (input) => {
  const numbers = splitNumbers(input.numbers ?? "");
  if (!numbers) return { error: "숫자 목록은 30,000자와 500개 항목 이내로 입력해 주세요.", field: "numbers" };
  const sum = numbers.reduce((total, value) => total + value, 0);
  if (!Number.isFinite(sum) || Math.abs(sum) > Number.MAX_SAFE_INTEGER) return { error: "합계가 안전한 계산 범위를 벗어났습니다.", field: "numbers" };
  return { results: [result("합계", sum), result("개수", numbers.length, "개", 0), result("평균", sum / numbers.length)] };
};

export const calculateWeightedAverage: CalculatorFunction = (input) => {
  const numbers = splitNumbers(input.values ?? "");
  const weights = splitNumbers(input.weights ?? "");
  if (!numbers || !weights) return { error: "값과 가중치 목록은 각각 30,000자와 500개 항목 이내로 입력해 주세요." };
  if (numbers.length !== weights.length) return { error: "값과 가중치의 개수가 같아야 합니다." };
  if (weights.some((weight) => weight < 0) || weights.reduce((sum, weight) => sum + weight, 0) === 0) return { error: "가중치는 0 이상이며 합계가 0보다 커야 합니다.", field: "weights" };
  const weightSum = weights.reduce((sum, weight) => sum + weight, 0);
  if (!Number.isFinite(weightSum) || weightSum === 0) return { error: "가중치 합계가 계산 범위를 벗어났습니다.", field: "weights" };
  const weightedSum = numbers.reduce((sum, value, index) => sum + value * weights[index]!, 0);
  const average = weightedSum / weightSum;
  if (!Number.isFinite(weightedSum) || !Number.isFinite(average)) return { error: "가중평균이 안전한 계산 범위를 벗어났습니다." };
  return { results: [result("가중평균", average)] };
};

export const calculateCagr: CalculatorFunction = (input) => {
  const parsed = values(input, { initial: "초기값", final: "최종값", years: "기간" });
  if ("error" in parsed) return parsed;
  const { initial, final, years } = parsed.values;
  if (initial <= 0 || final <= 0 || years <= 0 || years > 200) return { error: "초기값과 최종값은 0~1,000조, 기간은 0보다 크고 200년 이하여야 합니다." };
  const cagr = (Math.pow(final / initial, 1 / years) - 1) * 100;
  if (!Number.isFinite(cagr)) return { error: "CAGR 결과가 계산 범위를 벗어났습니다. 입력값이나 기간을 조정해 주세요." };
  return { results: [result("연평균 성장률 (CAGR)", cagr, "%")] };
};

export const mathCalculators: Record<string, CalculatorFunction> = {
  percentage: calculatePercentage,
  discount: calculateDiscount,
  "change-rate": calculateChangeRate,
  ratio: calculateRatio,
  average: calculateAverage,
  "weighted-average": calculateWeightedAverage,
  cagr: calculateCagr,
};

export function runMathCalculator(slug: string, input: Record<string, string>): CalculatorOutcome | undefined {
  return mathCalculators[slug]?.(input);
}

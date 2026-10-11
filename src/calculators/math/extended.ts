import type { CalculatorFunction, CalculatorOutcome } from "@/types/calculator-page";

const error: CalculatorOutcome = { error: "유효한 입력을 확인해 주세요." };
function number(input: Record<string, string>, key: string): number | undefined { const raw = input[key]?.trim(); if (!raw) return undefined; const value = Number(raw); return Number.isFinite(value) ? value : undefined; }
function list(input: Record<string, string>, key: string): number[] | undefined {
  const raw = input[key]?.trim(); if (!raw || raw.length > 30000) return undefined;
  const pieces = raw.split(/[\s,;]+/).filter(Boolean); if (!pieces.length || pieces.length > 500) return undefined;
  const result = pieces.map(Number); return result.every(Number.isFinite) && result.every((x) => Math.abs(x) <= 1e12) ? result : undefined;
}
function gcd(a: number, b: number): number { let x = Math.abs(a), y = Math.abs(b); while (y) [x, y] = [y, x % y]; return x || 1; }
function reduced(n: number, d: number) { if (d < 0) { n *= -1; d *= -1; } const g = gcd(n, d); return [n / g, d / g] as const; }

export const calculateFractions: CalculatorFunction = (input) => {
  const a = number(input, "aNumerator"), b = number(input, "aDenominator"), c = number(input, "bNumerator"), d = number(input, "bDenominator");
  if ([a, b, c, d].some((x) => x === undefined) || ![a, b, c, d].every((x) => Number.isSafeInteger(x) && Math.abs(x!) <= 1e9) || b === 0 || d === 0) return error;
  let n: number, den: number;
  switch (input.operation) {
    case "add": n = a! * d! + c! * b!; den = b! * d!; break;
    case "subtract": n = a! * d! - c! * b!; den = b! * d!; break;
    case "multiply": n = a! * c!; den = b! * d!; break;
    case "divide": if (c === 0) return { error: "0으로 나눌 수 없습니다." }; n = a! * d!; den = b! * c!; break;
    default: return error;
  }
  if (!Number.isSafeInteger(n) || !Number.isSafeInteger(den)) return error;
  const [rn, rd] = reduced(n, den), whole = Math.trunc(rn / rd), rem = Math.abs(rn % rd);
  const mixed = rem ? `${whole ? `${whole} ` : ""}${rem}/${rd}` : String(whole);
  return { results: [{ label: "기약분수", value: `${rn}/${rd}` }, { label: "대분수", value: mixed }, { label: "소수", value: Number((rn / rd).toFixed(8)) }] };
};

export const calculateDecimalFraction: CalculatorFunction = (input) => {
  if (input.mode === "decimal-to-fraction") {
    const value = number(input, "decimal");
    if (value === undefined || Math.abs(value) > 1e9) return error;
    const scale = 1_000_000, numerator = Math.round(value * scale), [n, d] = reduced(numerator, scale);
    return { results: [{ label: "기약분수(소수점 6자리 정밀도)", value: `${n}/${d}` }, { label: "분수 변환값", value: Number((n / d).toFixed(6)) }] };
  }
  if (input.mode === "fraction-to-decimal") {
    const n = number(input, "numerator"), d = number(input, "denominator");
    if (n === undefined || d === undefined || d === 0 || Math.abs(n) > 1e12 || Math.abs(d) > 1e12) return error;
    const value = n / d;
    return Number.isFinite(value) ? { results: [{ label: "소수", value: Number(value.toFixed(8)) }] } : error;
  }
  return error;
};

export const calculateStandardDeviation: CalculatorFunction = (input) => {
  const values = list(input, "numbers"); if (!values) return error;
  const sample = input.mode === "sample";
  if (sample && values.length < 2) return { error: "표본 표준편차는 숫자를 2개 이상 입력해 주세요.", field: "numbers" };
  if (input.mode !== "sample" && input.mode !== "population") return error;
  const mean = values.reduce((sum, x) => sum + x, 0) / values.length;
  const variance = values.reduce((sum, x) => sum + (x - mean) ** 2, 0) / (values.length - Number(sample));
  if (!Number.isFinite(variance)) return error;
  return { results: [{ label: "개수", value: values.length, unit: "개" }, { label: "평균", value: Number(mean.toFixed(8)) }, { label: "분산", value: Number(variance.toFixed(8)) }, { label: sample ? "표본 표준편차" : "모집단 표준편차", value: Number(Math.sqrt(variance).toFixed(8)) }] };
};

export const calculateMedian: CalculatorFunction = (input) => {
  const values = list(input, "numbers"); if (!values) return error;
  const sorted = [...values].sort((a, b) => a - b), middle = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 ? sorted[middle]! : (sorted[middle - 1]! + sorted[middle]!) / 2;
  return { results: [{ label: "개수", value: sorted.length, unit: "개" }, { label: "중앙값", value: Number(median.toFixed(8)) }, { label: "정렬된 값", value: sorted.join(", ") }] };
};

export const calculatePercentile: CalculatorFunction = (input) => {
  const values = list(input, "numbers"), percentile = number(input, "percentile");
  if (!values || percentile === undefined || percentile < 0 || percentile > 100) return error;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.max(0, Math.ceil(percentile / 100 * sorted.length) - 1);
  return { results: [{ label: "백분위수", value: percentile, unit: "%" }, { label: "해당 순위 값(가장 가까운 순위법)", value: sorted[index]! }, { label: "자료 개수", value: sorted.length, unit: "개" }], note: "가장 가까운 순위법을 사용합니다. 백분위 p에서 정렬 자료의 순위는 max(1, ceil(p × n))이며 보간하지 않습니다." };
};

export const calculateProbability: CalculatorFunction = (input) => {
  const p = number(input, "probability"), q = number(input, "secondProbability"), trials = number(input, "trials");
  if (p === undefined || p < 0 || p > 100) return error;
  const a = p / 100;
  if (input.mode === "single") return { results: [{ label: "사건 확률", value: p, unit: "%" }, { label: "발생하지 않을 확률", value: Number((100 - p).toFixed(4)), unit: "%" }] };
  if (input.mode === "at-least-one") {
    if (trials === undefined || trials < 1 || trials > 100000 || !Number.isInteger(trials)) return error;
    return { results: [{ label: "독립 반복에서 1회 이상 발생", value: Number(((1 - (1 - a) ** trials) * 100).toFixed(6)), unit: "%" }] };
  }
  if (q === undefined || q < 0 || q > 100) return error;
  const b = q / 100;
  if (input.mode === "and") return { results: [{ label: "독립 사건 모두 발생", value: Number((a * b * 100).toFixed(6)), unit: "%" }] };
  if (input.mode === "or") return { results: [{ label: "독립 사건 중 하나 이상 발생", value: Number(((1 - (1 - a) * (1 - b)) * 100).toFixed(6)), unit: "%" }] };
  return error;
};

export const extendedMath: Record<string, CalculatorFunction> = { fraction: calculateFractions, "decimal-fraction": calculateDecimalFraction, "standard-deviation": calculateStandardDeviation, median: calculateMedian, percentile: calculatePercentile, probability: calculateProbability };

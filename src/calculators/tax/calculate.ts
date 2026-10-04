import type { CalculatorFunction, CalculatorOutcome } from "@/types/calculator-page";
import { readNumber } from "@/lib/calculators/input";

export const VAT_RATE = 0.1;
const read = (input: Record<string, string>, key: string, label: string) => {
  const value = readNumber(input, key);
  return value === undefined ? `${label}을(를) 입력해 주세요.` : value;
};

export const calculateVat: CalculatorFunction = (input) => {
  const mode = input.mode ?? "supply";
  const raw = read(input, mode === "supply" ? "amount" : "gross", mode === "supply" ? "공급가액" : "합계 금액");
  if (typeof raw === "string") return { error: raw };
  if (raw < 0) return { error: "금액은 0 이상이어야 합니다." };
  if (mode === "supply") {
    const vat = Math.round(raw * VAT_RATE);
    return { results: [{ label: "공급가액", value: Math.round(raw), unit: "원" }, { label: "부가세", value: vat, unit: "원" }, { label: "합계 금액", value: Math.round(raw) + vat, unit: "원" }], note: "부가세 10% 기준이며 부가세를 원 단위로 반올림합니다." };
  }
  const supply = Math.round(raw / (1 + VAT_RATE));
  return { results: [{ label: "공급가액", value: supply, unit: "원" }, { label: "포함된 부가세", value: Math.round(raw) - supply, unit: "원" }, { label: "합계 금액", value: Math.round(raw), unit: "원" }], note: "부가세 10%가 포함된 합계에서 공급가액을 역산해 원 단위로 반올림합니다." };
};

export const calculateUnitPrice: CalculatorFunction = (input) => {
  const mode = input.mode ?? "unit";
  const firstKey = mode === "unit" ? "total" : "unitPrice";
  const secondKey = mode === "unit" ? "quantity" : "quantity";
  const first = read(input, firstKey, mode === "unit" ? "총 가격" : "단가");
  const quantity = read(input, secondKey, "수량");
  if (typeof first === "string") return { error: first, field: firstKey };
  if (typeof quantity === "string") return { error: quantity, field: secondKey };
  if (first < 0 || quantity <= 0) return { error: "가격은 0 이상, 수량은 0보다 커야 합니다." };
  return mode === "unit"
    ? { results: [{ label: "개당 단가", value: Number((first / quantity).toFixed(2)), unit: "원" }] }
    : { results: [{ label: "총 가격", value: Math.round(first * quantity), unit: "원" }] };
};

export const calculateMargin: CalculatorFunction = (input) => {
  const cost = read(input, "cost", "매입가");
  const sale = read(input, "sale", "판매가");
  if (typeof cost === "string") return { error: cost, field: "cost" };
  if (typeof sale === "string") return { error: sale, field: "sale" };
  if (cost < 0 || sale < 0 || sale === 0) return { error: "매입가는 0 이상, 판매가는 0보다 커야 합니다." };
  const profit = sale - cost;
  return { results: [{ label: "마진 금액", value: Math.round(profit), unit: "원" }, { label: "마진율", value: Number((profit / sale * 100).toFixed(2)), unit: "%" }], note: "마진율은 (판매가 − 매입가) ÷ 판매가입니다. 원가 대비 비율인 마크업률과 다릅니다." };
};

export const calculateMarkup: CalculatorFunction = (input) => {
  const cost = read(input, "cost", "원가");
  const sale = read(input, "sale", "판매가");
  if (typeof cost === "string") return { error: cost, field: "cost" };
  if (typeof sale === "string") return { error: sale, field: "sale" };
  if (cost <= 0 || sale < 0) return { error: "원가는 0보다 커야 하고 판매가는 0 이상이어야 합니다." };
  return { results: [{ label: "마크업 금액", value: Math.round(sale - cost), unit: "원" }, { label: "마크업률", value: Number(((sale - cost) / cost * 100).toFixed(2)), unit: "%" }], note: "마크업률은 (판매가 − 원가) ÷ 원가입니다. 판매가를 기준으로 하는 마진율과 구분됩니다." };
};

export const taxCalculators: Record<string, CalculatorFunction> = { vat: calculateVat, "unit-price": calculateUnitPrice, margin: calculateMargin, markup: calculateMarkup };
export function runTaxCalculator(slug: string, input: Record<string, string>): CalculatorOutcome | undefined { return taxCalculators[slug]?.(input); }

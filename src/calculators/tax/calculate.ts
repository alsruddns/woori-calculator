import type { CalculatorFunction, CalculatorOutcome } from "@/types/calculator-page";
import { MAX_MONEY, MAX_QUANTITY, MAX_RATE, readNumber } from "@/lib/calculators/input";

export const VAT_RATE = 0.1;
const read = (input: Record<string, string>, key: string, label: string) => {
  const value = readNumber(input, key);
  return value === undefined ? `${label}을(를) 입력해 주세요.` : value;
};

export const calculateVat: CalculatorFunction = (input) => {
  const mode = input.mode ?? "supply";
  if (mode !== "supply" && mode !== "gross") return { error: "계산 방식을 선택해 주세요.", field: "mode" };
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
  if (mode !== "unit" && mode !== "total") return { error: "계산 방식을 선택해 주세요.", field: "mode" };
  const firstKey = mode === "unit" ? "total" : "unitPrice";
  const secondKey = mode === "unit" ? "quantity" : "quantity";
  const first = read(input, firstKey, mode === "unit" ? "총 가격" : "단가");
  const quantity = read(input, secondKey, "수량");
  if (typeof first === "string") return { error: first, field: firstKey };
  if (typeof quantity === "string") return { error: quantity, field: secondKey };
  if (first < 0 || first > MAX_MONEY || quantity <= 0 || quantity > MAX_QUANTITY) return { error: "가격은 0~1,000조 원, 수량은 0~10억 범위로 입력해 주세요." };
  if (mode === "total" && first * quantity > MAX_MONEY) return { error: "계산된 총 가격은 1,000조 원 이하여야 합니다." };
  if (mode === "unit") {
    const unitPrice = first / quantity;
    if (!Number.isFinite(unitPrice)) return { error: "개당 단가가 계산 범위를 벗어났습니다." };
    return { results: [{ label: "개당 단가", value: Number(unitPrice.toFixed(2)), unit: "원", precision: 2 }] };
  }
  return { results: [{ label: "총 가격", value: Math.round(first * quantity), unit: "원" }] };
};

export const calculateMargin: CalculatorFunction = (input) => {
  const cost = read(input, "cost", "매입가");
  const sale = read(input, "sale", "판매가");
  if (typeof cost === "string") return { error: cost, field: "cost" };
  if (typeof sale === "string") return { error: sale, field: "sale" };
  if (cost < 0 || sale < 0 || sale === 0) return { error: "매입가는 0 이상, 판매가는 0보다 커야 합니다." };
  const profit = sale - cost;
  const margin = profit / sale * 100;
  if (!Number.isFinite(margin) || Math.abs(margin) > MAX_RATE) return { error: "마진율은 ±100,000% 범위에서 계산할 수 있습니다." };
  return { results: [{ label: "마진 금액", value: Math.round(profit), unit: "원" }, { label: "마진율", value: Number(margin.toFixed(2)), unit: "%" }], note: "마진율은 (판매가 − 매입가) ÷ 판매가입니다. 원가 대비 비율인 마크업률과 다릅니다." };
};

export const calculateMarkup: CalculatorFunction = (input) => {
  const cost = read(input, "cost", "원가");
  const sale = read(input, "sale", "판매가");
  if (typeof cost === "string") return { error: cost, field: "cost" };
  if (typeof sale === "string") return { error: sale, field: "sale" };
  if (cost <= 0 || sale < 0) return { error: "원가는 0보다 커야 하고 판매가는 0 이상이어야 합니다." };
  const markup = (sale - cost) / cost * 100;
  if (!Number.isFinite(markup) || Math.abs(markup) > MAX_RATE) return { error: "마크업률은 ±100,000% 범위에서 계산할 수 있습니다." };
  return { results: [{ label: "마크업 금액", value: Math.round(sale - cost), unit: "원" }, { label: "마크업률", value: Number(markup.toFixed(2)), unit: "%" }], note: "마크업률은 (판매가 − 원가) ÷ 원가입니다. 판매가를 기준으로 하는 마진율과 구분됩니다." };
};

export const calculateProductMargin: CalculatorFunction = (input) => {
  const mode = input.mode ?? "profit";
  if (mode !== "profit" && mode !== "target") return { error: "계산 방식을 선택해 주세요.", field: "mode" };
  const keys = mode === "profit" ? ["cost", "sale", "feeRate", "shipping", "otherCost"] : ["cost", "feeRate", "shipping", "otherCost", "targetMargin"];
  const parsed: Record<string, number> = {};
  for (const key of keys) {
    const value = readNumber(input, key);
    if (value === undefined) return { error: "모든 입력값을 확인해 주세요.", field: key };
    parsed[key] = value;
  }
  const { cost, feeRate, shipping, otherCost } = parsed;
  if (cost < 0 || feeRate < 0 || feeRate >= 100 || shipping < 0 || otherCost < 0) return { error: "원가·비용은 0 이상, 수수료율은 0 이상 100 미만이어야 합니다." };
  if (cost + shipping + otherCost > MAX_MONEY) return { error: "원가와 비용의 합은 1,000조 원 이하여야 합니다." };
  if (mode === "target") {
    const margin = parsed.targetMargin!;
    if (margin < 0 || margin >= 100) return { error: "목표 마진율은 0 이상 100% 미만이어야 합니다.", field: "targetMargin" };
    if (feeRate + margin >= 100) return { error: "수수료율과 목표 마진율의 합은 100% 미만이어야 합니다.", field: "targetMargin" };
    const sale = (cost + shipping + otherCost) / (1 - (feeRate + margin) / 100);
    if (!Number.isFinite(sale) || sale > MAX_MONEY) return { error: "필요한 판매가가 1,000조 원을 초과하거나 계산 범위를 벗어났습니다." };
    return { results: [{ label: "필요한 판매가", value: Math.round(sale), unit: "원" }], note: "입력한 원가, 수수료율, 배송비, 기타 비용만 반영한 계산입니다." };
  }
  const sale = parsed.sale!;
  if (sale <= 0) return { error: "판매가는 0보다 커야 합니다.", field: "sale" };
  if (sale > MAX_MONEY) return { error: "판매가는 1,000조 원 이하여야 합니다.", field: "sale" };
  const fee = sale * feeRate / 100;
  const costs = cost + fee + shipping + otherCost;
  if (!Number.isFinite(costs) || costs > MAX_MONEY) return { error: "원가와 비용 합계는 1,000조 원 이하여야 합니다." };
  const profit = sale - costs;
  return { results: [
    { label: "판매가", value: Math.round(sale), unit: "원" }, { label: "상품 원가", value: Math.round(cost), unit: "원" },
    { label: "판매 수수료", value: Math.round(fee), unit: "원" }, { label: "배송·기타 비용", value: Math.round(shipping + otherCost), unit: "원" },
    { label: "총 비용", value: Math.round(costs), unit: "원" }, { label: "순이익", value: Math.round(profit), unit: "원" },
    { label: "실질 마진율", value: Number((profit / sale * 100).toFixed(2)), unit: "%" },
  ], note: "사용자가 입력한 원가, 수수료, 배송비, 기타 비용만 반영합니다." };
};

export const calculateWithholdingTax33: CalculatorFunction = (input) => {
  const amount = readNumber(input, "amount");
  if (amount === undefined || amount < 0) return { error: "지급액을 0 이상으로 입력해 주세요.", field: "amount" };
  const payment = Math.round(amount);
  const incomeTax = Math.floor(payment * 0.03);
  const localTax = Math.floor(payment * 0.003);
  const total = incomeTax + localTax;
  return { results: [
    { label: "지급액", value: payment, unit: "원" }, { label: "소득세 3%", value: incomeTax, unit: "원" },
    { label: "지방소득세 0.3%", value: localTax, unit: "원" }, { label: "총 원천징수 3.3%", value: total, unit: "원" },
    { label: "예상 실수령액", value: payment - total, unit: "원" },
  ], note: "사업소득 지급 시 사용하는 3.3% 원천징수의 단순 예시입니다. 세액은 세목별 원 단위 버림으로 계산하며, 최종 세액·신고 결과와 다를 수 있습니다." };
};

export const taxCalculators: Record<string, CalculatorFunction> = { vat: calculateVat, "unit-price": calculateUnitPrice, margin: calculateMargin, markup: calculateMarkup, "product-margin": calculateProductMargin, "withholding-tax-3-3": calculateWithholdingTax33 };
export function runTaxCalculator(slug: string, input: Record<string, string>): CalculatorOutcome | undefined { return taxCalculators[slug]?.(input); }

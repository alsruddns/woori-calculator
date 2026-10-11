import type { CalculatorFunction, CalculatorOutcome } from "@/types/calculator-page";
const read = (i: Record<string, string>, k: string) => { const raw = i[k]?.replace(/,/g, "").trim(); if (!raw) return undefined; const n = Number(raw); return Number.isFinite(n) ? n : undefined; };
const bad: CalculatorOutcome = { error: "모든 입력을 유효한 숫자로 입력해 주세요." };
const won = (label: string, value: number) => ({ label, value: Math.round(value), unit: "원" });

export const calculateUtilityBill: CalculatorFunction = (i) => {
  const usage = read(i, "usage"), rate = read(i, "rate"), base = read(i, "base");
  if (usage === undefined || rate === undefined || base === undefined || usage < 0 || usage > 1_000_000_000 || rate < 0 || rate > 1_000_000 || base < 0 || base > 1_000_000_000) return bad;
  return { results: [won("사용량 요금", usage * rate), won("기본요금", base), won("합계 예상액", usage * rate + base)], note: "사용자가 입력한 단가와 기본요금을 곱해 계산합니다. 지역, 누진구간, 세금과 부가요금은 자동 적용되지 않습니다." };
};

export const calculateVehicleCosts: CalculatorFunction = (i) => {
  const v = ["distance", "efficiency", "fuelPrice", "insurance", "tax", "maintenance", "parking", "tolls", "other"].map((key) => read(i, key));
  if (v.some((x) => x === undefined)) return bad;
  const [distance, efficiency, fuelPrice, insurance, tax, maintenance, parking, tolls, other] = v as number[];
  if (distance < 0 || distance > 1_000_000 || efficiency <= 0 || efficiency > 1000 || fuelPrice < 0 || fuelPrice > 1_000_000 || [insurance, tax, maintenance, parking, tolls, other].some((x) => x < 0 || x > 100_000_000)) return bad;
  const fuel = distance / efficiency * fuelPrice;
  const monthly = fuel + insurance + tax + maintenance + parking + tolls + other;
  if (!Number.isFinite(monthly)) return bad;
  return { results: [won("연료비", fuel), won("월 차량 유지비", monthly), won("연 환산 유지비", monthly * 12), { label: "주행거리 기준 km당 비용", value: distance > 0 ? Number((monthly / distance).toFixed(2)) : 0, unit: "원/km" }] };
};

export const calculateTaxiFare: CalculatorFunction = (i) => {
  const v = ["baseFare", "includedDistance", "distanceRate", "distance", "timeRate", "minutes"].map((key) => read(i, key));
  if (v.some((x) => x === undefined)) return bad;
  const [baseFare, includedDistance, distanceRate, distance, timeRate, minutes] = v as number[];
  if ([baseFare, includedDistance, distanceRate, distance, timeRate, minutes].some((x) => x < 0 || x > 1_000_000)) return bad;
  return { results: [won("거리 추가요금", Math.max(0, distance - includedDistance) * distanceRate), won("시간 요금", minutes * timeRate), won("입력 단가 기준 예상 요금", baseFare + Math.max(0, distance - includedDistance) * distanceRate + minutes * timeRate)], note: "도시별 실제 택시요금, 구간 반올림, 할증과 통행료를 적용하지 않습니다. 요금표의 단가를 입력해 참고용으로 계산하세요." };
};

export const calculateTripSplit: CalculatorFunction = (i) => {
  const total = read(i, "total"), people = read(i, "people");
  if (total === undefined || people === undefined || total < 0 || total > 1_000_000_000_000 || people < 1 || people > 1000 || !Number.isInteger(people)) return bad;
  const each = total / people;
  const base = Math.floor(each), remainder = Math.round(total - base * people);
  return { results: [{ label: "1인당 균등 분담액(소수 포함)", value: Number(each.toFixed(2)), unit: "원", precision: 2 }, { label: "기본 분담 인원", value: people - remainder, unit: "명" }, won("기본 분담액", base), { label: "1원 추가 분담 인원", value: remainder, unit: "명" }, won("추가 분담액", base + (remainder > 0 ? 1 : 0)), won("총 경비", total)] };
};

export const calculateTip: CalculatorFunction = (i) => {
  const amount = read(i, "amount"), percent = read(i, "percent"), people = read(i, "people");
  if (amount === undefined || percent === undefined || people === undefined || amount < 0 || amount > 1_000_000_000_000 || percent < 0 || percent > 1000 || people < 1 || people > 1000 || !Number.isInteger(people)) return bad;
  const tip = amount * percent / 100, total = amount + tip;
  return { results: [won("팁", tip), won("팁 포함 총액", total), won("1인당 금액", total / people)] };
};

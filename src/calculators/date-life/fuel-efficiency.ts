import type { CalculatorFunction } from "@/types/calculator-page";
import { readNumber, result } from "@/lib/calculators/input";

const MAX_DISTANCE_KM = 1_000_000;
const MAX_FUEL_LITERS = 100_000;
const MAX_EFFICIENCY = 1_000;

function positiveInput(input: Record<string, string>, key: string, label: string, maximum: number): number | string {
  const value = readNumber(input, key);
  if (value === undefined || value <= 0 || value > maximum) return `${label}은 0보다 크고 ${maximum.toLocaleString("en-US")} 이하로 입력해 주세요.`;
  return value;
}

export const calculateFuelEfficiency: CalculatorFunction = (input) => {
  const mode = input.mode ?? "efficiency";
  if (!["efficiency", "consumption", "range"].includes(mode)) return { error: "계산 방법을 선택해 주세요.", field: "mode" };

  if (mode === "efficiency") {
    const distance = positiveInput(input, "distance", "주행거리(km)", MAX_DISTANCE_KM);
    const fuelAmount = positiveInput(input, "fuelAmount", "사용 연료량(L)", MAX_FUEL_LITERS);
    if (typeof distance === "string" || typeof fuelAmount === "string") return { error: "주행거리와 사용 연료량을 확인해 주세요." };
    const efficiency = distance / fuelAmount;
    const fuelPer100Km = fuelAmount / distance * 100;
    if (!Number.isFinite(efficiency) || !Number.isFinite(fuelPer100Km)) return { error: "계산 결과가 표시 가능한 범위를 벗어났습니다." };
    return { results: [result("연비", efficiency, "km/L"), result("100km당 연료 소모량", fuelPer100Km, "L/100km")] };
  }

  if (mode === "consumption") {
    const distance = positiveInput(input, "distance", "주행거리(km)", MAX_DISTANCE_KM);
    const efficiency = positiveInput(input, "efficiency", "차량 연비(km/L)", MAX_EFFICIENCY);
    if (typeof distance === "string" || typeof efficiency === "string") return { error: "주행거리와 차량 연비를 확인해 주세요." };
    const fuelAmount = distance / efficiency;
    if (!Number.isFinite(fuelAmount)) return { error: "계산 결과가 표시 가능한 범위를 벗어났습니다." };
    return { results: [result("필요 연료량", fuelAmount, "L")] };
  }

  const fuelAmount = positiveInput(input, "fuelAmount", "현재 연료량(L)", MAX_FUEL_LITERS);
  const efficiency = positiveInput(input, "efficiency", "차량 연비(km/L)", MAX_EFFICIENCY);
  if (typeof fuelAmount === "string" || typeof efficiency === "string") return { error: "현재 연료량과 차량 연비를 확인해 주세요." };
  const range = fuelAmount * efficiency;
  if (!Number.isFinite(range)) return { error: "계산 결과가 표시 가능한 범위를 벗어났습니다." };
  return { results: [result("예상 주행거리", range, "km")] };
};

import type { CalculatorFunction, CalculatorOutcome } from "@/types/calculator-page";
import { MAX_DATE_RANGE_DAYS, MAX_MONEY, readNumber } from "@/lib/calculators/input";
import { parseDateOnly } from "@/lib/calculators/date-only";

const DAY = 86_400_000;

export const calculateDateDifference: CalculatorFunction = (input) => {
  const start = parseDateOnly(input.start);
  const end = parseDateOnly(input.end);
  if (start === undefined || end === undefined) return { error: "시작일과 종료일을 올바르게 선택해 주세요." };
  if (end < start) return { error: "종료일은 시작일과 같거나 이후여야 합니다.", field: "end" };
  const base = (end - start) / DAY;
  if (base > MAX_DATE_RANGE_DAYS) return { error: "날짜 범위는 최대 200년까지 계산할 수 있습니다.", field: "end" };
  const includes = input.include ?? "none";
  const includesStart = includes === "start" || includes === "both";
  const includesEnd = includes === "end" || includes === "both";
  const days = base === 0
    ? Number(includesStart || includesEnd)
    : base - 1 + Number(includesStart) + Number(includesEnd);
  return { results: [{ label: "날짜 차이", value: base, unit: "일" }, { label: "선택한 포함 기준 일수", value: days, unit: "일" }] };
};

export const calculateDday: CalculatorFunction = (input) => {
  const target = parseDateOnly(input.target);
  const reference = input.reference === "today" ? Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()) : parseDateOnly(input.referenceDate);
  if (target === undefined || reference === undefined) return { error: "기준일과 목표일을 올바르게 선택해 주세요." };
  const days = Math.round((target - reference) / DAY);
  if (Math.abs(days) > MAX_DATE_RANGE_DAYS) return { error: "기준일과 목표일은 최대 200년 범위에서 선택해 주세요.", field: "target" };
  return { results: [{ label: days > 0 ? "목표일까지" : days < 0 ? "목표일로부터 경과" : "기준일", value: Math.abs(days), unit: days > 0 ? "일 (D-N)" : days < 0 ? "일 (D+N)" : "일 (D-Day)" }] };
};

export const calculateAge: CalculatorFunction = (input) => {
  const birth = parseDateOnly(input.birth);
  const reference = parseDateOnly(input.reference);
  if (birth === undefined || reference === undefined) return { error: "생년월일과 기준일을 올바르게 선택해 주세요." };
  if (reference < birth) return { error: "기준일은 생년월일과 같거나 이후여야 합니다.", field: "reference" };
  if ((reference - birth) / DAY > MAX_DATE_RANGE_DAYS) return { error: "생년월일과 기준일은 최대 200년 범위여야 합니다.", field: "reference" };
  const b = new Date(birth);
  const r = new Date(reference);
  let age = r.getUTCFullYear() - b.getUTCFullYear();
  if (r.getUTCMonth() < b.getUTCMonth() || (r.getUTCMonth() === b.getUTCMonth() && r.getUTCDate() < b.getUTCDate())) age -= 1;
  return { results: [{ label: "만 나이", value: age, unit: "세" }], note: "생일이 지나지 않은 해에는 한 살을 빼는 일반적인 만 나이 기준입니다." };
};

export const calculateWorkdays: CalculatorFunction = (input) => {
  const start = parseDateOnly(input.start);
  const end = parseDateOnly(input.end);
  if (start === undefined || end === undefined) return { error: "시작일과 종료일을 올바르게 선택해 주세요." };
  if (end < start) return { error: "종료일은 시작일과 같거나 이후여야 합니다.", field: "end" };
  if ((end - start) / DAY > MAX_DATE_RANGE_DAYS) return { error: "근무일 범위는 최대 200년까지 계산할 수 있습니다.", field: "end" };
  const includesStart = input.includeStart !== "false";
  const includesEnd = input.includeEnd !== "false";
  const from = start + (includesStart ? 0 : DAY);
  const to = end - (includesEnd ? 0 : DAY);
  let count = 0;
  if (start === end && (includesStart || includesEnd) && new Date(start).getUTCDay() !== 0 && new Date(start).getUTCDay() !== 6) count = 1;
  if (start !== end && from <= to) {
    const dayCount = Math.floor((to - from) / DAY) + 1;
    const fullWeeks = Math.floor(dayCount / 7);
    count = fullWeeks * 5;
    for (let offset = fullWeeks * 7; offset < dayCount; offset += 1) {
      const weekday = new Date(from + offset * DAY).getUTCDay();
      if (weekday !== 0 && weekday !== 6) count += 1;
    }
  }
  return { results: [{ label: "평일 근무일수", value: count, unit: "일" }], note: "토요일과 일요일만 제외했습니다. 한국 공휴일과 임시공휴일은 자동 제외하지 않습니다." };
};

function numberInput(input: Record<string, string>, key: string, label: string) {
  const value = readNumber(input, key);
  return value === undefined ? `${label}을(를) 올바르게 입력해 주세요.` : value;
}

export const calculateBmi: CalculatorFunction = (input) => {
  const height = numberInput(input, "height", "키");
  const weight = numberInput(input, "weight", "몸무게");
  if (typeof height === "string") return { error: height, field: "height" };
  if (typeof weight === "string") return { error: weight, field: "weight" };
  if (height < 1 || height > 300 || weight <= 0 || weight > 1000) return { error: "키는 1~300cm, 몸무게는 0~1,000kg 범위로 입력해 주세요." };
  return { results: [{ label: "BMI", value: Number((weight / ((height / 100) ** 2)).toFixed(1)), unit: "kg/m²" }], note: "체질량지수의 계산 결과입니다. 건강 상태를 진단하거나 개인별 건강 조언을 제공하지 않습니다." };
};

export const calculateArea: CalculatorFunction = (input) => {
  const value = numberInput(input, "value", "변환할 값");
  if (typeof value === "string") return { error: value, field: "value" };
  if (value < 0 || value > MAX_MONEY) return { error: "면적은 0~1,000조 범위로 입력해 주세요." };
  const mode = input.mode ?? "sqm-to-pyeong";
  if (mode !== "sqm-to-pyeong" && mode !== "pyeong-to-sqm") return { error: "변환 방향을 선택해 주세요.", field: "mode" };
  return mode === "sqm-to-pyeong"
    ? { results: [{ label: "평", value: Number((value / (400 / 121)).toFixed(2)), unit: "평" }] }
    : { results: [{ label: "제곱미터", value: Number((value * (400 / 121)).toFixed(2)), unit: "㎡" }] };
};

export const calculatePace: CalculatorFunction = (input) => {
  const distance = numberInput(input, "distance", "거리");
  const hours = numberInput(input, "hours", "시간");
  const minutes = numberInput(input, "minutes", "분");
  if (typeof distance === "string" || typeof hours === "string" || typeof minutes === "string") return { error: "거리와 운동 시간을 올바르게 입력해 주세요." };
  const totalMinutes = hours * 60 + minutes;
  if (distance <= 0 || distance > 1_000_000 || totalMinutes <= 0 || totalMinutes > 200 * 366 * 24 * 60) return { error: "거리는 0보다 크고 100만 km 이하, 운동 시간은 200년 이하여야 합니다." };
  const pace = totalMinutes / distance;
  if (!Number.isFinite(pace) || pace > 200 * 366 * 24 * 60) return { error: "계산된 페이스가 표시 가능한 범위를 벗어났습니다." };
  const speed = distance / (totalMinutes / 60);
  if (!Number.isFinite(speed)) return { error: "평균 속도가 계산 범위를 벗어났습니다." };
  const paceMin = Math.floor(pace);
  const paceSec = Math.round((pace - paceMin) * 60);
  const normalizedPace = paceSec === 60 ? `${paceMin + 1}:00` : `${paceMin}:${String(paceSec).padStart(2, "0")}`;
  return { results: [{ label: "평균 페이스", value: `${normalizedPace} /km` }, { label: "평균 속도", value: Number(speed.toFixed(2)), unit: "km/h" }] };
};

export const calculateFuelCost: CalculatorFunction = (input) => {
  const distance = numberInput(input, "distance", "주행 거리");
  const efficiency = numberInput(input, "efficiency", "연비");
  const price = numberInput(input, "price", "유가");
  if (typeof distance === "string" || typeof efficiency === "string" || typeof price === "string") return { error: "거리·연비·유가를 올바르게 입력해 주세요." };
  if (distance < 0 || distance > 1_000_000_000 || efficiency < 0.01 || efficiency > 1000 || price < 0 || price > 1_000_000_000) return { error: "거리는 0~10억 km, 연비는 0.01~1,000km/L, 유가는 0~10억 원/L 범위로 입력해 주세요." };
  const fuel = distance / efficiency;
  const cost = fuel * price;
  if (!Number.isFinite(fuel) || !Number.isFinite(cost) || cost > Number.MAX_SAFE_INTEGER) return { error: "예상 주유비가 안전한 계산 범위를 벗어났습니다." };
  return { results: [{ label: "필요 연료", value: Number(fuel.toFixed(2)), unit: "L" }, { label: "예상 주유비", value: Math.round(cost), unit: "원" }], note: "입력한 평균 연비와 유가를 이용한 단순 예상치입니다." };
};

export const calculateCaloriePerServing: CalculatorFunction = (input) => {
  const calories = numberInput(input, "calories", "전체 칼로리");
  const servings = numberInput(input, "servings", "총 분량");
  const portion = numberInput(input, "portion", "섭취 분량");
  if (typeof calories === "string" || typeof servings === "string" || typeof portion === "string") return { error: "전체 칼로리와 분량을 올바르게 입력해 주세요." };
  if (calories < 0 || servings <= 0 || servings > 1_000_000_000 || portion < 0 || portion > 1_000_000_000) return { error: "칼로리는 0~1,000조, 분량은 0~10억 범위로 입력해 주세요." };
  const estimate = calories / servings * portion;
  if (!Number.isFinite(estimate)) return { error: "예상 섭취 칼로리가 계산 범위를 벗어났습니다." };
  return { results: [{ label: "예상 섭취 칼로리", value: Number(estimate.toFixed(1)), unit: "kcal" }] };
};

export const dateLifeCalculators: Record<string, CalculatorFunction> = {
  "date-difference": calculateDateDifference,
  dday: calculateDday,
  age: calculateAge,
  workdays: calculateWorkdays,
  bmi: calculateBmi,
  area: calculateArea,
  pace: calculatePace,
  "fuel-cost": calculateFuelCost,
  "calorie-per-serving": calculateCaloriePerServing,
};

export function runDateLifeCalculator(slug: string, input: Record<string, string>): CalculatorOutcome | undefined { return dateLifeCalculators[slug]?.(input); }

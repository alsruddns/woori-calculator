import type { CalculatorFunction, CalculatorOutcome } from "@/types/calculator-page";
import { readNumber } from "@/lib/calculators/input";

const DAY = 86_400_000;

function dateValue(value: string | undefined): number | undefined {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  const [year, month, day] = value.split("-").map(Number);
  const time = Date.UTC(year!, month! - 1, day!);
  const date = new Date(time);
  return date.getUTCFullYear() === year && date.getUTCMonth() === month! - 1 && date.getUTCDate() === day ? time : undefined;
}

export const calculateDateDifference: CalculatorFunction = (input) => {
  const start = dateValue(input.start);
  const end = dateValue(input.end);
  if (start === undefined || end === undefined) return { error: "시작일과 종료일을 올바르게 선택해 주세요." };
  if (end < start) return { error: "종료일은 시작일과 같거나 이후여야 합니다.", field: "end" };
  const base = (end - start) / DAY;
  const includes = input.include ?? "none";
  const includesStart = includes === "start" || includes === "both";
  const includesEnd = includes === "end" || includes === "both";
  const days = base === 0
    ? Number(includesStart || includesEnd)
    : base - 1 + Number(includesStart) + Number(includesEnd);
  return { results: [{ label: "날짜 차이", value: base, unit: "일" }, { label: "선택한 포함 기준 일수", value: days, unit: "일" }] };
};

export const calculateDday: CalculatorFunction = (input) => {
  const target = dateValue(input.target);
  const reference = input.reference === "today" ? Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()) : dateValue(input.referenceDate);
  if (target === undefined || reference === undefined) return { error: "기준일과 목표일을 올바르게 선택해 주세요." };
  const days = Math.round((target - reference) / DAY);
  return { results: [{ label: days > 0 ? "목표일까지" : days < 0 ? "목표일로부터 경과" : "기준일", value: Math.abs(days), unit: days > 0 ? "일 (D-N)" : days < 0 ? "일 (D+N)" : "일 (D-Day)" }] };
};

export const calculateAge: CalculatorFunction = (input) => {
  const birth = dateValue(input.birth);
  const reference = dateValue(input.reference);
  if (birth === undefined || reference === undefined) return { error: "생년월일과 기준일을 올바르게 선택해 주세요." };
  if (reference < birth) return { error: "기준일은 생년월일과 같거나 이후여야 합니다.", field: "reference" };
  const b = new Date(birth);
  const r = new Date(reference);
  let age = r.getUTCFullYear() - b.getUTCFullYear();
  if (r.getUTCMonth() < b.getUTCMonth() || (r.getUTCMonth() === b.getUTCMonth() && r.getUTCDate() < b.getUTCDate())) age -= 1;
  return { results: [{ label: "만 나이", value: age, unit: "세" }], note: "생일이 지나지 않은 해에는 한 살을 빼는 일반적인 만 나이 기준입니다." };
};

export const calculateWorkdays: CalculatorFunction = (input) => {
  const start = dateValue(input.start);
  const end = dateValue(input.end);
  if (start === undefined || end === undefined) return { error: "시작일과 종료일을 올바르게 선택해 주세요." };
  if (end < start) return { error: "종료일은 시작일과 같거나 이후여야 합니다.", field: "end" };
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
  if (height <= 0 || weight <= 0) return { error: "키와 몸무게는 0보다 커야 합니다." };
  return { results: [{ label: "BMI", value: Number((weight / ((height / 100) ** 2)).toFixed(1)), unit: "kg/m²" }], note: "체질량지수의 계산 결과입니다. 건강 상태를 진단하거나 개인별 건강 조언을 제공하지 않습니다." };
};

export const calculateArea: CalculatorFunction = (input) => {
  const value = numberInput(input, "value", "변환할 값");
  if (typeof value === "string") return { error: value, field: "value" };
  if (value < 0) return { error: "면적은 0 이상이어야 합니다." };
  const mode = input.mode ?? "sqm-to-pyeong";
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
  if (distance <= 0 || totalMinutes <= 0) return { error: "거리와 운동 시간은 0보다 커야 합니다." };
  const pace = totalMinutes / distance;
  const paceMin = Math.floor(pace);
  const paceSec = Math.round((pace - paceMin) * 60);
  const normalizedPace = paceSec === 60 ? `${paceMin + 1}:00` : `${paceMin}:${String(paceSec).padStart(2, "0")}`;
  return { results: [{ label: "평균 페이스", value: `${normalizedPace} /km` }, { label: "평균 속도", value: Number((distance / (totalMinutes / 60)).toFixed(2)), unit: "km/h" }] };
};

export const calculateFuelCost: CalculatorFunction = (input) => {
  const distance = numberInput(input, "distance", "주행 거리");
  const efficiency = numberInput(input, "efficiency", "연비");
  const price = numberInput(input, "price", "유가");
  if (typeof distance === "string" || typeof efficiency === "string" || typeof price === "string") return { error: "거리·연비·유가를 올바르게 입력해 주세요." };
  if (distance < 0 || efficiency <= 0 || price < 0) return { error: "거리는 0 이상, 연비는 0보다 크게, 유가는 0 이상이어야 합니다." };
  const fuel = distance / efficiency;
  return { results: [{ label: "필요 연료", value: Number(fuel.toFixed(2)), unit: "L" }, { label: "예상 주유비", value: Math.round(fuel * price), unit: "원" }], note: "입력한 평균 연비와 유가를 이용한 단순 예상치입니다." };
};

export const calculateCaloriePerServing: CalculatorFunction = (input) => {
  const calories = numberInput(input, "calories", "전체 칼로리");
  const servings = numberInput(input, "servings", "총 분량");
  const portion = numberInput(input, "portion", "섭취 분량");
  if (typeof calories === "string" || typeof servings === "string" || typeof portion === "string") return { error: "전체 칼로리와 분량을 올바르게 입력해 주세요." };
  if (calories < 0 || servings <= 0 || portion < 0) return { error: "칼로리는 0 이상, 총 분량은 0보다 커야 하며 섭취 분량은 0 이상이어야 합니다." };
  return { results: [{ label: "예상 섭취 칼로리", value: Number((calories / servings * portion).toFixed(1)), unit: "kcal" }] };
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

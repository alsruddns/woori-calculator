import type { CalculatorFunction, CalculatorOutcome } from "@/types/calculator-page";
import { readNumber } from "@/lib/calculators/input";

type Unit = { category: string; label: string; factor: number };

export const units = {
  mm: { category: "length", label: "밀리미터 (mm)", factor: 0.001 },
  cm: { category: "length", label: "센티미터 (cm)", factor: 0.01 },
  m: { category: "length", label: "미터 (m)", factor: 1 },
  km: { category: "length", label: "킬로미터 (km)", factor: 1000 },
  inch: { category: "length", label: "인치 (in)", factor: 0.0254 },
  ft: { category: "length", label: "피트 (ft)", factor: 0.3048 },
  yard: { category: "length", label: "야드 (yd)", factor: 0.9144 },
  mile: { category: "length", label: "마일 (mi)", factor: 1609.344 },
  mg: { category: "weight", label: "밀리그램 (mg)", factor: 0.001 },
  g: { category: "weight", label: "그램 (g)", factor: 1 },
  kg: { category: "weight", label: "킬로그램 (kg)", factor: 1000 },
  oz: { category: "weight", label: "온스 (oz)", factor: 28.349523125 },
  lb: { category: "weight", label: "파운드 (lb)", factor: 453.59237 },
  ml: { category: "volume", label: "밀리리터 (mL)", factor: 1 },
  l: { category: "volume", label: "리터 (L)", factor: 1000 },
} as const satisfies Record<string, Unit>;

export type LinearUnit = keyof typeof units;

export function convertTemperature(value: number, from: "c" | "f", to: "c" | "f"): number {
  if (from === to) return value;
  return from === "c" ? value * 9 / 5 + 32 : (value - 32) * 5 / 9;
}

export const calculateUnitConversion: CalculatorFunction = (input) => {
  const raw = readNumber(input, "value");
  if (raw === undefined) return { error: "변환할 숫자를 입력해 주세요.", field: "value" };
  const category = input.category ?? "length";
  const from = input.fromUnit ?? "m";
  const to = input.toUnit ?? "km";
  let converted: number;
  let resultUnit: string;
  if (category === "temperature") {
    if (!(from in { c: 1, f: 1 }) || !(to in { c: 1, f: 1 })) return { error: "온도 단위를 확인해 주세요." };
    converted = convertTemperature(raw, from as "c" | "f", to as "c" | "f");
    resultUnit = to.toUpperCase();
  } else {
    const source = units[from as LinearUnit];
    const target = units[to as LinearUnit];
    if (!source || !target || source.category !== category || target.category !== category) return { error: "선택한 단위가 변환 종류와 일치하지 않습니다." };
    converted = raw * source.factor / target.factor;
    resultUnit = to;
  }
  const rounded = Number(converted.toPrecision(10));
  return { results: [{ label: "변환 결과", value: rounded, unit: resultUnit, precision: 8 }], note: "단위 변환은 표준 단위 관계를 이용합니다. 소수점 최대 8자리로 표시해 작은 단위 환산값을 보존하고 부동소수점 노이즈는 정리합니다." };
};

export const conversionCalculators: Record<string, CalculatorFunction> = { "unit-converter": calculateUnitConversion };
export function runConversionCalculator(slug: string, input: Record<string, string>): CalculatorOutcome | undefined { return conversionCalculators[slug]?.(input); }

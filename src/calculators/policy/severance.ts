import type { CalculatorFunction, CalculatorOutcome } from "@/types/calculator-page";
import { readNumber } from "@/lib/calculators/input";
import { MAX_DATE_RANGE_DAYS } from "@/lib/calculators/input";
import { parseDateOnly } from "@/lib/calculators/date-only";

export const calculateSeveranceEstimate: CalculatorFunction = (input): CalculatorOutcome => {
  const start = parseDateOnly(input.start);
  const lastWorkday = parseDateOnly(input.lastWorkday);
  const averageDailyWage = readNumber(input, "averageDailyWage");
  if (start === undefined || lastWorkday === undefined) return { error: "입사일과 마지막 근무일을 올바르게 선택해 주세요." };
  if (lastWorkday < start) return { error: "마지막 근무일은 입사일과 같거나 이후여야 합니다.", field: "lastWorkday" };
  if (averageDailyWage === undefined || averageDailyWage < 0) return { error: "1일 평균임금을 0 이상으로 입력해 주세요.", field: "averageDailyWage" };
  const serviceDays = Math.floor((lastWorkday - start) / 86_400_000) + 1;
  if (serviceDays > MAX_DATE_RANGE_DAYS) return { error: "근속 기간은 최대 200년까지 계산할 수 있습니다.", field: "lastWorkday" };
  const estimate = averageDailyWage * 30 * serviceDays / 365;
  return { results: [{ label: "계속근로일수", value: serviceDays, unit: "일" }, { label: "예상 퇴직금", value: Math.round(estimate), unit: "원" }], note: "평균임금과 계속근로기간을 입력한 단순 추정입니다. 평균임금의 법정 산정, 통상임금 비교, 지급 요건, 제외 기간과 세금은 반영하지 않습니다." };
};

export const policyCalculators: Record<string, CalculatorFunction> = { "severance-pay": calculateSeveranceEstimate };
export function runPolicyCalculator(slug: string, input: Record<string, string>): CalculatorOutcome | undefined { return policyCalculators[slug]?.(input); }

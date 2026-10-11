import type { CalculatorOutcome } from "@/types/calculator-page";
import { unemploymentBenefit2026 } from "@/data/policies/unemployment-benefit/2026";

const number = (value: string | undefined) => Number((value ?? "").replace(/,/g, "").trim());

export function calculateUnemploymentBenefit(input: Record<string, string>): CalculatorOutcome {
  if (!input.age?.trim() || !input.monthlyWage?.trim() || !input.insuredYears?.trim()) return { error: "나이, 월 평균임금, 가입기간을 모두 입력해 주세요." };
  const age = number(input.age);
  const monthlyWage = number(input.monthlyWage);
  const insuredYears = number(input.insuredYears);
  if (![age, monthlyWage, insuredYears].every(Number.isFinite) || age < 15 || age > 100 || monthlyWage <= 0 || monthlyWage > 100_000_000 || insuredYears < 0 || insuredYears > 60) {
    return { error: "나이, 월 평균임금, 가입기간을 입력 범위에 맞게 확인해 주세요." };
  }
  const ageBand = unemploymentBenefit2026.ageBands.find(({ minAge, maxAge }) => age >= minAge && (maxAge === null || age <= maxAge))!;
  const periodIndex = unemploymentBenefit2026.insuredYearUpperBounds.findIndex((upper) => upper === null || insuredYears < upper);
  const benefitDays = ageBand.daysByInsuredYears[periodIndex]!;
  const averageDailyWage = monthlyWage * 3 / 90;
  const percentageAmount = averageDailyWage * unemploymentBenefit2026.replacementRate;
  const lowerLimit = unemploymentBenefit2026.minimumWageHourly * unemploymentBenefit2026.standardDailyHours * unemploymentBenefit2026.minimumRate;
  const dailyBenefit = Math.round(Math.min(unemploymentBenefit2026.dailyUpperLimit, Math.max(lowerLimit, percentageAmount)));
  return {
    results: [
      { label: "1일 예상 구직급여액", value: dailyBenefit, unit: "원" },
      { label: "예상 소정급여일수", value: benefitDays, unit: "일" },
      { label: "예상 총 구직급여액", value: dailyBenefit * benefitDays, unit: "원" },
      { label: "평균임금의 60%", value: Math.round(percentageAmount), unit: "원" },
      { label: "하한액 (1일 8시간 기준)", value: lowerLimit, unit: "원" },
      { label: "상한액", value: unemploymentBenefit2026.dailyUpperLimit, unit: "원" },
    ],
    note: "예상액이며 수급자격을 판정하지 않습니다. 실제 평균임금 산정, 소정근로시간, 이직 사유와 구직활동 요건 등에 따라 달라질 수 있습니다.",
  };
}

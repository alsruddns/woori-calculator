import type { CalculatorFunction, CalculatorOutcome } from "@/types/calculator-page";
import { readNumber } from "@/lib/calculators/input";
import { employeeInsurance2026 } from "@/data/policies/insurance/2026";

const won = (label: string, value: number) => ({ label, value: Math.round(value), unit: "원" });

export const calculateSocialInsurance: CalculatorFunction = (input): CalculatorOutcome => {
  const monthlyWage = readNumber(input, "monthlyWage");
  if (monthlyWage === undefined || monthlyWage <= 0) return { error: "보험료 산정 기준 월 보수는 0보다 크게 입력해 주세요.", field: "monthlyWage" };

  const pension = employeeInsurance2026.nationalPension;
  const pensionBase = Math.min(pension.maximumBase, Math.max(pension.minimumBase, Math.floor(monthlyWage / 1000) * 1000));
  const pensionAmount = pensionBase * pension.employeeRate;
  const health = employeeInsurance2026.healthInsurance;
  const healthAmount = Math.min(health.maximumTotalPremium / 2, Math.max(health.minimumTotalPremium / 2, monthlyWage * health.employeeRate));
  const care = healthAmount * employeeInsurance2026.longTermCare.incomeRate / employeeInsurance2026.longTermCare.healthRate;
  const employment = monthlyWage * employeeInsurance2026.employmentInsurance.employeeRate;
  const workersCompensation = 0;

  return {
    results: [
      won("국민연금 근로자 부담", pensionAmount),
      won("건강보험 근로자 부담", healthAmount),
      won("장기요양보험 근로자 부담", care),
      won("고용보험 근로자 부담", employment),
      won("산재보험 근로자 부담", workersCompensation),
      won("근로자 부담 합계", pensionAmount + healthAmount + care + employment),
    ],
    note: "2026년 7~12월 직장가입자 기준의 단순 예상치입니다. 비과세 보수, 자격 요건, 보험료 경감·지원, 실제 고지 단위와 정산은 반영하지 않으며 산재보험은 사업주 전액 부담으로 근로자 부담에 더하지 않았습니다.",
  };
};

export const calculatePolicySocialInsurance: CalculatorFunction = calculateSocialInsurance;

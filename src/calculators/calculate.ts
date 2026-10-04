import type { CalculatorOutcome } from "@/types/calculator-page";
import { runConversionCalculator } from "@/calculators/conversion/convert";
import { runDateLifeCalculator } from "@/calculators/date-life/date-calculate";
import { runFinanceCalculator } from "@/calculators/finance/calculate";
import { runMathCalculator } from "@/calculators/math/calculate";
import { runPolicyCalculator } from "@/calculators/policy/severance";
import { calculateSocialInsurance } from "@/calculators/policy/social-insurance";
import { runTaxCalculator } from "@/calculators/tax/calculate";

export function calculateBySlug(slug: string, input: Record<string, string>): CalculatorOutcome {
  const outcome = runMathCalculator(slug, input)
    ?? runFinanceCalculator(slug, input)
    ?? runTaxCalculator(slug, input)
    ?? runDateLifeCalculator(slug, input)
    ?? runConversionCalculator(slug, input);
  const policyOutcome = outcome ?? runPolicyCalculator(slug, input) ?? (slug === "social-insurance" ? calculateSocialInsurance(input) : undefined);
  if (!policyOutcome) return { error: "이 계산기를 찾을 수 없습니다." };
  if ("results" in policyOutcome && policyOutcome.results.some((item) => typeof item.value === "number" && !Number.isFinite(item.value))) {
    return { error: "입력값이 너무 커 결과를 계산할 수 없습니다." };
  }
  return policyOutcome;
}

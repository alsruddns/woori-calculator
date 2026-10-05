import type { CalculatorOutcome } from "@/types/calculator-page";
import { MAX_LIST_INPUT_LENGTH, MAX_MONEY, MAX_NUMBER_INPUT_LENGTH } from "@/lib/calculators/input";
import { runConversionCalculator } from "@/calculators/conversion/convert";
import { runDateLifeCalculator } from "@/calculators/date-life/date-calculate";
import { runFinanceCalculator } from "@/calculators/finance/calculate";
import { runMathCalculator } from "@/calculators/math/calculate";
import { runPolicyCalculator } from "@/calculators/policy/severance";
import { calculateSocialInsurance } from "@/calculators/policy/social-insurance";
import { runTaxCalculator } from "@/calculators/tax/calculate";

export function calculateBySlug(slug: string, input: Record<string, string>): CalculatorOutcome {
  for (const [field, raw] of Object.entries(input)) {
    const isList = field === "numbers" || field === "values" || field === "weights";
    if (raw.length > (isList ? MAX_LIST_INPUT_LENGTH : MAX_NUMBER_INPUT_LENGTH)) return { error: isList ? "목록 입력은 30,000자 이하로 입력해 주세요." : "입력값은 64자 이하로 입력해 주세요.", field };
    if (isList) continue;
    const numeric = Number(raw.replace(/,/g, "").trim());
    if (raw.trim() && Number.isFinite(numeric) && Math.abs(numeric) > MAX_MONEY) return { error: "숫자 입력은 1,000조 이하로 입력해 주세요.", field };
  }
  const outcome = runMathCalculator(slug, input)
    ?? runFinanceCalculator(slug, input)
    ?? runTaxCalculator(slug, input)
    ?? runDateLifeCalculator(slug, input)
    ?? runConversionCalculator(slug, input);
  const policyOutcome = outcome ?? runPolicyCalculator(slug, input) ?? (slug === "social-insurance" ? calculateSocialInsurance(input) : undefined);
  if (!policyOutcome) return { error: "이 계산기를 찾을 수 없습니다." };
  if ("results" in policyOutcome && policyOutcome.results.some((item) => typeof item.value === "number" && (!Number.isFinite(item.value) || (Number.isInteger(item.value) && Math.abs(item.value) > Number.MAX_SAFE_INTEGER)))) {
    return { error: "입력값이 안전한 계산 범위를 벗어났습니다. 입력 범위를 줄여 주세요." };
  }
  if ("results" in policyOutcome) {
    return {
      ...policyOutcome,
      results: policyOutcome.results.map((item) => ({
        ...item,
        value: typeof item.value === "number" && Object.is(item.value, -0) ? 0 : item.value,
      })),
    };
  }
  return policyOutcome;
}

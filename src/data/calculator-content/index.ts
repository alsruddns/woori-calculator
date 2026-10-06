import { conversionCalculatorPages } from "@/data/calculator-content/conversion";
import { dateLifeCalculatorPages } from "@/data/calculator-content/date-life";
import { financeCalculatorPages } from "@/data/calculator-content/finance";
import { mathCalculatorPages } from "@/data/calculator-content/math";
import { policyCalculatorPages } from "@/data/calculator-content/policy";
import { taxCalculatorPages } from "@/data/calculator-content/tax";
import type { CalculatorPageDefinition } from "@/types/calculator-page";

export const calculatorPages: readonly CalculatorPageDefinition[] = [
  ...mathCalculatorPages,
  ...financeCalculatorPages,
  ...taxCalculatorPages,
  ...dateLifeCalculatorPages,
  ...conversionCalculatorPages,
  ...policyCalculatorPages,
];

export const publishedCalculatorPages = calculatorPages.filter((page) => page.isPublished);

export function getCalculatorPage(slug: string) {
  return publishedCalculatorPages.find((page) => page.slug === slug);
}

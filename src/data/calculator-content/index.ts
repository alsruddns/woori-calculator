import { conversionCalculatorPages } from "@/data/calculator-content/conversion";
import { dateLifeCalculatorPages } from "@/data/calculator-content/date-life";
import { dateExtendedPages } from "@/data/calculator-content/date-extended";
import { everydayPages } from "@/data/calculator-content/everyday";
import { financeCalculatorPages } from "@/data/calculator-content/finance";
import { annualLeaveAllowancePage, extendedFinancePages, hourlyWagePage, salaryConversionPage } from "@/data/calculator-content/finance-extended";
import { employmentCalculatorPages } from "@/data/calculator-content/employment";
import { japanCalculatorPages } from "@/data/calculator-content/japan";
import { mathCalculatorPages } from "@/data/calculator-content/math";
import { mathExtendedPages } from "@/data/calculator-content/math-extended";
import { policyCalculatorPages } from "@/data/calculator-content/policy";
import { taxCalculatorPages } from "@/data/calculator-content/tax";
import type { CalculatorPageDefinition } from "@/types/calculator-page";

export const calculatorPages: readonly CalculatorPageDefinition[] = [
  ...mathCalculatorPages,
  ...mathExtendedPages,
  ...financeCalculatorPages,
  ...extendedFinancePages,
  salaryConversionPage,
  hourlyWagePage,
  annualLeaveAllowancePage,
  ...taxCalculatorPages,
  ...dateLifeCalculatorPages,
  ...dateExtendedPages,
  ...everydayPages,
  ...conversionCalculatorPages,
  ...employmentCalculatorPages,
  ...policyCalculatorPages,
  ...japanCalculatorPages,
];

export const publishedCalculatorPages = calculatorPages.filter((page) => page.isPublished);

export function getCalculatorPage(slug: string) {
  return publishedCalculatorPages.find((page) => page.slug === slug);
}

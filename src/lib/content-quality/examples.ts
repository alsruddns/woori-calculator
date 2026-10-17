import type { Locale } from "@/i18n/config";
import { formatNumber } from "@/lib/formatter/number";
import type { CalculatorPageDefinition } from "@/types/calculator-page";

export function calculatorExample(page: CalculatorPageDefinition, locale: Locale, fieldLabels: Readonly<Record<string, string>> = {}, resultLabels: Readonly<Record<string, string>> = {}, providedInput?: Readonly<Record<string, string>>, fieldUnits: Readonly<Record<string, string>> = {}) {
  const input = providedInput ?? Object.fromEntries(page.fields.map((field) => [field.name, field.defaultValue ?? (field.type === "select" ? field.options?.[0]?.value ?? "" : "0")]));
  const output = page.calculate(input);
  if (!("results" in output) || output.results.length === 0) return undefined;
  const visibleInputs = page.fields.filter((field) => input[field.name] !== undefined && field.type !== "select").slice(0, 3).map((field) => {
    const unit = fieldUnits[field.name] ?? field.unit;
    return `${fieldLabels[field.name] ?? field.label} ${formatNumber(Number(input[field.name]), 4, locale)}${unit && (locale === "ko" || !/[\uAC00-\uD7AF]/.test(unit)) ? ` ${unit}` : ""}`;
  });
  const visibleResults = output.results.slice(0, 2).map((item) => `${resultLabels[item.label] ?? item.label} ${typeof item.value === "number" ? formatNumber(item.value, item.precision ?? 2, locale) : item.value}${item.unit ? ` ${item.unit}` : ""}`);
  return { input: visibleInputs.join(", "), result: visibleResults.join("; "), primaryLabel: resultLabels[output.results[0]!.label] ?? output.results[0]!.label };
}

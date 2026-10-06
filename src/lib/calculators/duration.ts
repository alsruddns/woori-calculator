export type DurationUnit = "year" | "month";

export function normalizeDuration(value: number, unit: DurationUnit): number {
  return unit === "year" ? value * 12 : value;
}

export function durationForCalculator(slug: string): { field: "years" | "months"; inputUnit: DurationUnit } | undefined {
  if (["compound-interest", "simple-interest"].includes(slug)) return { field: "years", inputUnit: "year" };
  if (["savings-interest", "deposit-interest", "loan-interest"].includes(slug)) return { field: "months", inputUnit: "month" };
  return undefined;
}

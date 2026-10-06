import { describe, expect, it } from "vitest";
import { durationForCalculator, normalizeDuration } from "@/lib/calculators/duration";

describe("duration normalization", () => {
  it.each([[1, 12], [1.5, 18], [30, 360], [0, 0]])("normalizes %s years to months", (years, months) => {
    expect(normalizeDuration(years, "year")).toBe(months);
  });
  it.each([[1, 1], [18, 18], [360, 360]])("keeps %s month inputs in months", (months, expected) => {
    expect(normalizeDuration(months, "month")).toBe(expected);
  });
  it("only enables duration controls on numeric term calculators", () => {
    expect(durationForCalculator("loan-interest")).toEqual({ field: "months", inputUnit: "month" });
    expect(durationForCalculator("date-difference")).toBeUndefined();
  });
});

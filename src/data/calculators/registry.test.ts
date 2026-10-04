import { describe, expect, it } from "vitest";
import { calculatorRegistry, publishedCalculators } from "@/data/calculators/registry";
import { calculatorPages, getCalculatorPage } from "@/data/calculator-content";
import { calculateBySlug } from "@/calculators/calculate";

describe("calculator registry", () => {
  it("publishes only calculators with a content definition and stable unique slugs", () => {
    expect(publishedCalculators.length).toBeGreaterThanOrEqual(20);
    expect(new Set(publishedCalculators.map(({ slug }) => slug)).size).toBe(publishedCalculators.length);
    expect(publishedCalculators.every(({ isPublished }) => isPublished)).toBe(true);
    expect(calculatorRegistry.find(({ slug }) => slug === "salary")).toBeUndefined();
    expect(calculatorPages.length).toBe(32);
  });

  it("keeps related links within the published calculator set and registers calculation logic", () => {
    for (const calculator of calculatorPages) {
      expect(calculator.relatedCalculatorIds.every((slug) => getCalculatorPage(slug) !== undefined)).toBe(true);
      expect(calculateBySlug(calculator.slug, {})).toHaveProperty("error");
    }
  });
});

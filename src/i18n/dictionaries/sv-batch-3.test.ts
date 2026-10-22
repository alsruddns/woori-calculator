import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { calculateFuelCost } from "@/calculators/date-life/date-calculate";
import { svBatchThree } from "@/i18n/dictionaries/sv-batch-3";

describe("Swedish calculator translation batch three", () => {
  it("covers fifteen ratio, unit, date, health and vehicle pages with matching schemas", () => {
    const source = getDictionary("en").calculators;
    expect(Object.keys(svBatchThree)).toHaveLength(15);
    for (const [slug, page] of Object.entries(svBatchThree)) {
      const original = source[slug as keyof typeof source];
      if (!original) throw new Error(`Missing English source schema: ${slug}`);
      expect(Object.keys(page.fields).sort(), slug).toEqual(Object.keys(original.fields).sort());
      expect(Object.keys(page.options).sort(), slug).toEqual(Object.keys(original.options).sort());
      expect(Object.keys(page.resultLabels).sort(), slug).toEqual(Object.keys(original.resultLabels).sort());
      expect(page.title, slug).not.toBe(original.title);
      for (const [key, field] of Object.entries(original.fields)) expect(page.fields[key]?.label, `${slug}.${key}`).not.toBe(field.label);
    }
  });

  it("uses a fuel cost example that agrees with the calculator formula", () => {
    expect(calculateFuelCost({ distance: "300", efficiency: "15", price: "20" })).toMatchObject({ results: [{ value: 20 }, { value: 400 }] });
    expect(svBatchThree["fuel-cost"]?.example.answer).toContain("400 kr");
  });
});

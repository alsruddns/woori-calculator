import { describe, expect, it } from "vitest";
import { localizedCalculatorSlugs } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { roBatchOne } from "@/i18n/dictionaries/ro-batch-1";

describe("Romanian calculator translation batch one", () => {
  it("translates ten pages and matches every source field, option, and result key", () => {
    const english = getDictionary("en");
    expect(Object.keys(roBatchOne)).toHaveLength(10);
    for (const [slug, page] of Object.entries(roBatchOne)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(localizedCalculatorSlugs).toContain(slug);
      expect(page.title, slug).not.toBe(source.title);
      expect(page.description.length, slug).toBeGreaterThan(35);
      expect(page.faqs.length, slug).toBeGreaterThanOrEqual(2);
      expect(page.related.length, slug).toBeGreaterThan(0);
      expect(Object.keys(page.fields).sort(), slug).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort(), slug).toEqual(Object.keys(source.options).sort());
      for (const [group, values] of Object.entries(source.options)) expect(Object.keys(page.options[group] ?? {}).sort(), `${slug}.${group}`).toEqual(Object.keys(values).sort());
      expect(Object.keys(page.resultLabels).sort(), slug).toEqual(Object.keys(source.resultLabels).sort());
      for (const [field, value] of Object.entries(source.fields)) expect(page.fields[field]?.label, `${slug}.${field}`).not.toBe(value.label);
    }
  });

  it("states that the VAT calculator remains based on South Korean assumptions", () => {
    const vat = roBatchOne.vat!;
    expect(vat.howTo).toContain("Coreea de Sud");
    expect(vat.resultNote).toContain("Nu aplică legislația fiscală românească");
  });
});

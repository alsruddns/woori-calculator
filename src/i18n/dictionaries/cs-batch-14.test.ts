import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { csBatchFourteen } from "@/i18n/dictionaries/cs-batch-14";

describe("Czech calculator translation batch fourteen", () => {
  it("validates medical, utility, and South Korea policy pages against their source schemas", () => {
    const english = getDictionary("en");
    expect(Object.keys(csBatchFourteen)).toHaveLength(6);
    for (const [slug, page] of Object.entries(csBatchFourteen)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(page.title, slug).not.toBe(source.title);
      expect(Object.keys(page.fields).sort(), slug).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort(), slug).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort(), slug).toEqual(Object.keys(source.resultLabels).sort());
      for (const [key, field] of Object.entries(source.fields)) expect(page.fields[key]?.label, `${slug}.${key}`).not.toBe(field.label);
      for (const [group, options] of Object.entries(source.options)) {
        expect(Object.keys(page.options[group] ?? {}).sort(), `${slug}.${group}`).toEqual(Object.keys(options).sort());
      }
    }
    for (const slug of ["unemployment-benefit", "minimum-wage", "severance-pay", "social-insurance"] as const) {
      expect(csBatchFourteen[slug]?.description, slug).toContain("korej");
      expect(csBatchFourteen[slug]?.resultNote, slug).toContain("korej");
    }
  });
});

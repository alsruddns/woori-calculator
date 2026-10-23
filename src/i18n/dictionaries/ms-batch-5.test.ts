import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { msBatchFive } from "@/i18n/dictionaries/ms-batch-5";

describe("Malay ratio calculator translation batch five", () => {
  it("provides complete localized copy and matches shared ratio schemas", () => {
    const english = getDictionary("en");
    const expected = ["ratio", "proportion", "aspect-ratio", "scale-ratio"] as const;
    expect(Object.keys(msBatchFive).sort()).toEqual([...expected].sort());
    for (const slug of expected) {
      const page = msBatchFive[slug]!;
      const source = english.calculators[slug]!;
      expect(page.title).not.toBe(source.title);
      expect(page.description.length).toBeGreaterThan(35);
      expect(page.faqs).toHaveLength(2);
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      for (const [group, values] of Object.entries(source.options)) {
        expect(Object.keys(page.options[group] ?? {}).sort()).toEqual(Object.keys(values).sort());
      }
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
    }
  });
});

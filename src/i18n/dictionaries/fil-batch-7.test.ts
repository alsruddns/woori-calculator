import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { filBatchSeven } from "@/i18n/dictionaries/fil-batch-7";

const slugs = ["annual-leave-allowance", "withholding-tax-3-3", "unemployment-benefit", "minimum-wage", "severance-pay", "social-insurance"] as const;

describe("Filipino calculator translation batch seven", () => {
  it("translates Korean policy calculators without misrepresenting their jurisdiction", () => {
    const english = getDictionary("en");
    expect(Object.keys(filBatchSeven).sort()).toEqual([...slugs].sort());
    for (const slug of slugs) {
      const page = filBatchSeven[slug]!;
      const source = english.calculators[slug]!;
      expect(page.title).not.toBe(source.title);
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(page.resultNote).toContain("South Korea");
      expect(page.resultNote).toContain("Pilipinas");
    }
  });
});

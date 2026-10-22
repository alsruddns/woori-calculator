import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { bnBatchTwentyTwo } from "@/i18n/dictionaries/bn-batch-22";
import { bnUsCountryResultLabels } from "@/i18n/dictionaries/bn-country-page";

describe("Bengali Spain freelancer and France social contribution batch", () => {
  it("matches each page's full shared result schema", () => {
    const english = getDictionary("en");
    expect(Object.keys(bnBatchTwentyTwo)).toHaveLength(2);
    for (const [slug, page] of Object.entries(bnBatchTwentyTwo)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(bnUsCountryResultLabels).sort());
    }
    expect(bnBatchTwentyTwo["spain-freelancer-tax-calculator"]!.description).toContain("স্পেনের");
    expect(bnBatchTwentyTwo["france-social-contribution-calculator"]!.description).toContain("ফ্রান্সের");
  });
});

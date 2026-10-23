import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { bnBatchTwenty } from "@/i18n/dictionaries/bn-batch-20";
import { bnGlobalCountryResultLabels } from "@/i18n/dictionaries/bn-country-page";

describe("Bengali Italy calculator batch", () => {
  it("matches country page field, option, and result schemas", () => {
    const english = getDictionary("en");
    expect(Object.keys(bnBatchTwenty)).toHaveLength(3);
    for (const [slug, page] of Object.entries(bnBatchTwenty)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(bnGlobalCountryResultLabels).sort());
      expect(page.description).toContain("ইতালির");
    }
  });
});

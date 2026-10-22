import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { bnBatchEleven } from "@/i18n/dictionaries/bn-batch-11";
import { bnGlobalCountryResultLabels } from "@/i18n/dictionaries/bn-country-page";

describe("Bengali Germany calculator batch", () => {
  it("uses the shared country result vocabulary and matches each page schema", () => {
    const english = getDictionary("en");
    expect(Object.keys(bnBatchEleven)).toHaveLength(5);
    for (const [slug, page] of Object.entries(bnBatchEleven)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(bnGlobalCountryResultLabels).sort());
      expect(page.name).not.toBe(source.name);
      expect(page.description).toContain("জার্মানি");
    }
  });
});

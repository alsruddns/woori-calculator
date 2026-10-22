import { describe, expect, it } from "vitest";
import { localizedCalculatorSlugs } from "@/i18n/config";
import { elBatchOne } from "@/i18n/dictionaries/el-batch-1";
import { getDictionary } from "@/i18n/dictionaries";

describe("Greek calculator translation batch one", () => {
  it("contains complete Greek content and matching fields, options, and results for each page", () => {
    const english = getDictionary("en");
    expect(Object.keys(elBatchOne)).toHaveLength(8);
    for (const [slug, page] of Object.entries(elBatchOne)) {
      expect(localizedCalculatorSlugs).toContain(slug);
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(page.title).not.toBe(source.title);
      expect(page.description).not.toBe(source.description);
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(page.faqs.length).toBeGreaterThanOrEqual(2);
      expect(/[Α-Ωα-ωΆΈΉΊΌΎΏΪΫάέήίόύώϊϋΐΰ]/u.test(page.title)).toBe(true);
    }
  });
});

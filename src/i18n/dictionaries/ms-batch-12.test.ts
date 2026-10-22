import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { msBatchTwelve } from "@/i18n/dictionaries/ms-batch-12";

describe("Malay Canada, Australia, Singapore and Hong Kong calculator batch", () => {
  it("localizes the jurisdiction and preserves complete source schemas", () => {
    const english = getDictionary("en");
    const expected = ["canada-gross-net-salary-calculator", "canada-income-tax-calculator", "canada-gst-hst-calculator", "canada-cpp-ei-calculator", "canada-rrsp-calculator", "australia-gross-net-salary-calculator", "australia-income-tax-calculator", "australia-gst-calculator", "australia-superannuation-calculator", "australia-stamp-duty-calculator", "singapore-gross-net-salary-calculator", "singapore-income-tax-calculator", "singapore-cpf-calculator", "singapore-gst-calculator", "hong-kong-salary-tax-calculator", "hong-kong-mpf-calculator", "hong-kong-stamp-duty-calculator"] as const;
    expect(Object.keys(msBatchTwelve).sort()).toEqual([...expected].sort());
    for (const slug of expected) {
      const page = msBatchTwelve[slug]!;
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

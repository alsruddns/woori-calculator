import { describe, expect, it } from "vitest";
import { elBatchTwelve } from "@/i18n/dictionaries/el-batch-12";
import { getDictionary } from "@/i18n/dictionaries";

describe("Greek calculator translation batch twelve", () => {
  it("translates UAE and New Zealand policy tools with matching schemas and country basis", () => {
    const english = getDictionary("en");
    expect(Object.keys(elBatchTwelve)).toHaveLength(8);
    for (const [slug, page] of Object.entries(elBatchTwelve)) {
      const source = english.calculators[slug as keyof typeof english.calculators]!;
      expect(page.title).not.toBe(source.title);
      expect(page.description).not.toBe(source.description);
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(Object.keys(source.resultLabels).sort());
      expect(page.faqs[0]?.question).toMatch(/ελληνικό σύστημα/u);
      expect(page.faqs[0]?.answer).toMatch(/Η χώρα αναφοράς/u);
    }
  });
});

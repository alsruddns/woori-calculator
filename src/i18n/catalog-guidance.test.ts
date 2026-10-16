import { describe, expect, it } from "vitest";
import { catalogGuidance } from "@/i18n/catalog-guidance";
import { getDictionary } from "@/i18n/dictionaries";
import { locales, localePath } from "@/i18n/config";
import { publishedCalculatorPages } from "@/data/calculator-content";
import { getCalculatorPage } from "@/data/calculator-content";

describe("calculator catalog guidance", () => {
  it("explains every category in each locale and links only to public calculators", () => {
    const publicSlugs = new Set(publishedCalculatorPages.map((page) => page.slug));
    for (const locale of locales) {
      const copy = catalogGuidance(locale);
      const dictionary = getDictionary(locale);
      expect(copy.intro.length).toBeGreaterThan(20);
      expect(copy.recommended).toBeTruthy();
      expect(copy.recent).toBeTruthy();
      expect(Object.keys(copy.categories)).toEqual(["finance", "tax", "salary", "life", "date-time", "math"]);
      for (const description of Object.values(copy.categories)) expect(description.length).toBeGreaterThan(10);
      for (const slug of ["percentage", "compound-interest", "loan-interest", "bmi", "proportion", "aspect-ratio", "scale-ratio"]) {
        expect(publicSlugs.has(slug)).toBe(true);
        expect(dictionary.calculators[slug as keyof typeof dictionary.calculators]?.name ?? getCalculatorPage(slug)?.name).toBeTruthy();
        expect(localePath(locale, `/calculators/${slug}`)).toBe(`/${locale}/calculators/${slug}`);
      }
    }
  });
});

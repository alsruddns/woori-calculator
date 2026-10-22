import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { ratioCopy } from "@/i18n/dictionaries/ratio-copy";
import { locales, localePath } from "@/i18n/config";
import { getCalculatorPage } from "@/data/calculator-content";
import { localizedMetadata } from "@/lib/i18n/seo";
import { createSitemapEntries } from "@/app/sitemap";
import { FULL_LOCALE_SLUGS } from "../../../scripts/submit-indexnow.mjs";

const slugs = ["ratio", "proportion", "aspect-ratio", "scale-ratio"] as const;

describe("ratio calculator localization and SEO", () => {
  it("provides complete page, mode, field, result, examples, and FAQ text in all fifteen locales", () => {
    for (const locale of locales) {
      const copy = ratioCopy(locale);
      expect(copy.names).toHaveLength(4);
      expect(copy.titles).toHaveLength(4);
      expect(copy.descriptions).toHaveLength(4);
      expect(copy.guides).toHaveLength(4);
      expect(copy.modes).toHaveLength(7);
      expect(copy.fields).toHaveLength(20);
      expect(copy.options).toHaveLength(6);
      expect(copy.results).toHaveLength(13);
      expect(copy.faqs).toHaveLength(5);
      expect(copy.extras).toHaveLength(3);
      const dictionary = getDictionary(locale);
      for (const slug of slugs) {
        const page = dictionary.calculators[slug]!;
        const source = getCalculatorPage(slug)!;
        expect(page.name).toBeTruthy();
        expect(page.title).toBeTruthy();
        expect(page.description.length).toBeGreaterThan(15);
        expect(page.howTo).toBeTruthy();
        expect(page.example.question).toBeTruthy();
        expect(page.example.answer).toBeTruthy();
        expect(page.faqs.length).toBeGreaterThanOrEqual(2);
        expect(page.related).toContain("ratio" === slug ? "percentage" : "ratio");
        for (const field of source.fields) {
          expect(page.fields[field.name]?.label, `${locale}/${slug}/${field.name}`).toBeTruthy();
          for (const option of field.options ?? []) expect(page.options[field.name]?.[option.value], `${locale}/${slug}/${field.name}/${option.value}`).toBeTruthy();
        }
        if (locale !== "en" && locale !== "ko") {
          expect(page.title).not.toBe(getDictionary("en").calculators[slug]!.title);
          expect(page.description).not.toBe(getDictionary("en").calculators[slug]!.description);
        }
      }
    }
    expect(getDictionary("ko").calculators.ratio?.title).toBe("비율 계산기 - 비율 간소화·비례식·비율 나누기");
    expect(getDictionary("en").calculators.ratio?.title).toBe("Ratio Calculator - Simplify Ratios, Solve Proportions & Split Values");
  });

  it("publishes locale-first canonical, hreflang, sitemap and IndexNow URLs for new pages", () => {
    const urls = createSitemapEntries().map(({ url }) => url);
    expect(urls).toHaveLength(169 * 15 + 17 + 195);
    expect(new Set(urls).size).toBe(urls.length);
    for (const slug of slugs.slice(1)) {
      expect(FULL_LOCALE_SLUGS.has(slug)).toBe(true);
      for (const locale of locales) {
        const route = localePath(locale, `/calculators/${slug}`);
        expect(urls).toContain(`https://www.woori.today${route}`);
        const page = getDictionary(locale).calculators[slug]!;
        const metadata = localizedMetadata(locale, `/calculators/${slug}`, page.title, page.description);
        expect(metadata.alternates?.canonical).toBe(`https://www.woori.today${route}`);
        expect(metadata.alternates?.languages).toHaveProperty("x-default", `https://www.woori.today/ko/calculators/${slug}`);
      }
    }
    expect(urls.every((url) => !url.includes("/calculator/") && /^https:\/\/www\.woori\.today\/(?:ko|en|ja|zh|es|pt-br|de|fr|vi|id|th|zh-tw|it|nl|hi|ru|tr)\/calculators(?:\/[^/]+)?$/.test(url))).toBe(true);
  });
});

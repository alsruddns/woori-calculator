import { describe, expect, it } from "vitest";
import { publishedCalculatorPages } from "@/data/calculator-content";
import { getDictionary } from "@/i18n/dictionaries";
import { locales, routingLocales, supportedLocalesForCalculator, type SupportedLocale } from "@/i18n/config";
import { calculatorExample } from "@/lib/content-quality/examples";
import { koreanContentImprovementSlugs } from "@/i18n/dictionaries/korean-content-improvements";
import { localeContentFollowupTargets, nextBatchExampleNotes } from "@/i18n/dictionaries/locale-quality-followup";
import { calculatorContentQualitySignals } from "@/lib/content-quality/signals";

type Content = { description: string; howTo: string; formula: string; example: { question: string; answer: string }; faqs: readonly { question: string; answer: string }[]; related: readonly string[] };

describe("calculator content quality", () => {
  it("keeps every public page complete, linked, and free of exact content duplicates", () => {
    const publicSlugs = new Set(publishedCalculatorPages.map((page) => page.slug));
    const missing: string[] = [];
    const brokenLinks: string[] = [];
    const duplicateBlocks: string[] = [];
    const rawKeys: string[] = [];
    const koreanSignals: Record<string, string[]> = {};
    const localeSignals: Record<string, number> = {};
    const localeReviewLists: Record<string, Record<string, string[]>> = {};

    for (const locale of locales) {
      const dictionary = getDictionary(locale);
      const descriptions = new Map<string, string>();
      const guides = new Map<string, string>();
      const faqs = new Map<string, string>();
      const examples = new Map<string, string>();
      let flagged = 0;
      for (const page of publishedCalculatorPages) {
        const localized = dictionary.calculators[page.slug as keyof typeof dictionary.calculators];
        const content: Content = localized ?? { ...page, related: page.relatedCalculatorIds };
        const id = `${locale}/${page.slug}`;
        if (!content.description.trim() || !content.howTo.trim() || !content.formula.trim() || !content.example.question.trim() || !content.example.answer.trim() || content.faqs.length === 0) missing.push(id);
        if (content.description.length < 6 || content.howTo.length < 6 || content.formula.length < 4 || content.example.answer.length < 4) missing.push(`${id}:placeholder-like`);
        if (/^(?:__|[a-z]+(?:[A-Z][a-z]+){2,})$/.test(content.description) || /\{(?:title|slug|name)\}/.test(content.howTo)) rawKeys.push(id);
        for (const slug of content.related) if (!publicSlugs.has(slug) || slug === page.slug) brokenLinks.push(`${id} -> ${slug}`);
        for (const [name, value, map] of [["description", content.description, descriptions], ["howTo", content.howTo, guides], ["FAQ", content.faqs.map(({ question, answer }) => `${question}:${answer}`).join("|"), faqs], ["example", `${content.example.question}:${content.example.answer}`, examples]] as const) {
          const previous = map.get(value);
          if (previous) duplicateBlocks.push(`${locale}:${name}:${previous},${page.slug}`);
          else map.set(value, page.slug);
        }
        const signals = calculatorContentQualitySignals(content, locale);
        if (signals.length) flagged++;
        if (locale === "ko" && signals.length) koreanSignals[page.slug] = signals;
        if (signals.length) localeReviewLists[locale] = { ...localeReviewLists[locale], [page.slug]: signals };
      }
      localeSignals[locale] = flagged;
    }
    console.log(`Content quality signals by locale: ${JSON.stringify(localeSignals)}; Korean review list: ${JSON.stringify(koreanSignals)}; other review lists: ${JSON.stringify(Object.fromEntries(Object.entries(localeReviewLists).filter(([locale]) => locale !== "ko")))}`);
    expect(publicSlugs.size).toBe(publishedCalculatorPages.length);
    expect(koreanContentImprovementSlugs).toHaveLength(53);
    expect(koreanContentImprovementSlugs.every((slug) => publicSlugs.has(slug))).toBe(true);
    expect(Object.values(localeContentFollowupTargets).flat()).toHaveLength(305);
    expect(Object.keys(nextBatchExampleNotes).sort()).toEqual([...routingLocales].sort());
    const improvedExamples = new Set(["average", "percentage", "proportion", "unit-price", "unit-converter", "probability", "area", "decimal-fraction", "weighted-average", "workdays", "fraction", "percentile", "standard-deviation", "aspect-ratio", "scale-ratio"]);
    for (const [locale, slugs] of Object.entries(localeContentFollowupTargets)) {
      expect(slugs.every((slug) => publicSlugs.has(slug))).toBe(true);
      const localizedContent = getDictionary(locale as SupportedLocale).calculators;
      expect(slugs.every((slug) => Boolean(localizedContent[slug as keyof typeof localizedContent]))).toBe(true);
      for (const slug of ["fraction", "percentile", "standard-deviation", "aspect-ratio", "scale-ratio"]) {
        expect(localizedContent[slug as keyof typeof localizedContent]?.example.answer).toContain(nextBatchExampleNotes[locale as SupportedLocale]?.[slug]);
      }
      for (const slug of slugs) {
        if (["average", "weighted-average", "unit-price", "probability", "area", "fraction", "percentile", "standard-deviation", "aspect-ratio", "scale-ratio"].includes(slug)) {
          expect(supportedLocalesForCalculator(slug), `${locale}/${slug} route`).toContain(locale);
        }
        if (!improvedExamples.has(slug)) continue;
        const content = localizedContent[slug as keyof typeof localizedContent];
        expect(content).toBeDefined();
        expect(calculatorContentQualitySignals(content!, locale).filter((signal) => signal === "short example"), `${locale}/${slug}: ${content?.example.answer}`).toEqual([]);
      }
    }
    expect(missing).toEqual([]);
    expect(brokenLinks).toEqual([]);
    expect(rawKeys).toEqual([]);
    expect(duplicateBlocks).toEqual([]);
    expect(Object.keys(koreanSignals)).toEqual([]);
    expect(localeSignals).toEqual(Object.fromEntries(locales.map((locale) => [locale, 0])));
  });

  it("uses calculator output for country-policy examples", () => {
    const missingExamples = publishedCalculatorPages.filter((page) => page.countrySpecific && !calculatorExample(page, "en")).map((page) => page.slug);
    expect(missingExamples).toEqual([]);
  });
});

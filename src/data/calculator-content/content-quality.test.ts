import { describe, expect, it } from "vitest";
import { publishedCalculatorPages } from "@/data/calculator-content";
import { getDictionary } from "@/i18n/dictionaries";
import { locales, routingLocales, supportedLocalesForCalculator, type SupportedLocale } from "@/i18n/config";
import { calculatorExample } from "@/lib/content-quality/examples";
import { koreanContentImprovementSlugs } from "@/i18n/dictionaries/korean-content-improvements";
import { localeContentFollowupTargets, nextBatchExampleNotes, reviewedBatchExampleNotes, secondReviewedBatchExampleNotes, thirdReviewedBatchExampleNotes, fourthReviewedBatchExampleNotes, fifthReviewedBatchExampleNotes, sixthReviewedBatchExampleNotes, seventhReviewedBatchExampleNotes, eighthReviewedBatchExampleNotes, ninthReviewedBatchExampleNotes, tenthReviewedBatchExampleNotes } from "@/i18n/dictionaries/locale-quality-followup";
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
    expect(Object.keys(reviewedBatchExampleNotes).sort()).toEqual([...routingLocales].sort());
    expect(Object.keys(secondReviewedBatchExampleNotes).sort()).toEqual([...routingLocales].sort());
    expect(Object.keys(thirdReviewedBatchExampleNotes).sort()).toEqual([...routingLocales].sort());
    expect(Object.keys(fourthReviewedBatchExampleNotes).sort()).toEqual([...routingLocales].sort());
    expect(Object.keys(fifthReviewedBatchExampleNotes).sort()).toEqual([...routingLocales].sort());
    expect(Object.keys(sixthReviewedBatchExampleNotes).sort()).toEqual([...routingLocales].sort());
    expect(Object.keys(seventhReviewedBatchExampleNotes).sort()).toEqual([...routingLocales].sort());
    expect(Object.keys(eighthReviewedBatchExampleNotes).sort()).toEqual([...routingLocales].sort());
    expect(Object.keys(ninthReviewedBatchExampleNotes).sort()).toEqual([...routingLocales].sort());
    expect(Object.keys(tenthReviewedBatchExampleNotes).sort()).toEqual([...routingLocales].sort());
    const reviewedBatchSlugs = ["percentage", "ratio", "proportion", "median", "decimal-fraction"] as const;
    const secondReviewedBatchSlugs = ["change-rate", "discount", "cagr", "simple-interest", "compound-interest"] as const;
    const thirdReviewedBatchSlugs = ["date-difference", "dday", "age", "workdays", "unit-converter"] as const;
    const fourthReviewedBatchSlugs = ["fire-retirement-calculator", "dividend-growth-calculator", "inflation-adjusted-return-calculator", "position-size-calculator", "stop-loss-take-profit-calculator"] as const;
    const fifthReviewedBatchSlugs = ["stock-profit-after-fees-calculator", "loan-early-repayment-calculator", "rent-vs-buy-calculator", "electricity-cost-calculator", "travel-budget-calculator"] as const;
    for (const locale of routingLocales) {
      const localizedContent = getDictionary(locale).calculators;
      for (const slug of reviewedBatchSlugs) {
        const content = localizedContent[slug];
        expect(content, `${locale}/${slug} content`).toBeDefined();
        expect(content!.description.length, `${locale}/${slug} purpose`).toBeGreaterThan(10);
        expect(content!.howTo.length, `${locale}/${slug} input guidance`).toBeGreaterThan(10);
        expect(content!.formula.length, `${locale}/${slug} formula`).toBeGreaterThan(8);
        expect(content!.example.question.length, `${locale}/${slug} example input`).toBeGreaterThan(5);
        expect([content!.description, content!.howTo, content!.formula, content!.example.answer].join(" ")).toContain(reviewedBatchExampleNotes[locale]?.[slug]);
        expect(content!.faqs.length, `${locale}/${slug} FAQ`).toBeGreaterThanOrEqual(2);
        expect(supportedLocalesForCalculator(slug), `${locale}/${slug} public route`).toContain(locale);
      }
      for (const slug of secondReviewedBatchSlugs) {
        const content = localizedContent[slug];
        expect(content, `${locale}/${slug} content`).toBeDefined();
        expect(content!.description.length, `${locale}/${slug} purpose`).toBeGreaterThan(10);
        expect(content!.howTo.length, `${locale}/${slug} input guidance`).toBeGreaterThan(10);
        expect(content!.formula.length, `${locale}/${slug} formula`).toBeGreaterThan(8);
        expect(content!.example.question.length, `${locale}/${slug} example input`).toBeGreaterThan(5);
        expect([content!.description, content!.howTo, content!.formula, content!.example.answer].join(" ")).toContain(secondReviewedBatchExampleNotes[locale]?.[slug]);
        expect(content!.faqs.length, `${locale}/${slug} FAQ`).toBeGreaterThanOrEqual(2);
        expect(supportedLocalesForCalculator(slug), `${locale}/${slug} public route`).toContain(locale);
      }
      for (const slug of thirdReviewedBatchSlugs) {
        const content = localizedContent[slug];
        expect(content, `${locale}/${slug} content`).toBeDefined();
        expect(content!.description.length, `${locale}/${slug} purpose`).toBeGreaterThan(10);
        expect(content!.howTo.length, `${locale}/${slug} input guidance`).toBeGreaterThan(10);
        expect(content!.formula.length, `${locale}/${slug} formula`).toBeGreaterThan(8);
        expect(content!.example.question.length, `${locale}/${slug} example input`).toBeGreaterThan(5);
        expect([content!.description, content!.howTo, content!.formula, content!.example.answer].join(" ")).toContain(thirdReviewedBatchExampleNotes[locale]?.[slug]);
        expect(content!.faqs.length, `${locale}/${slug} FAQ`).toBeGreaterThanOrEqual(2);
        expect(supportedLocalesForCalculator(slug), `${locale}/${slug} public route`).toContain(locale);
      }
      for (const slug of fourthReviewedBatchSlugs) {
        const content = localizedContent[slug];
        expect(content, `${locale}/${slug} content`).toBeDefined();
        expect(content!.description.length, `${locale}/${slug} purpose`).toBeGreaterThan(10);
        expect(content!.howTo.length, `${locale}/${slug} input guidance`).toBeGreaterThan(10);
        expect(content!.formula.length, `${locale}/${slug} formula`).toBeGreaterThan(8);
        expect(content!.example.question.length, `${locale}/${slug} example input`).toBeGreaterThan(5);
        expect([content!.description, content!.howTo, content!.formula, content!.example.answer].join(" ")).toContain(fourthReviewedBatchExampleNotes[locale]?.[slug]);
        expect(content!.faqs.length, `${locale}/${slug} FAQ`).toBeGreaterThanOrEqual(2);
        expect(supportedLocalesForCalculator(slug), `${locale}/${slug} public route`).toContain(locale);
      }
      for (const slug of fifthReviewedBatchSlugs) {
        const content = localizedContent[slug];
        expect(content, `${locale}/${slug} content`).toBeDefined();
        expect(content!.description.length, `${locale}/${slug} purpose`).toBeGreaterThan(10);
        expect(content!.howTo.length, `${locale}/${slug} input guidance`).toBeGreaterThan(10);
        expect(content!.formula.length, `${locale}/${slug} formula`).toBeGreaterThan(8);
        expect(content!.example.question.length, `${locale}/${slug} example input`).toBeGreaterThan(5);
        expect([content!.description, content!.howTo, content!.formula, content!.example.answer].join(" ")).toContain(fifthReviewedBatchExampleNotes[locale]?.[slug]);
        expect(content!.faqs.length, `${locale}/${slug} FAQ`).toBeGreaterThanOrEqual(2);
        expect(supportedLocalesForCalculator(slug), `${locale}/${slug} public route`).toContain(locale);
      }
      const sixthReviewedBatchSlugs = ["freelancer-hourly-rate-calculator", "break-even-point-calculator", "savings-interest", "deposit-interest", "loan-interest"] as const;
      for (const slug of sixthReviewedBatchSlugs) {
        const content = localizedContent[slug];
        expect(content, `${locale}/${slug} content`).toBeDefined();
        expect(content!.description.length, `${locale}/${slug} purpose`).toBeGreaterThan(10);
        expect(content!.howTo.length, `${locale}/${slug} input guidance`).toBeGreaterThan(10);
        expect(content!.formula.length, `${locale}/${slug} formula`).toBeGreaterThan(8);
        expect(content!.example.question.length, `${locale}/${slug} example input`).toBeGreaterThan(5);
        expect(content!.example.answer).toContain(sixthReviewedBatchExampleNotes[locale]?.[slug]);
        expect(content!.faqs.length, `${locale}/${slug} FAQ`).toBeGreaterThanOrEqual(2);
        expect(supportedLocalesForCalculator(slug), `${locale}/${slug} public route`).toContain(locale);
      }
      const seventhReviewedBatchSlugs = ["stock-average-price", "dividend", "profit-loss", "margin", "markup"] as const;
      for (const slug of seventhReviewedBatchSlugs) {
        const content = localizedContent[slug];
        expect(content, `${locale}/${slug} content`).toBeDefined();
        expect(content!.description.length, `${locale}/${slug} purpose`).toBeGreaterThan(10);
        expect(content!.howTo.length, `${locale}/${slug} input guidance`).toBeGreaterThan(10);
        expect(content!.formula.length, `${locale}/${slug} formula`).toBeGreaterThan(8);
        expect(content!.example.question.length, `${locale}/${slug} example input`).toBeGreaterThan(5);
        expect(content!.example.answer).toContain(seventhReviewedBatchExampleNotes[locale]?.[slug]);
        expect(content!.faqs.length, `${locale}/${slug} FAQ`).toBeGreaterThanOrEqual(2);
        expect(supportedLocalesForCalculator(slug), `${locale}/${slug} public route`).toContain(locale);
      }
      const eighthReviewedBatchSlugs = ["product-margin", "salary-conversion", "bmi", "pace", "fuel-cost"] as const;
      for (const slug of eighthReviewedBatchSlugs) {
        const content = localizedContent[slug];
        expect(content, `${locale}/${slug} content`).toBeDefined();
        expect(content!.description.length, `${locale}/${slug} purpose`).toBeGreaterThan(10);
        expect(content!.howTo.length, `${locale}/${slug} input guidance`).toBeGreaterThan(10);
        expect(content!.formula.length, `${locale}/${slug} formula`).toBeGreaterThan(8);
        expect(content!.example.question.length, `${locale}/${slug} example input`).toBeGreaterThan(5);
        expect(content!.example.answer).toContain(eighthReviewedBatchExampleNotes[locale]?.[slug]);
        expect(content!.faqs.length, `${locale}/${slug} FAQ`).toBeGreaterThanOrEqual(2);
        expect(supportedLocalesForCalculator(slug), `${locale}/${slug} public route`).toContain(locale);
      }
      const ninthReviewedBatchSlugs = ["ltv", "dti", "dsr", "loan-refinance", "prepayment-fee"] as const;
      for (const slug of ninthReviewedBatchSlugs) {
        const content = localizedContent[slug];
        expect(content, `${locale}/${slug} content`).toBeDefined();
        expect(content!.description.length, `${locale}/${slug} purpose`).toBeGreaterThan(10);
        expect(content!.howTo.length, `${locale}/${slug} input guidance`).toBeGreaterThan(10);
        expect(content!.formula.length, `${locale}/${slug} formula`).toBeGreaterThan(8);
        expect(content!.example.question.length, `${locale}/${slug} example input`).toBeGreaterThan(5);
        expect(content!.example.answer).toContain(ninthReviewedBatchExampleNotes[locale]?.[slug]);
        expect(content!.faqs.length, `${locale}/${slug} FAQ`).toBeGreaterThanOrEqual(2);
        expect(supportedLocalesForCalculator(slug), `${locale}/${slug} public route`).toContain(locale);
      }
      const tenthReviewedBatchSlugs = ["loan-affordability", "hourly-wage", "fuel-efficiency", "calorie-per-serving", "trip-split"] as const;
      for (const slug of tenthReviewedBatchSlugs) {
        const content = localizedContent[slug];
        expect(content, `${locale}/${slug} content`).toBeDefined();
        expect(content!.description.length, `${locale}/${slug} purpose`).toBeGreaterThan(10);
        expect(content!.howTo.length, `${locale}/${slug} input guidance`).toBeGreaterThan(10);
        expect(content!.formula.length, `${locale}/${slug} formula`).toBeGreaterThan(8);
        expect(content!.example.question.length, `${locale}/${slug} example input`).toBeGreaterThan(5);
        expect(content!.example.answer).toContain(tenthReviewedBatchExampleNotes[locale]?.[slug]);
        expect(content!.faqs.length, `${locale}/${slug} FAQ`).toBeGreaterThanOrEqual(2);
        expect(supportedLocalesForCalculator(slug), `${locale}/${slug} public route`).toContain(locale);
      }
    }
    const improvedExamples = new Set(["average", "percentage", "proportion", "unit-price", "unit-converter", "probability", "area", "decimal-fraction", "weighted-average", "workdays", "fraction", "percentile", "standard-deviation", "aspect-ratio", "scale-ratio", "change-rate", "discount", "cagr", "simple-interest", "compound-interest", "date-difference", "dday", "age", ...fourthReviewedBatchSlugs, ...fifthReviewedBatchSlugs, "freelancer-hourly-rate-calculator", "break-even-point-calculator", "savings-interest", "deposit-interest", "loan-interest", "stock-average-price", "dividend", "profit-loss", "margin", "markup", "product-margin", "salary-conversion", "bmi", "pace", "fuel-cost", "ltv", "dti", "dsr", "loan-refinance", "prepayment-fee", "loan-affordability", "hourly-wage", "fuel-efficiency", "calorie-per-serving", "trip-split"]);
    for (const [locale, slugs] of Object.entries(localeContentFollowupTargets)) {
      expect(slugs.every((slug) => publicSlugs.has(slug))).toBe(true);
      const localizedContent = getDictionary(locale as SupportedLocale).calculators;
      expect(slugs.every((slug) => Boolean(localizedContent[slug as keyof typeof localizedContent]))).toBe(true);
      for (const slug of ["fraction", "percentile", "standard-deviation", "aspect-ratio", "scale-ratio"]) {
        expect(localizedContent[slug as keyof typeof localizedContent]?.example.answer).toContain(nextBatchExampleNotes[locale as SupportedLocale]?.[slug]);
      }
      for (const slug of slugs) {
        if (["average", "weighted-average", "unit-price", "probability", "area", "fraction", "percentile", "standard-deviation", "aspect-ratio", "scale-ratio", "percentage", "ratio", "proportion", "median", "decimal-fraction", "change-rate", "discount", "cagr", "simple-interest", "compound-interest", "date-difference", "dday", "age", "workdays", "unit-converter", ...fourthReviewedBatchSlugs, ...fifthReviewedBatchSlugs].includes(slug)) {
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

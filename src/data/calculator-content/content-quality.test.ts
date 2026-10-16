import { describe, expect, it } from "vitest";
import { publishedCalculatorPages } from "@/data/calculator-content";
import { getDictionary } from "@/i18n/dictionaries";
import { locales } from "@/i18n/config";
import { calculatorExample } from "@/lib/content-quality/examples";

type Content = { description: string; howTo: string; formula: string; example: { question: string; answer: string }; faqs: readonly { question: string; answer: string }[]; related: readonly string[] };

function qualitySignals(content: Content) {
  const issues: string[] = [];
  if (content.description.trim().length < 45) issues.push("short description");
  if (content.howTo.trim().length < 45) issues.push("short howTo");
  if (content.formula.trim().length < 25) issues.push("short formula");
  if (content.example.answer.trim().length < 30) issues.push("short example");
  if (content.faqs.length < 2) issues.push("few FAQs");
  return issues;
}

describe("calculator content quality", () => {
  it("keeps every public page complete, linked, and free of exact content duplicates", () => {
    const publicSlugs = new Set(publishedCalculatorPages.map((page) => page.slug));
    const missing: string[] = [];
    const brokenLinks: string[] = [];
    const duplicateBlocks: string[] = [];
    const rawKeys: string[] = [];
    const koreanSignals: Record<string, string[]> = {};
    const localeSignals: Record<string, number> = {};

    for (const locale of locales) {
      const dictionary = getDictionary(locale);
      const descriptions = new Map<string, string>();
      const guides = new Map<string, string>();
      const faqs = new Map<string, string>();
      let flagged = 0;
      for (const page of publishedCalculatorPages) {
        const localized = dictionary.calculators[page.slug as keyof typeof dictionary.calculators];
        const content: Content = localized ?? { ...page, related: page.relatedCalculatorIds };
        const id = `${locale}/${page.slug}`;
        if (!content.description.trim() || !content.howTo.trim() || !content.formula.trim() || !content.example.question.trim() || !content.example.answer.trim() || content.faqs.length === 0) missing.push(id);
        if (content.description.length < 6 || content.howTo.length < 6 || content.formula.length < 4 || content.example.answer.length < 4) missing.push(`${id}:placeholder-like`);
        if (/^(?:__|[a-z]+(?:[A-Z][a-z]+){2,})$/.test(content.description) || /\{(?:title|slug|name)\}/.test(content.howTo)) rawKeys.push(id);
        for (const slug of content.related) if (!publicSlugs.has(slug) || slug === page.slug) brokenLinks.push(`${id} -> ${slug}`);
        for (const [name, value, map] of [["description", content.description, descriptions], ["howTo", content.howTo, guides], ["FAQ", content.faqs.map(({ question, answer }) => `${question}:${answer}`).join("|"), faqs]] as const) {
          const previous = map.get(value);
          if (previous) duplicateBlocks.push(`${locale}:${name}:${previous},${page.slug}`);
          else map.set(value, page.slug);
        }
        const signals = qualitySignals(content);
        if (signals.length) flagged++;
        if (locale === "ko" && signals.length) koreanSignals[page.slug] = signals;
      }
      localeSignals[locale] = flagged;
    }
    console.log(`Content quality signals: ${JSON.stringify(localeSignals)}; Korean slugs: ${Object.keys(koreanSignals).length}`);
    expect(publicSlugs.size).toBe(publishedCalculatorPages.length);
    expect(missing).toEqual([]);
    expect(brokenLinks).toEqual([]);
    expect(rawKeys).toEqual([]);
    expect(duplicateBlocks).toEqual([]);
    expect(Object.keys(koreanSignals).length).toBeLessThanOrEqual(63);
  });

  it("uses calculator output for country-policy examples", () => {
    const missingExamples = publishedCalculatorPages.filter((page) => page.countrySpecific && !calculatorExample(page, "en")).map((page) => page.slug);
    expect(missingExamples).toEqual([]);
  });
});

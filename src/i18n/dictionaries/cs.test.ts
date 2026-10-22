import { describe, expect, it } from "vitest";
import { localizedCalculatorSlugs, supportedLocalesForCalculator } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localizedMetadata } from "@/lib/i18n/seo";

describe("Czech locale publication", () => {
  it("provides Czech shared UI and a Czech page for every localized calculator", () => {
    const dictionary = getDictionary("cs");
    const english = getDictionary("en");
    expect(dictionary.locale).toBe("cs");
    expect(dictionary.nav.search).toBe("Hledat kalkulačky");
    expect(dictionary.home.title).toContain("Každodenní");
    expect(Object.keys(dictionary.calculators)).toHaveLength(localizedCalculatorSlugs.length);
    for (const slug of localizedCalculatorSlugs) {
      const page = dictionary.calculators[slug];
      expect(page, slug).toBeDefined();
      expect(page!.title, slug).not.toBe(english.calculators[slug]?.title);
      expect(page!.fields, slug).toBeDefined();
      expect(page!.resultLabels, slug).toBeDefined();
    }
  });

  it("publishes canonical and hreflang metadata only for translated Czech pages", () => {
    const page = getDictionary("cs").calculators["compound-interest"]!;
    const metadata = localizedMetadata("cs", "/calculators/compound-interest", page.title, page.description, page.keywords, supportedLocalesForCalculator("compound-interest"));
    expect(metadata.alternates?.canonical).toBe("https://www.woori.today/cs/calculators/compound-interest");
    expect(metadata.alternates?.languages).toHaveProperty("cs", "https://www.woori.today/cs/calculators/compound-interest");
  });

  it("clearly keeps the VAT calculator on its South Korean 10% basis", () => {
    const page = getDictionary("cs").calculators.vat!;
    expect(page.name).toContain("korejské");
    expect(page.howTo).toContain("jihokorejskou základní sazbu 10 %");
    expect(page.faqs.some(({ answer }) => answer.includes("jazyk stránky nemění zemi"))).toBe(true);
    expect(page.resultNote).toContain("Nepoužívá české daňové předpisy");
  });
});

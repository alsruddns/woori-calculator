import { describe, expect, it } from "vitest";
import { calculateBySlug } from "@/calculators/calculate";
import { globalCountryCalculatorSlugs } from "@/data/calculator-content/country-specific-global";
import { locales, type LocalizedCalculatorSlug } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const values = (slug: string, input: Record<string, string>) => {
  const result = calculateBySlug(slug, input);
  if (!("results" in result)) throw new Error(`${slug}: ${"error" in result ? result.error : "no result"}`);
  return result.results.map(({ value }) => value);
};

describe("global country calculators", () => {
  it("registers all new pages with complete localized metadata and form labels", () => {
    expect(globalCountryCalculatorSlugs).toHaveLength(48);
    const dictionaries = Object.fromEntries(locales.map((locale) => [locale, getDictionary(locale)]));
    for (const locale of locales) for (const slug of globalCountryCalculatorSlugs) {
      const page = dictionaries[locale]!.calculators[slug as LocalizedCalculatorSlug]!;
      expect(page.name, `${locale}/${slug} name`).toBeTruthy();
      expect(page.title, `${locale}/${slug} title`).toBeTruthy();
      expect(page.description, `${locale}/${slug} description`).toBeTruthy();
      expect(page.howTo, `${locale}/${slug} intro`).toBeTruthy();
      expect(page.formula, `${locale}/${slug} formula`).toBeTruthy();
      expect(page.example.question, `${locale}/${slug} example`).toBeTruthy();
      expect(page.faqs.length, `${locale}/${slug} FAQ`).toBeGreaterThan(0);
      expect(Object.keys(page.fields).length, `${locale}/${slug} fields`).toBeGreaterThan(0);
      if (locale !== "en") expect(page.name).not.toBe(dictionaries.en!.calculators[slug as LocalizedCalculatorSlug]?.name);
    }
  });

  it("uses locale text for calculator, sidebar and shared actions", () => {
    const ko = getDictionary("ko");
    const en = getDictionary("en");
    const ja = getDictionary("ja");
    expect(ko.calculators["us-401k-calculator"]!.name).toContain("미국");
    expect(ko.common.calculate).toBe("계산하기");
    expect(ko.common.reset).toBe("초기화");
    expect(en.calculators["us-401k-calculator"]!.name).toContain("United States");
    expect(en.common.calculate).toBe("Calculate");
    expect(ja.calculators["us-401k-calculator"]!.name).toContain("米国");
    for (const locale of locales) {
      const page = getDictionary(locale).calculators["uk-gross-net-salary-calculator"]!;
      expect(page.name).toBeTruthy();
      expect(page.shortName).toBe(page.name);
    }
  });

  it("calculates progressive tax, caps, matched retirement savings and locale independent policy", () => {
    expect(values("us-income-tax-calculator", { income: "0", filingStatus: "single" })[1]).toBe(0);
    expect(values("us-income-tax-calculator", { income: "12400", filingStatus: "single" })[1]).toBe(0);
    expect(values("us-income-tax-calculator", { income: "28500", filingStatus: "single" })[1]).toBe(1240);
    expect(values("us-401k-calculator", { annualSalary: "100000", annualContribution: "30000", matchRate: "50", matchCap: "6", rate: "0", years: "1" })[0]).toBe(24500);
    expect(values("hong-kong-mpf-calculator", { income: "50000" })[0]).toBe(1500);
    expect(values("hong-kong-salary-tax-calculator", { income: "500000" })).toHaveLength(4);
    expect(values("singapore-cpf-calculator", { income: "10000", age: "35" })[0]).toBe(1600);
    expect(values("australia-superannuation-calculator", { annualSalary: "100000", annualContribution: "6000", employerRate: "12", rate: "0", years: "1" })[1]).toBe(12000);
    const monthly = values("uk-gross-net-salary-calculator", { salary: "5000", frequency: "monthly" });
    const annual = values("uk-gross-net-salary-calculator", { salary: "60000", frequency: "annual" });
    expect(monthly[0]).toBe(annual[0]);
    expect(monthly[4]).toBe(annual[4]);
    expect(values("uae-vat-calculator", { amount: "100", rate: "5", direction: "exclusive" })[1]).toBe(5);
    expect(values("canada-gst-hst-calculator", { amount: "100", rate: "5", direction: "exclusive" })).toEqual([100, 5, 105]);
    expect(values("australia-gst-calculator", { amount: "100", rate: "10", direction: "exclusive" })).toEqual([100, 10, 110]);
    expect(values("singapore-gst-calculator", { amount: "100", rate: "9", direction: "exclusive" })).toEqual([100, 9, 109]);
    expect(values("new-zealand-gst-calculator", { amount: "100", rate: "15", direction: "exclusive" })).toEqual([100, 15, 115]);
    expect(values("australia-income-tax-calculator", { income: "80000" })).toEqual([80000, 14520, 18.15]);
    expect(values("australia-superannuation-calculator", { annualSalary: "100000", annualContribution: "6000", employerRate: "12", rate: "0", years: "1" })).toEqual([6000, 12000, 0, 18000]);
    expect(values("singapore-cpf-calculator", { salary: "6000", age: "35" })).toEqual([1200, 1020, 2220]);
  });
});

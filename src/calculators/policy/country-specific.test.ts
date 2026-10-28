import { describe, expect, it } from "vitest";
import { calculateBySlug } from "@/calculators/calculate";
import { countrySpecificCalculatorSlugs } from "@/data/calculator-content/country-specific";
import { countryRates } from "@/data/country-rates";

const values = (slug: string, input: Record<string, string>) => {
  const result = calculateBySlug(slug, input);
  if (!("results" in result)) throw new Error(`Expected results for ${slug}, received ${result.error}`);
  return result.results.map(({ value }) => Number(value));
};

describe("country-specific calculator models", () => {
  it("registers every requested calculator with an explicit country basis", () => {
    expect(countrySpecificCalculatorSlugs).toHaveLength(42);
    for (const slug of countrySpecificCalculatorSlugs) {
      const country = slug.split("-")[0]!;
      expect(countryRates).toHaveProperty(({ germany: "DE", spain: "ES", france: "FR", netherlands: "NL", india: "IN", brazil: "BR", vietnam: "VN", china: "CN", taiwan: "TW", italy: "IT" })[country]!);
      expect(calculateBySlug(slug, {})).toHaveProperty("error");
    }
  });

  it("calculates tax-inclusive/exclusive VAT, zero input, and invalid rates", () => {
    expect(values("germany-vat-calculator", { amount: "100", rate: "19", direction: "exclusive" })).toEqual([100, 19, 119]);
    expect(values("germany-vat-calculator", { amount: "119", rate: "19", direction: "inclusive" })).toEqual([100, 19, 119]);
    expect(values("uk-vat-calculator", { amount: "100", rate: "20", direction: "exclusive" })).toEqual([100, 20, 120]);
    expect(values("uk-vat-calculator", { amount: "120", rate: "20", direction: "inclusive" })).toEqual([100, 20, 120]);
    expect(values("italy-vat-calculator", { amount: "0", rate: "22", direction: "exclusive" })).toEqual([0, 0, 0]);
    expect(calculateBySlug("china-vat-calculator", { amount: "100", rate: "101", direction: "exclusive" })).toHaveProperty("error");
  });

  it("applies the German 2026 income-tax formula at bracket boundaries and high income", () => {
    expect(values("germany-income-tax-calculator", { income: "0" })[1]).toBe(0);
    expect(values("germany-income-tax-calculator", { income: "12348" })[1]).toBe(0);
    expect(values("germany-income-tax-calculator", { income: "17799" })[1]).toBeGreaterThan(0);
    expect(values("germany-income-tax-calculator", { income: "69878" })[1]).toBeGreaterThan(10000);
    expect(values("germany-income-tax-calculator", { income: "500000" })[1]).toBeGreaterThan(200000);
  });

  it("keeps annual and monthly salary projections consistent", () => {
    const annual = values("netherlands-gross-net-salary-calculator", { salary: "60000", frequency: "annual", socialRate: "0" });
    const monthly = values("netherlands-gross-net-salary-calculator", { salary: "5000", frequency: "monthly", socialRate: "0" });
    expect(monthly[0]).toBe(annual[0]);
    expect(monthly[3]).toBe(annual[3]);
    expect(monthly[4]).toBe(annual[4]);
  });

  it("uses Spain severance inputs and rounds the final result to cents", () => {
    const result = values("spain-severance-pay-calculator", { salary: "2500", years: "5", daysPerYear: "20" });
    expect(result[2]).toBe(8219.18);
    expect(values("spain-severance-pay-calculator", { salary: "0", years: "0", daysPerYear: "12" })[2]).toBe(0);
  });

  it("calculates Brazil progressive INSS/IRRF and the FGTS employer deposit separately", () => {
    expect(values("brazil-inss-calculator", { salary: "0" })[0]).toBe(0);
    expect(values("brazil-inss-calculator", { salary: "100000" })[0]).toBe(988.09);
    expect(values("brazil-irrf-calculator", { salary: "5000" })[0]).toBe(0);
    expect(values("brazil-fgts-calculator", { salary: "3000" })).toEqual([240, 2880]);
  });

  it("prorates the Brazil 13th-salary gross estimate over the entered months", () => {
    expect(values("brazil-thirteenth-salary-calculator", { salary: "3000", months: "7" })).toEqual([1750, 7]);
    expect(values("brazil-thirteenth-salary-calculator", { salary: "3000", months: "0" })).toEqual([0, 0]);
    expect(values("brazil-thirteenth-salary-calculator", { salary: "3000", months: "12" })).toEqual([3000, 12]);
    expect(calculateBySlug("brazil-thirteenth-salary-calculator", { salary: "3000", months: "13" })).toHaveProperty("error");
  });

  it("separates India investment return scenarios from tax treatment", () => {
    expect(values("india-ppf-calculator", { monthlyDeposit: "0", rate: "7.1", years: "15" })).toEqual([0, 0, 0]);
    const projection = values("india-sip-calculator", { monthlyDeposit: "1000", rate: "8", years: "10" });
    expect(projection[0]).toBe(120000);
    expect(projection[1]).toBeGreaterThan(0);
    expect(projection[2]).toBe(projection[0] + projection[1]);
    expect(values("india-income-tax-calculator", { income: "1200000" })[1]).toBe(0);
  });

  it("applies the India new-regime salary standard deduction only to gross-net salary income", () => {
    expect(countryRates.IN?.annualStandardDeduction).toBe(75000);
    expect(values("india-gross-net-salary-calculator", { salary: "50000", frequency: "annual", socialRate: "0" })).toEqual([50000, 0, 0, 50000, 4166.67]);
    expect(values("india-gross-net-salary-calculator", { salary: "75000", frequency: "annual", socialRate: "0" })).toEqual([75000, 0, 0, 75000, 6250]);
    const example = values("india-gross-net-salary-calculator", { salary: "1500000", frequency: "annual", socialRate: "0" });
    expect(example).toEqual([1500000, 93750, 0, 1406250, 117187.5]);
    expect(values("india-gross-net-salary-calculator", { salary: "125000", frequency: "monthly", socialRate: "0" })).toEqual(example);
    expect(values("india-income-tax-calculator", { income: "1500000" })[1]).toBe(105000);
  });

  it("rejects negative, excessive and out-of-range inputs without non-finite output", () => {
    expect(calculateBySlug("france-overtime-pay-calculator", { salary: "20", hours: "-1", multiplier: "1.5" })).toHaveProperty("error");
    expect(calculateBySlug("india-ppf-calculator", { monthlyDeposit: "1", rate: "8", years: "61" })).toHaveProperty("error");
    expect(calculateBySlug("germany-income-tax-calculator", { income: "999999999999999999999999" })).toHaveProperty("error");
  });
});

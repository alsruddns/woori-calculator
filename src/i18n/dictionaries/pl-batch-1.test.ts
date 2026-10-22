import { describe, expect, it } from "vitest";
import { getDictionary } from "@/i18n/dictionaries";
import { plBatchOne } from "@/i18n/dictionaries/pl-batch-1";
import { plBatchTwo } from "@/i18n/dictionaries/pl-batch-2";
import { plBatchThree } from "@/i18n/dictionaries/pl-batch-3";
import { plBatchFour } from "@/i18n/dictionaries/pl-batch-4";
import { plBatchFive } from "@/i18n/dictionaries/pl-batch-5";
import { plBatchSix } from "@/i18n/dictionaries/pl-batch-6";
import { plBatchSeven } from "@/i18n/dictionaries/pl-batch-7";
import { plBatchEight } from "@/i18n/dictionaries/pl-batch-8";
import { plBatchNine } from "@/i18n/dictionaries/pl-batch-9";
import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";

const slugs = ["compound-interest", "percentage", "discount", "date-difference", "age", "area", "average", "weighted-average", "bmi", "cagr", "change-rate", "simple-interest", "savings-interest", "median", "percentile"] as const;
const slugsTwo = ["probability", "fraction", "decimal-fraction", "unit-price", "unit-converter", "dday", "workdays", "time-arithmetic", "tip-calculator", "trip-split", "fuel-efficiency", "vehicle-cost", "taxi-fare", "dividend", "profit-loss"] as const;
const slugsThree = ["loan-interest", "deposit-interest", "loan-refinance", "prepayment-fee", "loan-affordability", "ltv", "dti", "dsr", "break-even-point-calculator", "inflation-adjusted-return-calculator", "fuel-cost", "salary-conversion", "hourly-wage", "tenure", "pregnancy"] as const;
const slugsFour = ["vat", "ratio", "proportion", "aspect-ratio", "scale-ratio", "margin", "markup", "pace", "calorie-per-serving", "standard-deviation", "stock-average-price", "annual-leave-allowance", "product-margin", "withholding-tax-3-3", "utility-bill"] as const;
const slugsFive = ["unemployment-benefit", "minimum-wage", "severance-pay", "social-insurance", "japan-consumption-tax-calculator", "japan-annual-salary-calculator", "japan-monthly-salary-calculator", "japan-overtime-pay-calculator", "japan-night-holiday-pay-calculator", "germany-gross-net-salary-calculator", "germany-income-tax-calculator", "germany-vat-calculator", "germany-overtime-pay-calculator", "germany-vacation-pay-calculator", "spain-gross-net-salary-calculator"] as const;
const slugsSix = ["spain-irpf-calculator", "spain-vat-calculator", "spain-severance-pay-calculator", "france-gross-net-salary-calculator", "france-income-tax-calculator", "france-vat-calculator", "france-overtime-pay-calculator", "netherlands-gross-net-salary-calculator", "netherlands-vat-calculator", "netherlands-30-percent-ruling-calculator", "netherlands-holiday-allowance-calculator", "india-gst-calculator", "india-sip-calculator", "india-ppf-calculator", "india-nps-calculator"] as const;
const slugsSeven = ["india-gross-net-salary-calculator", "india-income-tax-calculator", "brazil-gross-net-salary-calculator", "brazil-inss-calculator", "brazil-irrf-calculator", "brazil-fgts-calculator", "brazil-thirteenth-salary-calculator", "vietnam-gross-net-salary-calculator", "vietnam-personal-income-tax-calculator", "vietnam-social-insurance-calculator", "china-gross-net-salary-calculator", "china-individual-income-tax-calculator", "china-social-insurance-calculator", "china-vat-calculator", "taiwan-gross-net-salary-calculator"] as const;
const slugsEight = ["taiwan-income-tax-calculator", "taiwan-labor-insurance-calculator", "taiwan-vat-calculator", "italy-gross-net-salary-calculator", "italy-income-tax-calculator", "italy-vat-calculator", "us-paycheck-calculator", "us-income-tax-calculator", "us-sales-tax-calculator", "us-401k-calculator", "us-roth-ira-calculator", "us-capital-gains-tax-calculator", "uk-gross-net-salary-calculator", "uk-income-tax-calculator", "uk-national-insurance-calculator"] as const;
const slugsNine = ["uk-vat-calculator", "uk-stamp-duty-calculator", "uk-pension-calculator", "canada-gross-net-salary-calculator", "canada-income-tax-calculator", "canada-gst-hst-calculator", "canada-cpp-ei-calculator", "canada-rrsp-calculator", "australia-gross-net-salary-calculator", "australia-income-tax-calculator", "australia-gst-calculator", "australia-superannuation-calculator", "australia-stamp-duty-calculator", "singapore-gross-net-salary-calculator", "singapore-income-tax-calculator"] as const;

describe("Polish calculator translation batch one", () => {
  it("contains complete Polish page content and matching source form/result keys", () => {
    const english = getDictionary("en");
    expect(Object.keys(plBatchOne).sort()).toEqual([...slugs].sort());
    expect(Object.keys(plBatchTwo).sort()).toEqual([...slugsTwo].sort());
    expect(Object.keys(plBatchThree).sort()).toEqual([...slugsThree].sort());
    expect(Object.keys(plBatchFour).sort()).toEqual([...slugsFour].sort());
    expect(Object.keys(plBatchFive).sort()).toEqual([...slugsFive].sort());
    expect(Object.keys(plBatchSix).sort()).toEqual([...slugsSix].sort());
    expect(Object.keys(plBatchSeven).sort()).toEqual([...slugsSeven].sort());
    expect(Object.keys(plBatchEight).sort()).toEqual([...slugsEight].sort());
    expect(Object.keys(plBatchNine).sort()).toEqual([...slugsNine].sort());
    const entries = [
      ...slugs.map((slug) => [slug, plBatchOne[slug]] as const),
      ...slugsTwo.map((slug) => [slug, plBatchTwo[slug]] as const),
      ...slugsThree.map((slug) => [slug, plBatchThree[slug]] as const),
      ...slugsFour.map((slug) => [slug, plBatchFour[slug]] as const),
      ...slugsFive.map((slug) => [slug, plBatchFive[slug]] as const),
      ...slugsSix.map((slug) => [slug, plBatchSix[slug]] as const),
      ...slugsSeven.map((slug) => [slug, plBatchSeven[slug]] as const),
      ...slugsEight.map((slug) => [slug, plBatchEight[slug]] as const),
      ...slugsNine.map((slug) => [slug, plBatchNine[slug]] as const),
    ];
    for (const [slug, content] of entries) {
      const page: LocalizedCalculatorContent = content!;
      const source = english.calculators[slug]!;
      expect(page.title, slug).toBeTruthy();
      expect(page.title, slug).not.toBe(source.title);
      expect(page.description, slug).not.toBe(source.description);
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      for (const [field, value] of Object.entries(page.fields)) expect(value.label, `${slug}.${field}`).not.toBe(source.fields[field]?.label);
      for (const [field, options] of Object.entries(source.options)) {
        expect(Object.keys(page.options[field] ?? {}).sort()).toEqual(Object.keys(options).sort());
      }
      expect(Object.keys(page.resultLabels).sort()).toEqual(expect.arrayContaining(Object.keys(source.resultLabels).sort()));
      expect(page.faqs.length).toBeGreaterThan(0);
      expect(page.howTo).toBeTruthy();
      expect(page.formula).toBeTruthy();
      expect(page.validation).toBeTruthy();
      expect(page.resultNote).toBeTruthy();
    }
  });
});

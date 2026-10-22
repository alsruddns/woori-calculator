import { describe, expect, it } from "vitest";
import { calculatorRegistry, publishedCalculators } from "@/data/calculators/registry";
import { calculatorPages, getCalculatorPage, publishedCalculatorPages } from "@/data/calculator-content";
import { calculateBySlug } from "@/calculators/calculate";
import { createPageMetadata } from "@/lib/seo/metadata";
import { calculatorCategories, calculatorCategoryOrder } from "@/data/calculators/categories";
import { matchesCalculatorSearch } from "@/lib/i18n/search";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocalizedCalculator, locales, missingCalculatorTranslationReport, phaseFiveTranslatedCalculatorSlugs, phaseSixTranslatedCalculatorSlugs, phaseFourTranslatedCalculatorSlugs, phaseOneTranslatedCalculatorSlugs, phaseThreeTranslatedCalculatorSlugs, phaseTwoTranslatedCalculatorSlugs, phaseTranslatedCalculatorSlugs, supportedLocalesForCalculator } from "@/i18n/config";
import { siteConfig } from "@/constants/site-config";

describe("calculator registry", () => {
  it("publishes only calculators with a content definition and stable unique slugs", () => {
    expect(publishedCalculators.length).toBeGreaterThanOrEqual(20);
    expect(new Set(publishedCalculators.map(({ slug }) => slug)).size).toBe(publishedCalculators.length);
    expect(publishedCalculators.every(({ isPublished }) => isPublished)).toBe(true);
    expect(calculatorRegistry.find(({ slug }) => slug === "salary")).toBeUndefined();
    expect(calculatorPages.length).toBe(169);
  });

  it("provides all fifteen locale routes for every published calculator", () => {
    const missing = publishedCalculators.filter(({ isPublished, slug }) => isPublished && !hasLocalizedCalculator(slug)).map(({ slug }) => slug);
    expect(missing, `Published calculators missing locale content: ${missing.join(", ")}`).toEqual([]);
  });

  it("validates complete fifteen-locale coverage across the full published registry", () => {
    const slugs = publishedCalculators.map(({ slug }) => slug);
    expect(phaseOneTranslatedCalculatorSlugs).toHaveLength(10);
    expect(phaseTwoTranslatedCalculatorSlugs).toHaveLength(10);
    expect(phaseThreeTranslatedCalculatorSlugs).toHaveLength(39);
    expect(phaseThreeTranslatedCalculatorSlugs.every((slug) => slugs.includes(slug))).toBe(true);
    expect(phaseFourTranslatedCalculatorSlugs).toHaveLength(5);
    expect(phaseFiveTranslatedCalculatorSlugs).toHaveLength(42);
    expect(phaseSixTranslatedCalculatorSlugs).toHaveLength(48);
    const missing = missingCalculatorTranslationReport(slugs);
    expect(missing, `Missing published calculator translations:\n${missing.join("\n")}`).toEqual([]);
    expect(phaseTranslatedCalculatorSlugs).toHaveLength(169);
    expect([...phaseTranslatedCalculatorSlugs].sort()).toEqual([...slugs].sort());
    const russianPages = ["compound-interest", "percentage", "discount", "date-difference", "age", "area", "average", "weighted-average", "bmi", "cagr", "change-rate", "simple-interest", "savings-interest", "median", "percentile", "probability", "fraction", "decimal-fraction", "unit-price", "unit-converter", "dday", "workdays", "time-arithmetic", "tip-calculator", "trip-split", "fuel-efficiency", "vehicle-cost", "taxi-fare", "dividend", "profit-loss", "margin", "markup", "calorie-per-serving", "loan-interest", "deposit-interest", "loan-refinance", "prepayment-fee", "loan-affordability", "ltv", "dti", "dsr", "break-even-point-calculator", "inflation-adjusted-return-calculator", "fuel-cost", "salary-conversion", "hourly-wage", "tenure", "pregnancy", "fire-retirement-calculator", "dividend-growth-calculator", "stock-profit-after-fees-calculator", "position-size-calculator", "freelancer-hourly-rate-calculator", "ratio", "proportion", "aspect-ratio", "scale-ratio", "vat", "pace", "standard-deviation", "stock-average-price", "stop-loss-take-profit-calculator", "loan-early-repayment-calculator", "rent-vs-buy-calculator", "electricity-cost-calculator", "travel-budget-calculator", "product-margin", "withholding-tax-3-3", "annual-leave-allowance", "utility-bill", "unemployment-benefit", "minimum-wage", "severance-pay", "social-insurance", "japan-consumption-tax-calculator", "japan-annual-salary-calculator", "japan-monthly-salary-calculator", "japan-overtime-pay-calculator", "japan-night-holiday-pay-calculator", "germany-gross-net-salary-calculator", "germany-income-tax-calculator", "germany-vat-calculator", "germany-overtime-pay-calculator", "germany-vacation-pay-calculator", "spain-gross-net-salary-calculator", "spain-irpf-calculator", "spain-vat-calculator", "spain-severance-pay-calculator", "france-gross-net-salary-calculator", "france-income-tax-calculator", "france-vat-calculator", "france-overtime-pay-calculator", "netherlands-gross-net-salary-calculator", "netherlands-vat-calculator", "netherlands-30-percent-ruling-calculator", "netherlands-holiday-allowance-calculator", "india-gst-calculator", "india-sip-calculator", "india-ppf-calculator", "india-nps-calculator", "india-gross-net-salary-calculator", "india-income-tax-calculator", "brazil-gross-net-salary-calculator", "brazil-inss-calculator", "brazil-irrf-calculator", "brazil-fgts-calculator", "brazil-thirteenth-salary-calculator", "vietnam-gross-net-salary-calculator", "vietnam-personal-income-tax-calculator", "vietnam-social-insurance-calculator", "china-gross-net-salary-calculator", "china-individual-income-tax-calculator", "china-social-insurance-calculator", "china-vat-calculator"];
    for (const slug of phaseTranslatedCalculatorSlugs) expect(supportedLocalesForCalculator(slug)).toEqual(russianPages.includes(slug) ? [...locales, "ru"] : locales);
  });

  it("keeps related links within the published calculator set and registers calculation logic", () => {
    for (const calculator of calculatorPages) {
      expect(calculator.relatedCalculatorIds.every((slug) => getCalculatorPage(slug) !== undefined)).toBe(true);
      expect(calculator.relatedCalculatorIds).not.toContain(calculator.slug);
      expect(new Set(calculator.relatedCalculatorIds).size).toBe(calculator.relatedCalculatorIds.length);
      expect(calculateBySlug(calculator.slug, {})).toHaveProperty("error");
    }
    expect(calculateBySlug("percentage", { a: "1e308", b: "100", mode: "of" })).toHaveProperty("error");
  });

  it("keeps public content, metadata, category, canonical path, and sitemap inputs coherent", () => {
    const ids = calculatorPages.map(({ id }) => id);
    const slugs = calculatorPages.map(({ slug }) => slug);
    const titles = calculatorPages.map(({ title }) => title.trim().toLocaleLowerCase("ko-KR"));
    const descriptions = calculatorPages.map(({ description }) => description.trim().toLocaleLowerCase("ko-KR"));
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);

    for (const page of publishedCalculatorPages) {
      expect(page.name.trim()).not.toBe("");
      expect(page.description.trim().length).toBeGreaterThan(20);
      expect(page.howTo.trim()).not.toBe("");
      expect(page.formula.trim()).not.toBe("");
      expect(page.example.question.trim()).not.toBe("");
      expect(page.example.answer.trim()).not.toBe("");
      expect(page.faqs.length).toBeGreaterThan(0);
      expect(page.fields.length).toBeGreaterThan(0);
      expect(createPageMetadata({ title: page.title, description: page.description, path: `/calculators/${page.slug}` }).alternates?.canonical).toBe(`${siteConfig.url}/ko/calculators/${page.slug}`);
    }
    const dateLifeSlugs = ["date-difference", "dday", "age", "workdays", "bmi", "area", "pace", "fuel-cost", "fuel-efficiency", "calorie-per-serving"];
    const dateLife = calculatorPages.filter(({ slug }) => dateLifeSlugs.includes(slug));
    expect(new Set(dateLife.map(({ formula }) => formula)).size).toBe(dateLife.length);
    expect(getCalculatorPage("fuel-efficiency")?.relatedCalculatorIds).toContain("fuel-cost");
    expect(getCalculatorPage("fuel-cost")?.relatedCalculatorIds).toContain("fuel-efficiency");
  });

  it("uses the shared category order and keeps the Korean loan and stock calculator names consistent", () => {
    expect(calculatorCategoryOrder).toEqual(["finance", "tax", "salary", "life", "date-time", "math"]);
    expect(new Set(calculatorCategoryOrder).size).toBe(Object.keys(calculatorCategories).length);
    expect(calculatorCategories.math).toBe("수학·도구");
    for (const locale of locales) expect(getDictionary(locale).categoriesOrder).toEqual(calculatorCategoryOrder);

    const loan = getCalculatorPage("loan-interest")!;
    expect(loan.name).toBe("대출 이자 계산기");
    expect(loan.shortName).toBe("대출 이자");
    expect(loan.title).toContain("대출 이자 계산기");
    expect(loan.keywords).toContain("대출 이자 계산기");
    expect(matchesCalculatorSearch({ name: loan.name, slug: loan.slug, keywords: loan.keywords }, "대출 이자 계산기")).toBe(true);
    expect(createPageMetadata({ title: loan.title, description: loan.description, path: `/calculators/${loan.slug}` }).alternates?.canonical).toBe(`${siteConfig.url}/ko/calculators/loan-interest`);

    const stock = getCalculatorPage("stock-average-price")!;
    expect(stock.name).toBe("주식·코인 물타기 계산기");
    expect(stock.shortName).toBe("주식·코인 물타기");
    expect(stock.title).toContain("주식·코인 물타기 계산기");
    expect(stock.description).toContain("주식·코인");
    expect(stock.keywords).toContain("주식·코인 물타기 계산기");
    expect(matchesCalculatorSearch({ name: stock.name, slug: stock.slug, keywords: stock.keywords }, "코인 물타기 계산기")).toBe(true);
    expect(createPageMetadata({ title: stock.title, description: stock.description, path: `/calculators/${stock.slug}` }).alternates?.canonical).toBe(`${siteConfig.url}/ko/calculators/stock-average-price`);
  });
});

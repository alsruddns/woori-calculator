import { describe, expect, it } from "vitest";
import { calculatorRegistry, publishedCalculators } from "@/data/calculators/registry";
import { calculatorPages, getCalculatorPage, publishedCalculatorPages } from "@/data/calculator-content";
import { calculateBySlug } from "@/calculators/calculate";
import { createPageMetadata } from "@/lib/seo/metadata";
import { calculatorCategories, calculatorCategoryOrder } from "@/data/calculators/categories";
import { matchesCalculatorSearch } from "@/lib/i18n/search";
import { getDictionary } from "@/i18n/dictionaries";
import { locales } from "@/i18n/config";

describe("calculator registry", () => {
  it("publishes only calculators with a content definition and stable unique slugs", () => {
    expect(publishedCalculators.length).toBeGreaterThanOrEqual(20);
    expect(new Set(publishedCalculators.map(({ slug }) => slug)).size).toBe(publishedCalculators.length);
    expect(publishedCalculators.every(({ isPublished }) => isPublished)).toBe(true);
    expect(calculatorRegistry.find(({ slug }) => slug === "salary")).toBeUndefined();
    expect(calculatorPages.length).toBe(35);
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
      expect(createPageMetadata({ title: page.title, description: page.description, path: `/calculators/${page.slug}` }).alternates?.canonical).toContain(`/calculators/${page.slug}`);
    }
    const dateLifeSlugs = ["date-difference", "dday", "age", "workdays", "bmi", "area", "pace", "fuel-cost", "calorie-per-serving"];
    const dateLife = calculatorPages.filter(({ slug }) => dateLifeSlugs.includes(slug));
    expect(new Set(dateLife.map(({ formula }) => formula)).size).toBe(dateLife.length);
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
    expect(createPageMetadata({ title: loan.title, description: loan.description, path: `/calculators/${loan.slug}` }).alternates?.canonical).toContain("/calculators/loan-interest");

    const stock = getCalculatorPage("stock-average-price")!;
    expect(stock.name).toBe("주식·코인 물타기 계산기");
    expect(stock.shortName).toBe("주식·코인 물타기");
    expect(stock.title).toContain("주식·코인 물타기 계산기");
    expect(stock.description).toContain("주식·코인");
    expect(stock.keywords).toContain("주식·코인 물타기 계산기");
    expect(matchesCalculatorSearch({ name: stock.name, slug: stock.slug, keywords: stock.keywords }, "코인 물타기 계산기")).toBe(true);
    expect(createPageMetadata({ title: stock.title, description: stock.description, path: `/calculators/${stock.slug}` }).alternates?.canonical).toContain("/calculators/stock-average-price");
  });
});

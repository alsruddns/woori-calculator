import { describe, expect, it } from "vitest";
import { calculateAverage, calculateCagr, calculateChangeRate, calculateDiscount, calculatePercentage, calculateRatio, calculateWeightedAverage } from "@/calculators/math/calculate";

describe("math calculator functions", () => {
  it("handles percent modes and zero baseline validation", () => {
    expect(calculatePercentage({ a: "120", b: "25", mode: "of" })).toMatchObject({ results: [{ value: 30 }] });
    expect(calculatePercentage({ a: "123456789", b: "5", mode: "of" })).toMatchObject({ results: [{ value: 6172839.45 }] });
    expect(calculatePercentage({ a: "25", b: "0", mode: "what-percent" })).toHaveProperty("error");
    expect(calculatePercentage({ a: "100", b: "10", mode: "decrease" })).toMatchObject({ results: [{ value: 90 }] });
  });

  it("rounds discount to whole won and computes actual discount rate", () => {
    expect(calculateDiscount({ price: "50000", rate: "20", mode: "rate" })).toMatchObject({ results: [{ value: 10000 }, { value: 40000 }] });
    expect(calculateDiscount({ price: "50000", sale: "40000", mode: "actual" })).toMatchObject({ results: [{ value: 10000 }, { value: 20 }] });
  });

  it("reports signed changes with a positive magnitude", () => {
    expect(calculateChangeRate({ old: "200", current: "150" })).toMatchObject({ results: [{ label: "감소량", value: 50 }, { label: "감소율", value: -25 }] });
  });

  it("simplifies ratios and calculates weighted values", () => {
    expect(calculateRatio({ a: "12", b: "18", known: "10" })).toMatchObject({ results: [{ value: 2 }, { value: 3 }, { value: 15 }] });
    expect(calculateRatio({ a: "0.5", b: "1.5", known: "4" })).toMatchObject({ results: [{ value: 1 }, { value: 3 }, { value: 12 }] });
    expect(calculateWeightedAverage({ values: "80, 100", weights: "1, 3" })).toMatchObject({ results: [{ value: 95 }] });
    expect(calculateWeightedAverage({ values: "1,000; 2,000", weights: "1; 3" })).toMatchObject({ results: [{ value: 1750 }] });
    expect(calculateWeightedAverage({ values: "1, 2", weights: "1" })).toHaveProperty("error");
  });

  it("averages entered values, including decimals, and rejects blank lists", () => {
    expect(calculateAverage({ numbers: "1.5, 2.5, 6" })).toMatchObject({ results: [{ value: 10 }, { value: 3 }, { value: 3.33 }] });
    expect(calculateAverage({ numbers: "1,000; 2,000" })).toMatchObject({ results: [{ value: 3000 }, { value: 2 }, { value: 1500 }] });
    expect(calculateAverage({ numbers: "" })).toHaveProperty("error");
  });

  it("calculates CAGR and validates non-positive terms", () => {
    expect(calculateCagr({ initial: "100", final: "121", years: "2" })).toMatchObject({ results: [{ value: 10 }] });
    expect(calculateCagr({ initial: "0", final: "100", years: "2" })).toHaveProperty("error");
  });
});

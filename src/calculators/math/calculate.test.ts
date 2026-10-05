import { describe, expect, it } from "vitest";
import { calculateAverage, calculateCagr, calculateChangeRate, calculateDiscount, calculatePercentage, calculateRatio, calculateWeightedAverage } from "@/calculators/math/calculate";

describe("math calculator functions", () => {
  it("handles percent modes and zero baseline validation", () => {
    expect(calculatePercentage({ a: "120", b: "25", mode: "of" })).toMatchObject({ results: [{ value: 30 }] });
    expect(calculatePercentage({ a: "123456789", b: "5", mode: "of" })).toMatchObject({ results: [{ value: 6172839.45 }] });
    expect(calculatePercentage({ a: "25", b: "0", mode: "what-percent" })).toHaveProperty("error");
    expect(calculatePercentage({ a: "100", b: "10", mode: "decrease" })).toMatchObject({ results: [{ value: 90 }] });
    expect(calculatePercentage({ a: "-100", b: "12.5", mode: "increase" })).toMatchObject({ results: [{ value: -112.5 }] });
    expect(calculatePercentage({ a: "1e308", b: "100", mode: "of" })).toHaveProperty("error");
    expect(calculatePercentage({ a: "1", b: "Infinity", mode: "of" })).toHaveProperty("error");
  });

  it("rounds discount to whole won and computes actual discount rate", () => {
    expect(calculateDiscount({ price: "50000", rate: "20", mode: "rate" })).toMatchObject({ results: [{ value: 10000 }, { value: 40000 }] });
    expect(calculateDiscount({ price: "50000", sale: "40000", mode: "actual" })).toMatchObject({ results: [{ value: 10000 }, { value: 20 }] });
    expect(calculateDiscount({ price: "100", rate: "100", mode: "rate" })).toMatchObject({ results: [{ value: 100 }, { value: 0 }] });
    expect(calculateDiscount({ price: "100", rate: "100.01", mode: "rate" })).toHaveProperty("error");
    expect(calculateDiscount({ price: "100", sale: "101", mode: "actual" })).toHaveProperty("error");
  });

  it("reports signed changes with a positive magnitude", () => {
    expect(calculateChangeRate({ old: "200", current: "150" })).toMatchObject({ results: [{ label: "감소량", value: 50 }, { label: "감소율", value: -25 }] });
    expect(calculateChangeRate({ old: "0", current: "100" })).toMatchObject({ error: expect.stringContaining("0") });
    expect(calculateChangeRate({ old: "-10", current: "-5" })).toMatchObject({ results: [{ value: 5 }, { value: 50 }] });
  });

  it("simplifies ratios and calculates weighted values", () => {
    expect(calculateRatio({ a: "12", b: "18", known: "10" })).toMatchObject({ results: [{ value: 2 }, { value: 3 }, { value: 15 }] });
    expect(calculateRatio({ a: "0.5", b: "1.5", known: "4" })).toMatchObject({ results: [{ value: 1 }, { value: 3 }, { value: 12 }] });
    expect(calculateRatio({ a: "-2", b: "3", known: "10" })).toMatchObject({ results: [{ value: -2 }, { value: 3 }, { value: -15 }] });
    expect(calculateRatio({ a: "0", b: "3", known: "10" })).toHaveProperty("error");
    expect(calculateRatio({ a: "0.0000001", b: "3", known: "10" })).toHaveProperty("error");
    expect(calculateRatio({ a: "1e20", b: "3", known: "10" })).toHaveProperty("error");
    expect(calculateWeightedAverage({ values: "80, 100", weights: "1, 3" })).toMatchObject({ results: [{ value: 95 }] });
    expect(calculateWeightedAverage({ values: "1,000; 2,000", weights: "1; 3" })).toMatchObject({ results: [{ value: 1750 }] });
    expect(calculateWeightedAverage({ values: "1, 2", weights: "1" })).toHaveProperty("error");
    expect(calculateWeightedAverage({ values: "1, 2", weights: "0, 0" })).toHaveProperty("error");
    expect(calculateWeightedAverage({ values: "1, 2", weights: "-1, 2" })).toHaveProperty("error");
    const listAtLimit = Array(500).fill("1").join(",");
    const listAboveLimit = Array(501).fill("1").join(",");
    expect(calculateWeightedAverage({ values: listAtLimit, weights: listAtLimit })).toHaveProperty("results");
    expect(calculateWeightedAverage({ values: listAboveLimit, weights: listAboveLimit })).toHaveProperty("error");
  });

  it("averages entered values, including decimals, and rejects blank lists", () => {
    expect(calculateAverage({ numbers: "1.5, 2.5, 6" })).toMatchObject({ results: [{ value: 10 }, { value: 3 }, { value: 3.33 }] });
    expect(calculateAverage({ numbers: "1,000; 2,000" })).toMatchObject({ results: [{ value: 3000 }, { value: 2 }, { value: 1500 }] });
    expect(calculateAverage({ numbers: "" })).toHaveProperty("error");
    expect(calculateAverage({ numbers: "-1.5, 1000000000" })).toMatchObject({ results: [{ value: 999999998.5 }, { value: 2 }, { value: 499999999.25 }] });
    expect(calculateAverage({ numbers: Array(501).fill("1").join(",") })).toHaveProperty("error");
    expect(calculateAverage({ numbers: "1".repeat(30_001) })).toHaveProperty("error");
  });

  it("calculates CAGR and validates non-positive terms", () => {
    expect(calculateCagr({ initial: "100", final: "121", years: "2" })).toMatchObject({ results: [{ value: 10 }] });
    expect(calculateCagr({ initial: "0", final: "100", years: "2" })).toHaveProperty("error");
    expect(calculateCagr({ initial: "100", final: "121", years: "0" })).toHaveProperty("error");
    expect(calculateCagr({ initial: "1", final: "1000000", years: "0.5" })).toMatchObject({ results: [{ value: 99999999999900 }] });
    expect(calculateCagr({ initial: "1", final: "1000000", years: "200" })).toHaveProperty("results");
    expect(calculateCagr({ initial: "1", final: "1000000", years: "200.1" })).toHaveProperty("error");
  });
});

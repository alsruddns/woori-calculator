import { describe, expect, it } from "vitest";
import { calculateDecimalFraction, calculateFractions, calculateMedian, calculatePercentile, calculateProbability, calculateStandardDeviation } from "@/calculators/math/extended";
const resultValues = (outcome: ReturnType<typeof calculateFractions>) => "results" in outcome ? outcome.results.map(({ value }) => value) : [];

describe("extended math calculators", () => {
  it("reduces fraction operations and rejects zero denominators", () => {
    expect(resultValues(calculateFractions({ aNumerator: "1", aDenominator: "2", bNumerator: "1", bDenominator: "3", operation: "add" })).slice(0, 2)).toEqual(["5/6", "5/6"]);
    expect(resultValues(calculateFractions({ aNumerator: "1", aDenominator: "2", bNumerator: "1", bDenominator: "4", operation: "add" })).slice(0, 2)).toEqual(["3/4", "3/4"]);
    expect(calculateFractions({ aNumerator: "1", aDenominator: "0", bNumerator: "1", bDenominator: "3", operation: "add" })).toHaveProperty("error");
    expect(calculateFractions({ aNumerator: "1", aDenominator: "2", bNumerator: "0", bDenominator: "1", operation: "divide" })).toHaveProperty("error");
  });
  it("converts decimals at six-place precision and fractions to decimals", () => {
    expect(calculateDecimalFraction({ mode: "decimal-to-fraction", decimal: "0.125" })).toMatchObject({ results: [{ value: "1/8" }, { value: 0.125 }] });
    expect(calculateDecimalFraction({ mode: "fraction-to-decimal", numerator: "1", denominator: "4" })).toMatchObject({ results: [{ value: 0.25 }] });
  });
  it("calculates population/sample standard deviation, median and nearest-rank percentile", () => {
    expect(calculateStandardDeviation({ mode: "population", numbers: "2, 4, 4, 4, 5, 5, 7, 9" })).toMatchObject({ results: [{ value: 8 }, { value: 5 }, { value: 4 }, { value: 2 }] });
    expect(calculateStandardDeviation({ mode: "sample", numbers: "1" })).toHaveProperty("error");
    expect(resultValues(calculateMedian({ numbers: "9 1 3 7" })).slice(0, 2)).toEqual([4, 5]);
    expect(resultValues(calculatePercentile({ numbers: "1,2,3,4,5", percentile: "60" })).slice(0, 2)).toEqual([60, 3]);
  });
  it("calculates basic probabilities and enforces input bounds", () => {
    expect(calculateProbability({ mode: "and", probability: "20", secondProbability: "50" })).toMatchObject({ results: [{ value: 10 }] });
    expect(calculateProbability({ mode: "or", probability: "20", secondProbability: "50" })).toMatchObject({ results: [{ value: 60 }] });
    expect(calculateProbability({ mode: "at-least-one", probability: "20", trials: "3" })).toMatchObject({ results: [{ value: 48.8 }] });
    expect(calculateProbability({ mode: "at-least-one", probability: "20", trials: "100001" })).toHaveProperty("error");
  });
});

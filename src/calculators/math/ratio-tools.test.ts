import { describe, expect, it } from "vitest";
import { calculateBySlug } from "@/calculators/calculate";
import { calculateRatio } from "@/calculators/math/calculate";
import { aspectRatio, calculateAspectRatio, calculateProportion, calculateRatioHub, calculateScaleRatio, ratioToPercentage, scaleRatio, simplifyRatio, solveProportion, splitByRatio } from "@/calculators/math/ratio-tools";
import type { CalculatorOutcome } from "@/types/calculator-page";

const values = (outcome: CalculatorOutcome) => {
  if (!("results" in outcome)) throw new Error(outcome.error);
  return outcome.results.map(({ value }) => value);
};

describe("ratio tools", () => {
  it("simplifies integer and decimal ratios without changing the existing calculation", () => {
    expect(simplifyRatio([12, 18])?.parts).toEqual([2, 3]);
    expect(simplifyRatio([100, 25])?.parts).toEqual([4, 1]);
    expect(simplifyRatio([0.5, 1.5])?.parts).toEqual([1, 3]);
    expect(simplifyRatio([20, 30, 50])?.parts).toEqual([2, 3, 5]);
    expect(calculateRatio({ a: "12", b: "18", known: "10" })).toMatchObject({ results: [{ value: 2 }, { value: 3 }, { value: 15 }] });
    expect(calculateBySlug("ratio", { a: "12", b: "18", known: "10" })).toMatchObject({ results: [{ value: 2 }, { value: 3 }, { value: 15 }] });
    expect(values(calculateRatioHub({ mode: "simplify", parts: "12:18" }))).toEqual(["2 : 3", 6, 2, 3]);
    expect(values(calculateRatioHub({ mode: "simplify", parts: "100000:99999" }))[0]).toBe("100,000 : 99,999");
    expect(values(calculateRatioHub({ mode: "from-percentage", percentages: "20:30:50" }))).toEqual(["2 : 3 : 5"]);
  });

  it("finds either corresponding value, splits totals, and converts to percentages", () => {
    expect(values(calculateRatioHub({ mode: "find", parts: "2:3", knownSide: "first", knownValue: "40" }))[0]).toBe(60);
    expect(values(calculateRatioHub({ mode: "find", parts: "2:3", knownSide: "second", knownValue: "60" }))[0]).toBe(40);
    expect(splitByRatio(100, [2, 3])).toEqual([40, 60]);
    expect(splitByRatio(120, [1, 2, 3])).toEqual([20, 40, 60]);
    expect(values(calculateRatioHub({ mode: "split", parts: "2:3", total: "100" }))).toEqual(["2 : 3", 40, 60]);
    expect(ratioToPercentage([2, 3])?.percentages).toEqual([40, 60]);
    expect(values(calculateRatioHub({ mode: "to-percentage", parts: "2:3" }))).toEqual([40, 60, 0.4, 0.6]);
  });

  it("solves both unknown positions and compares ratios", () => {
    expect(solveProportion(2, 5, 20, "c")).toBe(8);
    expect(solveProportion(2, 5, 8, "d")).toBe(20);
    expect(values(calculateProportion({ a: "2", b: "5", d: "20", unknown: "c" }))[0]).toBe(8);
    expect(values(calculateRatioHub({ mode: "compare", firstRatio: "2:3", secondRatio: "4:5" }))).toEqual([0.666667, 0.8, "2 : 3 < 4 : 5"]);
  });

  it("handles aspect ratios and scale conversions in both directions", () => {
    expect(aspectRatio(1920, 1080)?.ratio).toBe("16 : 9");
    expect(aspectRatio(1280, 720)?.ratio).toBe("16 : 9");
    expect(aspectRatio(1080, 1920)?.ratio).toBe("9 : 16");
    expect(values(calculateAspectRatio({ width: "2560", height: "1440" }))[0]).toBe("16 : 9");
    expect(scaleRatio(1, 100, 5, "drawing-to-actual", "cm", "cm")).toBe(500);
    expect(scaleRatio(1, 200, 10, "actual-to-drawing", "m", "cm")).toBe(5);
    expect(values(calculateScaleRatio({ scaleDrawing: "1", scaleActual: "200", length: "10", direction: "actual-to-drawing", inputUnit: "m", outputUnit: "cm" }))[0]).toBe(5);
  });

  it("rejects empty, invalid, zero divisor, excessive precision and unsafe inputs", () => {
    expect(calculateRatioHub({ mode: "simplify", parts: "" })).toHaveProperty("error");
    expect(calculateRatioHub({ mode: "simplify", parts: "a:3" })).toHaveProperty("error");
    expect(calculateRatioHub({ mode: "simplify", parts: "0:0" })).toHaveProperty("error");
    expect(calculateRatioHub({ mode: "simplify", parts: "0.0000001:3" })).toHaveProperty("error");
    expect(calculateRatioHub({ mode: "find", parts: "0:3", knownValue: "40" })).toHaveProperty("error");
    expect(calculateRatioHub({ mode: "compare", firstRatio: "2:0", secondRatio: "4:5" })).toHaveProperty("error");
    expect(calculateRatioHub({ mode: "split", parts: "2:3", total: "Infinity" })).toHaveProperty("error");
    expect(calculateProportion({ a: "2", b: "0", d: "20" })).toHaveProperty("error");
    expect(calculateAspectRatio({ width: "1920", height: "0" })).toHaveProperty("error");
    expect(calculateScaleRatio({ scaleDrawing: "0", scaleActual: "100", length: "5" })).toHaveProperty("error");
    expect(calculateScaleRatio({ scaleDrawing: "1", scaleActual: "100", length: "1000000000001" })).toHaveProperty("error");
  });
});

import { describe, expect, it } from "vitest";
import { calculateUnemploymentBenefit } from "@/calculators/policy/unemployment-benefit";

const run = (age: number, monthlyWage: number, insuredYears: number) => calculateUnemploymentBenefit({ age: String(age), monthlyWage: String(monthlyWage), insuredYears: String(insuredYears) });
const values = (outcome: ReturnType<typeof calculateUnemploymentBenefit>) => {
  if (!("results" in outcome)) throw new Error("Expected a calculated outcome");
  return outcome.results.map(({ value }) => value);
};

describe("calculateUnemploymentBenefit", () => {
  it("applies 60 percent and 120 days for under one insured year", () => {
    expect(values(run(35, 3_400_000, 0.9))).toEqual([68_000, 120, 8_160_000, 68_000, 66_048, 68_100]);
  });

  it("applies the daily upper limit", () => {
    expect(values(run(35, 10_000_000, 4))[0]).toBe(68_100);
  });

  it("applies the minimum wage linked lower limit", () => {
    expect(values(run(35, 1_000_000, 4))[0]).toBe(66_048);
  });

  it("uses age and insured period bands at their boundaries", () => {
    expect(values(run(49, 3_000_000, 1))[1]).toBe(150);
    expect(values(run(50, 3_000_000, 1))[1]).toBe(180);
    expect(values(run(35, 3_000_000, 10))[1]).toBe(240);
    expect(values(run(50, 3_000_000, 10))[1]).toBe(270);
  });

  it("rejects inputs outside supported ranges", () => {
    expect(run(101, 3_000_000, 2)).toHaveProperty("error");
    expect(run(35, 3_000_000, 61)).toHaveProperty("error");
  });
});

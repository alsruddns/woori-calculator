import { describe, expect, it } from "vitest";
import { calculateSocialInsurance } from "@/calculators/policy/social-insurance";
import { employeeInsurance2026 } from "@/data/policies/insurance/2026";
import { minimumWage2026 } from "@/data/policies/minimum-wage/2026";
import { calculateMinimumWage } from "@/calculators/finance/calculate";

describe("2026 employee social insurance estimate", () => {
  it("applies the employee rates and reports each component", () => {
    expect(calculateSocialInsurance({ monthlyWage: "4000000" })).toMatchObject({ results: [{ value: 190000 }, { value: 143800 }, { value: 18896 }, { value: 36000 }, { value: 0 }, { value: 388696 }] });
  });

  it("applies pension base limits and healthcare premium ceiling", () => {
    const lowWage = calculateSocialInsurance({ monthlyWage: "100000" });
    const highWage = calculateSocialInsurance({ monthlyWage: "1000000000" });
    expect("results" in lowWage && lowWage.results[0]?.value).toBe(19475);
    expect("results" in lowWage && lowWage.results[1]?.value).toBe(10080);
    expect("results" in highWage && highWage.results[0]?.value).toBe(313025);
    expect("results" in highWage && highWage.results[1]?.value).toBe(4591740);
  });

  it("rejects missing and negative wage", () => {
    expect(calculateSocialInsurance({ monthlyWage: "" })).toHaveProperty("error");
    expect(calculateSocialInsurance({ monthlyWage: "-100" })).toHaveProperty("error");
  });

  it("keeps the current rate policy traceable and correctly versioned", () => {
    expect(employeeInsurance2026.policyYear).toBe(2026);
    expect(employeeInsurance2026.updatedAt).toMatch(/^2026-/);
    expect(employeeInsurance2026.source.url).toMatch(/^https:\/\//);
    expect(employeeInsurance2026.nationalPension.employeeRate).toBe(0.0475);
    expect(employeeInsurance2026.nationalPension.minimumBase).toBe(410_000);
    expect(employeeInsurance2026.nationalPension.maximumBase).toBe(6_590_000);
    expect(employeeInsurance2026.healthInsurance.employeeRate).toBe(0.03595);
    expect(employeeInsurance2026.longTermCare.incomeRate).toBe(0.009448);
    expect(employeeInsurance2026.employmentInsurance.employeeRate).toBe(0.009);
  });

  it("matches official minimum wage hourly, daily, and 209-hour monthly values", () => {
    expect(minimumWage2026.hourlyWon).toBe(10_320);
    expect(minimumWage2026.dailyWon).toBe(minimumWage2026.hourlyWon * minimumWage2026.standardDailyHours);
    expect(minimumWage2026.monthlyWon).toBe(minimumWage2026.hourlyWon * minimumWage2026.standardMonthlyHours);
    expect(calculateMinimumWage({ hourlyWage: "10000" })).toMatchObject({ results: [{ value: 10320 }, { value: -320 }, { value: 82560 }, { value: 2156880 }] });
  });

  it.each([410_000, 659_000, 6_590_000, 100_000_000])("applies pension base boundary consistently for wage %s", (wage) => {
    const outcome = calculateSocialInsurance({ monthlyWage: String(wage) });
    const base = Math.min(6_590_000, Math.max(410_000, Math.floor(wage / 1000) * 1000));
    expect("results" in outcome && outcome.results[0]?.value).toBe(Math.round(base * 0.0475));
  });
});

import { describe, expect, it } from "vitest";
import { calculateSocialInsurance } from "@/calculators/policy/social-insurance";

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
});

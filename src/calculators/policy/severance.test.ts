import { describe, expect, it } from "vitest";
import { calculateSeveranceEstimate } from "@/calculators/policy/severance";

describe("severance estimate", () => {
  it("estimates 30 days of average wage for one inclusive year", () => {
    expect(calculateSeveranceEstimate({ start: "2025-01-01", lastWorkday: "2025-12-31", averageDailyWage: "100000" })).toMatchObject({ results: [{ value: 365 }, { value: 3000000 }] });
  });

  it("rejects reversed dates and missing wage", () => {
    expect(calculateSeveranceEstimate({ start: "2026-02-01", lastWorkday: "2026-01-01", averageDailyWage: "100000" })).toHaveProperty("error");
    expect(calculateSeveranceEstimate({ start: "2026-01-01", lastWorkday: "2026-01-01", averageDailyWage: "" })).toHaveProperty("error");
  });
});

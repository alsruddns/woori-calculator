import { describe, expect, it } from "vitest";
import { calculateFuelEfficiency } from "@/calculators/date-life/fuel-efficiency";

function values(input: Record<string, string>) {
  const outcome = calculateFuelEfficiency(input);
  if (!("results" in outcome)) throw new Error("Expected a calculated outcome");
  return outcome.results.map(({ value }) => value);
}

describe("calculateFuelEfficiency", () => {
  it("calculates km/L and fuel use per 100 km", () => {
    expect(values({ mode: "efficiency", distance: "520", fuelAmount: "40" })).toEqual([13, 7.69]);
  });

  it("calculates the required fuel amount", () => {
    expect(values({ mode: "consumption", distance: "500", efficiency: "10" })).toEqual([50]);
  });

  it("calculates the estimated driving range", () => {
    expect(values({ mode: "range", fuelAmount: "40", efficiency: "12" })).toEqual([480]);
  });

  it.each(["0", "-1", "NaN", "Infinity", "1e309"])("rejects invalid or non-positive inputs: %s", (value) => {
    expect(calculateFuelEfficiency({ mode: "efficiency", distance: value, fuelAmount: "40" })).toHaveProperty("error");
    expect(calculateFuelEfficiency({ mode: "efficiency", distance: "520", fuelAmount: value })).toHaveProperty("error");
  });

  it("enforces mode-specific maximum values", () => {
    expect(calculateFuelEfficiency({ mode: "efficiency", distance: "1000001", fuelAmount: "40" })).toHaveProperty("error");
    expect(calculateFuelEfficiency({ mode: "efficiency", distance: "520", fuelAmount: "100001" })).toHaveProperty("error");
    expect(calculateFuelEfficiency({ mode: "range", fuelAmount: "40", efficiency: "1001" })).toHaveProperty("error");
  });
});

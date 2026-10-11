import { describe, expect, it } from "vitest";
import { calculateTaxiFare, calculateTip, calculateTripSplit, calculateUtilityBill, calculateVehicleCosts } from "@/calculators/date-life/everyday";

describe("everyday estimators", () => {
  it("uses user-provided utility rates", () => {
    expect(calculateUtilityBill({ usage: "20", rate: "500", base: "1000" })).toMatchObject({ results: [{ value: 10000 }, { value: 1000 }, { value: 11000 }] });
  });
  it("adds monthly vehicle expenses and annualizes them", () => {
    const costs = calculateVehicleCosts({ distance: "1000", efficiency: "10", fuelPrice: "1700", insurance: "0", tax: "0", maintenance: "0", parking: "0", tolls: "0", other: "0" });
    expect("results" in costs && costs.results.slice(0, 3).map(({ value }) => value)).toEqual([170000, 170000, 2040000]);
  });
  it("calculates input-rate taxi fare, split remainder, and tips", () => {
    expect(calculateTaxiFare({ baseFare: "4000", includedDistance: "2", distanceRate: "1000", distance: "5", timeRate: "0", minutes: "0" })).toMatchObject({ results: [{ value: 3000 }, { value: 0 }, { value: 7000 }] });
    expect(calculateTripSplit({ total: "10000", people: "3" })).toMatchObject({ results: [{ value: 3333.33 }, { value: 2 }, { value: 3333 }, { value: 1 }, { value: 3334 }, { value: 10000 }] });
    expect(calculateTip({ amount: "50000", percent: "10", people: "2" })).toMatchObject({ results: [{ value: 5000 }, { value: 55000 }, { value: 27500 }] });
  });
  it("rejects invalid values", () => {
    expect(calculateTip({ amount: "-1", percent: "10", people: "2" })).toHaveProperty("error");
    expect(calculateTripSplit({ total: "1", people: "Infinity" })).toHaveProperty("error");
  });
});

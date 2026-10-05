import { describe, expect, it } from "vitest";
import { calculateAge, calculateArea, calculateBmi, calculateDateDifference, calculateDday, calculateFuelCost, calculatePace, calculateWorkdays } from "@/calculators/date-life/date-calculate";

describe("date and life calculator functions", () => {
  it("calculates date difference and optional boundary inclusion", () => {
    expect(calculateDateDifference({ start: "2026-01-01", end: "2026-01-03", include: "both" })).toMatchObject({ results: [{ value: 2 }, { value: 3 }] });
    expect(calculateDateDifference({ start: "2026-01-01", end: "2026-01-03", include: "none" })).toMatchObject({ results: [{ value: 2 }, { value: 1 }] });
    expect(calculateDateDifference({ start: "2026-01-01", end: "2026-01-01", include: "start" })).toMatchObject({ results: [{ value: 0 }, { value: 1 }] });
    const ancientDates = calculateDateDifference({ start: "0099-12-31", end: "0100-01-01" });
    expect("results" in ancientDates && ancientDates.results[0]?.value).toBe(1);
    expect(calculateDateDifference({ start: "2026-02-30", end: "2026-03-01" })).toHaveProperty("error");
  });

  it.each([
    ["2024-02-29", "2024-03-01", 1],
    ["2025-02-28", "2025-03-01", 1],
    ["2000-01-01", "2000-01-01", 0],
    ["1900-03-01", "1900-03-02", 1],
    ["2026-12-31", "2027-01-01", 1],
  ])("measures date-only interval %s through %s", (start, end, days) => {
    const outcome = calculateDateDifference({ start, end });
    expect("results" in outcome && outcome.results[0]?.value).toBe(days);
  });

  it("calculates D-Day directions and completed age", () => {
    expect(calculateDday({ reference: "custom", referenceDate: "2026-01-01", target: "2026-01-04" })).toMatchObject({ results: [{ value: 3, unit: "일 (D-N)" }] });
    expect(calculateAge({ birth: "2000-12-31", reference: "2026-12-30" })).toMatchObject({ results: [{ value: 25 }] });
    expect(calculateDday({ reference: "custom", referenceDate: "2026-01-04", target: "2026-01-01" })).toMatchObject({ results: [{ value: 3, unit: "일 (D+N)" }] });
    expect(calculateDday({ reference: "custom", referenceDate: "2026-01-01", target: "2026-01-01" })).toMatchObject({ results: [{ value: 0, unit: "일 (D-Day)" }] });
    expect(calculateAge({ birth: "2000-02-29", reference: "2021-02-28" })).toMatchObject({ results: [{ value: 20 }] });
    expect(calculateAge({ birth: "2000-02-29", reference: "2021-03-01" })).toMatchObject({ results: [{ value: 21 }] });
    expect(calculateAge({ birth: "2027-01-01", reference: "2026-01-01" })).toHaveProperty("error");
  });

  it("counts weekdays without silently excluding holidays", () => {
    expect(calculateWorkdays({ start: "2026-01-05", end: "2026-01-09" })).toMatchObject({ results: [{ value: 5 }] });
    expect(calculateWorkdays({ start: "2026-01-05", end: "2026-01-05", includeEnd: "false" })).toMatchObject({ results: [{ value: 1 }] });
    expect(calculateWorkdays({ start: "2026-01-10", end: "2026-01-09" })).toHaveProperty("error");
    expect(calculateWorkdays({ start: "2026-01-05", end: "2026-01-09", includeStart: "false", includeEnd: "false" })).toMatchObject({ results: [{ value: 3 }] });
    expect(calculateWorkdays({ start: "2026-01-10", end: "2026-01-10" })).toMatchObject({ results: [{ value: 0 }] });
    expect(calculateDateDifference({ start: "2026-01-01", end: "2026-01-03", include: "start" })).toMatchObject({ results: [{ value: 2 }, { value: 2 }] });
  });

  it.each([
    ["2026-01-05", "2026-01-05", 1],
    ["2026-01-06", "2026-01-06", 1],
    ["2026-01-07", "2026-01-07", 1],
    ["2026-01-08", "2026-01-08", 1],
    ["2026-01-09", "2026-01-09", 1],
    ["2026-01-10", "2026-01-11", 0],
    ["2026-01-04", "2026-01-12", 6],
  ])("counts inclusive weekdays from %s through %s", (start, end, count) => {
    const outcome = calculateWorkdays({ start, end });
    expect("results" in outcome && outcome.results[0]?.value).toBe(count);
  });

  it("converts area, calculates BMI, pace and fuel with rounded output", () => {
    expect(calculateArea({ value: "33.05785", mode: "sqm-to-pyeong" })).toMatchObject({ results: [{ value: 10 }] });
    expect(calculateBmi({ height: "170", weight: "65" })).toMatchObject({ results: [{ value: 22.5 }] });
    expect(calculatePace({ distance: "5", hours: "0", minutes: "25" })).toMatchObject({ results: [{ value: "5:00 /km" }, { value: 12 }] });
    expect(calculateFuelCost({ distance: "100", efficiency: "10", price: "1700" })).toMatchObject({ results: [{ value: 10 }, { value: 17000 }] });
    expect(calculateBmi({ height: "0", weight: "65" })).toHaveProperty("error");
    expect(calculateArea({ value: "10", mode: "pyeong-to-sqm" })).toMatchObject({ results: [{ value: 33.06 }] });
    expect(calculatePace({ distance: "1", hours: "0", minutes: "1.999" })).toMatchObject({ results: [{ value: "2:00 /km" }, { value: 30.02 }] });
    expect(calculateFuelCost({ distance: "100", efficiency: "0", price: "1700" })).toHaveProperty("error");
    expect(calculateFuelCost({ distance: "100", efficiency: "10", price: "0" })).toMatchObject({ results: [{ value: 10 }, { value: 0 }] });
  });
});

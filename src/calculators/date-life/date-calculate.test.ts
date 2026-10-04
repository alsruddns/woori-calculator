import { describe, expect, it } from "vitest";
import { calculateAge, calculateArea, calculateBmi, calculateDateDifference, calculateDday, calculateFuelCost, calculatePace, calculateWorkdays } from "@/calculators/date-life/date-calculate";

describe("date and life calculator functions", () => {
  it("calculates date difference and optional boundary inclusion", () => {
    expect(calculateDateDifference({ start: "2026-01-01", end: "2026-01-03", include: "both" })).toMatchObject({ results: [{ value: 2 }, { value: 3 }] });
    expect(calculateDateDifference({ start: "2026-01-01", end: "2026-01-03", include: "none" })).toMatchObject({ results: [{ value: 2 }, { value: 1 }] });
    expect(calculateDateDifference({ start: "2026-01-01", end: "2026-01-01", include: "start" })).toMatchObject({ results: [{ value: 0 }, { value: 1 }] });
    expect(calculateDateDifference({ start: "2026-02-30", end: "2026-03-01" })).toHaveProperty("error");
  });

  it("calculates D-Day directions and completed age", () => {
    expect(calculateDday({ reference: "custom", referenceDate: "2026-01-01", target: "2026-01-04" })).toMatchObject({ results: [{ value: 3, unit: "일 (D-N)" }] });
    expect(calculateAge({ birth: "2000-12-31", reference: "2026-12-30" })).toMatchObject({ results: [{ value: 25 }] });
  });

  it("counts weekdays without silently excluding holidays", () => {
    expect(calculateWorkdays({ start: "2026-01-05", end: "2026-01-09" })).toMatchObject({ results: [{ value: 5 }] });
    expect(calculateWorkdays({ start: "2026-01-05", end: "2026-01-05", includeEnd: "false" })).toMatchObject({ results: [{ value: 1 }] });
    expect(calculateWorkdays({ start: "2026-01-10", end: "2026-01-09" })).toHaveProperty("error");
  });

  it("converts area, calculates BMI, pace and fuel with rounded output", () => {
    expect(calculateArea({ value: "33.05785", mode: "sqm-to-pyeong" })).toMatchObject({ results: [{ value: 10 }] });
    expect(calculateBmi({ height: "170", weight: "65" })).toMatchObject({ results: [{ value: 22.5 }] });
    expect(calculatePace({ distance: "5", hours: "0", minutes: "25" })).toMatchObject({ results: [{ value: "5:00 /km" }, { value: 12 }] });
    expect(calculateFuelCost({ distance: "100", efficiency: "10", price: "1700" })).toMatchObject({ results: [{ value: 10 }, { value: 17000 }] });
  });
});

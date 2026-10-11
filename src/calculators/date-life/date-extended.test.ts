import { describe, expect, it } from "vitest";
import { calculatePregnancyDates, calculateTenure, calculateTimeArithmetic } from "@/calculators/date-life/date-extended";

describe("date and time extensions", () => {
  it("counts calendar tenure with UTC-safe date-only arithmetic", () => {
    expect(calculateTenure({ start: "2024-01-15", end: "2025-03-20" })).toMatchObject({ results: [{ value: "1년 2개월 5일" }, { value: 14 }, { value: 430 }] });
    expect(calculateTenure({ start: "2026-02-01", end: "2026-01-31" })).toHaveProperty("error");
  });
  it("adds and subtracts elapsed hours across day boundaries", () => {
    expect(calculateTimeArithmetic({ mode: "add", aHours: "2", aMinutes: "45", bHours: "1", bMinutes: "30" })).toMatchObject({ results: [{ value: "0일 4시간 15분" }, { value: 255 }] });
    expect(calculateTimeArithmetic({ mode: "subtract", aHours: "1", aMinutes: "0", bHours: "2", bMinutes: "0" })).toMatchObject({ results: [{ value: "−0일 1시간 0분" }, { value: -60 }] });
    expect(calculateTimeArithmetic({ mode: "add", aHours: "1", aMinutes: "60", bHours: "0", bMinutes: "0" })).toHaveProperty("error");
  });
  it("estimates due date and elapsed gestational weeks from dates", () => {
    expect(calculatePregnancyDates({ mode: "due", lmp: "2026-01-01" })).toMatchObject({ results: [{ value: "2026-10-08" }] });
    expect(calculatePregnancyDates({ mode: "weeks", lmp: "2026-01-01", reference: "2026-01-15" })).toMatchObject({ results: [{ value: "2주 0일" }, { value: "2026-10-08" }] });
    expect(calculatePregnancyDates({ mode: "weeks", lmp: "2026-01-01", reference: "2025-12-31" })).toHaveProperty("error");
  });
});

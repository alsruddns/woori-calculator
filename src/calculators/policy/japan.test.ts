import { describe, expect, it } from "vitest";
import { calculateJapanAnnualSalary, calculateJapanConsumptionTax, calculateJapanMonthlySalary, calculateJapanNightHolidayPay, calculateJapanOvertimePay } from "@/calculators/policy/japan";

const values = (outcome: ReturnType<typeof calculateJapanConsumptionTax>) => {
  if (!("results" in outcome)) throw new Error("Expected a calculated result");
  return outcome.results.map(({ value }) => value);
};

describe("Japan calculator calculations", () => {
  it("calculates standard and reduced consumption tax with whole-yen rounding", () => {
    expect(values(calculateJapanConsumptionTax({ mode: "exclusive", rate: "10", net: "1000" }))).toEqual([1000, 100, 1100]);
    expect(values(calculateJapanConsumptionTax({ mode: "exclusive", rate: "8", net: "1000" }))).toEqual([1000, 80, 1080]);
    expect(values(calculateJapanConsumptionTax({ mode: "exclusive", rate: "10", net: "0" }))).toEqual([0, 0, 0]);
    expect(values(calculateJapanConsumptionTax({ mode: "exclusive", rate: "10", net: "999999999999999" }))).toEqual([999999999999999, 100000000000000, 1099999999999999]);
    expect(values(calculateJapanConsumptionTax({ mode: "exclusive", rate: "10", net: "10.5" }))).toEqual([11, 1, 12]);
    expect(values(calculateJapanConsumptionTax({ mode: "inclusive", rate: "10", gross: "1100" }))).toEqual([1000, 100, 1100]);
  });

  it("uses a shared annual payroll model for monthly and annual salary estimates", () => {
    const annual = calculateJapanAnnualSalary({ annualSalary: "3600000", ageGroup: "under40" });
    const monthly = calculateJapanMonthlySalary({ monthlySalary: "300000", ageGroup: "under40" });
    expect("results" in annual).toBe(true);
    expect("results" in monthly).toBe(true);
    if (!("results" in annual) || !("results" in monthly)) return;
    expect(annual.results[5]?.value).toBeGreaterThan(0);
    expect(monthly.results[0]?.value).toBe(3600000);
    expect(monthly.results[5]?.value).toBe(Math.round(Number(annual.results[5]?.value) / 12));
    expect("results" in calculateJapanAnnualSalary({ annualSalary: "0" })).toBe(true);
    expect("results" in calculateJapanAnnualSalary({ annualSalary: "1000000000000000" })).toBe(true);
  });

  it("estimates ordinary and over-60 overtime premiums", () => {
    expect(values(calculateJapanOvertimePay({ wageMode: "hourly", hourlyWage: "1500", overtimeHours: "0", over60Hours: "0", overtimeRate: "25" }))).toEqual([0, 0, 0]);
    expect(values(calculateJapanOvertimePay({ wageMode: "hourly", hourlyWage: "1500", overtimeHours: "10", over60Hours: "0", overtimeRate: "25" }))).toEqual([15000, 3750, 18750]);
    expect(values(calculateJapanOvertimePay({ wageMode: "hourly", hourlyWage: "1500", overtimeHours: "1", over60Hours: "2", overtimeRate: "25" }))).toEqual([4500, 1875, 6375]);
  });

  it("adds night and holiday premiums on overlapping hours", () => {
    const base = { wageMode: "hourly", hourlyWage: "1500", overtimeHours: "0", over60Hours: "0", nightOnlyHours: "0", holidayHours: "0", overtimeNightHours: "0", over60NightHours: "0", holidayNightHours: "0", overtimeRate: "25", nightRate: "25", holidayRate: "35" };
    expect(values(calculateJapanNightHolidayPay({ ...base, nightOnlyHours: "2" }))).toEqual([3000, 0, 750, 0, 750, 3750]);
    expect(values(calculateJapanNightHolidayPay({ ...base, holidayHours: "2" }))).toEqual([3000, 0, 0, 1050, 1050, 4050]);
    expect(values(calculateJapanNightHolidayPay({ ...base, overtimeHours: "2" }))).toEqual([3000, 750, 0, 0, 750, 3750]);
    expect(values(calculateJapanNightHolidayPay({ ...base, overtimeNightHours: "2" }))).toEqual([3000, 750, 750, 0, 1500, 4500]);
    expect(values(calculateJapanNightHolidayPay({ ...base, holidayNightHours: "2" }))).toEqual([3000, 0, 750, 1050, 1800, 4800]);
  });
});

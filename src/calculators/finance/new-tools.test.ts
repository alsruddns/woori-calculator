import { describe, expect, it } from "vitest";
import { calculateBreakEven, calculateDividendGrowth, calculateEarlyRepayment, calculateElectricityCost, calculateFireTarget, calculateFreelancerRate, calculatePositionSize, calculateRealReturn, calculateRentVsBuy, calculateStockNetProfit, calculateStopTarget, calculateTravelBudget } from "@/calculators/finance/new-tools";

const values = (overrides: Record<string, string> = {}) => overrides;
const resultValue = (outcome: ReturnType<typeof calculateFireTarget>, label: string) => {
  if (!("results" in outcome)) throw new Error(outcome.error);
  return outcome.results.find((item) => item.label === label)?.value;
};

describe("new static calculator functions", () => {
  it("estimates FIRE target and handles zero expenses", () => {
    expect(resultValue(calculateFireTarget(values({ annualExpenses:"40000", withdrawalRate:"4", currentSavings:"500000" })), "fireTarget")).toBe(1_000_000);
    expect(resultValue(calculateFireTarget(values({ annualExpenses:"0", withdrawalRate:"4", currentSavings:"0" })), "targetProgress")).toBe(100);
  });
  it("projects dividend growth and respects a zero-year boundary", () => {
    expect(resultValue(calculateDividendGrowth(values({ annualDividendPerShare:"2", shares:"100", growthRate:"5", years:"10" })), "futureAnnualDividend")).toBeCloseTo(325.7789);
    expect(resultValue(calculateDividendGrowth(values({ annualDividendPerShare:"2", shares:"100", growthRate:"5", years:"0" })), "futureAnnualDividend")).toBe(200);
    expect("error" in calculateDividendGrowth(values({ annualDividendPerShare:"1000000000", shares:"1000000000", growthRate:"1000", years:"100" }))).toBe(true);
  });
  it("calculates nominal and real returns with a zero-inflation case", () => {
    expect(resultValue(calculateRealReturn(values({ initialValue:"100", finalValue:"150", years:"10", inflationRate:"0" })), "inflationAdjustedAnnualizedReturn")).toBeCloseTo(4.138);
    expect("error" in calculateRealReturn(values({ initialValue:"100", finalValue:"0", years:"10", inflationRate:"2" }))).toBe(true);
  });
  it("sizes risk-based positions and rejects equal entry and stop prices", () => {
    expect(resultValue(calculatePositionSize(values({ accountSize:"10000", riskPercent:"1", entryPrice:"100", stopPrice:"95" })), "positionUnits")).toBe(20);
    expect("error" in calculatePositionSize(values({ accountSize:"10000", riskPercent:"1", entryPrice:"100", stopPrice:"100" }))).toBe(true);
  });
  it("calculates stop, target, and reward-risk ratio", () => {
    expect(resultValue(calculateStopTarget(values({ entryPrice:"100", units:"10", stopPercent:"5", targetPercent:"10" })), "rewardRiskRatio")).toBe(2);
    expect(resultValue(calculateStopTarget(values({ entryPrice:"100", units:"0", stopPercent:"5", targetPercent:"0" })), "potentialLoss")).toBe(0);
  });
  it("subtracts buy and sell fees from stock profit", () => {
    expect(resultValue(calculateStockNetProfit(values({ buyPrice:"100", sellPrice:"110", shares:"10", buyFeePercent:"0.1", sellFeePercent:"0.1" })), "netProfitLoss")).toBeCloseTo(97.9);
    expect(resultValue(calculateStockNetProfit(values({ buyPrice:"10", sellPrice:"10", shares:"0", buyFeePercent:"0", sellFeePercent:"0" })), "netReturnPercent")).toBe(0);
  });
  it("compares early repayment schedules, including zero interest", () => {
    expect(Number(resultValue(calculateEarlyRepayment(values({ principal:"12000", annualRate:"6", termMonths:"12", extraMonthly:"100", lumpSum:"0", lumpMonth:"1" })), "interestSaved"))).toBeGreaterThan(0);
    expect(resultValue(calculateEarlyRepayment(values({ principal:"1200", annualRate:"0", termMonths:"12", extraMonthly:"0", lumpSum:"0", lumpMonth:"1" })), "interestSaved")).toBe(0);
  });
  it("compares rent and ownership assumptions with zero-interest boundary", () => {
    const outcome = calculateRentVsBuy(values({ homePrice:"120000", downPaymentPercent:"20", annualRate:"0", loanYears:"20", holdingYears:"5", monthlyRent:"1000", annualMaintenancePercent:"1", purchaseCosts:"2000" }));
    expect(resultValue(outcome, "rentPayments")).toBe(60000);
    expect(resultValue(outcome, "remainingLoanBalance")).toBeCloseTo(72000);
  });
  it("calculates kWh use and zero-use boundary", () => {
    expect(resultValue(calculateElectricityCost(values({ watts:"100", hoursPerDay:"5", days:"30", pricePerKwh:"0.2", devices:"1" })), "energyUse")).toBe(15);
    expect(resultValue(calculateElectricityCost(values({ watts:"0", hoursPerDay:"5", days:"30", pricePerKwh:"0.2", devices:"1" })), "estimatedCost")).toBe(0);
  });
  it("totals travel costs and contingency", () => {
    expect(resultValue(calculateTravelBudget(values({ transport:"100", lodgingPerNight:"50", nights:"2", dailyFoodPerPerson:"20", people:"2", days:"3", activities:"40", localTransport:"20", other:"10", bufferPercent:"10" })), "totalBudget")).toBeCloseTo(429);
  });
  it("calculates a freelancer rate from billable hours", () => {
    expect(resultValue(calculateFreelancerRate(values({ targetAnnualRevenue:"60000", annualBusinessCosts:"10000", billableHoursPerWeek:"20", workingWeeks:"50", bufferPercent:"10" })), "suggestedHourlyRate")).toBe(77);
  });
  it("rounds break-even quantity up and rejects nonpositive contribution", () => {
    expect(resultValue(calculateBreakEven(values({ fixedCosts:"1000", pricePerUnit:"25", variableCostPerUnit:"15" })), "breakEvenUnits")).toBe(100);
    expect(resultValue(calculateBreakEven(values({ fixedCosts:"0", pricePerUnit:"25", variableCostPerUnit:"15" })), "breakEvenUnits")).toBe(0);
    expect("error" in calculateBreakEven(values({ fixedCosts:"1000", pricePerUnit:"10", variableCostPerUnit:"10" }))).toBe(true);
    expect("error" in calculateBreakEven(values({ fixedCosts:"", pricePerUnit:"25", variableCostPerUnit:"15" }))).toBe(true);
  });
});




import type { CalculatorOutcome } from "@/types/calculator-page";

const number = (input: Record<string, string>, key: string) => {
  const raw = input[key];
  if (typeof raw !== "string" || !raw.trim()) return NaN;
  const value = Number(raw.replace(/,/g, "").trim());
  return Number.isFinite(value) ? value : NaN;
};
const invalid = (field: string): CalculatorOutcome => ({ error: "Check the entered values and calculation range.", field });
const result = (...items: { label: string; value: number; unit?: string; precision?: number }[]): CalculatorOutcome => items.some(({ value }) => !Number.isFinite(value) || Math.abs(value) > Number.MAX_SAFE_INTEGER)
  ? invalid("input")
  : { results: items.map((item) => ({ ...item, value: Object.is(item.value, -0) ? 0 : item.value })) };
const valid = (input: Record<string, string>, specs: readonly [string, number, number][]) => specs.every(([key, min, max]) => { const value = number(input, key); return Number.isFinite(value) && value >= min && value <= max; });

export function calculateFireTarget(input: Record<string, string>): CalculatorOutcome {
  if (!valid(input, [["annualExpenses", 0, 1e12], ["withdrawalRate", 0.1, 20], ["currentSavings", 0, 1e12]])) return invalid("annualExpenses");
  const target = number(input, "annualExpenses") * 100 / number(input, "withdrawalRate");
  return result({ label: "fireTarget", value: target }, { label: "remainingGap", value: Math.max(0, target - number(input, "currentSavings")) }, { label: "targetProgress", value: target === 0 ? 100 : Math.min(100, number(input, "currentSavings") / target * 100), unit: "%", precision: 2 });
}

export function calculateDividendGrowth(input: Record<string, string>): CalculatorOutcome {
  if (!valid(input, [["annualDividendPerShare", 0, 1e9], ["shares", 0, 1e9], ["growthRate", -99.9, 1000], ["years", 0, 100]])) return invalid("annualDividendPerShare");
  const yearly = number(input, "annualDividendPerShare") * number(input, "shares") * (1 + number(input, "growthRate") / 100) ** number(input, "years");
  return result({ label: "currentAnnualDividend", value: number(input, "annualDividendPerShare") * number(input, "shares") }, { label: "futureAnnualDividend", value: yearly }, { label: "futureMonthlyAverage", value: yearly / 12 });
}

export function calculateRealReturn(input: Record<string, string>): CalculatorOutcome {
  if (!valid(input, [["initialValue", Number.MIN_VALUE, 1e15], ["finalValue", Number.MIN_VALUE, 1e15], ["years", Number.MIN_VALUE, 100], ["inflationRate", -99, 1000]])) return invalid("initialValue");
  const nominal = (number(input, "finalValue") / number(input, "initialValue")) ** (1 / number(input, "years")) - 1;
  const real = (1 + nominal) / (1 + number(input, "inflationRate") / 100) - 1;
  return result({ label: "nominalAnnualizedReturn", value: nominal * 100, unit: "%", precision: 4 }, { label: "inflationAdjustedAnnualizedReturn", value: real * 100, unit: "%", precision: 4 }, { label: "inflationAdjustedFinalValue", value: number(input, "finalValue") / (1 + number(input, "inflationRate") / 100) ** number(input, "years") });
}

export function calculatePositionSize(input: Record<string, string>): CalculatorOutcome {
  if (!valid(input, [["accountSize", 0, 1e15], ["riskPercent", 0, 100], ["entryPrice", Number.MIN_VALUE, 1e12], ["stopPrice", 0, 1e12]])) return invalid("accountSize");
  const entry = number(input, "entryPrice"), distance = Math.abs(entry - number(input, "stopPrice"));
  if (distance === 0) return invalid("stopPrice");
  const riskAmount = number(input, "accountSize") * number(input, "riskPercent") / 100;
  const units = riskAmount / distance;
  return result({ label: "maximumRiskAmount", value: riskAmount }, { label: "positionUnits", value: units, precision: 6 }, { label: "positionValue", value: units * entry });
}

export function calculateStopTarget(input: Record<string, string>): CalculatorOutcome {
  if (!valid(input, [["entryPrice", Number.MIN_VALUE, 1e12], ["units", 0, 1e12], ["stopPercent", 0.01, 99.9], ["targetPercent", 0, 1000]])) return invalid("entryPrice");
  const entry = number(input, "entryPrice"), units = number(input, "units"), stop = number(input, "stopPercent") / 100, target = number(input, "targetPercent") / 100;
  const loss = entry * units * stop, gain = entry * units * target;
  return result({ label: "stopPrice", value: entry * (1 - stop) }, { label: "targetPrice", value: entry * (1 + target) }, { label: "potentialLoss", value: loss }, { label: "potentialGain", value: gain }, { label: "rewardRiskRatio", value: loss === 0 ? 0 : gain / loss, precision: 4 });
}

export function calculateStockNetProfit(input: Record<string, string>): CalculatorOutcome {
  if (!valid(input, [["buyPrice", 0, 1e12], ["sellPrice", 0, 1e12], ["shares", 0, 1e12], ["buyFeePercent", 0, 100], ["sellFeePercent", 0, 100]])) return invalid("buyPrice");
  const cost = number(input, "buyPrice") * number(input, "shares"), proceeds = number(input, "sellPrice") * number(input, "shares"), fees = cost * number(input, "buyFeePercent") / 100 + proceeds * number(input, "sellFeePercent") / 100, net = proceeds - cost - fees;
  return result({ label: "grossProfitLoss", value: proceeds - cost }, { label: "totalFees", value: fees }, { label: "netProfitLoss", value: net }, { label: "netReturnPercent", value: cost === 0 ? 0 : net / cost * 100, unit: "%", precision: 4 });
}

export function calculateEarlyRepayment(input: Record<string, string>): CalculatorOutcome {
  if (!valid(input, [["principal", Number.MIN_VALUE, 1e12], ["annualRate", 0, 1000], ["termMonths", 1, 600], ["extraMonthly", 0, 1e10], ["lumpSum", 0, 1e12], ["lumpMonth", 1, 600]])) return invalid("principal");
  const principal = number(input, "principal"), rate = number(input, "annualRate") / 1200, months = Math.floor(number(input, "termMonths"));
  const payment = rate === 0 ? principal / months : principal * rate / (1 - (1 + rate) ** -months);
  const schedule = (extra: boolean) => { let balance = principal, interest = 0, elapsed = 0; while (balance > 0.005 && elapsed < months) { elapsed++; const due = balance * rate; interest += due; const extraAmount = extra ? number(input, "extraMonthly") + (elapsed === Math.floor(number(input, "lumpMonth")) ? number(input, "lumpSum") : 0) : 0; balance = Math.max(0, balance + due - payment - extraAmount); } return { interest, elapsed }; };
  const base = schedule(false), accelerated = schedule(true);
  return result({ label: "regularMonthlyPayment", value: payment }, { label: "interestWithoutExtraPayments", value: base.interest }, { label: "interestWithExtraPayments", value: accelerated.interest }, { label: "interestSaved", value: Math.max(0, base.interest - accelerated.interest) }, { label: "monthsSaved", value: Math.max(0, base.elapsed - accelerated.elapsed) });
}

export function calculateRentVsBuy(input: Record<string, string>): CalculatorOutcome {
  if (!valid(input, [["homePrice", 0, 1e12], ["downPaymentPercent", 0, 100], ["annualRate", 0, 1000], ["loanYears", 1, 50], ["holdingYears", 1, 50], ["monthlyRent", 0, 1e10], ["annualMaintenancePercent", 0, 100], ["purchaseCosts", 0, 1e12]])) return invalid("homePrice");
  const price = number(input, "homePrice"), loan = price * (1 - number(input, "downPaymentPercent") / 100), rate = number(input, "annualRate") / 1200, term = Math.floor(number(input, "loanYears") * 12), hold = Math.floor(number(input, "holdingYears") * 12);
  const payment = rate === 0 ? loan / term : loan * rate / (1 - (1 + rate) ** -term);
  let balance = loan, interest = 0;
  for (let month = 0; month < hold; month++) { const due = balance * rate; interest += due; balance = Math.max(0, balance + due - payment); }
  const rentTotal = number(input, "monthlyRent") * hold;
  const nonrecoverableOwnerCost = interest + price * number(input, "annualMaintenancePercent") / 100 * number(input, "holdingYears") + number(input, "purchaseCosts");
  return result({ label: "rentPayments", value: rentTotal }, { label: "estimatedOwnerCosts", value: nonrecoverableOwnerCost }, { label: "rentMinusOwnerCosts", value: rentTotal - nonrecoverableOwnerCost }, { label: "remainingLoanBalance", value: balance });
}

export function calculateElectricityCost(input: Record<string, string>): CalculatorOutcome {
  if (!valid(input, [["watts", 0, 1e8], ["hoursPerDay", 0, 24], ["days", 0, 366], ["pricePerKwh", 0, 1e8], ["devices", 0, 1e6]])) return invalid("watts");
  const kwh = number(input, "watts") * number(input, "hoursPerDay") * number(input, "days") * number(input, "devices") / 1000;
  return result({ label: "energyUse", value: kwh, unit: "kWh", precision: 3 }, { label: "estimatedCost", value: kwh * number(input, "pricePerKwh") });
}

export function calculateTravelBudget(input: Record<string, string>): CalculatorOutcome {
  if (!valid(input, [["transport", 0, 1e12], ["lodgingPerNight", 0, 1e10], ["nights", 0, 365], ["dailyFoodPerPerson", 0, 1e9], ["people", 1, 1e5], ["days", 1, 366], ["activities", 0, 1e12], ["localTransport", 0, 1e12], ["other", 0, 1e12], ["bufferPercent", 0, 100]])) return invalid("transport");
  const base = number(input, "transport") + number(input, "lodgingPerNight") * number(input, "nights") + number(input, "dailyFoodPerPerson") * number(input, "people") * number(input, "days") + number(input, "activities") + number(input, "localTransport") + number(input, "other"), total = base * (1 + number(input, "bufferPercent") / 100);
  return result({ label: "subtotal", value: base }, { label: "contingencyAmount", value: total - base }, { label: "totalBudget", value: total }, { label: "budgetPerPerson", value: total / number(input, "people") });
}

export function calculateFreelancerRate(input: Record<string, string>): CalculatorOutcome {
  if (!valid(input, [["targetAnnualRevenue", 0, 1e12], ["annualBusinessCosts", 0, 1e12], ["billableHoursPerWeek", 0.1, 168], ["workingWeeks", 1, 52], ["bufferPercent", 0, 1000]])) return invalid("targetAnnualRevenue");
  const hours = number(input, "billableHoursPerWeek") * number(input, "workingWeeks"), base = (number(input, "targetAnnualRevenue") + number(input, "annualBusinessCosts")) / hours;
  return result({ label: "annualBillableHours", value: hours }, { label: "minimumHourlyRate", value: base }, { label: "suggestedHourlyRate", value: base * (1 + number(input, "bufferPercent") / 100) });
}

export function calculateBreakEven(input: Record<string, string>): CalculatorOutcome {
  if (!valid(input, [["fixedCosts", 0, 1e12], ["pricePerUnit", Number.MIN_VALUE, 1e12], ["variableCostPerUnit", 0, 1e12]])) return invalid("fixedCosts");
  const contribution = number(input, "pricePerUnit") - number(input, "variableCostPerUnit");
  if (contribution <= 0) return invalid("variableCostPerUnit");
  const units = Math.ceil(number(input, "fixedCosts") / contribution);
  return result({ label: "contributionPerUnit", value: contribution }, { label: "breakEvenUnits", value: units }, { label: "breakEvenRevenue", value: units * number(input, "pricePerUnit") });
}


import type { CountryRateConfig } from "./types";
export const italyRates: CountryRateConfig = {
  countryCode: "IT", countryName: "Italy", currency: "EUR", policyYear: 2026, updatedAt: "2026-10-13", vatRate: 22,
  annualTaxBrackets: [{ upTo: 28000, rate: 23 }, { upTo: 50000, rate: 33 }, { upTo: Infinity, rate: 43 }],
  sources: [{ name: "Italian Revenue Agency", url: "https://www.agenziaentrate.gov.it/portale/web/english" }, { name: "Italian Ministry of Economy and Finance", url: "https://www.mef.gov.it/" }],
  notes: "The national IRPEF estimate excludes regional and municipal surcharges, tax credits, deductions and payroll-specific social contributions. VAT has reduced, super-reduced and zero/exempt cases; the standard rate is 22%.",
};

import type { CountryRateConfig } from "./types";
export const taiwanRates: CountryRateConfig = {
  countryCode: "TW", countryName: "Taiwan", currency: "TWD", policyYear: 2026, updatedAt: "2026-10-13", vatRate: 5, socialEmployeeRate: 2.4,
  annualTaxBrackets: [{ upTo: 610000, rate: 5 }, { upTo: 1380000, rate: 12 }, { upTo: 2770000, rate: 20 }, { upTo: 5190000, rate: 30 }, { upTo: Infinity, rate: 40 }],
  sources: [{ name: "Taiwan Ministry of Finance — Individual income tax", url: "https://investtaiwan.nat.gov.tw/showPage?lang=eng&search=56" }, { name: "Bureau of Labor Insurance", url: "https://www.bli.gov.tw/en/" }],
  notes: "Income-tax brackets use published 2026 reference thresholds and omit personal exemptions and deductions. Labor insurance and health-insurance deductions depend on insured salary brackets and employment category; this calculator is a simplified estimate.",
};

import type { CountryRateConfig } from "./types";
export const germanyRates: CountryRateConfig = {
  countryCode: "DE", countryName: "Germany", currency: "EUR", policyYear: 2026, updatedAt: "2026-10-13", vatRate: 19, socialEmployeeRate: 21.15,
  annualTaxBrackets: [{ upTo: 12348, rate: 0 }, { upTo: 17799, rate: 14 }, { upTo: 69878, rate: 24 }, { upTo: 277825, rate: 42 }, { upTo: Infinity, rate: 45 }],
  sources: [{ name: "Federal Ministry of Finance — Income tax tariff 2026", url: "https://usth.bundesfinanzministerium.de/lsth/2026/A-Einkommensteuergesetz/IV-Tarif-31-34b/Paragraf-32a/inhalt.html" }, { name: "Federal Ministry of Finance — Tax changes 2026", url: "https://www.bundesfinanzministerium.de/Content/DE/Standardartikel/Themen/Steuern/das-aendert-sich-2026.html" }],
  notes: "Income tax uses the official 2026 §32a formula in the tax calculator. Payroll social insurance is an indicative employee-side blended assumption; tax class, state, insurer, children, church tax and contribution ceilings change take-home pay. The vacation bonus is not a generally statutory fixed benefit.",
};

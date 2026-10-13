import type { CountryRateConfig } from "./types";
export const franceRates: CountryRateConfig = {
  countryCode: "FR", countryName: "France", currency: "EUR", policyYear: 2026, updatedAt: "2026-10-13", vatRate: 20, socialEmployeeRate: 22,
  annualTaxBrackets: [{ upTo: 11600, rate: 0 }, { upTo: 29579, rate: 11 }, { upTo: 84577, rate: 30 }, { upTo: 181917, rate: 41 }, { upTo: Infinity, rate: 45 }],
  sources: [{ name: "French Tax Authority — 2026 tax guide (2025 income)", url: "https://www.impots.gouv.fr/sites/default/files/media/1_metier/5_international/actualite/dossier-de-presse-dinr-revenus-2025_03_2026.pdf" }, { name: "French Tax Authority — VAT statistics", url: "https://www.impots.gouv.fr/dgfip-statistiques-la-tva-economique-augmente-de-10-en-2025" }],
  notes: "The income-tax estimate applies a simplified household-share model and does not include all deductions, credits or exceptional contributions. Employee social charges vary by status and payroll components; the displayed rate is an indicative assumption.",
};

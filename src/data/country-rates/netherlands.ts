import type { CountryRateConfig } from "./types";
export const netherlandsRates: CountryRateConfig = {
  countryCode: "NL", countryName: "Netherlands", currency: "EUR", policyYear: 2026, updatedAt: "2026-10-13", vatRate: 21,
  annualTaxBrackets: [{ upTo: 38883, rate: 35.75 }, { upTo: 78426, rate: 37.56 }, { upTo: Infinity, rate: 49.5 }],
  sources: [{ name: "Dutch Tax Administration — Box 1 rates 2026", url: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/boxen_en_tarieven/box_1/" }, { name: "Dutch Tax Administration — Expat scheme", url: "https://www.belastingdienst.nl/wps/wcm/connect/en/individuals/content/coming-to-work-in-the-netherlands-30-percent-facility" }],
  notes: "Box 1 rates include national insurance for many residents and differ by age and eligibility for tax credits. The 30% facility requires approval and eligibility; in 2026 the salary threshold is €48,013 and the annual maximum tax-free allowance is €78,600. Holiday allowance is generally at least 8% of wages, subject to statutory rules and exceptions.",
};

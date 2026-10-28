import type { CountryRateConfig } from "./types";
export const netherlandsRates: CountryRateConfig = {
  countryCode: "NL", countryName: "Netherlands", currency: "EUR", policyYear: 2026, updatedAt: "2026-10-28", vatRate: 21,
  annualTaxBrackets: [{ upTo: 38883, rate: 35.75 }, { upTo: 78426, rate: 37.56 }, { upTo: Infinity, rate: 49.5 }],
  sources: [
    { name: "Dutch Tax Administration — Box 1 rates 2026", url: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/boxen_en_tarieven/box_1/", checkedAt: "2026-10-28" },
    { name: "Dutch Tax Administration — VAT tariffs", url: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontenten/belastingdienst/business/vat/vat_in_the_netherlands/calculating_vat/vat_tariffs", checkedAt: "2026-10-28" },
    { name: "Dutch Tax Administration — Expat scheme", url: "https://www.belastingdienst.nl/wps/wcm/connect/en/individuals/content/coming-to-work-in-the-netherlands-30-percent-facility", checkedAt: "2026-10-28" },
  ],
  notes: "The 2026 Box 1 schedule varies by age; for taxpayers below AOW age, the first rate includes national insurance contributions, and tax credits are not modeled here. The 30% facility requires eligibility and an approved decision; in 2026 the general salary norm is over €48,013 and the annual maximum allowance is €78,600. This calculator applies an entered percentage and does not test eligibility or prorate a part year. Dutch VAT has 21%, 9%, and 0% tariffs plus exemptions; this calculator applies an entered rate without classifying supplies.",
};

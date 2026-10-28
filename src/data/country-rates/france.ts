import type { CountryRateConfig } from "./types";
export const franceRates: CountryRateConfig = {
  countryCode: "FR", countryName: "France", currency: "EUR", policyYear: 2026, updatedAt: "2026-10-13", vatRate: 20, socialEmployeeRate: 22,
  annualTaxBrackets: [{ upTo: 11600, rate: 0 }, { upTo: 29579, rate: 11 }, { upTo: 84577, rate: 30 }, { upTo: 181917, rate: 41 }, { upTo: Infinity, rate: 45 }],
  sources: [
    { name: "French Tax Authority — 2026 income-tax scale for 2025 income", url: "https://www.impots.gouv.fr/sites/default/files/media/1_metier/5_international/actualite/dossier-de-presse-dinr-revenus-2025_03_2026.pdf", checkedAt: "2026-10-28" },
    { name: "BOFiP — 2026 scale and quotient familial calculation", url: "https://bofip.impots.gouv.fr/bofip/2491-PGP.html/identifiant=BOI-IR-LIQ-20-10-20260407", checkedAt: "2026-10-28" },
    { name: "French Tax Authority — metropolitan VAT rates", url: "https://www.impots.gouv.fr/international-professionnel/fiscalite-des-entreprises", checkedAt: "2026-10-28" },
    { name: "Urssaf — private-sector social contribution rates for 2026", url: "https://www.urssaf.fr/accueil/outils-documentation/taux-baremes/taux-cotisations-secteur-prive.html", checkedAt: "2026-10-28" },
    { name: "Urssaf — contribution calculation bases and rates", url: "https://www.urssaf.fr/accueil/employeur/cotisations/comprendre-cotisations/calcul-cotisations-employeur.html", checkedAt: "2026-10-28" },
  ],
  notes: "France income tax uses the 2026 progressive scale on 2025 income, but the calculator applies the entered annual income as one tax share and omits quotient familial, the 10% employment-income allowance, décote and most credits/reductions. Gross-net is only an arithmetic scenario: the user-entered social percentage is not a statutory flat rate and payroll contribution bases/rates and source withholding vary. Metropolitan VAT is 20% standard with reduced rates for specified supplies; the tool applies an entered rate and does not classify the supply or overseas territory. Currency selection changes display only, not the French policy basis.",
};

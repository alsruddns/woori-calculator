import { calculatorCategoryOrder } from "@/data/calculators/categories";
import type { LocaleDictionary } from "@/i18n/dictionaries/types";
import { swedishCalculatorContent } from "@/i18n/dictionaries/sv-progress";

export function buildSwedishDictionary(english: LocaleDictionary): LocaleDictionary {
  return {
    ...english,
    locale: "sv",
    siteName: "Woori Today",
    description: "Praktiska kalkylatorer för ekonomi, arbete, datum och vardag. Beräkna snabbt och enkelt.",
    common: { calculate: "Beräkna", reset: "Återställ", copy: "Kopiera", copied: "Kopierat", result: "Beräkningsresultat", input: "Indata", formula: "Formel", example: "Exempel", faq: "Vanliga frågor", relatedCalculators: "Relaterade kalkylatorer", search: "Sök", category: "Kategori", previous: "Föregående", next: "Nästa", error: "Fel", invalidInput: "Kontrollera det angivna värdet.", required: "Obligatoriskt fält", copyError: "Det gick inte att kopiera resultatet.", resetDone: "Indata har återställts.", unit: "Enhet", noResults: "Inga resultat hittades." },
    nav: { home: "Startsida", calculators: "Kalkylatorer", menu: "Kalkylatormeny", search: "Sök kalkylatorer", close: "Stäng menyn", searchEmpty: "Inga kalkylatorer matchar sökningen.", language: "Språk", skip: "Hoppa till innehållet" },
    categories: { math: "Matematik och omvandling", finance: "Ekonomi", tax: "Skatt och priser", "date-time": "Datum och tid", life: "Vardagsliv", salary: "Lön och arbete" },
    calculatorList: { title: "Kalkylatorer och praktiska verktyg", description: "Välj en kalkylator och få en uppskattning snabbt.", breadcrumbHome: "Startsida", breadcrumbCalculators: "Kalkylatorer", count: "kalkylatorer", noResults: "Inga kalkylatorer matchar sökningen." },
    detail: { home: "Startsida", calculators: "Kalkylatorer", howTo: "Så använder du kalkylatorn", formula: "Formel", example: "Beräkningsexempel", notes: "Att tänka på", faqs: "Vanliga frågor", related: "Relaterade kalkylatorer", result: "Resultat", calculate: "Beräkna", invalid: "Kontrollera indata och försök igen.", updated: "Senast uppdaterad" },
    home: { title: "Praktiska kalkylatorer för vardagen", description: "Hitta rätt kalkylator och gör beräkningar enkelt.", featured: "Utvalda kalkylatorer", categories: "Bläddra efter kategori" },
    units: { won: "KRW", number: "tal", year: "år", month: "månader", durationLabel: "Period" },
    categoriesOrder: calculatorCategoryOrder,
    calculators: swedishCalculatorContent,
  };
}

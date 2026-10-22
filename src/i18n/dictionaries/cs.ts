import { calculatorCategoryOrder } from "@/data/calculators/categories";
import { czechCalculatorContent } from "@/i18n/dictionaries/cs-progress";
import type { LocaleDictionary } from "@/i18n/dictionaries/types";

export const cs: LocaleDictionary = {
  locale: "cs",
  siteName: "Kalkulačky pro každý den",
  description: "Praktické kalkulačky a nástroje pro rychlé a srozumitelné výsledky v každodenních situacích.",
  common: {
    calculate: "Vypočítat", reset: "Vymazat", copy: "Kopírovat", copied: "Zkopírováno", result: "Výsledek", input: "Zadání", formula: "Vzorec", example: "Příklad", faq: "Časté otázky", relatedCalculators: "Související kalkulačky", search: "Hledat", category: "Kategorie", previous: "Předchozí", next: "Další", error: "Chyba", invalidInput: "Zkontrolujte zadané hodnoty.", required: "Povinné pole", copyError: "Kopírování se nezdařilo.", resetDone: "Zadané hodnoty byly vymazány.", unit: "Jednotka", noResults: "Nebyly nalezeny žádné kalkulačky.",
  },
  nav: { home: "Domů", calculators: "Kalkulačky", menu: "Nabídka kalkulaček", search: "Hledat kalkulačky", close: "Zavřít nabídku", searchEmpty: "Nebyly nalezeny žádné kalkulačky.", language: "Jazyk", skip: "Přejít k obsahu" },
  categories: { math: "Matematika a převody", finance: "Finance", tax: "Daně a ceny", "date-time": "Datum a čas", life: "Každodenní život", salary: "Mzda a práce" },
  calculatorList: { title: "Kalkulačky a užitečné nástroje", description: "Vyberte si kalkulačku a ihned zjistěte výsledek. Výpočty probíhají přímo ve vašem prohlížeči.", breadcrumbHome: "Domů", breadcrumbCalculators: "Kalkulačky", count: "kalkulaček", noResults: "Žádná kalkulačka neodpovídá hledání." },
  detail: { home: "Domů", calculators: "Kalkulačky", howTo: "Jak kalkulačku používat", formula: "Vzorec", example: "Příklad výpočtu", notes: "Poznámky", faqs: "Časté otázky", related: "Související kalkulačky", result: "Výsledek", calculate: "Vypočítat", invalid: "Zkontrolujte zadané hodnoty a zkuste to znovu.", updated: "Naposledy aktualizováno" },
  home: { title: "Každodenní výpočty jednoduše", description: "Rychlé a přehledné kalkulačky a nástroje pro běžná rozhodnutí.", featured: "Doporučené kalkulačky", categories: "Procházet podle kategorie" },
  units: { won: "KRW", number: "číslo", year: "let", month: "měsíců", durationLabel: "Období" },
  categoriesOrder: calculatorCategoryOrder,
  calculators: czechCalculatorContent,
};

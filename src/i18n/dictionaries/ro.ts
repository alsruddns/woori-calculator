import { calculatorCategoryOrder } from "@/data/calculators/categories";
import { romanianCalculatorContent } from "@/i18n/dictionaries/ro-progress";
import type { LocaleDictionary } from "@/i18n/dictionaries/types";

export const ro: LocaleDictionary = {
  locale: "ro",
  siteName: "Calculatoare pentru fiecare zi",
  description: "Calculatoare online practice pentru finanțe, muncă și situații de zi cu zi.",
  common: {
    calculate: "Calculează", reset: "Resetează", copy: "Copiază", copied: "Copiat", result: "Rezultat", input: "Date introduse", formula: "Formulă", example: "Exemplu", faq: "Întrebări frecvente", relatedCalculators: "Calculatoare similare", search: "Caută", category: "Categorie", previous: "Înapoi", next: "Înainte", error: "Eroare", invalidInput: "Verificați valorile introduse.", required: "Câmp obligatoriu", copyError: "Copierea nu a reușit.", resetDone: "Valorile au fost șterse.", unit: "Unitate", noResults: "Nu s-au găsit calculatoare.",
  },
  nav: { home: "Acasă", calculators: "Calculatoare", menu: "Meniu calculatoare", search: "Caută calculatoare", close: "Închide meniul", searchEmpty: "Nu s-au găsit rezultate.", language: "Limbă", skip: "Salt la conținut" },
  categories: { math: "Matematică și conversii", finance: "Finanțe", tax: "Impozite și prețuri", "date-time": "Dată și oră", life: "Viața de zi cu zi", salary: "Salariu și muncă" },
  calculatorList: { title: "Calculatoare și instrumente utile", description: "Alegeți un calculator și obțineți imediat rezultatul dorit.", breadcrumbHome: "Acasă", breadcrumbCalculators: "Calculatoare", count: "calculatoare", noResults: "Nu s-au găsit calculatoare potrivite." },
  detail: { home: "Acasă", calculators: "Calculatoare", howTo: "Cum se folosește", formula: "Formula de calcul", example: "Exemplu de calcul", notes: "Note", faqs: "Întrebări frecvente", related: "Calculatoare similare", result: "Rezultat", calculate: "Calculează", invalid: "Verificați datele introduse și încercați din nou.", updated: "Ultima actualizare" },
  home: { title: "Calculele de zi cu zi, mai simple", description: "Găsiți calculatorul potrivit și faceți calcule online cu ușurință.", featured: "Calculatoare recomandate", categories: "Explorează după categorie" },
  units: { won: "KRW", number: "număr", year: "ani", month: "luni", durationLabel: "Perioadă" },
  categoriesOrder: calculatorCategoryOrder,
  calculators: romanianCalculatorContent,
};

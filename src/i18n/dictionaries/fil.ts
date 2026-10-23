import { calculatorCategoryOrder } from "@/data/calculators/categories";
import type { LocaleDictionary } from "@/i18n/dictionaries/types";
import { filipinoCalculatorContent } from "@/i18n/dictionaries/fil-progress";

export const fil: LocaleDictionary = {
  locale: "fil",
  siteName: "woori.today Mga Calculator",
  description: "Mga praktikal na calculator para sa pera, trabaho, petsa at pang-araw-araw na gawain.",
  common: {
    calculate: "Kuwentahin", reset: "I-reset", copy: "Kopyahin", copied: "Nakopya", result: "Resulta", input: "Ilagay", formula: "Pormula", example: "Halimbawa", faq: "Mga madalas itanong", relatedCalculators: "Mga kaugnay na calculator", search: "Maghanap", category: "Kategorya", previous: "Nakaraan", next: "Susunod", error: "Error", invalidInput: "Pakisuri ang mga inilagay na value.", required: "Kinakailangan", copyError: "Hindi nakopya ang resulta.", resetDone: "Na-reset na ang mga input.", unit: "Yunit", noResults: "Walang nahanap na resulta.",
  },
  nav: { home: "Home", calculators: "Mga calculator", menu: "Menu ng calculator", search: "Maghanap ng calculator", close: "Isara ang menu", searchEmpty: "Walang tumugmang calculator.", language: "Wika", skip: "Lumaktaw sa nilalaman" },
  categories: { math: "Math at mga conversion", finance: "Pananalapi", tax: "Buwis at presyo", "date-time": "Petsa at oras", life: "Pang-araw-araw", salary: "Sahod at trabaho" },
  calculatorList: { title: "Mga calculator at praktikal na tool", description: "Pumili ng calculator at gawin agad ang kailangan mong pagkukuwenta.", breadcrumbHome: "Home", breadcrumbCalculators: "Mga calculator", count: "calculator", noResults: "Walang calculator na tumugma sa paghahanap." },
  detail: { home: "Home", calculators: "Mga calculator", howTo: "Paano gamitin", formula: "Pormula", example: "Halimbawa ng pagkukuwenta", notes: "Mga paalala", faqs: "Mga madalas itanong", related: "Mga kaugnay na calculator", result: "Resulta", calculate: "Kuwentahin", invalid: "Pakisuri ang mga inilagay at subukang muli.", updated: "Huling na-update" },
  home: { title: "Mga praktikal na pagkukuwenta para sa araw-araw", description: "Hanapin ang kailangan mong calculator at kuwentahin ito online.", featured: "Mga inirerekomendang calculator", categories: "Mag-browse ayon sa kategorya" },
  units: { won: "KRW", number: "numero", year: "taon", month: "buwan", durationLabel: "Tagal" },
  categoriesOrder: calculatorCategoryOrder,
  calculators: filipinoCalculatorContent,
};

import { calculatorCategoryOrder } from "@/data/calculators/categories";
import type { LocaleDictionary } from "@/i18n/dictionaries/types";
import { plBatchOne } from "@/i18n/dictionaries/pl-batch-1";
import { plBatchTwo } from "@/i18n/dictionaries/pl-batch-2";
import { plBatchThree } from "@/i18n/dictionaries/pl-batch-3";
import { plBatchFour } from "@/i18n/dictionaries/pl-batch-4";
import { plBatchFive } from "@/i18n/dictionaries/pl-batch-5";
import { plBatchSix } from "@/i18n/dictionaries/pl-batch-6";
import { plBatchSeven } from "@/i18n/dictionaries/pl-batch-7";
import { plBatchEight } from "@/i18n/dictionaries/pl-batch-8";
import { plBatchNine } from "@/i18n/dictionaries/pl-batch-9";
import { plBatchTen } from "@/i18n/dictionaries/pl-batch-10";
import { plBatchEleven } from "@/i18n/dictionaries/pl-batch-11";
import { plBatchTwelve } from "@/i18n/dictionaries/pl-batch-12";

export const pl: LocaleDictionary = {
  locale: "pl",
  siteName: "Kalkulatory na co dzień",
  description: "Praktyczne kalkulatory online do codziennych obliczeń.",
  common: { calculate: "Oblicz", reset: "Wyczyść", copy: "Kopiuj", copied: "Skopiowano", result: "Wynik", input: "Dane wejściowe", formula: "Wzór", example: "Przykład", faq: "Częste pytania", relatedCalculators: "Powiązane kalkulatory", search: "Szukaj", category: "Kategoria", previous: "Wstecz", next: "Dalej", error: "Błąd", invalidInput: "Sprawdź wprowadzone wartości.", required: "Pole wymagane", copyError: "Nie udało się skopiować.", resetDone: "Wyczyszczono dane.", unit: "Jednostka", noResults: "Nie znaleziono kalkulatorów." },
  nav: { home: "Strona główna", calculators: "Kalkulatory", menu: "Menu kalkulatorów", search: "Szukaj kalkulatora", close: "Zamknij menu", searchEmpty: "Brak wyników wyszukiwania.", language: "Język", skip: "Przejdź do treści" },
  categories: { math: "Matematyka i przeliczenia", finance: "Finanse", tax: "Podatki i ceny", "date-time": "Data i czas", life: "Życie codzienne", salary: "Wynagrodzenie i praca" },
  calculatorList: { title: "Kalkulatory i praktyczne narzędzia", description: "Wybierz kalkulator i od razu wykonaj potrzebne obliczenia.", breadcrumbHome: "Strona główna", breadcrumbCalculators: "Kalkulatory", count: "kalkulatorów", noResults: "Nie znaleziono pasujących kalkulatorów." },
  detail: { home: "Strona główna", calculators: "Kalkulatory", howTo: "Jak korzystać", formula: "Wzór obliczeniowy", example: "Przykład obliczenia", notes: "Uwagi", faqs: "Częste pytania", related: "Powiązane kalkulatory", result: "Wynik", calculate: "Oblicz", invalid: "Sprawdź dane i oblicz ponownie.", updated: "Ostatnia aktualizacja" },
  home: { title: "Codzienne obliczenia szybko i wygodnie", description: "Znajdź potrzebny kalkulator i wykonaj obliczenia online.", featured: "Polecane kalkulatory", categories: "Przeglądaj według kategorii" },
  units: { won: "KRW", number: "liczba", year: "lat", month: "miesięcy", durationLabel: "Okres" },
  categoriesOrder: calculatorCategoryOrder,
  calculators: { ...plBatchOne, ...plBatchTwo, ...plBatchThree, ...plBatchFour, ...plBatchFive, ...plBatchSix, ...plBatchSeven, ...plBatchEight, ...plBatchNine, ...plBatchTen, ...plBatchEleven, ...plBatchTwelve },
};

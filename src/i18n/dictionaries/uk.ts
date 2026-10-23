import { calculatorCategoryOrder } from "@/data/calculators/categories";
import type { LocaleDictionary } from "@/i18n/dictionaries/types";
import { ukrainianCalculatorContent } from "@/i18n/dictionaries/uk-progress";

export const uk: LocaleDictionary = {
  locale: "uk",
  siteName: "Калькулятори Woori Today",
  description: "Практичні онлайн-калькулятори для фінансів, роботи, дат і щоденних обчислень.",
  common: {
    calculate: "Обчислити", reset: "Скинути", copy: "Копіювати", copied: "Скопійовано", result: "Результат", input: "Введення", formula: "Формула", example: "Приклад", faq: "Поширені запитання", relatedCalculators: "Схожі калькулятори", search: "Пошук", category: "Категорія", previous: "Назад", next: "Далі", error: "Помилка", invalidInput: "Перевірте введені значення.", required: "Обов’язкове поле", copyError: "Не вдалося скопіювати результат.", resetDone: "Поля очищено.", unit: "Одиниця", noResults: "Результатів не знайдено.",
  },
  nav: { home: "Головна", calculators: "Калькулятори", menu: "Меню калькуляторів", search: "Знайти калькулятор", close: "Закрити меню", searchEmpty: "Нічого не знайдено.", language: "Мова", skip: "Перейти до вмісту" },
  categories: { math: "Математика й перетворення", finance: "Фінанси", tax: "Податки та ціни", "date-time": "Дата й час", life: "Щоденні справи", salary: "Зарплата й робота" },
  calculatorList: { title: "Калькулятори та корисні інструменти", description: "Оберіть калькулятор і виконайте потрібне обчислення.", breadcrumbHome: "Головна", breadcrumbCalculators: "Калькулятори", count: "калькуляторів", noResults: "Калькуляторів за запитом не знайдено." },
  detail: { home: "Головна", calculators: "Калькулятори", howTo: "Як користуватися", formula: "Формула", example: "Приклад обчислення", notes: "Примітки", faqs: "Поширені запитання", related: "Схожі калькулятори", result: "Результат", calculate: "Обчислити", invalid: "Перевірте дані та повторіть обчислення.", updated: "Оновлено" },
  home: { title: "Щоденні обчислення швидко й зручно", description: "Знайдіть потрібний калькулятор і виконайте обчислення онлайн.", featured: "Рекомендовані калькулятори", categories: "Перегляд за категоріями" },
  units: { won: "вона", number: "число", year: "років", month: "місяців", durationLabel: "Тривалість" },
  categoriesOrder: calculatorCategoryOrder,
  calculators: ukrainianCalculatorContent,
};

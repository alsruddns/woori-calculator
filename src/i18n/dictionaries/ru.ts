import { calculatorCategoryOrder } from "@/data/calculators/categories";
import type { LocaleDictionary } from "@/i18n/dictionaries/types";
import { ruBatchOne } from "@/i18n/dictionaries/ru-batch-1";
import { ruBatchTwo } from "@/i18n/dictionaries/ru-batch-2";
import { ruBatchThree } from "@/i18n/dictionaries/ru-batch-3";
import { ruBatchFour } from "@/i18n/dictionaries/ru-batch-4";
import { ruBatchFive } from "@/i18n/dictionaries/ru-batch-5";
import { ruBatchSix } from "@/i18n/dictionaries/ru-batch-6";
import { ruBatchSeven } from "@/i18n/dictionaries/ru-batch-7";
import { ruBatchEight } from "@/i18n/dictionaries/ru-batch-8";
import { ruBatchNine } from "@/i18n/dictionaries/ru-batch-9";
import { ruBatchTen } from "@/i18n/dictionaries/ru-batch-10";
import { ruBatchEleven } from "@/i18n/dictionaries/ru-batch-11";
import { ruBatchTwelve } from "@/i18n/dictionaries/ru-batch-12";
import { ruBatchThirteen } from "@/i18n/dictionaries/ru-batch-13";
import { ruBatchFourteen } from "@/i18n/dictionaries/ru-batch-14";
import { ruBatchFifteen } from "@/i18n/dictionaries/ru-batch-15";
import { ruBatchSixteen } from "@/i18n/dictionaries/ru-batch-16";
import { ruBatchSeventeen } from "@/i18n/dictionaries/ru-batch-17";
import { ruBatchEighteen } from "@/i18n/dictionaries/ru-batch-18";
import { ruBatchNineteen } from "@/i18n/dictionaries/ru-batch-19";
import { ruBatchTwenty } from "@/i18n/dictionaries/ru-batch-20";
import { ruBatchTwentyOne } from "@/i18n/dictionaries/ru-batch-21";
import { ruBatchTwentyTwo } from "@/i18n/dictionaries/ru-batch-22";

export const ru: LocaleDictionary = {
  locale: "ru",
  siteName: "Калькуляторы на каждый день",
  description: "Понятные онлайн-калькуляторы для повседневных расчётов.",
  common: { calculate: "Рассчитать", reset: "Сбросить", copy: "Копировать", copied: "Скопировано", result: "Результат", input: "Ввод данных", formula: "Формула", example: "Пример", faq: "Частые вопросы", relatedCalculators: "Похожие калькуляторы", search: "Поиск", category: "Категория", previous: "Назад", next: "Далее", error: "Ошибка", invalidInput: "Проверьте введённые данные.", required: "Обязательное поле", copyError: "Не удалось скопировать.", resetDone: "Данные очищены.", unit: "Единица", noResults: "Калькуляторы не найдены." },
  nav: { home: "Главная", calculators: "Калькуляторы", menu: "Меню калькуляторов", search: "Поиск калькулятора", close: "Закрыть меню", searchEmpty: "Ничего не найдено.", language: "Язык", skip: "Перейти к содержимому" },
  categories: { math: "Математика и пересчёт", finance: "Финансы", tax: "Налоги и цены", "date-time": "Дата и время", life: "Повседневная жизнь", salary: "Зарплата и работа" },
  calculatorList: { title: "Калькуляторы и полезные инструменты", description: "Выберите калькулятор и получите результат сразу. Расчёты выполняются в браузере.", breadcrumbHome: "Главная", breadcrumbCalculators: "Калькуляторы", count: "шт.", noResults: "Подходящие калькуляторы не найдены." },
  detail: { home: "Главная", calculators: "Калькуляторы", howTo: "Как пользоваться", formula: "Формула расчёта", example: "Пример расчёта", notes: "Примечания", faqs: "Частые вопросы", related: "Похожие калькуляторы", result: "Результат", calculate: "Рассчитать", invalid: "Проверьте данные и повторите расчёт.", updated: "Дата обновления" },
  home: { title: "Повседневные расчёты — просто и понятно", description: "Быстрые калькуляторы и инструменты для практических задач." },
  units: { won: "KRW", number: "число", year: "лет", month: "месяцев", durationLabel: "Срок" },
  categoriesOrder: calculatorCategoryOrder,
  calculators: {
    ...ruBatchOne,
    ...ruBatchTwo,
    ...ruBatchThree,
    ...ruBatchFour,
    ...ruBatchFive,
    ...ruBatchSix,
    ...ruBatchSeven,
    ...ruBatchEight,
    ...ruBatchNine,
    ...ruBatchTen,
    ...ruBatchEleven,
    ...ruBatchTwelve,
    ...ruBatchThirteen,
    ...ruBatchFourteen,
    ...ruBatchFifteen,
    ...ruBatchSixteen,
    ...ruBatchSeventeen,
    ...ruBatchEighteen,
    ...ruBatchNineteen,
    ...ruBatchTwenty,
    ...ruBatchTwentyOne,
    ...ruBatchTwentyTwo,
    "compound-interest": {
      name: "Калькулятор сложных процентов",
      shortName: "Сложные проценты",
      title: "Калькулятор сложных процентов: рост вклада с капитализацией",
      description: "Оцените будущую сумму и начисленные проценты с учётом первоначального взноса, годовой ставки, срока и периодичности капитализации.",
      keywords: ["калькулятор сложных процентов", "капитализация процентов", "расчёт доходности вклада"],
      howTo: "Укажите первоначальную сумму, годовую процентную ставку и срок, затем выберите периодичность начисления процентов. Срок можно задать в годах или месяцах.",
      formula: "Итоговая сумма = первоначальная сумма × (1 + годовая ставка ÷ число начислений)^(число начислений × срок в годах)",
      example: { question: "Как изменится сумма 1 000 000 RUB за год при ставке 12% с ежемесячной капитализацией?", answer: "Расчётная сумма до вычета налогов составит около 1 126 825 RUB, включая примерно 126 825 RUB процентов." },
      faqs: [
        { question: "Влияет ли частота капитализации на результат?", answer: "Да. При одинаковой номинальной годовой ставке более частое начисление позволяет раньше включать начисленные проценты в дальнейший расчёт." },
        { question: "Учитываются ли налоги?", answer: "Нет. В расчёт не включены налоги, комиссии, изменение ставки и дополнительные взносы." },
      ],
      related: [],
      fields: { principal: { label: "Первоначальная сумма", unit: "KRW" }, rate: { label: "Годовая процентная ставка", unit: "%" }, years: { label: "Срок" }, frequency: { label: "Периодичность капитализации" } },
      options: { frequency: { "1": "Раз в год", "2": "Раз в полгода", "4": "Ежеквартально", "12": "Ежемесячно", "365": "Ежедневно" } },
      resultLabels: { "최종 금액": "Итоговая сумма", "총 이자": "Начисленные проценты" },
      validation: "Сумма, ставка и срок должны быть неотрицательными. Выберите допустимую периодичность капитализации.",
      resultNote: "Теоретическая оценка до вычета налогов. Дополнительные взносы, налоги, комиссии и условия конкретного продукта не учитываются.",
    },
  },
};

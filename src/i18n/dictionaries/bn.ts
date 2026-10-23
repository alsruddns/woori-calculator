import type { LocaleDictionary } from "@/i18n/dictionaries/types";
import { bengaliCalculatorContent } from "@/i18n/dictionaries/bn-progress";

export function buildBengaliDictionary(english: LocaleDictionary): LocaleDictionary {
  return {
    ...english,
    locale: "bn",
    siteName: "Woori Today ক্যালকুলেটর",
    description: "বিভিন্ন বিষয়ে সহজে হিসাব করুন, প্রয়োজনীয় তথ্য দেখুন এবং প্রতিদিনের কাজে বিনামূল্যের ক্যালকুলেটর ব্যবহার করুন।",
    common: {
      calculate: "হিসাব করুন", reset: "মুছে দিন", copy: "কপি করুন", copied: "কপি হয়েছে", result: "ফলাফল", input: "ইনপুট",
      formula: "হিসাবের সূত্র", example: "হিসাবের উদাহরণ", faq: "সাধারণ প্রশ্ন", relatedCalculators: "সম্পর্কিত ক্যালকুলেটর",
      search: "খুঁজুন", category: "বিভাগ", previous: "আগের", next: "পরের", error: "হিসাব করা যায়নি", invalidInput: "দেওয়া তথ্য যাচাই করে আবার চেষ্টা করুন।",
      required: "এই ঘরটি পূরণ করুন।", copyError: "কপি করা যায়নি।", resetDone: "ইনপুট মুছে দেওয়া হয়েছে।", unit: "একক", noResults: "কোনো ফল পাওয়া যায়নি।",
    },
    nav: { home: "হোম", calculators: "ক্যালকুলেটর", menu: "মেনু", search: "খুঁজুন", close: "বন্ধ করুন", searchEmpty: "কোনো ক্যালকুলেটর পাওয়া যায়নি।", language: "ভাষা নির্বাচন", skip: "মূল বিষয়বস্তুতে যান" },
    categories: { finance: "অর্থ ও বিনিয়োগ", salary: "বেতন ও কাজ", tax: "কর", life: "দৈনন্দিন জীবন", "date-time": "তারিখ ও সময়", math: "গণিত ও রূপান্তর", all: "সব ক্যালকুলেটর" },
    calculatorList: { title: "ক্যালকুলেটর", description: "অর্থ, কাজ, কর, দৈনন্দিন জীবন, তারিখ ও গণিতের হিসাবের জন্য ক্যালকুলেটর বেছে নিন।", breadcrumbHome: "হোম", breadcrumbCalculators: "ক্যালকুলেটর", count: "ক্যালকুলেটর", noResults: "আপনার খোঁজের সঙ্গে মেলে এমন ক্যালকুলেটর নেই।" },
    detail: { home: "হোম", calculators: "ক্যালকুলেটর", howTo: "ব্যবহারের নিয়ম", formula: "হিসাবের সূত্র", example: "উদাহরণ", notes: "গুরুত্বপূর্ণ তথ্য", faqs: "সাধারণ প্রশ্ন", related: "সম্পর্কিত ক্যালকুলেটর", result: "ফলাফল", calculate: "হিসাব করুন", invalid: "দেওয়া তথ্য যাচাই করে আবার হিসাব করুন।", updated: "সর্বশেষ হালনাগাদ" },
    home: { title: "দৈনন্দিন হিসাব করুন সহজে", description: "বিনামূল্যের ক্যালকুলেটর দিয়ে অর্থ, কাজ ও দৈনন্দিন জীবনের হিসাব দ্রুত করুন।", featured: "জনপ্রিয় ক্যালকুলেটর", categories: "বিভাগ অনুযায়ী দেখুন" },
    units: { won: "ওন", number: "সংখ্যা", year: "বছর", month: "মাস", durationLabel: "সময়কাল" },
    calculators: bengaliCalculatorContent,
  };
}

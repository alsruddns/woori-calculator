import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";
import { bnCountryPage, bnGlobalCountryResultLabels } from "@/i18n/dictionaries/bn-country-page";

export const bnBatchTwelve: Record<string, LocalizedCalculatorContent> = {
  "spain-gross-net-salary-calculator": bnCountryPage("spain-gross-net-salary-calculator", {
    name: "স্পেনের মোট ও হাতে-পাওয়া বেতন ক্যালকুলেটর", title: "স্পেনের বেতন ক্যালকুলেটর: কর ও সামাজিক অবদানের অনুমান", description: "স্পেনের জন্য বার্ষিক বা মাসিক মোট বেতন এবং দেওয়া কর্তনের হার থেকে আনুমানিক কর, অবদান ও হাতে-পাওয়া বেতন হিসাব করুন।",
    keywords: ["স্পেনের মোট-নেট বেতন ক্যালকুলেটর", "স্পেনের বেতন কর অনুমান", "স্পেনের হাতে-পাওয়া বেতন"], howTo: "মোট বেতন, প্রদানের সময়কাল এবং ক্যালকুলেটরে চাওয়া কর্তনের হার লিখুন। এটি স্পেনের নির্দেশক অনুমান; স্বায়ত্তশাসিত অঞ্চল, ব্যক্তিগত ছাড় ও কর্মীর পরিস্থিতিতে ফল বদলায়।", formula: "বার্ষিক মোট বেতন = বার্ষিক লিখিত অঙ্ক অথবা মাসিক অঙ্ক × ১২। আনুমানিক হাতে-পাওয়া বেতন = মোট বেতন − হিসাব করা কর ও কর্মী অবদান।",
    example: { question: "বার্ষিক মোট বেতন €৫০,০০০ হলে কী দেখানো হয়?", answer: "লিখিত হারের ভিত্তিতে বার্ষিক ও মাসিক গড় হাতে-পাওয়া বেতনের অনুমান দেখায়; এটি ব্যক্তিগত স্প্যানিশ কর-হিসাব নয়।" },
    fields: { salary: "মোট বেতন", frequency: "বেতন প্রদানের সময়কাল", socialRate: "সামাজিক অবদানের হার", taxRate: "কর হার" }, options: { frequency: { annual: "বার্ষিক", monthly: "মাসিক" } }, resultLabels: bnGlobalCountryResultLabels, related: ["spain-irpf-calculator", "spain-vat-calculator", "salary-conversion"],
  }),
  "spain-irpf-calculator": bnCountryPage("spain-irpf-calculator", {
    name: "স্পেনের IRPF আয়কর ক্যালকুলেটর", title: "স্পেনের IRPF ক্যালকুলেটর: লিখিত হারে আয়কর অনুমান", description: "বার্ষিক করযোগ্য আয় ও লিখিত হার থেকে স্পেনের ব্যক্তিগত আয়কর (IRPF)-এর সরল অনুমান হিসাব করুন।",
    keywords: ["স্পেনের IRPF ক্যালকুলেটর", "স্পেনের ব্যক্তিগত আয়কর", "স্পেনের বার্ষিক কর অনুমান"], howTo: "বার্ষিক করযোগ্য আয় এবং ব্যবহারযোগ্য করের হার ইউরোতে লিখুন। অঞ্চল, আয়স্তর, ছাড় ও ব্যক্তিগত কর পরিস্থিতি এতে স্বয়ংক্রিয়ভাবে গণনা হয় না।", formula: "আনুমানিক IRPF = লিখিত বার্ষিক করযোগ্য আয় × লিখিত করের হার ÷ ১০০।",
    example: { question: "বার্ষিক করযোগ্য আয় €৫০,০০০ ও হার ১৫% হলে অনুমান কত?", answer: "সরল অনুমানে কর €৭,৫০০। প্রকৃত স্প্যানিশ IRPF ব্যক্তিগত ও আঞ্চলিক নিয়মে নির্ধারিত হয়।" },
    fields: { income: "বার্ষিক করযোগ্য আয়", rate: "লিখিত করের হার" }, resultLabels: bnGlobalCountryResultLabels, related: ["spain-gross-net-salary-calculator", "spain-vat-calculator", "germany-income-tax-calculator"],
  }),
  "spain-vat-calculator": bnCountryPage("spain-vat-calculator", {
    name: "স্পেনের VAT ক্যালকুলেটর", title: "স্পেনের VAT ক্যালকুলেটর: কর যোগ বা কর-সহ দাম ভাঙুন", description: "স্পেনের জন্য প্রযোজ্য লিখিত হার দিয়ে কর-পূর্ব অঙ্কে VAT যোগ করুন অথবা কর-সহ দামের কর আলাদা করুন।",
    keywords: ["স্পেনের VAT ক্যালকুলেটর", "স্পেনের মূল্য সংযোজন কর", "স্পেনের কর-সহ দাম"], howTo: "অঙ্ক, হিসাবের দিক এবং প্রযোজ্য হার লিখুন। স্পেনে পণ্য ও সেবার ধরনভেদে হার বদলাতে পারে; সঠিক হার কর্তৃপক্ষের তথ্য থেকে যাচাই করুন।", formula: "কর যোগ: আনুমানিক কর = কর-পূর্ব অঙ্ক × হার; মোট = অঙ্ক + কর। কর-সহ মোট থেকে: কর-পূর্ব অঙ্ক = মোট ÷ (১ + হার)।",
    example: { question: "€১০০ অঙ্কে ২১% হার দিলে কর কত?", answer: "কর যোগের ক্ষেত্রে কর €২১ এবং মোট €১২১। স্পেনের সঠিক হার পণ্য বা সেবার শ্রেণির ওপর নির্ভর করে।" },
    fields: { amount: "অঙ্ক", direction: "হিসাবের দিক", rate: "লিখিত করের হার" }, options: { direction: { exclusive: "কর যোগ করুন", inclusive: "অন্তর্ভুক্ত কর আলাদা করুন" } }, resultLabels: bnGlobalCountryResultLabels, related: ["spain-irpf-calculator", "spain-gross-net-salary-calculator", "vat"],
  }),
  "spain-severance-pay-calculator": bnCountryPage("spain-severance-pay-calculator", {
    name: "স্পেনের চাকরি-সমাপ্তি ক্ষতিপূরণ ক্যালকুলেটর", title: "স্পেনের অবসান ক্ষতিপূরণ ক্যালকুলেটর: মজুরি ও চাকরির বছর", description: "মোট বেতন, চাকরির বছর এবং লিখিত ক্ষতিপূরণ-দিনের হার থেকে স্পেনের জন্য একটি সরল অবসান-ক্ষতিপূরণ অনুমান করুন।",
    keywords: ["স্পেনের চাকরি-সমাপ্তি ক্ষতিপূরণ ক্যালকুলেটর", "স্পেনের অবসান ভাতা", "চাকরির বছরভিত্তিক ক্ষতিপূরণ"], howTo: "মোট বেতন, চাকরির বছর এবং প্রতি চাকরির বছরে প্রযোজ্য ক্ষতিপূরণের দিন বেছে নিন। ১২, ২০ বা ৩৩ দিনের বিকল্প বিভিন্ন পরিস্থিতির জন্য; কোনটি প্রযোজ্য তা স্পেনের চাকরি-সমাপ্তির কারণ ও আইন অনুযায়ী যাচাই করুন।", formula: "দৈনিক বেতনের ভিত্তি = বার্ষিক মোট বেতন ÷ ৩৬৫। আনুমানিক ক্ষতিপূরণ = দৈনিক ভিত্তি × চাকরির বছর × বছরে ক্ষতিপূরণের দিন।", 
    example: { question: "বার্ষিক মোট বেতন €৩০,০০০, চাকরি ৫ বছর এবং বছরে ২০ দিন ধরলে?", answer: "সরল অনুমান প্রায় €৮,২১৯.১৮। স্পেনের প্রকৃত অধিকার চাকরি শেষের কারণ, আইনি সীমা ও প্রযোজ্য নিয়মে নির্ভর করে।" },
    fields: { salary: "মোট বেতন", years: "চাকরির বছর", daysPerYear: "প্রতি চাকরির বছরে ক্ষতিপূরণের দিন" }, options: { daysPerYear: { "12": "১২ দিন", "20": "২০ দিন", "33": "৩৩ দিন" } }, resultLabels: bnGlobalCountryResultLabels, related: ["spain-gross-net-salary-calculator", "tenure", "severance-pay"],
  }),
};

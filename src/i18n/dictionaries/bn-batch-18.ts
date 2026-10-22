import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";
import { bnCountryPage, bnGlobalCountryResultLabels } from "@/i18n/dictionaries/bn-country-page";

export const bnBatchEighteen: Record<string, LocalizedCalculatorContent> = {
  "china-gross-net-salary-calculator": bnCountryPage("china-gross-net-salary-calculator", {
    name: "চীনের মোট ও হাতে-পাওয়া বেতন ক্যালকুলেটর", title: "চীনের বেতন ক্যালকুলেটর: কর ও কর্মী অবদানের পর", description: "চীনের জন্য বার্ষিক বা মাসিক মোট বেতন ও লিখিত হার থেকে নির্দেশক কর, কর্মী অবদান এবং হাতে-পাওয়া বেতন হিসাব করুন।",
    keywords: ["চীনের মোট-নেট বেতন ক্যালকুলেটর", "চীনের বেতন কর অনুমান", "চীনের হাতে-পাওয়া বেতন"], howTo: "মোট বেতন, প্রদানের সময়কাল ও কর্মী অবদানের হার লিখুন। চীনে ব্যক্তিগত কর, স্থানীয় সামাজিক বীমার হার ও বেতন কর্তনে প্রকৃত ফল আলাদা হতে পারে; এটি কেবল অনুমান।", formula: "বার্ষিক মোট বেতন = লিখিত বার্ষিক অঙ্ক অথবা মাসিক বেতন × ১২। আনুমানিক হাতে-পাওয়া আয় = মোট বেতন − হিসাব করা কর ও কর্মী অবদান।",
    example: { question: "বার্ষিক মোট বেতন CNY ৫০,০০০ হলে কী দেখানো হয়?", answer: "চীনের নির্দেশক অনুমান অনুযায়ী কর ও কর্মী অবদানসহ বার্ষিক এবং মাসিক গড় হাতে-পাওয়া বেতন। ব্যক্তিগত কর ও স্থানীয় নিয়মে ফল বদলায়।" },
    fields: { salary: "মোট বেতন", frequency: "বেতন প্রদানের সময়কাল", socialRate: "কর্মী অবদান হার" }, options: { frequency: { annual: "বার্ষিক", monthly: "মাসিক" } }, resultLabels: bnGlobalCountryResultLabels, related: ["china-individual-income-tax-calculator", "china-social-insurance-calculator", "salary-conversion"],
  }),
  "china-individual-income-tax-calculator": bnCountryPage("china-individual-income-tax-calculator", {
    name: "চীনের ব্যক্তিগত আয়কর ক্যালকুলেটর", title: "চীনের ব্যক্তিগত আয়কর ক্যালকুলেটর: বার্ষিক করযোগ্য আয়", description: "চীনের রেফারেন্স নীতি অনুসারে লিখিত বার্ষিক করযোগ্য আয় থেকে ব্যক্তিগত আয়করের নির্দেশক অনুমান দেখুন।",
    keywords: ["চীনের ব্যক্তিগত আয়কর ক্যালকুলেটর", "চীনের বার্ষিক করযোগ্য আয়", "চীনা আয়কর অনুমান"], howTo: "বার্ষিক করযোগ্য আয় CNY-এ লিখুন। প্রকৃত চীনা আয়কর আয়ের ধরন, কর্তন, আবাসিক অবস্থা ও বর্তমান নিয়মে নির্ভর করে; ফলটি কর-পরামর্শ বা রিটার্ন নয়।", formula: "চীনের প্রযোজ্য রেফারেন্স সূত্রে লিখিত বার্ষিক করযোগ্য আয়ের ওপর আনুমানিক আয়কর হিসাব করা হয়।",
    example: { question: "বার্ষিক করযোগ্য আয় CNY ৫০,০০০ হলে কী দেখানো হয়?", answer: "চীনের নীতি-অনুমানে বার্ষিক আয়করের একটি নির্দেশক অঙ্ক। ব্যক্তিগত কর্তন ও বর্তমান নিয়ম যাচাই করুন।" },
    fields: { income: "বার্ষিক করযোগ্য আয়" }, resultLabels: bnGlobalCountryResultLabels, related: ["china-gross-net-salary-calculator", "china-social-insurance-calculator", "india-income-tax-calculator"],
  }),
  "china-social-insurance-calculator": bnCountryPage("china-social-insurance-calculator", {
    name: "চীনের সামাজিক বীমা অবদান ক্যালকুলেটর", title: "চীনের সামাজিক বীমা ক্যালকুলেটর: বেতনভিত্তিক অবদান", description: "মোট বেতন ও লিখিত হার থেকে চীনের সামাজিক বীমায় কর্মীর সম্ভাব্য অবদানের নির্দেশক অঙ্ক হিসাব করুন।",
    keywords: ["চীনের সামাজিক বীমা ক্যালকুলেটর", "চীনের বেতন বীমা অবদান", "কর্মীর সামাজিক বীমা হিসাব"], howTo: "মোট বেতন এবং লিখিত অবদান হার দিন। চীনে সামাজিক বীমার হার ও বীমাযোগ্য বেতনের সীমা শহরভেদে ভিন্ন হতে পারে; স্থানীয় বর্তমান নিয়ম যাচাই করুন।", formula: "আনুমানিক অবদান = লিখিত মোট বেতন × লিখিত হার ÷ ১০০।",
    example: { question: "মোট বেতন CNY ৩,০০০ এবং হার ০% লিখলে?", answer: "লিখিত ০% হার অনুযায়ী সরল অঙ্ক CNY ০। চীনের স্থানীয় হার ও সীমা এতে প্রতিফলিত হয় না।" },
    fields: { salary: "মোট বেতন", rate: "লিখিত অবদান হার" }, resultLabels: bnGlobalCountryResultLabels, related: ["china-gross-net-salary-calculator", "china-individual-income-tax-calculator", "social-insurance"],
  }),
  "china-vat-calculator": bnCountryPage("china-vat-calculator", {
    name: "চীনের VAT ক্যালকুলেটর", title: "চীনের VAT ক্যালকুলেটর: কর যোগ বা কর-সহ দাম ভাঙুন", description: "চীনের জন্য প্রযোজ্য লিখিত VAT হার দিয়ে কর-পূর্ব অঙ্কে কর যোগ করুন অথবা কর-সহ মোট থেকে কর আলাদা করুন।",
    keywords: ["চীনের VAT ক্যালকুলেটর", "চীনের মূল্য সংযোজন কর", "চীনা কর-সহ দাম হিসাব"], howTo: "অঙ্ক, হিসাবের দিক এবং প্রযোজ্য VAT হার লিখুন। চীনে হার পণ্য ও লেনদেনের ধরনভেদে বদলাতে পারে; সরকারি বর্তমান নিয়ম যাচাই করুন।", formula: "কর যোগ: আনুমানিক VAT = কর-পূর্ব অঙ্ক × হার; মোট = অঙ্ক + VAT। কর-সহ মোট থেকে: কর-পূর্ব অঙ্ক = মোট ÷ (১ + হার)।",
    example: { question: "CNY ১০০ অঙ্কে ১৩% VAT হার হলে?", answer: "কর যোগের ক্ষেত্রে আনুমানিক কর CNY ১৩ এবং মোট CNY ১১৩। চীনের প্রযোজ্য হার পণ্য ও লেনদেনের শ্রেণিভেদে যাচাই করুন।" },
    fields: { amount: "অঙ্ক", direction: "হিসাবের দিক", rate: "লিখিত করের হার" }, options: { direction: { exclusive: "কর যোগ করুন", inclusive: "অন্তর্ভুক্ত কর আলাদা করুন" } }, resultLabels: bnGlobalCountryResultLabels, related: ["china-individual-income-tax-calculator", "india-gst-calculator", "vat"],
  }),
};

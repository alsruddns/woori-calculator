import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";
import { bnCountryPage, bnGlobalCountryResultLabels } from "@/i18n/dictionaries/bn-country-page";

export const bnBatchFourteen: Record<string, LocalizedCalculatorContent> = {
  "netherlands-gross-net-salary-calculator": bnCountryPage("netherlands-gross-net-salary-calculator", {
    name: "নেদারল্যান্ডসের মোট ও হাতে-পাওয়া বেতন ক্যালকুলেটর", title: "নেদারল্যান্ডসের বেতন ক্যালকুলেটর: কর ও অবদানের পর", description: "নেদারল্যান্ডসের জন্য বার্ষিক বা মাসিক মোট বেতন ও লিখিত হার থেকে আনুমানিক কর, কর্মী অবদান ও হাতে-পাওয়া বেতন হিসাব করুন।",
    keywords: ["নেদারল্যান্ডসের মোট-নেট বেতন ক্যালকুলেটর", "ডাচ বেতন কর অনুমান", "নেদারল্যান্ডসে হাতে-পাওয়া বেতন"], howTo: "মোট বেতন, বার্ষিক বা মাসিক সময়কাল এবং কর্মী অবদানের জন্য হার লিখুন। এটি নেদারল্যান্ডসের নির্দেশক অনুমান; ব্যক্তিগত অবস্থা, ছাড় ও বীমা ব্যবস্থায় প্রকৃত বেতন ভিন্ন হতে পারে।", formula: "বার্ষিক বেতন = লিখিত বার্ষিক অঙ্ক অথবা মাসিক বেতন × ১২। আনুমানিক হাতে-পাওয়া আয় = মোট বেতন − হিসাব করা কর্তন।",
    example: { question: "বার্ষিক মোট বেতন €৫০,০০০ হলে কী দেখানো হয়?", answer: "নেদারল্যান্ডসের অনুমানে কর ও অবদানসহ বার্ষিক এবং মাসিক গড় হাতে-পাওয়া আয় দেখানো হয়।" },
    fields: { salary: "মোট বেতন", frequency: "বেতন প্রদানের সময়কাল", socialRate: "লিখিত অবদান হার" }, options: { frequency: { annual: "বার্ষিক", monthly: "মাসিক" } }, resultLabels: bnGlobalCountryResultLabels, related: ["netherlands-vat-calculator", "netherlands-30-percent-ruling-calculator", "salary-conversion"],
  }),
  "netherlands-vat-calculator": bnCountryPage("netherlands-vat-calculator", {
    name: "নেদারল্যান্ডসের VAT ক্যালকুলেটর", title: "নেদারল্যান্ডসের VAT ক্যালকুলেটর: কর যোগ বা দাম থেকে আলাদা করুন", description: "নেদারল্যান্ডসের জন্য লিখিত VAT হার দিয়ে কর-পূর্ব দামে কর যোগ করুন অথবা কর-সহ মোট থেকে কর আলাদা করুন।",
    keywords: ["নেদারল্যান্ডসের VAT ক্যালকুলেটর", "ডাচ মূল্য সংযোজন কর", "নেদারল্যান্ডস কর-সহ দাম"], howTo: "অঙ্ক, হিসাবের দিক ও প্রযোজ্য হার লিখুন। নেদারল্যান্ডসে পণ্য বা সেবার শ্রেণিভেদে VAT হার ভিন্ন হতে পারে; সঠিক হার সরকারি তথ্য থেকে যাচাই করুন।", formula: "কর যোগ: আনুমানিক কর = কর-পূর্ব অঙ্ক × হার; মোট = অঙ্ক + কর। অন্তর্ভুক্ত কর আলাদা: কর-পূর্ব অঙ্ক = কর-সহ মোট ÷ (১ + হার)।",
    example: { question: "€১০০ অঙ্কে ২১% VAT হার দিলে?", answer: "কর যোগের হিসাবে কর €২১ এবং মোট €১২১। নেদারল্যান্ডসে প্রযোজ্য হার লেনদেন ও পণ্যের শ্রেণির ওপর নির্ভর করে।" },
    fields: { amount: "অঙ্ক", direction: "হিসাবের দিক", rate: "লিখিত করের হার" }, options: { direction: { exclusive: "কর যোগ করুন", inclusive: "অন্তর্ভুক্ত কর আলাদা করুন" } }, resultLabels: bnGlobalCountryResultLabels, related: ["netherlands-gross-net-salary-calculator", "germany-vat-calculator", "vat"],
  }),
  "netherlands-30-percent-ruling-calculator": bnCountryPage("netherlands-30-percent-ruling-calculator", {
    name: "নেদারল্যান্ডসের ৩০% কর-সুবিধা ক্যালকুলেটর", title: "নেদারল্যান্ডসের ৩০% সুবিধা: বেতন থেকে সম্ভাব্য করমুক্ত অংশ", description: "নেদারল্যান্ডসের ৩০% সুবিধার জন্য লিখিত মোট বেতন ও হার থেকে সম্ভাব্য করমুক্ত ভাতার অঙ্ক হিসাব করুন। এটি যোগ্যতা যাচাই নয়।",
    keywords: ["নেদারল্যান্ডসের ৩০% সুবিধা ক্যালকুলেটর", "ডাচ ৩০ শতাংশ কর-সুবিধা", "সম্ভাব্য করমুক্ত বেতনভাতা"], howTo: "বার্ষিক মোট বেতন এবং প্রযোজ্য হার লিখুন। নেদারল্যান্ডসের ৩০% সুবিধার বাস্তব যোগ্যতা, নিয়োগের শর্ত, সর্বোচ্চ সীমা ও বর্তমান নীতি এই সরল গুণে যাচাই হয় না।", formula: "সম্ভাব্য করমুক্ত ভাতা = বার্ষিক মোট বেতন × লিখিত হার ÷ ১০০।",
    example: { question: "মোট বেতন €৮০,০০০ ও হার ৩০% হলে সম্ভাব্য ভাতা কত?", answer: "গাণিতিকভাবে সম্ভাব্য করমুক্ত অংশ €২৪,০০০। নেদারল্যান্ডসের কর্তৃপক্ষের বর্তমান যোগ্যতা ও সীমা যাচাই করুন।" },
    fields: { salary: "বার্ষিক মোট বেতন", rate: "লিখিত হার" }, resultLabels: bnGlobalCountryResultLabels, related: ["netherlands-gross-net-salary-calculator", "netherlands-holiday-allowance-calculator", "france-income-tax-calculator"],
  }),
  "netherlands-holiday-allowance-calculator": bnCountryPage("netherlands-holiday-allowance-calculator", {
    name: "নেদারল্যান্ডসের ছুটির ভাতা ক্যালকুলেটর", title: "নেদারল্যান্ডসের ছুটির ভাতা: বেতনে লিখিত হার প্রয়োগ", description: "বার্ষিক মোট বেতন ও লিখিত হারের ওপর ভিত্তি করে নেদারল্যান্ডসের জন্য সরল ছুটির ভাতার অনুমান করুন।",
    keywords: ["নেদারল্যান্ডসের ছুটির ভাতা ক্যালকুলেটর", "ডাচ holiday allowance হিসাব", "বার্ষিক বেতনের ছুটি ভাতা"], howTo: "বার্ষিক মোট বেতন এবং ছুটির ভাতার জন্য ব্যবহৃত হার লিখুন। নেদারল্যান্ডসে প্রাপ্যতা, গণনার ভিত্তি ও নিয়োগকর্তার শর্ত ভিন্ন হতে পারে; এটি কেবল লিখিত হারের গুণফল।", formula: "আনুমানিক ছুটির ভাতা = বার্ষিক মোট বেতন × লিখিত হার ÷ ১০০।",
    example: { question: "বার্ষিক মোট বেতন €৫০,০০০ ও হার ৮% হলে?", answer: "সরল অনুমানে ছুটির ভাতা €৪,০০০। নেদারল্যান্ডসের চুক্তি ও প্রযোজ্য নিয়মে প্রকৃত অঙ্ক যাচাই করুন।" },
    fields: { salary: "বার্ষিক মোট বেতন", rate: "লিখিত হার" }, resultLabels: bnGlobalCountryResultLabels, related: ["netherlands-gross-net-salary-calculator", "salary-conversion", "annual-leave-allowance"],
  }),
};

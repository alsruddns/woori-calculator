import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";
import { bnCountryPage, bnGlobalCountryResultLabels } from "@/i18n/dictionaries/bn-country-page";

export const bnBatchSixteen: Record<string, LocalizedCalculatorContent> = {
  "brazil-gross-net-salary-calculator": bnCountryPage("brazil-gross-net-salary-calculator", {
    name: "ব্রাজিলের মোট ও হাতে-পাওয়া বেতন ক্যালকুলেটর", title: "ব্রাজিলের বেতন ক্যালকুলেটর: কর ও অবদানের পর অনুমান", description: "ব্রাজিলের জন্য বার্ষিক বা মাসিক মোট বেতন এবং লিখিত হার থেকে আনুমানিক কর, কর্মী অবদান ও হাতে-পাওয়া আয় হিসাব করুন।",
    keywords: ["ব্রাজিলের মোট-নেট বেতন ক্যালকুলেটর", "ব্রাজিলের বেতন কর", "ব্রাজিলের হাতে-পাওয়া বেতন অনুমান"], howTo: "মোট বেতন, বার্ষিক বা মাসিক সময়কাল এবং সামাজিক অবদান ও করের হার লিখুন। এটি ব্রাজিলের নির্দেশক অনুমান; ব্যক্তিগত কর পরিস্থিতি, কর্তন ও কর্মস্থলের নিয়মে প্রকৃত অঙ্ক আলাদা হতে পারে।", formula: "বার্ষিক মোট বেতন = লিখিত বার্ষিক অঙ্ক অথবা মাসিক বেতন × ১২। আনুমানিক হাতে-পাওয়া বেতন = মোট বেতন − আনুমানিক কর ও কর্মী অবদান।",
    example: { question: "বার্ষিক মোট বেতন R$৫০,০০০ ও লিখিত কর হার ১৫% হলে কী দেখানো হয়?", answer: "ব্রাজিলের অনুমানে কর ও অবদানের বিভাজনসহ বার্ষিক ও মাসিক গড় হাতে-পাওয়া আয় দেখায়। ব্যক্তিগত অবস্থায় ফল বদলাতে পারে।" },
    fields: { salary: "মোট বেতন", frequency: "বেতন প্রদানের সময়কাল", socialRate: "সামাজিক অবদান হার", taxRate: "কর হার" }, options: { frequency: { annual: "বার্ষিক", monthly: "মাসিক" } }, resultLabels: bnGlobalCountryResultLabels, related: ["brazil-irrf-calculator", "brazil-inss-calculator", "salary-conversion"],
  }),
  "brazil-inss-calculator": bnCountryPage("brazil-inss-calculator", {
    name: "ব্রাজিলের INSS সামাজিক বীমা ক্যালকুলেটর", title: "ব্রাজিলের INSS ক্যালকুলেটর: কর্মীর অবদানের অনুমান", description: "মোট বেতন ও প্রযোজ্য হারের ভিত্তিতে ব্রাজিলের INSS সামাজিক বীমায় কর্মীর সম্ভাব্য অবদান অনুমান করুন।",
    keywords: ["ব্রাজিলের INSS ক্যালকুলেটর", "কর্মীর সামাজিক বীমা অবদান", "ব্রাজিলের বেতন কর্তন"], howTo: "মোট বেতন ও প্রয়োজনীয় অবদানের তথ্য লিখুন। ব্রাজিলের INSS-এর প্রকৃত অঙ্ক প্রযোজ্য বেতন-স্তর, সারণি ও বর্তমান নিয়মে নির্ধারিত হয়; এই ফল নির্দেশক অনুমান।", formula: "কর্মীর INSS অবদান ব্রাজিলের প্রযোজ্য রেফারেন্স হার ও নিয়ম অনুসারে অনুমান করা হয়।",
    example: { question: "মোট বেতন R$৩,০০০ ও হার ০% লিখলে?", answer: "এই পৃষ্ঠার উদাহরণে R$৩,০০০ মোট বেতনে আনুমানিক অবদান R$২৪৮.৬০ দেখানো হয়। প্রকৃত ব্রাজিলীয় INSS হার ও সারণি যাচাই করুন।" },
    fields: { salary: "মোট বেতন", rate: "লিখিত অবদান হার" }, resultLabels: bnGlobalCountryResultLabels, related: ["brazil-gross-net-salary-calculator", "brazil-irrf-calculator", "brazil-fgts-calculator"],
  }),
  "brazil-irrf-calculator": bnCountryPage("brazil-irrf-calculator", {
    name: "ব্রাজিলের IRRF আয়কর ক্যালকুলেটর", title: "ব্রাজিলের IRRF ক্যালকুলেটর: বেতনভিত্তিক করের অনুমান", description: "মোট বেতনের ভিত্তিতে ব্রাজিলের উৎসে কাটা ব্যক্তিগত আয়কর (IRRF)-এর নির্দেশক অনুমান দেখুন।",
    keywords: ["ব্রাজিলের IRRF ক্যালকুলেটর", "ব্রাজিলের বেতন আয়কর", "উৎসে কাটা আয়কর"], howTo: "মোট বেতন লিখুন। ফলটি ব্রাজিলের IRRF অনুমানের ভিত্তিতে; কর্তন, নির্ভরশীল ব্যক্তি ও বর্তমান করসারণিতে প্রকৃত কর ভিন্ন হতে পারে।", formula: "আনুমানিক IRRF = ব্রাজিলের প্রযোজ্য রেফারেন্স সূত্রে মোট বেতন থেকে হিসাব করা উৎসে আয়কর।",
    example: { question: "মোট বেতন R$৫,০০০ হলে কী দেখানো হয়?", answer: "ব্রাজিলের রেফারেন্স অনুমানে IRRF অঙ্ক দেখানো হয়। ব্যক্তিগত কর-ছাড় ও প্রযোজ্য সারণি দিয়ে যাচাই করুন।" },
    fields: { salary: "মোট বেতন" }, resultLabels: bnGlobalCountryResultLabels, related: ["brazil-gross-net-salary-calculator", "brazil-inss-calculator", "brazil-fgts-calculator"],
  }),
  "brazil-fgts-calculator": bnCountryPage("brazil-fgts-calculator", {
    name: "ব্রাজিলের FGTS নিয়োগকর্তা জমা ক্যালকুলেটর", title: "ব্রাজিলের FGTS ক্যালকুলেটর: মাসিক ও বার্ষিক নিয়োগকর্তা জমা", description: "মোট বেতন থেকে ব্রাজিলের FGTS-এ নিয়োগকর্তার সম্ভাব্য মাসিক ও বার্ষিক জমা অনুমান করুন। এটি কর্মীর বেতন থেকে কর্তন নয়।",
    keywords: ["ব্রাজিলের FGTS ক্যালকুলেটর", "নিয়োগকর্তার FGTS জমা", "মাসিক FGTS হিসাব"], howTo: "মোট বেতন লিখুন। এটি ব্রাজিলের FGTS-এ নিয়োগকর্তার জমার নির্দেশক হিসাব; কর্মীর হাতে-পাওয়া বেতন থেকে কাটা অঙ্ক হিসেবে দেখবেন না।", formula: "মাসিক নিয়োগকর্তা FGTS জমা = মোট বেতন × প্রযোজ্য হার। বার্ষিক জমা = মাসিক জমা × ১২।",
    example: { question: "মাসিক মোট বেতন R$৩,০০০ হলে কী দেখানো হয়?", answer: "ব্রাজিলের রেফারেন্স হারে মাসিক নিয়োগকর্তা জমা R$২৪০ এবং বার্ষিক জমা R$২,৮৮০। বর্তমান নিয়ম ও যোগ্যতা যাচাই করুন।" },
    fields: { salary: "মোট বেতন" }, resultLabels: bnGlobalCountryResultLabels, related: ["brazil-gross-net-salary-calculator", "brazil-inss-calculator", "brazil-thirteenth-salary-calculator"],
  }),
  "brazil-thirteenth-salary-calculator": bnCountryPage("brazil-thirteenth-salary-calculator", {
    name: "ব্রাজিলের ১৩তম বেতন ক্যালকুলেটর", title: "ব্রাজিলের ১৩তম বেতন: যোগ্য মাস অনুযায়ী সরল হিসাব", description: "মোট মাসিক বেতন ও যোগ্য মাসের সংখ্যা দিয়ে ব্রাজিলের ১৩তম বেতনের সরল অনুমান হিসাব করুন।",
    keywords: ["ব্রাজিলের ১৩তম বেতন ক্যালকুলেটর", "ব্রাজিলের décimo terceiro হিসাব", "যোগ্য মাসে বেতন অনুমান"], howTo: "মোট বেতন এবং প্রযোজ্য বছরে যোগ্য মাসের সংখ্যা লিখুন। এটি ব্রাজিলের ১৩তম বেতনের সরল অনুপাতভিত্তিক অনুমান; কর্তন, যোগ্যতা ও কর্মসংস্থানের পরিস্থিতি আলাদা হতে পারে।", formula: "মোট ১৩তম বেতনের অনুমান = মাসিক মোট বেতন × যোগ্য মাস ÷ ১২।",
    example: { question: "মাসিক বেতন R$৩,০০০ এবং যোগ্য মাস ১২ হলে?", answer: "মোট ১৩তম বেতনের সরল অনুমান R$৩,০০০। ব্রাজিলের প্রযোজ্য নিয়মে প্রকৃত অর্থ ও কর্তন যাচাই করুন।" },
    fields: { salary: "মাসিক মোট বেতন", months: "যোগ্যভাবে কাজ করা মাস" }, resultLabels: bnGlobalCountryResultLabels, related: ["brazil-gross-net-salary-calculator", "brazil-inss-calculator", "salary-conversion"],
  }),
};

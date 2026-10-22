import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";
import { bnCountryPage, bnGlobalCountryResultLabels } from "@/i18n/dictionaries/bn-country-page";

export const bnBatchNineteen: Record<string, LocalizedCalculatorContent> = {
  "taiwan-gross-net-salary-calculator": bnCountryPage("taiwan-gross-net-salary-calculator", {
    name: "তাইওয়ানের মোট ও হাতে-পাওয়া বেতন ক্যালকুলেটর", title: "তাইওয়ানের বেতন ক্যালকুলেটর: কর ও কর্মী অবদানের পর", description: "তাইওয়ানের জন্য মোট বেতন ও লিখিত সামাজিক অবদান হার থেকে নির্দেশক কর, কর্মী অবদান এবং হাতে-পাওয়া বেতন অনুমান করুন।",
    keywords: ["তাইওয়ানের মোট-নেট বেতন ক্যালকুলেটর", "তাইওয়ানের বেতন কর", "তাইওয়ানের হাতে-পাওয়া বেতন"], howTo: "মোট বেতন, বার্ষিক বা মাসিক প্রদানের সময়কাল এবং সামাজিক অবদানের হার লিখুন। তাইওয়ানের কর, বীমা ও ব্যক্তিগত ছাড়ের নিয়মে প্রকৃত ফল বদলাতে পারে; এটি আনুমানিক হিসাব।", formula: "বার্ষিক মোট বেতন = লিখিত বার্ষিক অঙ্ক অথবা মাসিক অঙ্ক × ১২। আনুমানিক হাতে-পাওয়া আয় = মোট বেতন − প্রযোজ্য কর ও কর্মী কর্তন।",
    example: { question: "বার্ষিক মোট বেতন TWD ৫০,০০০ এবং হার ২.৪% হলে?", answer: "তাইওয়ানের অনুমান অনুযায়ী কর ও অবদানসহ বার্ষিক ও মাসিক হাতে-পাওয়া আয়ের বিভাজন দেখায়। ব্যক্তিগত অবস্থায় অঙ্ক বদলাতে পারে।" },
    fields: { salary: "মোট বেতন", frequency: "বেতন প্রদানের সময়কাল", socialRate: "সামাজিক অবদান হার" }, options: { frequency: { annual: "বার্ষিক", monthly: "মাসিক" } }, resultLabels: bnGlobalCountryResultLabels, related: ["taiwan-income-tax-calculator", "taiwan-labor-insurance-calculator", "salary-conversion"],
  }),
  "taiwan-income-tax-calculator": bnCountryPage("taiwan-income-tax-calculator", {
    name: "তাইওয়ানের আয়কর ক্যালকুলেটর", title: "তাইওয়ানের আয়কর ক্যালকুলেটর: বার্ষিক করযোগ্য আয়", description: "তাইওয়ানের রেফারেন্স নিয়ম অনুসারে বার্ষিক করযোগ্য আয় থেকে আয়করের নির্দেশক অনুমান হিসাব করুন।",
    keywords: ["তাইওয়ানের আয়কর ক্যালকুলেটর", "তাইওয়ানের করযোগ্য আয়", "তাইওয়ানের বার্ষিক কর অনুমান"], howTo: "বার্ষিক করযোগ্য আয় TWD-এ লিখুন। কর-ছাড়, পরিবারের অবস্থা ও করযোগ্য আয়ের নিয়মে প্রকৃত তাইওয়ানি কর বদলায়; এই ফল চূড়ান্ত রিটার্ন নয়।", formula: "তাইওয়ানের প্রযোজ্য রেফারেন্স নীতিতে লিখিত বার্ষিক করযোগ্য আয়ের ওপর আনুমানিক আয়কর হিসাব করা হয়।",
    example: { question: "বার্ষিক করযোগ্য আয় TWD ৫০,০০০ হলে?", answer: "তাইওয়ানের অনুমানে বার্ষিক আয়করের একটি নির্দেশক অঙ্ক। ব্যক্তিগত ছাড় ও বর্তমান করনীতি যাচাই করুন।" },
    fields: { income: "বার্ষিক করযোগ্য আয়" }, resultLabels: bnGlobalCountryResultLabels, related: ["taiwan-gross-net-salary-calculator", "taiwan-labor-insurance-calculator", "china-individual-income-tax-calculator"],
  }),
  "taiwan-labor-insurance-calculator": bnCountryPage("taiwan-labor-insurance-calculator", {
    name: "তাইওয়ানের শ্রম বীমা অবদান ক্যালকুলেটর", title: "তাইওয়ানের শ্রম বীমা ক্যালকুলেটর: বেতনভিত্তিক অবদান", description: "মোট বেতন ও লিখিত হার থেকে তাইওয়ানের শ্রম বীমায় কর্মীর সম্ভাব্য অবদান অনুমান করুন।",
    keywords: ["তাইওয়ানের শ্রম বীমা ক্যালকুলেটর", "তাইওয়ানের কর্মী বীমা অবদান", "বেতনভিত্তিক শ্রম বীমা হিসাব"], howTo: "মোট বেতন ও অবদানের হার লিখুন। তাইওয়ানের প্রকৃত শ্রম-বীমা বেতন-শ্রেণি, কর্মীর অংশ এবং নিয়মিত হার যাচাই করুন; এখানে দেওয়া অঙ্কটি সরল অনুমান।", formula: "আনুমানিক কর্মী অবদান = লিখিত মোট বেতন × লিখিত হার ÷ ১০০।",
    example: { question: "মোট বেতন TWD ৩,০০০ এবং হার ২.৪% হলে?", answer: "সরল অনুমানে অবদান TWD ৭২। তাইওয়ানের বীমাযোগ্য বেতন-শ্রেণি ও বর্তমান হার যাচাই করুন।" },
    fields: { salary: "মোট বেতন", rate: "লিখিত অবদান হার" }, resultLabels: bnGlobalCountryResultLabels, related: ["taiwan-gross-net-salary-calculator", "taiwan-income-tax-calculator", "social-insurance"],
  }),
  "taiwan-vat-calculator": bnCountryPage("taiwan-vat-calculator", {
    name: "তাইওয়ানের VAT ক্যালকুলেটর", title: "তাইওয়ানের VAT ক্যালকুলেটর: কর যোগ বা অন্তর্ভুক্ত কর আলাদা করুন", description: "তাইওয়ানের জন্য প্রযোজ্য লিখিত VAT হার দিয়ে কর-পূর্ব অঙ্কে কর যোগ করুন অথবা কর-সহ দাম থেকে কর আলাদা করুন।",
    keywords: ["তাইওয়ানের VAT ক্যালকুলেটর", "তাইওয়ানের মূল্য সংযোজন কর", "তাইওয়ানের করসহ দাম"], howTo: "অঙ্ক, হিসাবের দিক এবং প্রযোজ্য কর হার লিখুন। তাইওয়ানে VAT প্রযোজ্যতা ও হার লেনদেনভেদে যাচাই করুন; এই ক্যালকুলেটর কর শ্রেণি নির্ধারণ করে না।", formula: "কর যোগ: আনুমানিক VAT = কর-পূর্ব অঙ্ক × হার; মোট = অঙ্ক + VAT। কর-সহ অঙ্ক থেকে: কর-পূর্ব দাম = মোট ÷ (১ + হার)।",
    example: { question: "TWD ১০০ অঙ্কে ৫% হার হলে?", answer: "কর যোগের ক্ষেত্রে আনুমানিক VAT TWD ৫ এবং মোট TWD ১০৫। তাইওয়ানের প্রকৃত শ্রেণি ও হার যাচাই করুন।" },
    fields: { amount: "অঙ্ক", direction: "হিসাবের দিক", rate: "লিখিত করের হার" }, options: { direction: { exclusive: "কর যোগ করুন", inclusive: "অন্তর্ভুক্ত কর আলাদা করুন" } }, resultLabels: bnGlobalCountryResultLabels, related: ["taiwan-income-tax-calculator", "china-vat-calculator", "vat"],
  }),
};

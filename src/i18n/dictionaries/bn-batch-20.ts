import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";
import { bnCountryPage, bnGlobalCountryResultLabels } from "@/i18n/dictionaries/bn-country-page";

export const bnBatchTwenty: Record<string, LocalizedCalculatorContent> = {
  "italy-gross-net-salary-calculator": bnCountryPage("italy-gross-net-salary-calculator", {
    name: "ইতালির মোট ও হাতে-পাওয়া বেতন ক্যালকুলেটর", title: "ইতালির বেতন ক্যালকুলেটর: কর ও কর্মী অবদানের পর", description: "ইতালির জন্য বার্ষিক বা মাসিক মোট বেতন ও লিখিত অবদান হার থেকে নির্দেশক কর, কর্মী অবদান এবং হাতে-পাওয়া বেতন হিসাব করুন।",
    keywords: ["ইতালির মোট-নেট বেতন ক্যালকুলেটর", "ইতালির বেতন কর অনুমান", "ইতালিতে হাতে-পাওয়া বেতন"], howTo: "মোট বেতন, বেতন প্রদানের সময়কাল এবং সামাজিক অবদানের হার লিখুন। ইতালির কর-অঞ্চল, ব্যক্তিগত কর্তন ও কর্মীর পরিস্থিতিতে প্রকৃত পরিমাণ ভিন্ন হতে পারে; এটি নির্দেশক অনুমান।", formula: "বার্ষিক মোট বেতন = লিখিত বার্ষিক অঙ্ক অথবা মাসিক বেতন × ১২। আনুমানিক হাতে-পাওয়া আয় = মোট বেতন − অনুমিত কর ও কর্মী অবদান।",
    example: { question: "বার্ষিক মোট বেতন €৫০,০০০ হলে কী দেখানো হয়?", answer: "ইতালির রেফারেন্স অনুমান অনুযায়ী কর ও অবদানসহ বার্ষিক এবং মাসিক গড় হাতে-পাওয়া আয়। ব্যক্তিগত পরিস্থিতিতে ফল বদলাতে পারে।" },
    fields: { salary: "মোট বেতন", frequency: "বেতন প্রদানের সময়কাল", socialRate: "লিখিত সামাজিক অবদান হার" }, options: { frequency: { annual: "বার্ষিক", monthly: "মাসিক" } }, resultLabels: bnGlobalCountryResultLabels, related: ["italy-income-tax-calculator", "italy-vat-calculator", "salary-conversion"],
  }),
  "italy-income-tax-calculator": bnCountryPage("italy-income-tax-calculator", {
    name: "ইতালির আয়কর ক্যালকুলেটর", title: "ইতালির আয়কর ক্যালকুলেটর: বার্ষিক করযোগ্য আয়ের অনুমান", description: "ইতালির রেফারেন্স নিয়মে বার্ষিক করযোগ্য আয় থেকে নির্দেশক আয়কর অনুমান করুন। অঞ্চল ও ব্যক্তিগত ছাড়ে প্রকৃত দায় বদলাতে পারে।",
    keywords: ["ইতালির আয়কর ক্যালকুলেটর", "ইতালির করযোগ্য আয়", "ইতালির বার্ষিক আয়কর অনুমান"], howTo: "বার্ষিক করযোগ্য আয় ইউরোতে লিখুন। ইতালির প্রকৃত কর জাতীয় ও স্থানীয় নিয়ম, আয় ও কর্তনের ওপর নির্ভর করে; এই ফল রিটার্ন নয়।", formula: "ইতালির রেফারেন্স নীতিতে বার্ষিক করযোগ্য আয়ের ওপর আনুমানিক আয়কর গণনা করা হয়।",
    example: { question: "বার্ষিক করযোগ্য আয় €৫০,০০০ হলে কী দেখায়?", answer: "ইতালির রেফারেন্স অনুমানে আনুমানিক বার্ষিক কর €১৩,৭০০। বর্তমান জাতীয় ও স্থানীয় করনিয়ম এবং ব্যক্তিগত কর্তন যাচাই করুন।" },
    fields: { income: "বার্ষিক করযোগ্য আয়" }, resultLabels: bnGlobalCountryResultLabels, related: ["italy-gross-net-salary-calculator", "italy-vat-calculator", "france-income-tax-calculator"],
  }),
  "italy-vat-calculator": bnCountryPage("italy-vat-calculator", {
    name: "ইতালির VAT ক্যালকুলেটর", title: "ইতালির VAT ক্যালকুলেটর: কর যোগ বা অন্তর্ভুক্ত কর আলাদা করুন", description: "ইতালির জন্য প্রযোজ্য হার লিখে কর-পূর্ব অঙ্কে VAT যোগ করুন অথবা কর-সহ মোট থেকে কর আলাদা করুন।",
    keywords: ["ইতালির VAT ক্যালকুলেটর", "ইতালির মূল্য সংযোজন কর", "ইতালির কর-সহ মূল্য"], howTo: "অঙ্ক, হিসাবের দিক এবং পণ্য বা সেবার জন্য প্রযোজ্য হার লিখুন। ইতালিতে VAT-এর হার শ্রেণিভেদে বদলাতে পারে; বর্তমান সরকারি হার যাচাই করুন।", formula: "কর যোগ: আনুমানিক VAT = কর-পূর্ব অঙ্ক × হার; মোট = অঙ্ক + VAT। অন্তর্ভুক্ত কর আলাদা: কর-পূর্ব অঙ্ক = মোট ÷ (১ + হার)।",
    example: { question: "€১০০ অঙ্কে ২২% VAT হলে?", answer: "কর যোগের ক্ষেত্রে VAT €২২ এবং মোট €১২২। ইতালিতে সঠিক হার পণ্য বা সেবার শ্রেণির ওপর নির্ভর করে।" },
    fields: { amount: "অঙ্ক", direction: "হিসাবের দিক", rate: "লিখিত করের হার" }, options: { direction: { exclusive: "কর যোগ করুন", inclusive: "অন্তর্ভুক্ত কর আলাদা করুন" } }, resultLabels: bnGlobalCountryResultLabels, related: ["italy-income-tax-calculator", "italy-gross-net-salary-calculator", "vat"],
  }),
};

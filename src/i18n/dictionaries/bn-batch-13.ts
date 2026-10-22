import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";
import { bnCountryPage, bnGlobalCountryResultLabels } from "@/i18n/dictionaries/bn-country-page";

export const bnBatchThirteen: Record<string, LocalizedCalculatorContent> = {
  "france-gross-net-salary-calculator": bnCountryPage("france-gross-net-salary-calculator", {
    name: "ফ্রান্সের মোট ও হাতে-পাওয়া বেতন ক্যালকুলেটর", title: "ফ্রান্সের বেতন ক্যালকুলেটর: কর ও কর্মী অবদানের পর", description: "ফ্রান্সের জন্য বার্ষিক বা মাসিক মোট বেতন এবং লিখিত কর্তনের হার থেকে আনুমানিক কর, কর্মী অবদান ও হাতে-পাওয়া বেতন হিসাব করুন।",
    keywords: ["ফ্রান্সের মোট-নেট বেতন ক্যালকুলেটর", "ফ্রান্সের বেতন কর", "ফ্রান্সের হাতে-পাওয়া বেতন অনুমান"], howTo: "মোট বেতন, বার্ষিক বা মাসিক প্রদানের সময়কাল এবং কর্মী অবদানের হার লিখুন। ফলটি ফ্রান্সের জন্য নির্দেশক অনুমান; ব্যক্তিগত কর-পরিস্থিতি, সামাজিক অবদান ও কর্তনে প্রকৃত পরিমাণ বদলায়।", formula: "বার্ষিক মোট বেতন = লিখিত বার্ষিক অঙ্ক অথবা মাসিক বেতন × ১২। আনুমানিক হাতে-পাওয়া বেতন = মোট বেতন − হিসাব করা কর ও কর্মী অবদান।",
    example: { question: "বার্ষিক মোট বেতন €৫০,০০০ ও অবদান হার ২২% হলে কী দেখানো হয়?", answer: "ফ্রান্সের অনুমানে কর ও কর্মী অবদানের বিভাজনসহ বার্ষিক ও মাসিক গড় হাতে-পাওয়া বেতনের ধারণা দেখায়।" },
    fields: { salary: "মোট বেতন", frequency: "বেতন প্রদানের সময়কাল", socialRate: "লিখিত সামাজিক অবদান হার" }, options: { frequency: { annual: "বার্ষিক", monthly: "মাসিক" } }, resultLabels: bnGlobalCountryResultLabels, related: ["france-income-tax-calculator", "france-vat-calculator", "salary-conversion"],
  }),
  "france-income-tax-calculator": bnCountryPage("france-income-tax-calculator", {
    name: "ফ্রান্সের আয়কর ক্যালকুলেটর", title: "ফ্রান্সের আয়কর ক্যালকুলেটর: বার্ষিক আয়ের সরল অনুমান", description: "বার্ষিক করযোগ্য আয় দিয়ে ফ্রান্সের নির্দেশক আয়কর অনুমান দেখুন। ব্যক্তিগত অবস্থা ও প্রযোজ্য নিয়মে প্রকৃত কর বদলাতে পারে।",
    keywords: ["ফ্রান্সের আয়কর ক্যালকুলেটর", "ফ্রান্সের করযোগ্য আয়", "ফরাসি বার্ষিক কর অনুমান"], howTo: "বার্ষিক করযোগ্য আয় ইউরোতে লিখুন। ফলটি ফ্রান্সের রেফারেন্স অনুমান; পরিবারের কর-ভাগ, ছাড় ও অন্যান্য আয় এতে অন্তর্ভুক্ত নাও হতে পারে।", formula: "আনুমানিক ফরাসি আয়কর = লিখিত বার্ষিক করযোগ্য আয়ের ওপর প্রযোজ্য রেফারেন্স সূত্রে হিসাব করা অঙ্ক।",
    example: { question: "বার্ষিক করযোগ্য আয় €৫০,০০০ হলে কী দেখানো হয়?", answer: "ফ্রান্সের রেফারেন্স অনুমানে বার্ষিক আয়করের ধারণা দেখানো হয়; ব্যক্তিগত কর-ভাগ ও ছাড়ে ফল বদলাতে পারে।" },
    fields: { income: "বার্ষিক করযোগ্য আয়" }, resultLabels: bnGlobalCountryResultLabels, related: ["france-gross-net-salary-calculator", "france-vat-calculator", "spain-irpf-calculator"],
  }),
  "france-vat-calculator": bnCountryPage("france-vat-calculator", {
    name: "ফ্রান্সের VAT ক্যালকুলেটর", title: "ফ্রান্সের VAT ক্যালকুলেটর: কর যোগ বা অন্তর্ভুক্ত কর আলাদা করুন", description: "ফ্রান্সের জন্য প্রযোজ্য হার লিখে কর-পূর্ব দামে VAT যোগ করুন অথবা কর-সহ মোট থেকে কর আলাদা করুন।",
    keywords: ["ফ্রান্সের VAT ক্যালকুলেটর", "ফ্রান্সের মূল্য সংযোজন কর", "ফরাসি কর-সহ দাম"], howTo: "অঙ্ক, হিসাবের দিক এবং প্রযোজ্য VAT হার লিখুন। ফ্রান্সে হার পণ্য ও সেবার শ্রেণিভেদে বদলাতে পারে; সঠিক হার যাচাই করুন।", formula: "কর যোগ: আনুমানিক কর = কর-পূর্ব অঙ্ক × হার; মোট = অঙ্ক + কর। কর-সহ মোট থেকে: কর-পূর্ব অঙ্ক = মোট ÷ (১ + হার)।",
    example: { question: "€১০০ অঙ্কে ২০% হার দিলে কী ফল?", answer: "কর যোগের ক্ষেত্রে কর €২০ এবং মোট €১২০। ফ্রান্সে প্রযোজ্য হার পণ্য বা সেবার ধরন অনুযায়ী যাচাই করুন।" },
    fields: { amount: "অঙ্ক", direction: "হিসাবের দিক", rate: "লিখিত করের হার" }, options: { direction: { exclusive: "কর যোগ করুন", inclusive: "অন্তর্ভুক্ত কর আলাদা করুন" } }, resultLabels: bnGlobalCountryResultLabels, related: ["france-income-tax-calculator", "france-gross-net-salary-calculator", "vat"],
  }),
  "france-overtime-pay-calculator": bnCountryPage("france-overtime-pay-calculator", {
    name: "ফ্রান্সের ওভারটাইম বেতন ক্যালকুলেটর", title: "ফ্রান্সের ওভারটাইম বেতন ক্যালকুলেটর: ঘণ্টা ও গুণক থেকে হিসাব", description: "ফ্রান্সের জন্য লিখিত মোট ঘণ্টাপ্রতি বেতন, ওভারটাইম ঘণ্টা ও গুণক দিয়ে ভিত্তি মজুরি এবং অতিরিক্ত অংশ অনুমান করুন।",
    keywords: ["ফ্রান্সের ওভারটাইম ক্যালকুলেটর", "ফরাসি অতিরিক্ত কাজের মজুরি", "ওভারটাইম প্রিমিয়াম হিসাব"], howTo: "মোট ঘণ্টাপ্রতি বেতন, ওভারটাইম ঘণ্টা এবং প্রযোজ্য গুণক লিখুন। ফ্রান্সে প্রকৃত অতিরিক্ত মজুরি চুক্তি ও শ্রম বিধির ওপর নির্ভর করে; এটি সরল অনুমান।", formula: "ভিত্তি ওভারটাইম বেতন = মোট ঘণ্টাপ্রতি বেতন × ওভারটাইম ঘণ্টা। অতিরিক্ত অংশ = ভিত্তি বেতন × (গুণক − ১)। মোট = ভিত্তি বেতন + অতিরিক্ত অংশ।",
    example: { question: "ঘণ্টাপ্রতি €২০, ওভারটাইম ৮ ঘণ্টা এবং গুণক ১.৫ হলে?", answer: "ভিত্তি বেতন €১৬০ এবং অতিরিক্ত অংশ €৮০। প্রকৃত ফরাসি পারিশ্রমিক চুক্তি ও প্রযোজ্য শ্রম নিয়মে যাচাই করুন।" },
    fields: { salary: "মোট ঘণ্টাপ্রতি বেতন", hours: "ওভারটাইম ঘণ্টা", multiplier: "পারিশ্রমিকের গুণক" }, resultLabels: bnGlobalCountryResultLabels, related: ["france-gross-net-salary-calculator", "hourly-wage", "france-income-tax-calculator"],
  }),
};

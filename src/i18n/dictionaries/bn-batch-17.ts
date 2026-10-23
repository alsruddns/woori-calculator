import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";
import { bnCountryPage, bnGlobalCountryResultLabels } from "@/i18n/dictionaries/bn-country-page";

export const bnBatchSeventeen: Record<string, LocalizedCalculatorContent> = {
  "vietnam-gross-net-salary-calculator": bnCountryPage("vietnam-gross-net-salary-calculator", {
    name: "ভিয়েতনামের মোট ও হাতে-পাওয়া বেতন ক্যালকুলেটর", title: "ভিয়েতনামের বেতন ক্যালকুলেটর: কর ও অবদানের পর অনুমান", description: "ভিয়েতনামের জন্য বার্ষিক বা মাসিক মোট বেতন ও লিখিত হার থেকে নির্দেশক কর, সামাজিক অবদান ও হাতে-পাওয়া বেতন হিসাব করুন।",
    keywords: ["ভিয়েতনামের মোট-নেট বেতন ক্যালকুলেটর", "ভিয়েতনামের বেতন কর অনুমান", "ভিয়েতনামের হাতে-পাওয়া বেতন"], howTo: "মোট বেতন, প্রদানের সময়কাল এবং অবদানের হার লিখুন। এটি ভিয়েতনামের জন্য নির্দেশক অনুমান; ব্যক্তিগত কর-ছাড়, নির্ভরশীল ব্যক্তি এবং প্রযোজ্য বীমা নিয়মে ফল বদলাতে পারে।", formula: "বার্ষিক মোট বেতন = লিখিত বার্ষিক অঙ্ক অথবা মাসিক বেতন × ১২। আনুমানিক হাতে-পাওয়া আয় = মোট বেতন − প্রযোজ্য অনুমিত কর্তন।",
    example: { question: "বার্ষিক মোট বেতন ৫০,০০০ VND এবং লিখিত হার ১০.৫% হলে?", answer: "ভিয়েতনামের নির্দেশক অনুমান অনুযায়ী কর ও অবদানের পর বার্ষিক ও মাসিক গড় হাতে-পাওয়া আয় দেখায়। প্রকৃত কর ব্যক্তিগত তথ্য ও বর্তমান নিয়মে নির্ভর করে।" },
    fields: { salary: "মোট বেতন", frequency: "বেতন প্রদানের সময়কাল", socialRate: "সামাজিক অবদানের হার" }, options: { frequency: { annual: "বার্ষিক", monthly: "মাসিক" } }, resultLabels: bnGlobalCountryResultLabels, related: ["vietnam-personal-income-tax-calculator", "vietnam-social-insurance-calculator", "salary-conversion"],
  }),
  "vietnam-personal-income-tax-calculator": bnCountryPage("vietnam-personal-income-tax-calculator", {
    name: "ভিয়েতনামের ব্যক্তিগত আয়কর ক্যালকুলেটর", title: "ভিয়েতনামের আয়কর ক্যালকুলেটর: বার্ষিক করযোগ্য আয়", description: "ভিয়েতনামের রেফারেন্স নীতি অনুসারে লিখিত বার্ষিক করযোগ্য আয় থেকে ব্যক্তিগত আয়করের নির্দেশক অনুমান দেখুন।",
    keywords: ["ভিয়েতনামের ব্যক্তিগত আয়কর ক্যালকুলেটর", "ভিয়েতনামের করযোগ্য আয়", "ভিয়েতনামের বার্ষিক কর"], howTo: "বার্ষিক করযোগ্য আয় VND-এ লিখুন। কর-ছাড়, আবাসিক অবস্থা ও আয়ের ধরন অনুযায়ী প্রকৃত ভিয়েতনামি কর বদলাতে পারে; ফলটি রিটার্ন বা কর-পরামর্শ নয়।", formula: "আনুমানিক ব্যক্তিগত আয়কর = ভিয়েতনামের রেফারেন্স নিয়মে লিখিত বার্ষিক করযোগ্য আয়ের ওপর হিসাব করা অঙ্ক।",
    example: { question: "বার্ষিক করযোগ্য আয় ৫০,০০০ VND হলে কী দেখানো হয়?", answer: "ভিয়েতনামের নির্দেশক হিসাব অনুযায়ী বার্ষিক আয়করের অনুমান। বর্তমান নিয়ম ও ব্যক্তিগত ছাড় যাচাই করুন।" },
    fields: { income: "বার্ষিক করযোগ্য আয়" }, resultLabels: bnGlobalCountryResultLabels, related: ["vietnam-gross-net-salary-calculator", "vietnam-social-insurance-calculator", "india-income-tax-calculator"],
  }),
  "vietnam-social-insurance-calculator": bnCountryPage("vietnam-social-insurance-calculator", {
    name: "ভিয়েতনামের সামাজিক বীমা অবদান ক্যালকুলেটর", title: "ভিয়েতনামের সামাজিক বীমা ক্যালকুলেটর: বেতনভিত্তিক অবদান", description: "মোট বেতন ও লিখিত হার থেকে ভিয়েতনামের সামাজিক বীমায় কর্মীর সম্ভাব্য অবদান অনুমান করুন।",
    keywords: ["ভিয়েতনামের সামাজিক বীমা ক্যালকুলেটর", "ভিয়েতনামের বেতন বীমা অবদান", "কর্মীর সামাজিক বীমা হিসাব"], howTo: "মোট বেতন ও ব্যবহারযোগ্য অবদান হার লিখুন। ভিয়েতনামের প্রকৃত বীমাযোগ্য মজুরি, অবদান হার ও সর্বোচ্চ সীমা বর্তমান নিয়মে যাচাই করুন।", formula: "আনুমানিক অবদান = লিখিত মোট বেতন × লিখিত হার ÷ ১০০।",
    example: { question: "মোট বেতন ৩,০০০ VND ও হার ১০.৫% হলে?", answer: "সরল গুণে অনুমান ৩১৫ VND। ভিয়েতনামের বীমাযোগ্য মজুরি ও প্রযোজ্য সীমা এতে যাচাই হয় না।" },
    fields: { salary: "মোট বেতন", rate: "লিখিত অবদান হার" }, resultLabels: bnGlobalCountryResultLabels, related: ["vietnam-gross-net-salary-calculator", "vietnam-personal-income-tax-calculator", "brazil-inss-calculator"],
  }),
};

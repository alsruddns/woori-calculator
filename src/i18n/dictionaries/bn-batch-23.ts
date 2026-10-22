import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";
import { bnCountryPage, bnUsCountryResultLabels } from "@/i18n/dictionaries/bn-country-page";

export const bnBatchTwentyThree: Record<string, LocalizedCalculatorContent> = {
  "uk-gross-net-salary-calculator": bnCountryPage("uk-gross-net-salary-calculator", {
    name: "যুক্তরাজ্যের মোট ও হাতে-পাওয়া বেতন ক্যালকুলেটর", title: "যুক্তরাজ্যের বেতন ক্যালকুলেটর: কর ও National Insurance-এর পর", description: "যুক্তরাজ্যের বার্ষিক বা মাসিক বেতন থেকে নির্দেশক আয়কর, কর্মী অবদান ও হাতে-পাওয়া আয় অনুমান করুন।",
    keywords: ["যুক্তরাজ্যের মোট-নেট বেতন ক্যালকুলেটর", "যুক্তরাজ্যের হাতে-পাওয়া বেতন", "UK বেতন কর ও কর্তন"], howTo: "মোট বেতন এবং বার্ষিক বা মাসিক সময়কাল নির্বাচন করুন। যুক্তরাজ্যের কর-ফাইলিং অবস্থা, অঞ্চল, পেনশন কর্তন ও অন্যান্য ব্যক্তিগত অবস্থায় প্রকৃত বেতন ভিন্ন হতে পারে।", formula: "বার্ষিক মোট বেতন ও যুক্তরাজ্যের রেফারেন্স নিয়ম থেকে আনুমানিক আয়কর ও কর্মী National Insurance হিসাব হয়; হাতে-পাওয়া আয় = মোট বেতন − অনুমিত কর্তন।",
    example: { question: "বার্ষিক মোট বেতন £৮০,০০০ হলে কী দেখানো হয়?", answer: "যুক্তরাজ্যের অনুমানে কর ও অবদানের পর বার্ষিক এবং মাসিক গড় হাতে-পাওয়া বেতনের বিভাজন। বর্তমান করবর্ষ ও ব্যক্তিগত কর্তন যাচাই করুন।" },
    fields: { salary: "মোট বেতন", frequency: "বেতন প্রদানের সময়কাল" }, options: { frequency: { annual: "বার্ষিক", monthly: "মাসিক" } }, resultLabels: bnUsCountryResultLabels, related: ["uk-income-tax-calculator", "uk-national-insurance-calculator", "uk-pension-calculator"],
  }),
  "uk-income-tax-calculator": bnCountryPage("uk-income-tax-calculator", {
    name: "যুক্তরাজ্যের আয়কর ক্যালকুলেটর", title: "যুক্তরাজ্যের আয়কর ক্যালকুলেটর: বার্ষিক করযোগ্য আয়", description: "যুক্তরাজ্যের রেফারেন্স নিয়ম অনুযায়ী বার্ষিক করযোগ্য আয়ের ওপর নির্দেশক আয়কর অনুমান করুন।",
    keywords: ["যুক্তরাজ্যের আয়কর ক্যালকুলেটর", "UK করযোগ্য আয়", "যুক্তরাজ্যের বার্ষিক আয়কর"], howTo: "বার্ষিক করযোগ্য আয় GBP-এ লিখুন। যুক্তরাজ্যে করবর্ষ, স্কটল্যান্ডের হার, ব্যক্তিগত ভাতা ও অন্যান্য আয়ে প্রকৃত কর বদলাতে পারে; ফলটি চূড়ান্ত হিসাব নয়।", formula: "যুক্তরাজ্যের রেফারেন্স কর-সারণি ও বার্ষিক করযোগ্য আয়ের ভিত্তিতে আয়কর অনুমান করা হয়।",
    example: { question: "বার্ষিক করযোগ্য আয় £৮০,০০০ হলে?", answer: "যুক্তরাজ্যের রেফারেন্স নিয়মে আয়করের নির্দেশক অনুমান দেখানো হয়। করবর্ষ ও অঞ্চলভেদে হার এবং ভাতা যাচাই করুন।" },
    fields: { income: "বার্ষিক করযোগ্য আয়" }, resultLabels: bnUsCountryResultLabels, related: ["uk-gross-net-salary-calculator", "uk-national-insurance-calculator", "uk-stamp-duty-calculator"],
  }),
  "uk-national-insurance-calculator": bnCountryPage("uk-national-insurance-calculator", {
    name: "যুক্তরাজ্যের National Insurance ক্যালকুলেটর", title: "যুক্তরাজ্যের National Insurance: বেতনভিত্তিক অবদানের অনুমান", description: "বেতন ও প্রদানের সময়কাল থেকে যুক্তরাজ্যের কর্মী National Insurance-এর নির্দেশক অবদান হিসাব করুন।",
    keywords: ["যুক্তরাজ্যের National Insurance ক্যালকুলেটর", "UK জাতীয় বীমা অবদান", "বেতন National Insurance হিসাব"], howTo: "বেতন ও প্রদানের সময়কাল লিখুন। যুক্তরাজ্যের অবদান-শ্রেণি, করবর্ষ ও ব্যক্তিগত চাকরির পরিস্থিতিতে প্রকৃত কর্তন বদলাতে পারে; বর্তমান সরকারি নিয়ম যাচাই করুন।", formula: "যুক্তরাজ্যের প্রযোজ্য রেফারেন্স হার ও বেতন-সময়ের ভিত্তিতে কর্মীর National Insurance অবদান অনুমান করা হয়।",
    example: { question: "বার্ষিক বেতন £৫০,০০০ হলে কী দেখানো হয়?", answer: "যুক্তরাজ্যের রেফারেন্স নিয়মে মাসিক ও বার্ষিক National Insurance অবদানের অনুমান। বর্তমান করবর্ষ ও কর্মসংস্থানের ধরন যাচাই করুন।" },
    fields: { salary: "বেতন", frequency: "বেতন প্রদানের সময়কাল" }, options: { frequency: { annual: "বার্ষিক", monthly: "মাসিক" } }, resultLabels: bnUsCountryResultLabels, related: ["uk-gross-net-salary-calculator", "uk-income-tax-calculator", "social-insurance"],
  }),
  "uk-vat-calculator": bnCountryPage("uk-vat-calculator", {
    name: "যুক্তরাজ্যের VAT ক্যালকুলেটর", title: "যুক্তরাজ্যের VAT ক্যালকুলেটর: কর যোগ বা অন্তর্ভুক্ত কর আলাদা করুন", description: "যুক্তরাজ্যের জন্য লিখিত VAT হার থেকে কর-পূর্ব অঙ্কে কর যোগ করুন অথবা কর-সহ দাম থেকে VAT আলাদা করুন।",
    keywords: ["যুক্তরাজ্যের VAT ক্যালকুলেটর", "UK মূল্য সংযোজন কর", "VAT-সহ দাম হিসাব"], howTo: "অঙ্ক, প্রযোজ্য VAT হার এবং কর যোগ বা বাদ দেওয়ার ধরন লিখুন। যুক্তরাজ্যে হার পণ্য ও লেনদেনের শ্রেণিভেদে বদলায়; সঠিক হার যাচাই করুন।", formula: "কর যোগ: আনুমানিক VAT = কর-পূর্ব অঙ্ক × হার; মোট = অঙ্ক + VAT। অন্তর্ভুক্ত কর আলাদা: কর-পূর্ব অঙ্ক = কর-সহ মোট ÷ (১ + হার)।",
    example: { question: "£১০০ অঙ্কে ২০% VAT হলে?", answer: "VAT £২০ এবং কর-সহ মোট £১২০। যুক্তরাজ্যে পণ্য বা সেবাভেদে প্রযোজ্য হার যাচাই করুন।" },
    fields: { amount: "অঙ্ক", rate: "প্রযোজ্য হার বা রিটার্ন", direction: "হিসাবের দিক" }, options: { direction: { exclusive: "কর যোগ করুন", inclusive: "অন্তর্ভুক্ত কর আলাদা করুন" } }, resultLabels: bnUsCountryResultLabels, related: ["uk-income-tax-calculator", "uk-gross-net-salary-calculator", "vat"],
  }),
  "uk-stamp-duty-calculator": bnCountryPage("uk-stamp-duty-calculator", {
    name: "যুক্তরাজ্যের Stamp Duty ক্যালকুলেটর", title: "যুক্তরাজ্যের Stamp Duty ক্যালকুলেটর: সম্পত্তির দাম ও ক্রেতার ধরন", description: "সম্পত্তির মূল্য ও ক্রেতার ধরন থেকে যুক্তরাজ্যের সম্পত্তি Stamp Duty-এর নির্দেশক অনুমান হিসাব করুন।",
    keywords: ["যুক্তরাজ্যের Stamp Duty ক্যালকুলেটর", "UK সম্পত্তি ক্রয় কর", "অতিরিক্ত সম্পত্তির Stamp Duty"], howTo: "সম্পত্তির মূল্য এবং সাধারণ ক্রয় বা অতিরিক্ত সম্পত্তি বেছে নিন। যুক্তরাজ্যে সম্পত্তির অবস্থান গুরুত্বপূর্ণ; স্কটল্যান্ড ও ওয়েলসে আলাদা করব্যবস্থা থাকতে পারে। প্রযোজ্য সরকারি নিয়ম যাচাই করুন।", formula: "সম্পত্তির মূল্য ও ক্রেতার ধরন অনুযায়ী যুক্তরাজ্যের প্রাসঙ্গিক কর-সারণিতে প্রযোজ্য ধাপভিত্তিক সম্পত্তি কর অনুমান করা হয়।",
    example: { question: "সম্পত্তির মূল্য £৫০০,০০০ হলে কী দেখানো হয়?", answer: "ক্রেতার ধরন ও ব্যবহৃত UK-ভিত্তিক সারণি অনুযায়ী Stamp Duty-এর অনুমান। সম্পত্তির দেশ/অঞ্চল ও বর্তমান হার যাচাই করুন।" },
    fields: { propertyValue: "সম্পত্তির মূল্য", buyer: "ক্রেতার ধরন" }, options: { buyer: { additional: "অতিরিক্ত সম্পত্তি", standard: "সাধারণ ক্রয়" } }, resultLabels: bnUsCountryResultLabels, related: ["uk-gross-net-salary-calculator", "uk-income-tax-calculator", "rent-vs-buy-calculator"],
  }),
  "uk-pension-calculator": bnCountryPage("uk-pension-calculator", {
    name: "যুক্তরাজ্যের পেনশন ক্যালকুলেটর", title: "যুক্তরাজ্যের পেনশন ক্যালকুলেটর: অবদান ও সম্ভাব্য বৃদ্ধি", description: "বার্ষিক বেতন, ব্যক্তিগত ও নিয়োগকর্তার অবদান, বিনিয়োগ রিটার্ন এবং সময়কাল দিয়ে যুক্তরাজ্যের পেনশন সঞ্চয়ের সম্ভাব্য বৃদ্ধি অনুমান করুন।",
    keywords: ["যুক্তরাজ্যের পেনশন ক্যালকুলেটর", "UK পেনশন অবদান", "নিয়োগকর্তার পেনশন ম্যাচ অনুমান"], howTo: "বার্ষিক বেতন, ব্যক্তিগত অবদান, নিয়োগকর্তার অবদানের হার, বিনিয়োগ রিটার্ন এবং বছর লিখুন। এটি বিনিয়োগের সরল প্রক্ষেপণ; UK কর-সুবিধা, প্ল্যান ফি বা ভবিষ্যৎ বাজারফল নিশ্চিত করে না।", formula: "ব্যক্তিগত অবদান ও নিয়োগকর্তার অবদান যোগ হয় এবং লিখিত বার্ষিক রিটার্নে বৃদ্ধি পায়; শেষে সম্ভাব্য ব্যালান্স দেখানো হয়।",
    example: { question: "£৮০,০০০ বেতন, £৬,০০০ বার্ষিক অবদান ও নিয়োগকর্তার ৩% অবদান দিলে?", answer: "যুক্তরাজ্যের অনুমানে অবদান ও বিনিয়োগ বৃদ্ধির সম্ভাব্য ব্যালান্স দেখানো হয়। পেনশন প্ল্যানের শর্ত, কর-সুবিধা ও ফি যাচাই করুন।" },
    fields: { annualSalary: "বার্ষিক বেতন", annualContribution: "বার্ষিক ব্যক্তিগত অবদান", employerRate: "নিয়োগকর্তার অবদানের হার", rate: "লিখিত বিনিয়োগ রিটার্ন", years: "সময়কাল (বছর)" }, resultLabels: bnUsCountryResultLabels, related: ["uk-gross-net-salary-calculator", "fire-retirement-calculator", "compound-interest"],
  }),
};

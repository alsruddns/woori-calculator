import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";
import { bnCountryPage, bnUsCountryResultLabels } from "@/i18n/dictionaries/bn-country-page";

export const bnBatchTwentyFour: Record<string, LocalizedCalculatorContent> = {
  "canada-gross-net-salary-calculator": bnCountryPage("canada-gross-net-salary-calculator", {
    name: "কানাডার মোট ও হাতে-পাওয়া বেতন ক্যালকুলেটর", title: "কানাডার বেতন ক্যালকুলেটর: কর ও কর্মী অবদানের পর", description: "কানাডার বার্ষিক বা মাসিক মোট বেতন থেকে ফেডারেল কর, কর্মী অবদান এবং হাতে-পাওয়া আয়ের নির্দেশক অনুমান হিসাব করুন।",
    keywords: ["কানাডার মোট-নেট বেতন ক্যালকুলেটর", "কানাডার হাতে-পাওয়া বেতন", "কানাডার বেতন কর অনুমান"], howTo: "মোট বেতন এবং বার্ষিক বা মাসিক প্রদানের সময়কাল বেছে নিন। প্রদেশ বা অঞ্চল, কর-ফাইলিং অবস্থা, ছাড় ও বীমাযোগ্য আয়ে প্রকৃত কানাডীয় বেতন আলাদা হতে পারে।", formula: "কানাডার ফেডারেল ও প্রাদেশিক অনুমান থেকে কর ও কর্মী অবদান হিসাব হয়; হাতে-পাওয়া আয় = মোট বেতন − আনুমানিক কর্তন।",
    example: { question: "বার্ষিক মোট বেতন CAD ৮০,০০০ হলে কী দেখানো হয়?", answer: "কানাডার নির্দেশক অনুমানে কর ও কর্মী অবদানের পর বার্ষিক এবং মাসিক গড় হাতে-পাওয়া আয়। প্রদেশ ও ব্যক্তিগত কর্তনে ফল বদলায়।" },
    fields: { salary: "মোট বেতন", frequency: "বেতন প্রদানের সময়কাল" }, options: { frequency: { annual: "বার্ষিক", monthly: "মাসিক" } }, resultLabels: bnUsCountryResultLabels, related: ["canada-income-tax-calculator", "canada-cpp-ei-calculator", "canada-rrsp-calculator"],
  }),
  "canada-income-tax-calculator": bnCountryPage("canada-income-tax-calculator", {
    name: "কানাডার আয়কর ক্যালকুলেটর", title: "কানাডার আয়কর ক্যালকুলেটর: বার্ষিক করযোগ্য আয়ের অনুমান", description: "কানাডার নির্দেশক ফেডারেল ও প্রাদেশিক নিয়মে বার্ষিক করযোগ্য আয়ের ওপর আয়কর অনুমান করুন।",
    keywords: ["কানাডার আয়কর ক্যালকুলেটর", "কানাডার করযোগ্য আয়", "কানাডার ফেডারেল ও প্রাদেশিক কর"], howTo: "বার্ষিক করযোগ্য আয় CAD-এ লিখুন। কানাডার প্রকৃত কর প্রদেশ, আয়, কর্তন ও কর-ক্রেডিটে নির্ভর করে; এই ফল চূড়ান্ত রিটার্ন নয়।", formula: "কানাডার রেফারেন্স ফেডারেল ও প্রাদেশিক কর-সারণি অনুযায়ী বার্ষিক করযোগ্য আয়ের ওপর কর অনুমান করা হয়।",
    example: { question: "বার্ষিক করযোগ্য আয় CAD ৮০,০০০ হলে কী দেখানো হয়?", answer: "কানাডার রেফারেন্স অনুমানে আয়করের অঙ্ক। প্রদেশ, কর-ক্রেডিট ও ব্যক্তিগত কর্তন দিয়ে প্রকৃত দায় যাচাই করুন।" },
    fields: { income: "বার্ষিক করযোগ্য আয়" }, resultLabels: bnUsCountryResultLabels, related: ["canada-gross-net-salary-calculator", "canada-cpp-ei-calculator", "us-income-tax-calculator"],
  }),
  "canada-gst-hst-calculator": bnCountryPage("canada-gst-hst-calculator", {
    name: "কানাডার GST/HST ক্যালকুলেটর", title: "কানাডার GST/HST ক্যালকুলেটর: কর যোগ বা দাম থেকে আলাদা করুন", description: "কানাডার জন্য লিখিত GST/HST হার দিয়ে কর-পূর্ব অঙ্কে কর যোগ করুন অথবা কর-সহ দামে অন্তর্ভুক্ত কর বের করুন।",
    keywords: ["কানাডার GST/HST ক্যালকুলেটর", "কানাডার পণ্য ও সেবা কর", "GST/HST-সহ মূল্য হিসাব"], howTo: "অঙ্ক, প্রযোজ্য হার এবং কর যোগ বা আলাদা করার দিক লিখুন। কানাডায় প্রদেশ ও অঞ্চলে GST/HST এবং প্রাদেশিক অংশ ভিন্ন হতে পারে; ঠিকানাভিত্তিক হার যাচাই করুন।", formula: "কর যোগ: আনুমানিক কর = কর-পূর্ব অঙ্ক × লিখিত হার; মোট = অঙ্ক + কর। কর-সহ দাম থেকে কর-পূর্ব অঙ্ক = মোট ÷ (১ + হার)।",
    example: { question: "CAD ১০০ অঙ্কে ৫% হার হলে?", answer: "কর CAD ৫ এবং মোট CAD ১০৫। প্রাদেশিক বা আঞ্চলিক HST অংশ যোগ হলে প্রকৃত হার আলাদা হতে পারে।" },
    fields: { amount: "অঙ্ক", rate: "প্রযোজ্য হার বা রিটার্ন", direction: "হিসাবের দিক" }, options: { direction: { exclusive: "কর যোগ করুন", inclusive: "অন্তর্ভুক্ত কর আলাদা করুন" } }, resultLabels: bnUsCountryResultLabels, related: ["canada-income-tax-calculator", "us-sales-tax-calculator", "vat"],
  }),
  "canada-cpp-ei-calculator": bnCountryPage("canada-cpp-ei-calculator", {
    name: "কানাডার CPP ও EI অবদান ক্যালকুলেটর", title: "কানাডার CPP ও EI ক্যালকুলেটর: কর্মীর বেতন কর্তনের অনুমান", description: "বেতন থেকে কানাডার Canada Pension Plan (CPP) ও Employment Insurance (EI) কর্মী অবদানের নির্দেশক হিসাব করুন।",
    keywords: ["কানাডার CPP ও EI ক্যালকুলেটর", "কানাডা পেনশন অবদান", "Employment Insurance কর্তন"], howTo: "বার্ষিক বেতন CAD-এ লিখুন। কানাডার CPP/EI অবদান-সীমা, প্রদেশ, বয়স ও কর্মসংস্থানের অবস্থায় প্রকৃত কর্তন বদলাতে পারে; বর্তমান সরকারি হার যাচাই করুন।", formula: "কানাডার রেফারেন্স বেতন-সীমা ও হার ব্যবহার করে কর্মীর CPP ও EI অবদান অনুমান করা হয়।",
    example: { question: "বার্ষিক বেতন CAD ৬০,০০০ হলে কী দেখানো হয়?", answer: "কানাডার অনুমানে CPP ও EI কর্মী অবদানের বিভাজন। প্রযোজ্য সীমা ও বর্তমান করবর্ষের হার যাচাই করুন।" },
    fields: { salary: "বার্ষিক বেতন" }, resultLabels: bnUsCountryResultLabels, related: ["canada-gross-net-salary-calculator", "canada-income-tax-calculator", "canada-rrsp-calculator"],
  }),
  "canada-rrsp-calculator": bnCountryPage("canada-rrsp-calculator", {
    name: "কানাডার RRSP সঞ্চয় ক্যালকুলেটর", title: "কানাডার RRSP ক্যালকুলেটর: বার্ষিক অবদান ও সম্ভাব্য বৃদ্ধি", description: "বার্ষিক অবদান, লিখিত বিনিয়োগ রিটার্ন ও সময়কাল দিয়ে কানাডার RRSP সঞ্চয়ের সম্ভাব্য বৃদ্ধি হিসাব করুন।",
    keywords: ["কানাডার RRSP ক্যালকুলেটর", "Registered Retirement Savings Plan বৃদ্ধি", "RRSP অবসর সঞ্চয় অনুমান"], howTo: "বার্ষিক অবদান, রিটার্নের অনুমান এবং বছরের সংখ্যা লিখুন। বাজারের ফল নিশ্চিত নয়; কানাডার RRSP অবদান-সীমা, কর-ছাড় বা উত্তোলনের কর এই প্রক্ষেপণে গণনা হয় না।", formula: "প্রতি বছরের RRSP অবদান লিখিত বার্ষিক হারে বৃদ্ধি পায়; মোট অবদান ও প্রক্ষেপিত ব্যালান্স আলাদাভাবে দেখানো হয়।",
    example: { question: "বছরে CAD ৬,০০০ অবদান, ৬% রিটার্ন ও ২০ বছর হলে?", answer: "কানাডার অনুমানে সম্ভাব্য RRSP ব্যালান্স দেখানো হয়। বর্তমান অবদান-সীমা, কর-ছাড়ের যোগ্যতা ও বিনিয়োগ ঝুঁকি যাচাই করুন।" },
    fields: { annualContribution: "বার্ষিক অবদান", rate: "লিখিত বিনিয়োগ রিটার্ন", years: "সময়কাল (বছর)" }, resultLabels: bnUsCountryResultLabels, related: ["canada-cpp-ei-calculator", "us-401k-calculator", "fire-retirement-calculator"],
  }),
};

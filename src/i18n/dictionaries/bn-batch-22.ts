import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";
import { bnCountryPage, bnUsCountryResultLabels } from "@/i18n/dictionaries/bn-country-page";

export const bnBatchTwentyTwo: Record<string, LocalizedCalculatorContent> = {
  "spain-freelancer-tax-calculator": bnCountryPage("spain-freelancer-tax-calculator", {
    name: "স্পেনের স্বনিয়োজিত পেশাজীবী কর ক্যালকুলেটর", title: "স্পেনের ফ্রিল্যান্সার কর ক্যালকুলেটর: ব্যয় ও সামাজিক অবদান", description: "বার্ষিক করযোগ্য আয়, ব্যবসায়িক ব্যয় ও লিখিত হার থেকে স্পেনের স্বনিয়োজিত পেশাজীবীর কর ও সামাজিক অবদানের নির্দেশক অনুমান করুন।",
    keywords: ["স্পেনের ফ্রিল্যান্সার কর ক্যালকুলেটর", "স্পেনের autónomo কর অনুমান", "স্বনিয়োজিত ব্যবসায়িক আয় ও অবদান"], howTo: "বার্ষিক আয়, ব্যবসায়িক ব্যয়, করহার, মাসিক অবদান-ভিত্তি ও সামাজিক অবদানের হার লিখুন। স্পেনের autónomo যোগ্যতা, অঞ্চল, কর্তন ও বর্তমান অবদান নীতি অনুযায়ী প্রকৃত ফল আলাদা হবে।", formula: "আনুমানিক করযোগ্য ব্যবসায়িক লাভ = বার্ষিক আয় − ব্যবসায়িক ব্যয়। লিখিত হার ও অবদান-ভিত্তিতে কর ও সামাজিক অবদান অনুমান করা হয়।",
    example: { question: "বার্ষিক আয় €৫০,০০০, ব্যয় €১০,০০০ এবং করহার ১৫% হলে?", answer: "করযোগ্য ব্যবসায়িক লাভ €৪০,০০০; লিখিত হারে সরল কর অনুমান €৬,০০০। স্পেনের বাস্তব IRPF, কর্তন ও সামাজিক অবদান যোগ্যতা যাচাই করুন।" },
    fields: { income: "বার্ষিক করযোগ্য আয়", expenses: "ব্যবসায়িক ব্যয়", rate: "লিখিত করের হার বা রিটার্ন", contributionBase: "মাসিক অবদান-ভিত্তি", socialRate: "সামাজিক অবদানের হার" }, resultLabels: bnUsCountryResultLabels, related: ["spain-irpf-calculator", "france-social-contribution-calculator", "freelancer-hourly-rate-calculator"],
  }),
  "france-social-contribution-calculator": bnCountryPage("france-social-contribution-calculator", {
    name: "ফ্রান্সের সামাজিক অবদান ক্যালকুলেটর", title: "ফ্রান্সের সামাজিক অবদান: বেতনভিত্তিক CSG ও অন্যান্য অংশ", description: "বেতন থেকে ফ্রান্সের CSG, CRDS ও অন্যান্য সামাজিক অবদানের নির্দেশক অঙ্ক অনুমান করুন।",
    keywords: ["ফ্রান্সের সামাজিক অবদান ক্যালকুলেটর", "ফরাসি CSG ও CRDS", "ফ্রান্সের বেতন সামাজিক কর"], howTo: "বার্ষিক বেতন লিখুন। ফ্রান্সের সামাজিক অবদান ব্যক্তিগত ও কর্মসংস্থানের অবস্থার ওপর নির্ভর করে; কর-যোগ্যতা ও কর্তনের ভিত্তি বদলাতে পারে, তাই ফলটি চূড়ান্ত পে-স্লিপ নয়।", formula: "ফ্রান্সের নীতি-অনুমান অনুযায়ী লিখিত বেতনের ওপর সামাজিক অবদান ও সংশ্লিষ্ট অংশ হিসাব করা হয়।",
    example: { question: "বার্ষিক বেতন €৪০,০০০ হলে কী দেখানো হয়?", answer: "ফ্রান্সের অনুমানে সামাজিক অবদানের বিভিন্ন অংশ দেখানো হয়। CSG, CRDS ও অন্যান্য কর্তনের প্রযোজ্যতা ব্যক্তিগত পরিস্থিতিতে যাচাই করুন।" },
    fields: { salary: "বার্ষিক বেতন" }, resultLabels: bnUsCountryResultLabels, related: ["france-gross-net-salary-calculator", "france-income-tax-calculator", "social-insurance"],
  }),
};

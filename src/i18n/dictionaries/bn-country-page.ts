import type { LocalizedCalculatorSlug } from "@/i18n/config";
import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";
import { bnPage } from "@/i18n/dictionaries/bn-page";

export const bnGlobalCountryResultLabels = {
  "Tax-exclusive amount": "কর-পূর্ব অঙ্ক",
  "Taxable annual income": "বার্ষিক করযোগ্য আয়",
  Tax: "আনুমানিক কর",
  "Tax-inclusive total": "কর-সহ মোট",
  "Gross annual salary": "বার্ষিক মোট বেতন",
  "Estimated income tax": "আনুমানিক আয়কর",
  "Estimated employee contributions": "আনুমানিক কর্মী অবদান",
  "Estimated annual take-home pay": "আনুমানিক বার্ষিক হাতে-পাওয়া আয়",
  "Estimated monthly take-home pay": "আনুমানিক মাসিক হাতে-পাওয়া আয়",
  "Average tax rate": "গড় করের হার",
  "Base pay": "ভিত্তি মজুরি",
  "Overtime premium": "ওভারটাইম প্রিমিয়াম",
  "Estimated overtime pay": "আনুমানিক ওভারটাইম বেতন",
  "Annual base pay": "বার্ষিক ভিত্তি বেতন",
  "Allowance rate": "ভাতার হার",
  "Estimated allowance": "আনুমানিক ভাতা",
  "Daily salary basis": "দৈনিক বেতনের ভিত্তি",
  "Service years": "চাকরির বছর",
  "Estimated severance": "আনুমানিক অবসর ভাতা",
  "Total contributions": "মোট অবদান",
  "Estimated gains": "আনুমানিক লাভ",
  "Projected balance": "প্রক্ষেপিত অবশিষ্ট অঙ্ক",
  "Potential tax-free allowance": "সম্ভাব্য করমুক্ত ভাতা",
  "Taxable salary remainder": "অবশিষ্ট করযোগ্য বেতন",
  "Monthly employer FGTS deposit": "মাসিক নিয়োগকর্তা FGTS জমা",
  "Annual employer FGTS deposits": "বার্ষিক নিয়োগকর্তা FGTS জমা",
  "Eligible months": "যোগ্য মাসের সংখ্যা",
  "Estimated monthly INSS contribution": "আনুমানিক মাসিক INSS অবদান",
  "Estimated monthly IRRF": "আনুমানিক মাসিক IRRF",
  "Contribution base": "অবদানের ভিত্তি",
  "Employee rate": "কর্মীর হার",
} satisfies Record<string, string>;

type BengaliPageSpec = Parameters<typeof bnPage>[1];

export function bnCountryPage(slug: LocalizedCalculatorSlug, spec: BengaliPageSpec): LocalizedCalculatorContent {
  const page = bnPage(slug, spec);
  return {
    ...page,
    faqs: [
      spec.example,
      { question: "এই ক্যালকুলেটর কোন দেশের নিয়ম ব্যবহার করে?", answer: `${page.name} এই পাতায় উল্লেখিত দেশের নীতি ও অনুমানের ভিত্তিতে হিসাব করে। ভাষা পরিবর্তন করলে হিসাবের দেশ বদলায় না।` },
      { question: "ফল কি চূড়ান্ত কর বা বেতন-হিসাব?", answer: "না। এটি নির্দেশক অনুমান। ব্যক্তিগত যোগ্যতা, অঞ্চল, কর্তন, নিয়োগকর্তা বা সরকারি নিয়মে প্রকৃত অঙ্ক বদলাতে পারে; সংশ্লিষ্ট কর্তৃপক্ষের তথ্য যাচাই করুন।" },
    ],
    validation: "লিখিত মানগুলো যাচাই করুন। এই ফল কেবল এই পাতায় উল্লেখিত দেশের সূত্র ও অনুমানের জন্য।",
    resultNote: `${page.name} এই পাতায় উল্লেখিত দেশের অনুমানের ভিত্তিতে ফল দেয়। ভাষা বা প্রদর্শিত মুদ্রা বদলালেও দেশের নীতি বা প্রকৃত অর্থমূল্য রূপান্তর হয় না।`,
  };
}

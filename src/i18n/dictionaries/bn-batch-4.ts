import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";
import { bnPage } from "@/i18n/dictionaries/bn-page";

const ratioFieldsBn = {
  parts: "অনুপাতের মান (কোলন দিয়ে আলাদা করুন)", knownSide: "যে অবস্থানের মান জানা", knownValue: "জানা মান", total: "বণ্টনের মোট পরিমাণ", unknown: "যে মানটি অজানা",
  a: "প্রথম অনুপাতের প্রথম মান", b: "প্রথম অনুপাতের দ্বিতীয় মান", c: "দ্বিতীয় অনুপাতের জানা প্রথম মান", d: "দ্বিতীয় অনুপাতের জানা দ্বিতীয় মান",
  percentages: "শতাংশের তালিকা (কোলন দিয়ে আলাদা করুন)", firstRatio: "তুলনার প্রথম অনুপাত", secondRatio: "তুলনার দ্বিতীয় অনুপাত", width: "প্রস্থ", height: "উচ্চতা",
  scaleDrawing: "নকশার মান", scaleActual: "বাস্তব মাপ", direction: "রূপান্তরের দিক", length: "জানা দৈর্ঘ্য", inputUnit: "ইনপুটের দৈর্ঘ্য একক", outputUnit: "ফলাফলের দৈর্ঘ্য একক", mode: "হিসাবের ধরন",
};
const ratioOptionsBn = {
  mode: { simplify: "অনুপাত সরল করুন", find: "অজানা মান বের করুন", split: "মোট পরিমাণ ভাগ করুন", proportion: "সমানুপাত সমাধান করুন", "to-percentage": "অনুপাতকে শতাংশে রূপান্তর", "from-percentage": "শতাংশকে অনুপাতে রূপান্তর", compare: "অনুপাত তুলনা করুন" },
  knownSide: { first: "প্রথম মান", second: "দ্বিতীয় মান" }, unknown: { c: "দ্বিতীয় অনুপাতের প্রথম মান (x:d)", d: "দ্বিতীয় অনুপাতের দ্বিতীয় মান (c:x)" },
  direction: { "drawing-to-actual": "নকশা থেকে বাস্তব", "actual-to-drawing": "বাস্তব থেকে নকশা" }, inputUnit: { cm: "সেন্টিমিটার (cm)", m: "মিটার (m)" }, outputUnit: { cm: "সেন্টিমিটার (cm)", m: "মিটার (m)" },
};
const partDigitsBn = ["১", "২", "৩", "৪", "৫", "৬"];
const ratioResultsBn = [
  "সরল করা অনুপাত", "গরিষ্ঠ সাধারণ গুণনীয়ক", "সমানুপাতিক মান", "প্রথম মান · দশমিক ভাগ", "দ্বিতীয় মান · দশমিক ভাগ", "তুলনার ফল",
  "অজানা মান", "সম্পূর্ণ সমানুপাত", "দৈর্ঘ্য-প্রস্থের অনুপাত", "দশমিক অনুপাত", "রূপান্তরিত দৈর্ঘ্য", "প্রয়োগ করা স্কেল",
  ...partDigitsBn.flatMap((digit) => [`সরল করা ${digit} নম্বর অংশ`, `বরাদ্দের ${digit} নম্বর ভাগ`, `মোটের ${digit} নম্বর অংশের শতাংশ`, `${digit} নম্বর অংশের দশমিক ভাগ`]),
];

export const bnBatchFour: Record<string, LocalizedCalculatorContent> = {
  ratio: bnPage("ratio", {
    name: "অনুপাত ক্যালকুলেটর", title: "অনুপাত সরল, তুলনা ও সমানুপাত সমাধান করুন", description: "অনুপাত সরল করুন, অজানা মান নির্ণয় করুন, মোট ভাগ করুন এবং অনুপাত তুলনা করুন।",
    keywords: ["অনুপাত ক্যালকুলেটর", "অনুপাত সরল করা", "ratio calculator"], howTo: "হিসাবের ধরন বেছে নিয়ে দেখানো ঘরে অনুপাতের মান লিখুন।",
    formula: "সমানুপাতের ক্ষেত্রে a:b = c:d হলে a × d = b × c; অনুপাতের অংশগুলোর গরিষ্ঠ সাধারণ গুণনীয়ক দিয়ে সরল করা হয়।",
    example: { question: "১২:১৮ অনুপাত সরল করলে কত হয়?", answer: "উভয় অংশকে ৬ দিয়ে ভাগ করলে ২:৩ হয়।" },
    fields: ratioFieldsBn, options: ratioOptionsBn, results: ratioResultsBn, related: ["proportion", "aspect-ratio", "scale-ratio"],
  }),
  proportion: bnPage("proportion", {
    name: "সমানুপাত ক্যালকুলেটর", title: "সমানুপাতের অজানা মান নির্ণয় করুন", description: "দুটি সমানুপাতিক অনুপাতের একটি অজানা মান বের করুন।",
    keywords: ["সমানুপাত ক্যালকুলেটর", "সমানুপাত সমাধান", "proportion calculator"], howTo: "সমানুপাতের তিনটি জানা মান লিখে অজানা অবস্থান বেছে নিন।",
    formula: "a:b = c:d হলে বিপরীত গুণফল সমান: a × d = b × c।",
    example: { question: "২:৩ = ৮:x হলে x কত?", answer: "বিপরীত গুণফল মিলিয়ে x = ১২।" },
    fields: ratioFieldsBn, options: ratioOptionsBn, results: ratioResultsBn, related: ["ratio", "percentage", "average"],
  }),
  "aspect-ratio": bnPage("aspect-ratio", {
    name: "দৈর্ঘ্য-প্রস্থ অনুপাত ক্যালকুলেটর", title: "দৈর্ঘ্য-প্রস্থের অনুপাত ও মাপ হিসাব করুন", description: "প্রস্থ ও উচ্চতার অনুপাত বের করুন অথবা একটি মাপ জানা থাকলে অপরটি হিসাব করুন।",
    keywords: ["দৈর্ঘ্য প্রস্থ অনুপাত", "aspect ratio calculator", "পর্দার অনুপাত"], howTo: "হিসাবের ধরন বেছে নিয়ে জানা প্রস্থ, উচ্চতা বা অনুপাত লিখুন।",
    formula: "দৈর্ঘ্য-প্রস্থের অনুপাত = প্রস্থ ÷ উচ্চতা; একটি মাপ জানা থাকলে একই অনুপাত বজায় রেখে অপর মাপ নির্ণয় করা হয়।",
    example: { question: "১৬:৯ অনুপাতের পর্দা ১,৬০০ পিক্সেল চওড়া হলে উচ্চতা কত?", answer: "উচ্চতা হবে ৯০০ পিক্সেল।" },
    fields: ratioFieldsBn, options: ratioOptionsBn, results: ratioResultsBn, related: ["ratio", "proportion", "scale-ratio"],
  }),
  "scale-ratio": bnPage("scale-ratio", {
    name: "স্কেল অনুপাত ক্যালকুলেটর", title: "নকশা ও বাস্তব মাপের স্কেল রূপান্তর করুন", description: "স্কেল অনুপাত ও দৈর্ঘ্যের একক দিয়ে নকশার মাপকে বাস্তব মাপে বা উল্টোভাবে রূপান্তর করুন।",
    keywords: ["স্কেল অনুপাত ক্যালকুলেটর", "নকশার স্কেল", "scale ratio calculator"], howTo: "রূপান্তরের দিক, স্কেল ও জানা দৈর্ঘ্য লিখুন।",
    formula: "বাস্তব দৈর্ঘ্য = নকশার দৈর্ঘ্য × স্কেল অনুপাত; বিপরীত দিকে নকশার দৈর্ঘ্য পেতে অনুপাত দিয়ে ভাগ করা হয়।",
    example: { question: "১:১০০ স্কেলে নকশায় ২ সেমি হলে বাস্তবে কত?", answer: "বাস্তব দৈর্ঘ্য ২০০ সেমি, অর্থাৎ ২ মিটার।" },
    fields: ratioFieldsBn, options: ratioOptionsBn, results: ratioResultsBn, related: ["ratio", "proportion", "unit-converter"],
  }),
};

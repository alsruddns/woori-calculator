import { localizedCalculatorSlugs } from "@/i18n/config";
import { filBatchOne } from "@/i18n/dictionaries/fil-batch-1";
import { filBatchTwo } from "@/i18n/dictionaries/fil-batch-2";
import { filBatchThree } from "@/i18n/dictionaries/fil-batch-3";
import { filBatchFour } from "@/i18n/dictionaries/fil-batch-4";
import { filBatchFive } from "@/i18n/dictionaries/fil-batch-5";
import { filBatchSix } from "@/i18n/dictionaries/fil-batch-6";
import { filBatchSeven } from "@/i18n/dictionaries/fil-batch-7";
import { filBatchEight } from "@/i18n/dictionaries/fil-batch-8";
import { filBatchNine } from "@/i18n/dictionaries/fil-batch-9";
import { filBatchTen } from "@/i18n/dictionaries/fil-batch-10";
import { filBatchEleven } from "@/i18n/dictionaries/fil-batch-11";
import { filBatchTwelve } from "@/i18n/dictionaries/fil-batch-12";
import { filBatchThirteen } from "@/i18n/dictionaries/fil-batch-13";
import { filBatchFourteen } from "@/i18n/dictionaries/fil-batch-14";
import { filBatchFifteen } from "@/i18n/dictionaries/fil-batch-15";
import { filBatchSixteen } from "@/i18n/dictionaries/fil-batch-16";
import { filBatchSeventeen } from "@/i18n/dictionaries/fil-batch-17";
import { filBatchEighteen } from "@/i18n/dictionaries/fil-batch-18";
import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";

// Translation workbench only. It is deliberately not connected to public routing.
export const filipinoCalculatorContent: Partial<Record<(typeof localizedCalculatorSlugs)[number], LocalizedCalculatorContent>> = {
  ...filBatchOne,
  ...filBatchTwo,
  ...filBatchThree,
  ...filBatchFour,
  ...filBatchFive,
  ...filBatchSix,
  ...filBatchSeven,
  ...filBatchEight,
  ...filBatchNine,
  ...filBatchTen,
  ...filBatchEleven,
  ...filBatchTwelve,
  ...filBatchThirteen,
  ...filBatchFourteen,
  ...filBatchFifteen,
  ...filBatchSixteen,
  ...filBatchSeventeen,
  ...filBatchEighteen,
};

export const translatedFilipinoCalculatorSlugs = localizedCalculatorSlugs.filter(
  (slug) => slug in filipinoCalculatorContent,
);
export const remainingFilipinoCalculatorSlugs = localizedCalculatorSlugs.filter(
  (slug) => !(slug in filipinoCalculatorContent),
);

import { localizedCalculatorSlugs } from "@/i18n/config";
import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";
import { bnBatchOne } from "@/i18n/dictionaries/bn-batch-1";
import { bnBatchTwo } from "@/i18n/dictionaries/bn-batch-2";
import { bnBatchThree } from "@/i18n/dictionaries/bn-batch-3";
import { bnBatchFour } from "@/i18n/dictionaries/bn-batch-4";
import { bnBatchFive } from "@/i18n/dictionaries/bn-batch-5";
import { bnBatchSix } from "@/i18n/dictionaries/bn-batch-6";
import { bnBatchSeven } from "@/i18n/dictionaries/bn-batch-7";
import { bnBatchEight } from "@/i18n/dictionaries/bn-batch-8";
import { bnBatchNine } from "@/i18n/dictionaries/bn-batch-9";
import { bnBatchTen } from "@/i18n/dictionaries/bn-batch-10";
import { bnBatchEleven } from "@/i18n/dictionaries/bn-batch-11";
import { bnBatchTwelve } from "@/i18n/dictionaries/bn-batch-12";
import { bnBatchThirteen } from "@/i18n/dictionaries/bn-batch-13";
import { bnBatchFourteen } from "@/i18n/dictionaries/bn-batch-14";
import { bnBatchFifteen } from "@/i18n/dictionaries/bn-batch-15";
import { bnBatchSixteen } from "@/i18n/dictionaries/bn-batch-16";
import { bnBatchSeventeen } from "@/i18n/dictionaries/bn-batch-17";
import { bnBatchEighteen } from "@/i18n/dictionaries/bn-batch-18";
import { bnBatchNineteen } from "@/i18n/dictionaries/bn-batch-19";
import { bnBatchTwenty } from "@/i18n/dictionaries/bn-batch-20";
import { bnBatchTwentyOne } from "@/i18n/dictionaries/bn-batch-21";

// Translation workbench only. Publish only after the shared Bengali UI and all pages are complete.
export const bengaliCalculatorContent: Partial<Record<(typeof localizedCalculatorSlugs)[number], LocalizedCalculatorContent>> = {
  ...bnBatchOne,
  ...bnBatchTwo,
  ...bnBatchThree,
  ...bnBatchFour,
  ...bnBatchFive,
  ...bnBatchSix,
  ...bnBatchSeven,
  ...bnBatchEight,
  ...bnBatchNine,
  ...bnBatchTen,
  ...bnBatchEleven,
  ...bnBatchTwelve,
  ...bnBatchThirteen,
  ...bnBatchFourteen,
  ...bnBatchFifteen,
  ...bnBatchSixteen,
  ...bnBatchSeventeen,
  ...bnBatchEighteen,
  ...bnBatchNineteen,
  ...bnBatchTwenty,
  ...bnBatchTwentyOne,
};
export const translatedBengaliCalculatorSlugs = localizedCalculatorSlugs.filter((slug) => slug in bengaliCalculatorContent);
export const remainingBengaliCalculatorSlugs = localizedCalculatorSlugs.filter((slug) => !(slug in bengaliCalculatorContent));

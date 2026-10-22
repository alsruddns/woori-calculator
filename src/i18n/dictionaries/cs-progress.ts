import { localizedCalculatorSlugs } from "@/i18n/config";
import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";
import { csBatchOne } from "@/i18n/dictionaries/cs-batch-1";
import { csBatchTwo } from "@/i18n/dictionaries/cs-batch-2";
import { csBatchThree } from "@/i18n/dictionaries/cs-batch-3";
import { csBatchFour } from "@/i18n/dictionaries/cs-batch-4";
import { csBatchFive } from "@/i18n/dictionaries/cs-batch-5";
import { csBatchSix } from "@/i18n/dictionaries/cs-batch-6";
import { csBatchSeven } from "@/i18n/dictionaries/cs-batch-7";
import { csBatchEight } from "@/i18n/dictionaries/cs-batch-8";
import { csBatchNine } from "@/i18n/dictionaries/cs-batch-9";
import { csBatchTen } from "@/i18n/dictionaries/cs-batch-10";
import { csBatchEleven } from "@/i18n/dictionaries/cs-batch-11";
import { csBatchTwelve } from "@/i18n/dictionaries/cs-batch-12";
import { csBatchThirteen } from "@/i18n/dictionaries/cs-batch-13";
import { csBatchFourteen } from "@/i18n/dictionaries/cs-batch-14";
import { csBatchFifteen } from "@/i18n/dictionaries/cs-batch-15";
import { csBatchSixteen } from "@/i18n/dictionaries/cs-batch-16";
import { csBatchSeventeen } from "@/i18n/dictionaries/cs-batch-17";
import { csBatchEighteen } from "@/i18n/dictionaries/cs-batch-18";
import { csBatchNineteen } from "@/i18n/dictionaries/cs-batch-19";
import { csBatchTwenty } from "@/i18n/dictionaries/cs-batch-20";
import { csBatchTwentyOne } from "@/i18n/dictionaries/cs-batch-21";
import { csBatchTwentyTwo } from "@/i18n/dictionaries/cs-batch-22";
import { csBatchTwentyThree } from "@/i18n/dictionaries/cs-batch-23";
import { csBatchTwentyFour } from "@/i18n/dictionaries/cs-batch-24";
import { csBatchTwentyFive } from "@/i18n/dictionaries/cs-batch-25";
import { csBatchTwentySix } from "@/i18n/dictionaries/cs-batch-26";
import { csBatchTwentySeven } from "@/i18n/dictionaries/cs-batch-27";
import { csBatchTwentyEight } from "@/i18n/dictionaries/cs-batch-28";
import { csBatchTwentyNine } from "@/i18n/dictionaries/cs-batch-29";
import { csBatchThirty } from "@/i18n/dictionaries/cs-batch-30";
import { csBatchThirtyOne } from "@/i18n/dictionaries/cs-batch-31";
import { csBatchThirtyTwo } from "@/i18n/dictionaries/cs-batch-32";

export const czechCalculatorContent: Partial<Record<(typeof localizedCalculatorSlugs)[number], LocalizedCalculatorContent>> = {
  ...csBatchOne,
  ...csBatchTwo,
  ...csBatchThree,
  ...csBatchFour,
  ...csBatchFive,
  ...csBatchSix,
  ...csBatchSeven,
  ...csBatchEight,
  ...csBatchNine,
  ...csBatchTen,
  ...csBatchEleven,
  ...csBatchTwelve,
  ...csBatchThirteen,
  ...csBatchFourteen,
  ...csBatchFifteen,
  ...csBatchSixteen,
  ...csBatchSeventeen,
  ...csBatchEighteen,
  ...csBatchNineteen,
  ...csBatchTwenty,
  ...csBatchTwentyOne,
  ...csBatchTwentyTwo,
  ...csBatchTwentyThree,
  ...csBatchTwentyFour,
  ...csBatchTwentyFive,
  ...csBatchTwentySix,
  ...csBatchTwentySeven,
  ...csBatchTwentyEight,
  ...csBatchTwentyNine,
  ...csBatchThirty,
  ...csBatchThirtyOne,
  ...csBatchThirtyTwo,
};

export const translatedCzechCalculatorSlugs = localizedCalculatorSlugs.filter((slug) => slug in czechCalculatorContent);
export const remainingCzechCalculatorSlugs = localizedCalculatorSlugs.filter((slug) => !(slug in czechCalculatorContent));

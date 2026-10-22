import { localizedCalculatorSlugs } from "@/i18n/config";
import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";
import { roBatchOne } from "@/i18n/dictionaries/ro-batch-1";
import { roBatchTwo } from "@/i18n/dictionaries/ro-batch-2";
import { roBatchThree } from "@/i18n/dictionaries/ro-batch-3";
import { roBatchFour } from "@/i18n/dictionaries/ro-batch-4";
import { roBatchFive } from "@/i18n/dictionaries/ro-batch-5";
import { roBatchSix } from "@/i18n/dictionaries/ro-batch-6";
import { roBatchSeven } from "@/i18n/dictionaries/ro-batch-7";
import { roBatchEight } from "@/i18n/dictionaries/ro-batch-8";
import { roBatchNine } from "@/i18n/dictionaries/ro-batch-9";
import { roBatchTen } from "@/i18n/dictionaries/ro-batch-10";
import { roBatchEleven } from "@/i18n/dictionaries/ro-batch-11";
import { roBatchTwelve } from "@/i18n/dictionaries/ro-batch-12";
import { roBatchThirteen } from "@/i18n/dictionaries/ro-batch-13";
import { roBatchFourteen } from "@/i18n/dictionaries/ro-batch-14";
import { roBatchFifteen } from "@/i18n/dictionaries/ro-batch-15";
import { roBatchSixteen } from "@/i18n/dictionaries/ro-batch-16";
import { roBatchSeventeen } from "@/i18n/dictionaries/ro-batch-17";
import { roBatchEighteen } from "@/i18n/dictionaries/ro-batch-18";
import { roBatchNineteen } from "@/i18n/dictionaries/ro-batch-19";
import { roBatchTwenty } from "@/i18n/dictionaries/ro-batch-20";
import { roBatchTwentyOne } from "@/i18n/dictionaries/ro-batch-21";
import { roBatchTwentyTwo } from "@/i18n/dictionaries/ro-batch-22";
import { roBatchTwentyThree } from "@/i18n/dictionaries/ro-batch-23";

export const romanianCalculatorContent: Partial<Record<(typeof localizedCalculatorSlugs)[number], LocalizedCalculatorContent>> = {
  ...roBatchOne,
  ...roBatchTwo,
  ...roBatchThree,
  ...roBatchFour,
  ...roBatchFive,
  ...roBatchSix,
  ...roBatchSeven,
  ...roBatchEight,
  ...roBatchNine,
  ...roBatchTen,
  ...roBatchEleven,
  ...roBatchTwelve,
  ...roBatchThirteen,
  ...roBatchFourteen,
  ...roBatchFifteen,
  ...roBatchSixteen,
  ...roBatchSeventeen,
  ...roBatchEighteen,
  ...roBatchNineteen,
  ...roBatchTwenty,
  ...roBatchTwentyOne,
  ...roBatchTwentyTwo,
  ...roBatchTwentyThree,
};

export const translatedRomanianCalculatorSlugs = localizedCalculatorSlugs.filter((slug) => slug in romanianCalculatorContent);
export const remainingRomanianCalculatorSlugs = localizedCalculatorSlugs.filter((slug) => !(slug in romanianCalculatorContent));

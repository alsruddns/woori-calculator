import { localizedCalculatorSlugs } from "@/i18n/config";
import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";
import { roBatchOne } from "@/i18n/dictionaries/ro-batch-1";
import { roBatchTwo } from "@/i18n/dictionaries/ro-batch-2";
import { roBatchThree } from "@/i18n/dictionaries/ro-batch-3";
import { roBatchFour } from "@/i18n/dictionaries/ro-batch-4";

export const romanianCalculatorContent: Partial<Record<(typeof localizedCalculatorSlugs)[number], LocalizedCalculatorContent>> = {
  ...roBatchOne,
  ...roBatchTwo,
  ...roBatchThree,
  ...roBatchFour,
};

export const translatedRomanianCalculatorSlugs = localizedCalculatorSlugs.filter((slug) => slug in romanianCalculatorContent);
export const remainingRomanianCalculatorSlugs = localizedCalculatorSlugs.filter((slug) => !(slug in romanianCalculatorContent));

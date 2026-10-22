import { localizedCalculatorSlugs } from "@/i18n/config";
import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";
import { csBatchOne } from "@/i18n/dictionaries/cs-batch-1";
import { csBatchTwo } from "@/i18n/dictionaries/cs-batch-2";

export const czechCalculatorContent: Partial<Record<(typeof localizedCalculatorSlugs)[number], LocalizedCalculatorContent>> = {
  ...csBatchOne,
  ...csBatchTwo,
};

export const translatedCzechCalculatorSlugs = localizedCalculatorSlugs.filter((slug) => slug in czechCalculatorContent);
export const remainingCzechCalculatorSlugs = localizedCalculatorSlugs.filter((slug) => !(slug in czechCalculatorContent));

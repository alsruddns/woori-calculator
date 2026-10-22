import { localizedCalculatorSlugs } from "@/i18n/config";
import type { LocalizedCalculatorContent } from "@/i18n/dictionaries/types";
import { roBatchOne } from "@/i18n/dictionaries/ro-batch-1";

export const romanianCalculatorContent: Partial<Record<(typeof localizedCalculatorSlugs)[number], LocalizedCalculatorContent>> = {
  ...roBatchOne,
};

export const translatedRomanianCalculatorSlugs = localizedCalculatorSlugs.filter((slug) => slug in romanianCalculatorContent);
export const remainingRomanianCalculatorSlugs = localizedCalculatorSlugs.filter((slug) => !(slug in romanianCalculatorContent));

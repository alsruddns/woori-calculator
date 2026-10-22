import { describe, expect, it } from "vitest";
import { calculatorSupportsLocale, existingLocales, hasLocale, hasLocalizedCalculator, hasRoutingLocale, languageSwitchPath, localeConfig, localePath, localizedCalculatorSlugs, localizedIndexSlugs, locales, routingLocaleConfig, routingLocales, supportedLocales, phaseFiveTranslatedCalculatorSlugs, phaseFourTranslatedCalculatorSlugs, phaseOneTranslatedCalculatorSlugs, phaseThreeTranslatedCalculatorSlugs, phaseTwoTranslatedCalculatorSlugs, phaseTranslatedCalculatorSlugs, supportedLocalesForCalculator } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localizedMetadata } from "@/lib/i18n/seo";
import { matchesCalculatorSearch } from "@/lib/i18n/search";

describe("locale routing and translated calculator catalog", () => {
  it("accepts only supported locale keys and localized calculator slugs", () => {
    for (const locale of locales) expect(hasLocale(locale)).toBe(true);
    expect(hasLocale("fr")).toBe(true);
    expect(locales).toHaveLength(15);
    expect(supportedLocales).toHaveLength(16);
    expect(supportedLocales.slice(0, locales.length)).toEqual(locales);
    expect(supportedLocales.at(-1)).toBe("ru");
    expect(routingLocales).toHaveLength(26);
    expect(new Set(routingLocales).size).toBe(26);
    for (const locale of routingLocales) expect(hasRoutingLocale(locale)).toBe(true);
    for (const locale of ["ru", "tr", "pl", "fil", "bn", "uk", "ms", "sv", "cs", "ro", "el"] as const) {
      expect(hasLocale(locale)).toBe(locale === "ru");
      expect(routingLocaleConfig[locale].intlLocale).toBeTruthy();
    }
    expect(localeConfig["pt-br"].hreflang).toBe("pt-BR");
    expect(localeConfig["zh-tw"].hreflang).toBe("zh-TW");
    for (const slug of localizedCalculatorSlugs) expect(hasLocalizedCalculator(slug)).toBe(true);
    expect(hasLocalizedCalculator("salary")).toBe(false);
  });

  it("prefixes all supported locale paths, including Korean", () => {
    expect(localePath("ko", "/calculators/percentage")).toBe("/ko/calculators/percentage");
    expect(localePath("en", "/calculators/percentage")).toBe("/en/calculators/percentage");
    expect(localePath("ja", "/calculators/age")).toBe("/ja/calculators/age");
    expect(localePath("zh", "/calculators/area")).toBe("/zh/calculators/area");
    expect(localePath("ko")).toBe("/ko");
    expect(localePath("en", "/")).toBe("/en");
  });

  it("publishes only fully translated Russian calculator pages", () => {
    const russian = getDictionary("ru");
    const page = russian.calculators["compound-interest"]!;
    const english = getDictionary("en").calculators["compound-interest"]!;
    expect(localizedIndexSlugs("ru")).toEqual([
      "compound-interest", "percentage", "discount", "date-difference", "age", "area", "average", "weighted-average", "bmi", "cagr", "change-rate", "simple-interest", "savings-interest",
      "median", "percentile", "probability", "fraction", "decimal-fraction", "unit-price", "unit-converter", "dday", "workdays", "time-arithmetic",
      "tip-calculator", "trip-split", "fuel-efficiency", "vehicle-cost", "taxi-fare", "dividend", "profit-loss", "margin", "markup", "calorie-per-serving",
      "loan-interest", "deposit-interest", "loan-refinance", "prepayment-fee", "loan-affordability", "ltv", "dti", "dsr", "break-even-point-calculator", "inflation-adjusted-return-calculator",
      "fuel-cost", "salary-conversion", "hourly-wage", "tenure", "pregnancy", "fire-retirement-calculator", "dividend-growth-calculator", "stock-profit-after-fees-calculator", "position-size-calculator", "freelancer-hourly-rate-calculator",
      "ratio", "proportion", "aspect-ratio", "scale-ratio", "vat", "pace", "standard-deviation", "stock-average-price", "stop-loss-take-profit-calculator", "loan-early-repayment-calculator", "rent-vs-buy-calculator", "electricity-cost-calculator", "travel-budget-calculator", "product-margin", "withholding-tax-3-3", "annual-leave-allowance", "utility-bill", "unemployment-benefit", "minimum-wage", "severance-pay", "social-insurance", "japan-consumption-tax-calculator", "japan-annual-salary-calculator", "japan-monthly-salary-calculator", "japan-overtime-pay-calculator", "japan-night-holiday-pay-calculator", "germany-gross-net-salary-calculator", "germany-income-tax-calculator", "germany-vat-calculator", "germany-overtime-pay-calculator", "germany-vacation-pay-calculator", "spain-gross-net-salary-calculator", "spain-irpf-calculator", "spain-vat-calculator", "spain-severance-pay-calculator", "france-gross-net-salary-calculator", "france-income-tax-calculator", "france-vat-calculator", "france-overtime-pay-calculator", "netherlands-gross-net-salary-calculator", "netherlands-vat-calculator", "netherlands-30-percent-ruling-calculator", "netherlands-holiday-allowance-calculator", "india-gst-calculator", "india-sip-calculator", "india-ppf-calculator", "india-nps-calculator", "india-gross-net-salary-calculator", "india-income-tax-calculator", "brazil-gross-net-salary-calculator", "brazil-inss-calculator", "brazil-irrf-calculator", "brazil-fgts-calculator", "brazil-thirteenth-salary-calculator", "vietnam-gross-net-salary-calculator", "vietnam-personal-income-tax-calculator", "vietnam-social-insurance-calculator", "china-gross-net-salary-calculator", "china-individual-income-tax-calculator", "china-social-insurance-calculator", "china-vat-calculator", "taiwan-gross-net-salary-calculator", "taiwan-income-tax-calculator", "taiwan-labor-insurance-calculator", "taiwan-vat-calculator", "italy-gross-net-salary-calculator", "italy-income-tax-calculator", "italy-vat-calculator", "us-paycheck-calculator", "us-income-tax-calculator", "us-sales-tax-calculator", "us-401k-calculator", "us-roth-ira-calculator", "us-capital-gains-tax-calculator", "uk-gross-net-salary-calculator", "uk-income-tax-calculator", "uk-national-insurance-calculator", "uk-vat-calculator", "uk-stamp-duty-calculator", "uk-pension-calculator", "canada-gross-net-salary-calculator", "canada-income-tax-calculator", "canada-gst-hst-calculator", "canada-cpp-ei-calculator", "canada-rrsp-calculator", "australia-gross-net-salary-calculator", "australia-income-tax-calculator", "australia-gst-calculator", "australia-superannuation-calculator", "australia-stamp-duty-calculator", "singapore-gross-net-salary-calculator", "singapore-income-tax-calculator", "singapore-cpf-calculator", "singapore-gst-calculator", "hong-kong-salary-tax-calculator", "hong-kong-mpf-calculator", "hong-kong-stamp-duty-calculator", "malaysia-income-tax-calculator", "malaysia-epf-calculator", "malaysia-socso-calculator", "malaysia-sst-calculator", "philippines-gross-net-salary-calculator", "philippines-income-tax-calculator", "philippines-sss-calculator", "philippines-philhealth-calculator", "philippines-pagibig-calculator", "uae-gratuity-calculator", "uae-end-of-service-calculator", "uae-vat-calculator", "uae-corporate-tax-calculator", "new-zealand-gross-net-salary-calculator", "new-zealand-income-tax-calculator", "new-zealand-gst-calculator", "new-zealand-kiwisaver-calculator", "spain-freelancer-tax-calculator", "france-social-contribution-calculator",
    ]);
    expect(supportedLocalesForCalculator("compound-interest")).toContain("ru");
    for (const slug of localizedIndexSlugs("ru")) expect(calculatorSupportsLocale(slug, "ru")).toBe(true);
    expect(calculatorSupportsLocale("vat", "ru")).toBe(true);
    expect(calculatorSupportsLocale("ratio", "ru")).toBe(true);
    expect(calculatorSupportsLocale("minimum-wage", "ru")).toBe(true);
    expect(calculatorSupportsLocale("unemployment-benefit", "ru")).toBe(true);
    expect(calculatorSupportsLocale("severance-pay", "ru")).toBe(true);
    expect(calculatorSupportsLocale("social-insurance", "ru")).toBe(true);
    expect(calculatorSupportsLocale("japan-consumption-tax-calculator", "ru")).toBe(true);
    expect(calculatorSupportsLocale("japan-night-holiday-pay-calculator", "ru")).toBe(true);
    expect(calculatorSupportsLocale("germany-vat-calculator", "ru")).toBe(true);
    expect(calculatorSupportsLocale("spain-vat-calculator", "ru")).toBe(true);
    expect(calculatorSupportsLocale("france-vat-calculator", "ru")).toBe(true);
    expect(calculatorSupportsLocale("netherlands-vat-calculator", "ru")).toBe(true);
    expect(calculatorSupportsLocale("india-sip-calculator", "ru")).toBe(true);
    expect(calculatorSupportsLocale("brazil-fgts-calculator", "ru")).toBe(true);
    expect(calculatorSupportsLocale("vietnam-social-insurance-calculator", "ru")).toBe(true);
    expect(calculatorSupportsLocale("china-vat-calculator", "ru")).toBe(true);
    expect(calculatorSupportsLocale("taiwan-vat-calculator", "ru")).toBe(true);
    expect(calculatorSupportsLocale("italy-vat-calculator", "ru")).toBe(true);
    expect(languageSwitchPath("/en/calculators/compound-interest", "ru")).toBe("/ru/calculators/compound-interest");
    expect(languageSwitchPath("/en/calculators/percentage", "ru")).toBe("/ru/calculators/percentage");
    expect(languageSwitchPath("/en/calculators/vat", "ru")).toBe("/ru/calculators/vat");
    expect(languageSwitchPath("/en/calculators/ratio", "ru")).toBe("/ru/calculators/ratio");
    expect(languageSwitchPath("/en/calculators/minimum-wage", "ru")).toBe("/ru/calculators/minimum-wage");
    expect(languageSwitchPath("/en/calculators/pace", "ru")).toBe("/ru/calculators/pace");
    expect(languageSwitchPath("/en/calculators/stock-average-price", "ru")).toBe("/ru/calculators/stock-average-price");
    expect(languageSwitchPath("/en/calculators/travel-budget-calculator", "ru")).toBe("/ru/calculators/travel-budget-calculator");
    expect(languageSwitchPath("/en/calculators/japan-annual-salary-calculator", "ru")).toBe("/ru/calculators/japan-annual-salary-calculator");
    expect(russian.calculators.vat?.description).toContain("Южной Корее");
    expect(russian.calculators.vat?.resultNote).toContain("НДС Южной Кореи");
    expect(russian.calculators["withholding-tax-3-3"]?.description).toContain("Южной Корее");
    expect(russian.calculators["annual-leave-allowance"]?.resultNote).toContain("корейском контексте");
    expect(russian.calculators["unemployment-benefit"]?.resultNote).toContain("Южной Кореи");
    expect(russian.calculators["minimum-wage"]?.resultNote).toContain("Южной Кореи");
    expect(russian.calculators["social-insurance"]?.resultNote).toContain("Южной Кореи");
    const vatMetadata = localizedMetadata("ru", "/calculators/vat", russian.calculators.vat!.title, russian.calculators.vat!.description, russian.calculators.vat!.keywords, supportedLocalesForCalculator("vat"));
    expect(vatMetadata.alternates?.canonical).toBe("https://www.woori.today/ru/calculators/vat");
    expect(vatMetadata.alternates?.languages?.ru).toBe("https://www.woori.today/ru/calculators/vat");
    expect(vatMetadata.alternates?.languages?.["x-default"]).toBe("https://www.woori.today/ko/calculators/vat");
    for (const value of [page.name, page.title, page.description, page.howTo, page.formula, page.example.question, page.example.answer, page.validation, page.resultNote]) {
      expect(value).toBeTruthy();
    }
    expect(page.title).not.toBe(english.title);
    expect(page.faqs.length).toBeGreaterThan(0);
    expect(Object.keys(page.fields)).toEqual(["principal", "rate", "years", "frequency"]);
    expect(page.related).toEqual([]);
    expect(localePath("ru", "/calculators/compound-interest")).toBe("/ru/calculators/compound-interest");
    expect(localizedMetadata("ru", "/calculators/compound-interest", page.title, page.description, page.keywords, supportedLocalesForCalculator("compound-interest")).alternates?.canonical).toBe("https://www.woori.today/ru/calculators/compound-interest");
  });

  it("validates every Russian batch page against source field, option, and result keys", () => {
    const russian = getDictionary("ru");
    const english = getDictionary("en");
    for (const slug of localizedIndexSlugs("ru")) {
      const page = russian.calculators[slug]!;
      const source = english.calculators[slug]!;
      expect(Object.keys(page.fields).sort()).toEqual(Object.keys(source.fields).sort());
      expect(Object.keys(page.options).sort()).toEqual(Object.keys(source.options).sort());
      for (const [key, choices] of Object.entries(source.options)) expect(Object.keys(page.options[key] ?? {}).sort()).toEqual(Object.keys(choices).sort());
      expect(Object.keys(page.resultLabels).sort()).toEqual(expect.arrayContaining(Object.keys(source.resultLabels).sort()));
      for (const [key, field] of Object.entries(page.fields)) {
        expect(field.label).toBeTruthy();
        expect(field.label).not.toBe(source.fields[key]?.label);
      }
      for (const [key, labels] of Object.entries(page.options)) for (const [option, label] of Object.entries(labels)) {
        expect(label).toBeTruthy();
        expect(label).not.toBe(source.options[key]?.[option]);
      }
      for (const [key, label] of Object.entries(page.resultLabels)) {
        expect(label).toBeTruthy();
        expect(label).not.toBe(source.resultLabels[key]);
      }
      for (const related of page.related) expect(russian.calculators[related]).toBeDefined();
      for (const value of [page.name, page.title, page.description, page.howTo, page.formula, page.example.question, page.example.answer, page.validation, page.resultNote]) expect(value.trim()).not.toBe("");
      expect(page.faqs.length).toBeGreaterThan(0);
    }
  });

  it("switches language to the same translated tool or a safe localized landing", () => {
    expect(languageSwitchPath("/ko/calculators/loan-interest", "es")).toBe("/es/calculators/loan-interest");
    expect(languageSwitchPath("/en/calculators/loan-interest", "ko")).toBe("/ko/calculators/loan-interest");
    expect(languageSwitchPath("/ja/calculators/area", "zh-tw")).toBe("/zh-tw/calculators/area");
    expect(languageSwitchPath("/ko/calculators/social-insurance", "hi")).toBe("/hi/calculators/social-insurance");
    expect(languageSwitchPath("/ko/privacy", "ja")).toBe("/ko/calculators");
    expect(languageSwitchPath("/zh", "ko")).toBe("/ko");
    expect(languageSwitchPath("/ko/calculators/fraction", "ja")).toBe("/ja/calculators/fraction");
    for (const slug of localizedCalculatorSlugs) for (const locale of locales) expect(languageSwitchPath(`/ko/calculators/${slug}`, locale)).toBe(`/${locale}/calculators/${slug}`);
  });

  it("provides complete translated UI and all first ten calculator pages in the 11 added locales", () => {
    const newLocales = locales.filter((locale) => !existingLocales.includes(locale as typeof existingLocales[number]));
    const commonKeys = Object.keys(getDictionary("en").common).sort();
    for (const locale of newLocales) {
      const dictionary = getDictionary(locale);
      expect(Object.keys(dictionary.common).sort()).toEqual(commonKeys);
      expect(dictionary.calculatorList.title).not.toBe(getDictionary("en").calculatorList.title);
      for (const slug of phaseOneTranslatedCalculatorSlugs) {
        const page = dictionary.calculators[slug]!;
        const english = getDictionary("en").calculators[slug]!;
        expect(page.title).toBeTruthy();
        expect(page.description).toBeTruthy();
        expect(page.name).toBeTruthy();
        expect(page.howTo).toBeTruthy();
        expect(page.formula).toBeTruthy();
        expect(page.example.question).toBeTruthy();
        expect(page.faqs.length).toBeGreaterThan(0);
        expect(Object.keys(page.fields).length).toBeGreaterThan(0);
        expect(page.name).not.toBe(english.name);
        expect(page.title).not.toBe(english.title);
        expect(page.description).not.toBe(english.description);
        expect(page.howTo).not.toBe(english.howTo);
        expect(page.formula).not.toBe(english.formula);
        expect(page.example.question).not.toBe(english.example.question);
        expect(page.example.answer).not.toBe(english.example.answer);
        for (const key of Object.keys(page.fields)) expect(page.fields[key]?.label).not.toBe(english.fields[key]?.label);
        for (const key of Object.keys(page.resultLabels)) {
          const sourceLabel = english.resultLabels[key];
          if (!sourceLabel || /^[A-Z0-9%/²]+$/.test(sourceLabel)) continue;
          expect(page.resultLabels[key]).not.toBe(sourceLabel);
        }
      }
    }
    expect(phaseOneTranslatedCalculatorSlugs).toHaveLength(10);
    expect(supportedLocalesForCalculator("compound-interest")).toEqual([...locales, "ru"]);
    expect(supportedLocalesForCalculator("median")).toEqual([...locales, "ru"]);
    expect(supportedLocalesForCalculator("fraction")).toEqual([...locales, "ru"]);
    expect(phaseTranslatedCalculatorSlugs).toHaveLength(169);
  });

  it("provides all Phase 2 calculator translations in every newly added locale", () => {
    const newLocales = locales.filter((locale) => !existingLocales.includes(locale as typeof existingLocales[number]));
    expect(phaseTwoTranslatedCalculatorSlugs).toEqual(["dday", "decimal-fraction", "deposit-interest", "discount", "dividend", "dsr", "dti", "fraction", "fuel-cost", "fuel-efficiency"]);
    for (const locale of newLocales) {
      const dictionary = getDictionary(locale);
      for (const slug of phaseTwoTranslatedCalculatorSlugs) {
        const page = dictionary.calculators[slug]!;
        const english = getDictionary("en").calculators[slug]!;
        expect(page.name).not.toBe(english.name);
        expect(page.title).not.toBe(english.title);
        expect(page.description).not.toBe(english.description);
        expect(page.howTo).not.toBe(english.howTo);
        expect(page.formula).not.toBe(english.formula);
        expect(page.example.question).not.toBe(english.example.question);
        expect(page.example.answer).not.toBe(english.example.answer);
        expect(page.faqs.length).toBeGreaterThan(0);
        expect(Object.keys(page.fields).length).toBeGreaterThan(0);
        expect(Object.keys(page.resultLabels).length).toBeGreaterThan(0);
        expect(page.validation).not.toBe(english.validation);
        expect(page.resultNote).not.toBe(english.resultNote);
        expect(page.keywords?.some((keyword) => english.keywords?.includes(keyword))).toBe(false);
        for (const [key, field] of Object.entries(page.fields)) {
          expect(field.label).toBeTruthy();
          expect(field.label).not.toBe(english.fields[key]?.label);
          if (english.fields[key]?.placeholder) expect(field.placeholder).not.toBe(english.fields[key]?.placeholder);
        }
        for (const [field, values] of Object.entries(page.options)) {
          for (const [value, label] of Object.entries(values)) {
            expect(label).not.toBe(english.options[field]?.[value]);
            expect(label).not.toBe("Option");
          }
        }
        for (const [key, label] of Object.entries(page.resultLabels)) {
          if (english.resultLabels[key] && !/^[A-Z0-9%/²]+$/.test(english.resultLabels[key]!)) expect(label).not.toBe(english.resultLabels[key]);
        }
        for (let index = 0; index < page.faqs.length; index += 1) {
          expect(page.faqs[index]?.question).not.toBe(english.faqs[index]?.question);
          expect(page.faqs[index]?.answer).not.toBe(english.faqs[index]?.answer);
        }
      }
    }
    expect(phaseThreeTranslatedCalculatorSlugs).toHaveLength(39);
    expect(phaseFourTranslatedCalculatorSlugs).toHaveLength(5);
    expect(phaseTranslatedCalculatorSlugs).toHaveLength(169);
  });

  it("provides localized content for every published calculator in all fifteen locales", () => {
    const englishDictionary = getDictionary("en");
    const commonKeys = Object.keys(englishDictionary.common).sort();
    const misses: string[] = [];
    for (const locale of locales.filter((value) => !existingLocales.includes(value as typeof existingLocales[number]))) {
      const dictionary = getDictionary(locale);
      expect(Object.keys(dictionary.common).sort()).toEqual(commonKeys);
      for (const slug of localizedCalculatorSlugs) {
        const page = dictionary.calculators[slug];
        const english = englishDictionary.calculators[slug];
        if (!page) {
          misses.push(`${slug}:${locale}:content`);
          continue;
        }
        if (!supportedLocalesForCalculator(slug).includes(locale)) misses.push(`${slug}:${locale}:supportedLocales`);
        for (const field of ["name", "title", "description", "howTo", "formula", "validation", "resultNote"] as const) {
          if (!page[field]?.trim() || page[field] === english?.[field]) misses.push(`${slug}:${locale}:${field}`);
        }
        if (!page.example.question.trim() || page.example.question === english?.example.question) misses.push(`${slug}:${locale}:example.question`);
        if (!page.example.answer.trim() || page.example.answer === english?.example.answer) misses.push(`${slug}:${locale}:example.answer`);
        if (page.faqs.length === 0) misses.push(`${slug}:${locale}:faqs`);
        for (let index = 0; index < page.faqs.length; index += 1) {
          if (page.faqs[index]?.question === english?.faqs[index]?.question || page.faqs[index]?.answer === english?.faqs[index]?.answer) misses.push(`${slug}:${locale}:faq[${index}]`);
        }
        const technicalUnits = new Set(["KRW", "KRW/L", "KRW/km", "KRW/min", "KRW / unit", "%", "km", "km/L", "L", "°C", "°F", "mm", "cm", "kg", "g", "mg", "oz", "lb", "m", "mL", "mi", "ft", "yd", "kcal", "W", "kWh", "min", "円", "時間", "yen", "yenes", "ienes", "Yen", "yens", "yên", "เยน", "日元", "日圓", "येन", "hours", "horas", "Stunden", "heures", "giờ", "jam", "ชั่วโมง", "小时", "小時", "ore", "uur", "घंटे"]);
        for (const [key, field] of Object.entries(page.fields)) {
          if (!field.label.trim() || field.label === english?.fields[key]?.label) misses.push(`${slug}:${locale}:field.${key}.label`);
          if (field.placeholder && field.placeholder === english?.fields[key]?.placeholder && !/^\d+(?::\d+)+$/.test(field.placeholder)) misses.push(`${slug}:${locale}:field.${key}.placeholder`);
          if (field.unit && !technicalUnits.has(field.unit) && !/^[A-Z]{3}$/.test(field.unit) && field.unit === english?.fields[key]?.unit) misses.push(`${slug}:${locale}:field.${key}.unit`);
        }
        for (const [fieldKey, options] of Object.entries(page.options)) for (const [optionKey, label] of Object.entries(options)) {
          const sharedUnitNames = new Set(["Celsius (°C)", "Fahrenheit (°F)", "Yards (yd)", "Feet (ft)"]);
          if (!label.trim() || (label === english?.options[fieldKey]?.[optionKey] && !sharedUnitNames.has(label) && label !== "cm" && label !== "m")) misses.push(`${slug}:${locale}:option.${fieldKey}.${optionKey}`);
        }
        for (const [key, label] of Object.entries(page.resultLabels)) if (!label.trim() || (label === english?.resultLabels[key] && !/^[A-Z0-9%/²]+$/.test(label))) misses.push(`${slug}:${locale}:result.${key}`);
      }
    }
    expect(misses, `Missing localized content across all calculators:\n${misses.join("\n")}`).toEqual([]);
    expect(localizedCalculatorSlugs).toHaveLength(169);
    expect(locales).toHaveLength(15);
    expect(localizedCalculatorSlugs.flatMap((slug) => locales.map((locale) => `${slug}:${locale}`))).toHaveLength(localizedCalculatorSlugs.length * locales.length);
  });

  it("uses route locales for canonicals and BCP 47 locale keys for alternates", () => {
    for (const slug of localizedCalculatorSlugs) {
      const content = getDictionary("pt-br").calculators[slug]!;
      const meta = localizedMetadata("pt-br", `/calculators/${slug}`, content.title, content.description, content.keywords, locales);
      expect(meta.alternates?.canonical).toBe(`https://www.woori.today/pt-br/calculators/${slug}`);
      expect(meta.alternates?.languages?.["pt-BR"]).toBe(`https://www.woori.today/pt-br/calculators/${slug}`);
      expect(meta.alternates?.languages?.["zh-TW"]).toBe(`https://www.woori.today/zh-tw/calculators/${slug}`);
      expect(meta.alternates?.languages?.["x-default"]).toBe(`https://www.woori.today/ko/calculators/${slug}`);
    }
  });

  it("builds localized canonical URLs and all locale alternates for the five Japan calculators", () => {
    for (const slug of phaseFourTranslatedCalculatorSlugs) for (const locale of locales) {
      const content = getDictionary(locale).calculators[slug]!;
      const metadata = localizedMetadata(locale, `/calculators/${slug}`, content.title, content.description, content.keywords, locales);
      expect(metadata.alternates?.canonical).toBe(`https://www.woori.today${localePath(locale, `/calculators/${slug}`)}`);
      const languages = metadata.alternates?.languages as Record<string, string>;
      expect(Object.keys(languages)).toHaveLength(16);
      expect(languages["pt-BR"]).toBe(`https://www.woori.today/pt-br/calculators/${slug}`);
      expect(languages["zh-TW"]).toBe(`https://www.woori.today/zh-tw/calculators/${slug}`);
      expect(languages["x-default"]).toBe(`https://www.woori.today/ko/calculators/${slug}`);
    }
  });

  it("keeps all five Japan calculator surfaces localized in every locale", () => {
    const japaneseNames = ["消費税計算機", "年収手取り計算機", "月給手取り計算機", "残業代計算機", "深夜・休日手当計算機"];
    const koNames = ["일본 소비세 계산기", "일본 연봉 실수령액 계산기", "일본 월급 실수령액 계산기", "일본 잔업수당 계산기", "일본 심야·휴일수당 계산기"];
    const korean = getDictionary("ko");
    expect(korean.common.calculate).toBe("계산하기");
    expect(korean.common.reset).toBe("초기화");
    phaseFourTranslatedCalculatorSlugs.forEach((slug, index) => {
      const page = korean.calculators[slug]!;
      expect(page.name).toBe(koNames[index]);
      expect(page.title).not.toContain(japaneseNames[index]!);
      expect(page.description).not.toMatch(/[\u3040-\u30ff\u4e00-\u9faf]/);
      expect(page.howTo).not.toMatch(/[\u3040-\u30ff]/);
      expect(page.formula).not.toMatch(/[\u3040-\u30ff]/);
      expect(page.example.question).not.toMatch(/[\u3040-\u30ff]/);
      expect([...page.faqs.map(({ question, answer }) => question + answer)].join(" ")).not.toMatch(/[\u3040-\u30ff]/);
      expect(page.name).not.toMatch(/Calculate|Reset/);
    });
    expect(korean.calculators["japan-overtime-pay-calculator"]!.name).toContain("잔업수당");

    for (const locale of locales) {
      const dictionary = getDictionary(locale);
      expect(dictionary.common.calculate.trim()).toBeTruthy();
      expect(dictionary.common.reset.trim()).toBeTruthy();
      for (const slug of phaseFourTranslatedCalculatorSlugs) {
        const page = dictionary.calculators[slug]!;
        expect(page.name.trim()).toBeTruthy();
        expect(page.shortName.trim()).toBeTruthy();
        expect(page.title).toContain(page.name);
        expect(page.description.trim()).toBeTruthy();
        expect(page.howTo.trim()).toBeTruthy();
        expect(page.fields).not.toEqual({});
        expect(page.example.question.trim()).toBeTruthy();
        expect(page.example.answer.trim()).toBeTruthy();
        expect(page.faqs.length).toBeGreaterThan(0);
        expect(page.related.length).toBeGreaterThan(0);
        if (locale === "ja") expect(page.name).toBe(japaneseNames[phaseFourTranslatedCalculatorSlugs.indexOf(slug)]);
        if (locale === "en") expect(page.name).toMatch(/Japan/);
        if (locale === "ko") {
          expect(page.name).not.toMatch(/[\u3040-\u30ff]/);
          expect(page.description + page.howTo + page.formula + page.validation).not.toMatch(/\bCalculate\b|\bReset\b/);
        } else {
          expect(page.name).not.toMatch(/[\uAC00-\uD7AF]/);
        }
      }
    }
  });

  it("reports every published calculator with locale support metadata", () => {
    const missing = localizedCalculatorSlugs.flatMap((slug) => locales
      .filter((locale) => !calculatorSupportsLocale(slug, locale))
      .map((locale) => `${slug}:${locale}`));
    expect(missing, `Missing supported calculator locales: ${missing.join(", ")}`).toEqual([]);
  });

  it("provides complete localized content and unique search metadata for all translated calculators", () => {
    for (const locale of ["en", "ja", "zh"] as const) {
      const dictionary = getDictionary(locale);
      const titles = localizedCalculatorSlugs.map((slug) => dictionary.calculators[slug]!.title);
      const descriptions = localizedCalculatorSlugs.map((slug) => dictionary.calculators[slug]!.description);
      expect(new Set(titles).size).toBe(titles.length);
      expect(new Set(descriptions).size).toBe(descriptions.length);
      expect(dictionary.calculators).toHaveProperty("percentage");
      for (const slug of localizedCalculatorSlugs) {
        const page = dictionary.calculators[slug]!;
        expect(page.name.length).toBeGreaterThan(0);
        expect(page.title.length).toBeGreaterThan(0);
        expect(page.description.length).toBeGreaterThan(0);
        expect(page.keywords?.length).toBeGreaterThan(0);
        expect(page.howTo.length).toBeGreaterThan(0);
        expect(page.formula.length).toBeGreaterThan(0);
        expect(page.example.question.length).toBeGreaterThan(0);
        expect(page.faqs.length).toBeGreaterThan(0);
        expect(Object.keys(page.resultLabels).length).toBeGreaterThan(0);
        expect(Object.keys(page.fields).length).toBeGreaterThan(0);
        const visibleCopy = [page.name, page.title, page.description, page.howTo, page.formula, page.example.question, page.example.answer, page.validation, page.resultNote, ...page.keywords!, ...page.faqs.flatMap(({ question, answer }) => [question, answer]), ...Object.values(page.fields).map(({ label }) => label), ...Object.values(page.options).flatMap(Object.values), ...Object.values(page.resultLabels)];
        expect(visibleCopy.some((value) => /[\uAC00-\uD7AF]/.test(value))).toBe(false);
        expect(page.related).not.toContain(slug);
        for (const related of page.related) expect(localizedCalculatorSlugs).toContain(related);
      }
    }
  });

  it.each(localizedCalculatorSlugs.flatMap((slug) => (["en", "ja", "zh"] as const).map((locale) => [slug, locale] as const)))("has locale-specific canonical and hreflang for %s (%s)", (slug, locale) => {
    const page = getDictionary(locale).calculators[slug]!;
    const metadata = localizedMetadata(locale, `/calculators/${slug}`, page.title, page.description, page.keywords);
    expect(metadata.alternates?.canonical).toBe(`https://www.woori.today/${locale}/calculators/${slug}`);
    expect(metadata.alternates?.languages).toMatchObject({
      ko: `https://www.woori.today/ko/calculators/${slug}`,
      en: `https://www.woori.today/en/calculators/${slug}`,
      ja: `https://www.woori.today/ja/calculators/${slug}`,
      zh: `https://www.woori.today/zh/calculators/${slug}`,
      "x-default": `https://www.woori.today/ko/calculators/${slug}`,
    });
    expect(metadata.openGraph?.url).toBe(metadata.alternates?.canonical);
  });

  it("canonicalizes Korean calculator pages under /ko with a Korean x-default", () => {
    const metadata = localizedMetadata("ko", "/calculators/loan-interest", "Title", "Description");
    expect(metadata.alternates?.canonical).toBe("https://www.woori.today/ko/calculators/loan-interest");
    expect(metadata.alternates?.languages).toMatchObject({
      ko: "https://www.woori.today/ko/calculators/loan-interest",
      "x-default": "https://www.woori.today/ko/calculators/loan-interest",
    });
    expect(metadata.openGraph?.url).toBe(metadata.alternates?.canonical);
    expect(metadata.openGraph?.locale).toBe("ko_KR");
  });

  it("searches with translated names, slugs, and locale-specific keywords", () => {
    expect(matchesCalculatorSearch({ name: "Simple Interest Calculator", slug: "simple-interest", keywords: ["interest calculator"] }, "INTEREST")).toBe(true);
    expect(matchesCalculatorSearch({ name: "複利計算", slug: "compound-interest", keywords: ["利息"] }, "利息")).toBe(true);
    expect(matchesCalculatorSearch({ name: "贷款利息计算器", slug: "loan-interest", keywords: ["贷款"] }, "贷款")).toBe(true);
    expect(matchesCalculatorSearch({ name: "BMI Calculator", slug: "bmi", keywords: ["body mass index"] }, "body mass")).toBe(true);
    expect(matchesCalculatorSearch({ name: "Ratio Calculator", slug: "ratio" }, "unrelated")).toBe(false);
  });

  it("provides complete natural fraction content, calculator labels, and SEO metadata in all locales", () => {
    for (const locale of ["en", "ja", "zh"] as const) {
      const page = getDictionary(locale).calculators.fraction!;
      expect(page.name).toMatch(locale === "en" ? /Fraction Calculator/ : locale === "ja" ? /分数/ : /分数/);
      expect(page.title).toContain(page.name);
      expect(page.description.length).toBeGreaterThan(20);
      expect(page.howTo).toContain(page.description);
      expect(page.faqs.length).toBeGreaterThanOrEqual(3);
      expect(Object.keys(page.fields)).toEqual(expect.arrayContaining(["aNumerator", "aDenominator", "operation", "bNumerator", "bDenominator"]));
      expect(Object.keys(page.options.operation ?? {})).toEqual(["add", "subtract", "multiply", "divide"]);
      expect(Object.keys(page.resultLabels).filter((label) => label.startsWith("__result_")).sort()).toEqual(["__result_0", "__result_1", "__result_2"]);
      expect(page.related).toEqual(expect.arrayContaining(["percentage", "ratio"]));
      const metadata = localizedMetadata(locale, "/calculators/fraction", page.title, page.description, page.keywords);
      expect(metadata.alternates?.canonical).toBe(`https://www.woori.today/${locale}/calculators/fraction`);
      expect(metadata.alternates?.languages).toMatchObject({
        ko: "https://www.woori.today/ko/calculators/fraction",
        en: "https://www.woori.today/en/calculators/fraction",
        ja: "https://www.woori.today/ja/calculators/fraction",
        zh: "https://www.woori.today/zh/calculators/fraction",
        "x-default": "https://www.woori.today/ko/calculators/fraction",
      });
      expect(metadata.openGraph?.url).toBe(metadata.alternates?.canonical);
    }
  });

  it("provides complete standard deviation content and locale SEO metadata", () => {
    for (const locale of ["en", "ja", "zh"] as const) {
      const page = getDictionary(locale).calculators["standard-deviation"]!;
      expect(page.name).toBe(locale === "en" ? "Standard Deviation Calculator" : locale === "ja" ? "標準偏差計算機" : "标准差计算器");
      expect(page.title).toBe(locale === "en"
        ? "Standard Deviation Calculator | Mean, Variance and Standard Deviation"
        : locale === "ja"
          ? "標準偏差計算機 | 平均・分散・標準偏差を計算"
          : "标准差计算器 | 平均值、方差和标准差计算");
      expect(page.title).toContain(page.name);
      expect(page.description.length).toBeGreaterThan(20);
      expect(page.keywords).toContain(locale === "zh" ? "标准差计算器" : locale === "ja" ? "標準偏差 計算" : "standard deviation calculator");
      expect(page.fields.numbers?.label).toBeTruthy();
      expect(page.fields.mode?.label).toBeTruthy();
      expect(page.options.mode).toMatchObject({ population: expect.any(String), sample: expect.any(String) });
      expect(page.resultLabels).toMatchObject({ "__result_0": expect.any(String), "__result_1": expect.any(String), "__result_2": expect.any(String), "__result_3": expect.any(String) });
      expect(page.faqs.length).toBeGreaterThanOrEqual(3);
      expect(page.related).toContain("average");
      const metadata = localizedMetadata(locale, "/calculators/standard-deviation", page.title, page.description, page.keywords);
      expect(metadata.alternates?.canonical).toBe(`https://www.woori.today/${locale}/calculators/standard-deviation`);
      expect(metadata.alternates?.languages).toMatchObject({
        ko: "https://www.woori.today/ko/calculators/standard-deviation",
        en: "https://www.woori.today/en/calculators/standard-deviation",
        ja: "https://www.woori.today/ja/calculators/standard-deviation",
        zh: "https://www.woori.today/zh/calculators/standard-deviation",
        "x-default": "https://www.woori.today/ko/calculators/standard-deviation",
      });
      expect(metadata.openGraph?.url).toBe(metadata.alternates?.canonical);
      expect(metadata.openGraph?.title).toBe(page.title);
      expect(metadata.keywords).toEqual(page.keywords);
    }
  });

  it("provides complete median content and locale SEO metadata", () => {
    for (const locale of ["en", "ja", "zh"] as const) {
      const page = getDictionary(locale).calculators.median!;
      expect(page.name).toBe(locale === "en" ? "Median Calculator" : locale === "ja" ? "中央値計算機" : "中位数计算器");
      expect(page.title).toBe(locale === "en"
        ? "Median Calculator | Calculate the Median of a Number Set"
        : locale === "ja"
          ? "中央値計算機 | 数値データの中央値を計算"
          : "中位数计算器 | 计算一组数字的中位数");
      expect(page.shortName.length).toBeGreaterThan(0);
      expect(page.fields.numbers?.label).toBeTruthy();
      expect(page.resultLabels).toMatchObject({ "__result_0": expect.any(String), "__result_1": expect.any(String), "__result_2": expect.any(String) });
      expect(page.faqs.length).toBeGreaterThanOrEqual(2);
      expect(page.related).toContain("average");
      const metadata = localizedMetadata(locale, "/calculators/median", page.title, page.description, page.keywords);
      expect(metadata.alternates?.canonical).toBe(`https://www.woori.today/${locale}/calculators/median`);
      expect(metadata.alternates?.languages).toMatchObject({
        ko: "https://www.woori.today/ko/calculators/median",
        en: "https://www.woori.today/en/calculators/median",
        ja: "https://www.woori.today/ja/calculators/median",
        zh: "https://www.woori.today/zh/calculators/median",
        "x-default": "https://www.woori.today/ko/calculators/median",
      });
      expect(metadata.openGraph?.url).toBe(metadata.alternates?.canonical);
    }
  });

  it.each(localizedCalculatorSlugs)("provides search keywords and only localized related links for %s", (slug) => {
    for (const locale of ["en", "ja", "zh"] as const) {
      const page = getDictionary(locale).calculators[slug]!;
      expect(page.keywords?.length).toBeGreaterThan(0);
      expect(new Set(page.related).size).toBe(page.related.length);
      for (const related of page.related) expect(getDictionary(locale).calculators[related]).toBeDefined();
    }
  });

  it("localizes all country calculator content, metadata, form controls and related names in every locale", () => {
    for (const slug of phaseFiveTranslatedCalculatorSlugs) {
      for (const locale of locales) {
        const content = getDictionary(locale).calculators[slug]!;
        expect(content.name.trim()).not.toBe("");
        expect(content.title.trim()).not.toBe("");
        expect(content.description.trim().length).toBeGreaterThan(20);
        expect(content.howTo.trim()).not.toBe("");
        expect(content.fields.amount?.label ?? content.fields.salary?.label ?? content.fields.income?.label ?? content.fields.monthlyDeposit?.label).toBeTruthy();
        expect(Object.values(content.resultLabels ?? {}).every(Boolean)).toBe(true);
        expect(content.example.question.trim()).not.toBe("");
        expect(content.faqs.length).toBeGreaterThanOrEqual(2);
        expect(content.related.length).toBeGreaterThan(0);
        for (const related of content.related) expect(getDictionary(locale).calculators[related]).toBeDefined();
        const metadata = localizedMetadata(locale, `/calculators/${slug}`, content.title, content.description, content.keywords);
        expect(metadata.alternates?.canonical).toBe(`https://www.woori.today/${locale}/calculators/${slug}`);
      }
    }
  });

  it("uses locale specific canonical, hreflang, html and Open Graph values", () => {
    for (const locale of ["en", "ja", "zh"] as const) {
      const metadata = localizedMetadata(locale, "/calculators/percentage", "Title", "Description");
      expect(metadata.alternates?.canonical).toBe(`https://www.woori.today/${locale}/calculators/percentage`);
      expect(metadata.alternates?.languages).toMatchObject({
        ko: "https://www.woori.today/ko/calculators/percentage",
        en: "https://www.woori.today/en/calculators/percentage",
        ja: "https://www.woori.today/ja/calculators/percentage",
        zh: "https://www.woori.today/zh/calculators/percentage",
        "x-default": "https://www.woori.today/ko/calculators/percentage",
      });
      expect(localeConfig[locale].ogLocale).toMatch(/^(en_US|ja_JP|zh_CN)$/);
    }
    expect(localeConfig.zh.htmlLang).toBe("zh-CN");
  });
});

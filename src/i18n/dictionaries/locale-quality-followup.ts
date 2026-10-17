import type { Locale } from "@/i18n/config";
import type { LocaleDictionary, LocalizedCalculatorContent } from "@/i18n/dictionaries/types";

type LocaleFollowup = Partial<Record<string, { description?: string; exampleNote?: string }>>;

export const localeContentFollowupTargets = {
  en: ["percentage", "weighted-average", "median", "probability", "unit-price", "area", "utility-bill"],
  ja: ["workdays", "area"],
  zh: ["median", "age", "workdays", "area"],
  th: ["average", "bmi"],
  "zh-tw": ["average", "cagr", "age", "bmi", "calorie-per-serving"],
} as const satisfies Partial<Record<Locale, readonly string[]>>;

const followups: Partial<Record<Locale, LocaleFollowup>> = {
  en: {
    percentage: { exampleNote: "That 30 is the percentage amount itself; choose the increase mode when you need the revised total." },
    "weighted-average": { exampleNote: "The larger weight pulls the result toward 100; scaling every weight by the same factor leaves the average unchanged." },
    median: { exampleNote: "Sort the observations first: the median is the middle value, or the mean of the middle pair when there are an even number of values." },
    probability: { exampleNote: "This fraction describes the chance only when each entered outcome is equally likely; unequal chances need their own probability model." },
    "unit-price": { exampleNote: "For a fair shelf comparison, convert both packages to the same unit; this result does not account for quality or usable waste." },
    area: { exampleNote: "One Korean pyeong is about 3.3058 square metres; rounding changes the display, not the underlying conversion." },
    "utility-bill": { exampleNote: "Treat this as a usage-based estimate: tariff tiers, fixed charges, taxes, and provider adjustments can change the bill." },
  },
  ja: {
    workdays: { exampleNote: "開始日と終了日の扱いは選択した設定に従います。会社独自の休業日や振替休日は、必要に応じて別途差し引いてください。" },
    area: { exampleNote: "坪は韓国で使われる面積単位で、1坪は約3.3058㎡です。換算後の小数は表示桁に合わせて丸められます。" },
  },
  zh: {
    median: { exampleNote: "先将数据排序再取中间位置；数据个数为偶数时，结果是中间两个数的平均值，并非全部数据的算术平均。" },
    age: { description: "计算时会检查基准日是否已过生日，再扣除尚未满的一年；闰年出生日期按本工具说明处理。" },
    workdays: { exampleNote: "结果取决于所选日期边界和周末计数方式；单位自定的休息日或调休安排需要另行核对。" },
    area: { exampleNote: "坪是韩国常用的面积单位，1坪约等于3.3058平方米；正式房产资料通常仍以平方米为准。" },
  },
  th: {
    average: { description: "ค่านี้ได้จากผลรวมของข้อมูลหารด้วยจำนวนรายการ โดยให้น้ำหนักทุกค่าเท่ากัน หากแต่ละรายการมีความสำคัญไม่เท่ากัน ควรใช้ค่าเฉลี่ยถ่วงน้ำหนักแทน" },
    bmi: { description: "ดัชนีนี้เปรียบเทียบน้ำหนักกับส่วนสูงเท่านั้น ไม่ได้บอกองค์ประกอบของร่างกายหรือใช้แทนการประเมินและวินิจฉัยสุขภาพ" },
  },
  "zh-tw": {
    average: { description: "此平均值將每筆資料視為同等重要；若各項目有不同權重，應改用加權平均，避免把兩種計算方式混為一談。" },
    cagr: { description: "CAGR 將起點與終點換算為等效的年複合成長率，不呈現期間內的漲跌，也不等於逐年報酬率的算術平均。" },
    age: { description: "結果依參考日當天是否已過生日計算完整歲數；更改參考日期若跨過生日，年齡就可能相差一歲。" },
    bmi: { description: "BMI 只呈現體重與身高的比例，無法反映肌肉量或個人健康狀況，也不能取代醫療評估或診斷。" },
    "calorie-per-serving": { description: "每份熱量以食譜總熱量除以輸入份數估算；實際攝取量仍會受到分量和各食材營養標示影響。" },
  },
};

export function improveLocalizedQualityContent(locale: Locale, content: LocaleDictionary["calculators"]): LocaleDictionary["calculators"] {
  const additions = followups[locale];
  if (!additions) return content;
  return Object.fromEntries(Object.entries(content).map(([slug, page]) => {
    const addition = additions[slug];
    if (!page || !addition) return [slug, page];
    const updated: LocalizedCalculatorContent = {
      ...page,
      ...(addition.description ? { description: `${page.description} ${addition.description}` } : {}),
      ...(addition.exampleNote ? { example: { ...page.example, answer: `${page.example.answer} ${addition.exampleNote}` } } : {}),
    };
    return [slug, updated];
  })) as LocaleDictionary["calculators"];
}

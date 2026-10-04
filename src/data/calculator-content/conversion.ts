import { createCalculatorPage } from "@/data/calculator-content/create-page";
import { calculateUnitConversion } from "@/calculators/conversion/convert";
import type { CalculatorPageDefinition } from "@/types/calculator-page";

const units = [
  { label: "밀리미터 (mm)", value: "mm" }, { label: "센티미터 (cm)", value: "cm" }, { label: "미터 (m)", value: "m" }, { label: "킬로미터 (km)", value: "km" },
  { label: "인치 (in)", value: "inch" }, { label: "피트 (ft)", value: "ft" }, { label: "야드 (yd)", value: "yard" }, { label: "마일 (mi)", value: "mile" },
];

export const conversionCalculatorPages: readonly CalculatorPageDefinition[] = [
  createCalculatorPage({
    slug: "unit-converter", name: "단위 변환 계산기", shortName: "단위 변환", category: "math", description: "길이·무게·부피·온도 단위를 선택해 빠르게 변환합니다.", title: "단위 변환 계산기: 길이·무게·부피·온도", keywords: ["단위 변환 계산기", "길이 변환", "무게 단위 변환", "섭씨 화씨 변환"], relatedCalculatorIds: ["area", "unit-price", "ratio"],
    fields: [
      { name: "category", label: "변환 종류", type: "select", defaultValue: "length", options: [{ label: "길이", value: "length" }, { label: "무게", value: "weight" }, { label: "부피", value: "volume" }, { label: "온도", value: "temperature" }] },
      { name: "value", label: "변환할 값", type: "number", step: 0.01 },
      { name: "fromUnit", label: "변환 전 단위", type: "select", defaultValue: "m", options: units },
      { name: "toUnit", label: "변환 후 단위", type: "select", defaultValue: "km", options: units },
    ], calculate: calculateUnitConversion,
    howTo: "길이·무게·부피·온도 중 변환 종류를 고른 다음 값과 변환 전후 단위를 선택하세요. 종류를 바꾸면 해당 종류의 단위 선택지가 바뀝니다.", formula: "길이·무게·부피는 기준 단위로 변환한 뒤 목표 단위로 나눕니다. 온도는 섭씨와 화씨의 별도 선형 공식으로 변환합니다.", example: { question: "1마일은 몇 km인가요?", answer: "1마일은 1.609344km입니다." },
    faqs: [{ question: "지원하는 단위는 무엇인가요?", answer: "길이(mm, cm, m, km, inch, ft, yard, mile), 무게(mg, g, kg, oz, lb), 부피(mL, L), 온도(°C, °F)를 지원합니다." }, { question: "온도 변환도 단순히 비율로 계산하나요?", answer: "아닙니다. 섭씨와 화씨는 기준점과 간격이 달라 별도 공식을 사용합니다." }],
  }),
];

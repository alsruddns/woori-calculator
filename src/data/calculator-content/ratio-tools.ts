import { calculateAspectRatio, calculateProportion, calculateScaleRatio } from "@/calculators/math/ratio-tools";
import { calculateExpandedRatio } from "@/calculators/math/calculate";
import { createCalculatorPage } from "@/data/calculator-content/create-page";
import type { CalculatorField, CalculatorPageDefinition } from "@/types/calculator-page";

const positive = (name: string, label: string, defaultValue: string, extra: Partial<CalculatorField> = {}): CalculatorField => ({ name, label, type: "number", min: 0.000001, max: 100_000, step: 0.000001, defaultValue, ...extra });
const parts = (mode: string): CalculatorField => ({ name: "parts", label: "비율 값 (콜론으로 구분)", type: "textarea", defaultValue: "12:18", placeholder: "예: 2:3:5", showWhen: { field: "mode", value: mode } });
const proportionFields = (inHub: boolean): CalculatorField[] => {
  const mode = inHub ? { showWhen: { field: "mode", value: "proportion" } } : {};
  return [
    positive("a", "첫 번째 비율 값", "2", mode),
    positive("b", "두 번째 비율 값", "5", mode),
    { name: "unknown", label: "찾을 값의 위치", type: "select", defaultValue: "c", options: [{ label: "두 번째 비율의 첫 번째 값 (x : d)", value: "c" }, { label: "두 번째 비율의 두 번째 값 (c : x)", value: "d" }], ...mode },
    positive("c", "두 번째 비율의 알려진 첫 번째 값", "2", inHub ? { showWhenAll: [{ field: "mode", value: "proportion" }, { field: "unknown", value: "d" }] } : { showWhen: { field: "unknown", value: "d" } }),
    positive("d", "두 번째 비율의 알려진 두 번째 값", "20", inHub ? { showWhenAll: [{ field: "mode", value: "proportion" }, { field: "unknown", value: "c" }] } : { showWhen: { field: "unknown", value: "c" } }),
  ];
};

export const ratioCalculatorPage = createCalculatorPage({
  slug: "ratio", name: "비율 계산기", shortName: "비율", category: "math",
  title: "비율 계산기 - 비율 간소화·비례식·비율 나누기",
  description: "비율을 간단히 줄이고 비례식을 풀며, 전체를 비율대로 나누거나 비율을 퍼센트로 변환하고 비교할 수 있는 무료 비율 계산기입니다.",
  keywords: ["비율 계산기", "비율 간소화", "비례식", "비율 나누기", "비율 퍼센트 변환", "비율 비교", "화면 비율", "축척"],
  relatedCalculatorIds: ["percentage", "change-rate", "average", "fraction", "unit-converter", "discount", "margin", "proportion", "aspect-ratio", "scale-ratio"],
  fields: [
    { name: "mode", label: "계산 방식", type: "select", defaultValue: "simplify", options: [
      { label: "비율 간소화", value: "simplify" }, { label: "값 찾기", value: "find" }, { label: "전체 나누기", value: "split" },
      { label: "비례식", value: "proportion" }, { label: "비율 → 퍼센트", value: "to-percentage" },
      { label: "퍼센트 → 비율", value: "from-percentage" }, { label: "비율 비교", value: "compare" },
    ] },
    ...["simplify", "find", "split", "to-percentage"].map(parts),
    { name: "knownSide", label: "알려진 값의 위치", type: "select", defaultValue: "first", options: [{ label: "첫 번째 값", value: "first" }, { label: "두 번째 값", value: "second" }], showWhen: { field: "mode", value: "find" } },
    positive("knownValue", "알려진 값", "40", { min: 0, max: 1_000_000_000_000, showWhen: { field: "mode", value: "find" } }),
    positive("total", "나눌 전체 값", "100", { min: 0, max: 1_000_000_000_000, showWhen: { field: "mode", value: "split" } }),
    ...proportionFields(true),
    { name: "percentages", label: "퍼센트 값 (콜론으로 구분)", type: "textarea", defaultValue: "25:75", placeholder: "예: 20:30:50", showWhen: { field: "mode", value: "from-percentage" } },
    { name: "firstRatio", label: "비교할 첫 번째 비율", type: "textarea", defaultValue: "2:3", placeholder: "예: 2:3", showWhen: { field: "mode", value: "compare" } },
    { name: "secondRatio", label: "비교할 두 번째 비율", type: "textarea", defaultValue: "4:5", placeholder: "예: 4:5", showWhen: { field: "mode", value: "compare" } },
  ],
  calculate: calculateExpandedRatio,
  howTo: "계산 방식을 선택하고 비율을 2:3 또는 2:3:5처럼 콜론으로 구분해 입력하세요. 요리 재료, 비용·인원 배분, 학교 수학의 비례식, 업무 데이터 비교에 활용할 수 있습니다. 화면 크기는 화면 비율 계산기, 도면 길이는 축척 계산기에서 계산하세요.",
  formula: "비율 간소화 = 각 값을 최대공약수로 나누기 · 비례식 x = 교차 곱으로 구하기 · 전체 배분 = 전체 × 각 비율 값 ÷ 비율 합계 · 비율의 퍼센트 = 각 값 ÷ 합계 × 100",
  example: { question: "120을 2:3으로 나누면?", answer: "비율 합계는 5이므로 첫 번째 몫은 120×2÷5=48, 두 번째 몫은 120×3÷5=72입니다." },
  faqs: [
    { question: "비율은 어떻게 간단히 하나요?", answer: "두 값의 최대공약수로 각각 나눕니다. 12:18은 최대공약수 6으로 나누어 2:3입니다." },
    { question: "2:3 비율로 100을 나누면 얼마인가요?", answer: "합계 5를 기준으로 100×2÷5=40, 100×3÷5=60입니다." },
    { question: "비율을 퍼센트로 바꾸는 방법은?", answer: "각 값을 비율 합계로 나눈 뒤 100을 곱합니다. 2:3은 40%와 60%입니다." },
    { question: "16:9 화면 비율은 어떻게 계산하나요?", answer: "가로와 세로 길이를 최대공약수로 나눕니다. 1920×1080은 16:9입니다." },
    { question: "비례식에서 x는 어떻게 구하나요?", answer: "a:b=x:d이면 x=a×d÷b입니다. 2:5=x:20에서는 x=8입니다." },
  ], updatedAt: "2026-10-15",
});

export const ratioToolPages: readonly CalculatorPageDefinition[] = [
  createCalculatorPage({ slug: "proportion", name: "비례식 계산기", shortName: "비례식", category: "math", title: "비례식 계산기 - x 값과 교차 곱 계산", description: "a:b=x:d 또는 a:b=c:x에서 모르는 값을 구하고 계산된 비례식을 확인하세요. 학교 수학과 크기 조절에 유용합니다.", keywords: ["비례식 계산기", "x 값 찾기", "교차 곱", "비례값 계산"], relatedCalculatorIds: ["ratio", "percentage", "fraction", "aspect-ratio"], fields: proportionFields(false), calculate: calculateProportion, howTo: "첫 비율 두 값과 두 번째 비율의 알려진 값을 입력한 뒤, 모르는 값이 앞에 있는지 뒤에 있는지 선택하세요. 모든 비율 값은 0보다 커야 합니다.", formula: "a:b=x:d이면 x=a×d÷b · a:b=c:x이면 x=b×c÷a", example: { question: "2:5=x:20에서 x는?", answer: "2×20÷5=8이므로 x는 8입니다." }, faqs: [{ question: "x가 앞에 있어도 계산할 수 있나요?", answer: "네. 찾을 값 위치를 첫 번째 값으로 선택하면 a:b=x:d를 풉니다." }, { question: "비례식의 분모가 0이어도 되나요?", answer: "아니요. 0으로 나누는 비례식은 정의되지 않습니다." }], updatedAt: "2026-10-15" }),
  createCalculatorPage({ slug: "aspect-ratio", name: "화면 비율 계산기", shortName: "화면 비율", category: "math", title: "화면 비율 계산기 - 16:9·9:16 간소화", description: "가로와 세로 픽셀 수를 입력하면 사진·영상·디자인 화면 비율을 16:9 같은 가장 간단한 정수 비율과 소수값으로 표시합니다.", keywords: ["화면 비율 계산기", "aspect ratio", "16:9 계산", "사진 비율", "영상 비율"], relatedCalculatorIds: ["ratio", "proportion", "unit-converter", "percentage"], fields: [positive("width", "가로 길이", "1920", { unit: "px" }), positive("height", "세로 길이", "1080", { unit: "px" })], calculate: calculateAspectRatio, howTo: "사진이나 영상의 가로·세로 픽셀을 입력하세요. 세로형 콘텐츠는 가로보다 세로를 크게 입력하면 9:16처럼 표시됩니다.", formula: "화면 비율 = 가로 ÷ 최대공약수 : 세로 ÷ 최대공약수 · 소수 비율 = 가로 ÷ 세로", example: { question: "1920×1080 화면의 비율은?", answer: "최대공약수 120으로 각각 나누면 16:9입니다. 1080×1920이면 9:16입니다." }, faqs: [{ question: "2560×1440도 16:9인가요?", answer: "네. 두 값을 160으로 나누면 16:9입니다." }, { question: "정사각형 화면은 어떻게 표시되나요?", answer: "가로와 세로가 같으면 1:1입니다." }], updatedAt: "2026-10-15" }),
  createCalculatorPage({ slug: "scale-ratio", name: "축척 계산기", shortName: "축척", category: "math", title: "축척 계산기 - 도면·실제 길이 변환", description: "1:100 같은 축척에서 도면 길이와 실제 길이를 양방향으로 계산하고 cm·m 단위를 변환하세요.", keywords: ["축척 계산기", "도면 실제 길이", "1:100 축척", "scale ratio"], relatedCalculatorIds: ["ratio", "proportion", "unit-converter", "aspect-ratio"], fields: [positive("scaleDrawing", "축척의 도면 값", "1"), positive("scaleActual", "축척의 실제 값", "100"), { name: "direction", label: "변환 방향", type: "select", defaultValue: "drawing-to-actual", options: [{ label: "도면 → 실제", value: "drawing-to-actual" }, { label: "실제 → 도면", value: "actual-to-drawing" }] }, positive("length", "알려진 길이", "5", { max: 1_000_000_000_000 }), { name: "inputUnit", label: "입력 길이 단위", type: "select", defaultValue: "cm", options: [{ label: "cm", value: "cm" }, { label: "m", value: "m" }] }, { name: "outputUnit", label: "결과 길이 단위", type: "select", defaultValue: "cm", options: [{ label: "cm", value: "cm" }, { label: "m", value: "m" }] }], calculate: calculateScaleRatio, howTo: "축척 1:100처럼 도면 값과 실제 값을 입력하고 변환 방향, 길이, 입력·결과 단위를 선택하세요. 도면의 단위와 실제 길이의 단위를 명확히 구분합니다.", formula: "실제 길이 = 도면 길이 × 실제 축척 값 ÷ 도면 축척 값 · 도면 길이 = 실제 길이 × 도면 축척 값 ÷ 실제 축척 값 · 1m=100cm", example: { question: "1:100 도면에서 5cm는 실제 얼마인가요?", answer: "5×100=500cm, 즉 5m입니다. 실제 10m가 1:200으로 그려졌다면 도면은 5cm입니다." }, faqs: [{ question: "1:200에서 실제 10m는 도면 몇 cm인가요?", answer: "10m=1,000cm이고 1,000÷200=5cm입니다." }, { question: "축척의 두 값이 0일 수 있나요?", answer: "아니요. 도면과 실제 축척 값 모두 0보다 커야 합니다." }], updatedAt: "2026-10-15" }),
];

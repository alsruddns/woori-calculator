import { createCalculatorPage } from "@/data/calculator-content/create-page";
import { calculateAge, calculateArea, calculateBmi, calculateCaloriePerServing, calculateDateDifference, calculateDday, calculateFuelCost, calculatePace, calculateWorkdays } from "@/calculators/date-life/date-calculate";
import type { CalculatorPageDefinition } from "@/types/calculator-page";

const date = (name: string, label: string) => ({ name, label, type: "date" as const });
const number = (name: string, label: string, unit = "", min = 0, step = 1) => ({ name, label, type: "number" as const, ...(unit ? { unit } : {}), min, step });
const select = (name: string, label: string, options: readonly { label: string; value: string }[], defaultValue = options[0]?.value) => ({ name, label, type: "select" as const, options, defaultValue });

export const dateLifeCalculatorPages: readonly CalculatorPageDefinition[] = [
  createCalculatorPage({
    slug: "date-difference", name: "날짜 차이 계산기", shortName: "날짜 차이", category: "date-time", description: "시작일과 종료일 사이의 날짜 차이와 시작일·종료일 포함 기준 일수를 계산합니다.", title: "날짜 차이 계산기: 두 날짜 사이 일수", keywords: ["날짜 차이 계산기", "날짜 일수 계산", "기간 계산"], relatedCalculatorIds: ["dday", "age", "workdays"],
    fields: [date("start", "시작일"), date("end", "종료일"), select("include", "포함 기준 일수", [{ label: "시작일·종료일 제외 (경과 일수)", value: "none" }, { label: "시작일 포함", value: "start" }, { label: "종료일 포함", value: "end" }, { label: "시작일·종료일 모두 포함", value: "both" }])], calculate: calculateDateDifference,
    howTo: "시작일과 종료일을 고르면 경과한 날짜 수와 선택한 양 끝 날짜 포함 기준의 일수를 보여줍니다.", formula: "날짜 차이 = 종료일 − 시작일 · 포함 일수 = 기간 내부 날짜 수 + 포함하도록 선택한 경계 날짜 수", example: { question: "1월 1일부터 1월 3일까지는 며칠 차이인가요?", answer: "날짜 차이는 2일이며 양 끝 날짜를 모두 포함하면 3일입니다." },
    faqs: [{ question: "시작일과 종료일은 기본으로 포함되나요?", answer: "날짜 차이는 두 날짜의 경과 일수로 계산합니다. 별도 결과에서 양 끝 날짜 포함 여부를 선택할 수 있습니다." }, { question: "종료일이 시작일보다 빠르면요?", answer: "기간 방향이 불분명해질 수 있으므로 종료일이 시작일보다 빠른 입력은 안내 메시지로 막습니다." }],
  }),
  createCalculatorPage({
    slug: "dday", name: "D-Day 계산기", shortName: "D-Day", category: "date-time", description: "기준일에서 목표일까지 남은 날짜 또는 지난 날짜를 확인합니다.", title: "D-Day 계산기: 목표일까지 남은 날짜", keywords: ["디데이 계산기", "D-Day 계산", "목표일 날짜"], relatedCalculatorIds: ["date-difference", "age", "workdays"],
    fields: [select("reference", "기준일", [{ label: "오늘", value: "today" }, { label: "직접 선택", value: "custom" }]), { ...date("referenceDate", "직접 선택한 기준일"), showWhen: { field: "reference", value: "custom" } }, date("target", "목표일")], calculate: calculateDday,
    howTo: "오늘 또는 직접 선택한 날짜를 기준으로 목표일을 고르세요. 목표일까지 남으면 D-N, 지난 날짜면 D+N으로 표시합니다.", formula: "D-Day 일수 = 목표일 − 기준일 · 양수는 남은 날짜(D-N), 음수는 지난 날짜(D+N), 0은 당일(D-Day)", example: { question: "기준일이 6월 1일이고 목표일이 6월 10일이면?", answer: "목표일까지 9일 남아 D-9입니다." },
    faqs: [{ question: "오늘을 기준으로 계산할 때 시간도 반영하나요?", answer: "시간대의 시각 차이가 아닌 달력 날짜 단위로 계산합니다." }, { question: "목표일이 이미 지난 경우도 확인할 수 있나요?", answer: "가능합니다. 기준일보다 목표일이 과거면 지난 날짜 수를 D+N 형식으로 보여줍니다." }],
  }),
  createCalculatorPage({
    slug: "age", name: "만 나이 계산기", shortName: "만 나이", category: "life", description: "생년월일과 기준일을 기준으로 생일이 지났는지 반영한 만 나이를 계산합니다.", title: "만 나이 계산기: 생년월일 기준 나이", keywords: ["만 나이 계산기", "생년월일 나이 계산", "나이 계산"], relatedCalculatorIds: ["date-difference", "dday", "workdays"],
    fields: [date("birth", "생년월일"), date("reference", "기준일")], calculate: calculateAge,
    howTo: "생년월일과 기준일을 선택하세요. 기준일에 올해 생일이 아직 오지 않았다면 한 살을 뺍니다. 2월 29일생은 평년에는 3월 1일부터 생일이 지난 것으로 계산합니다.", formula: "만 나이 = 기준 연도 − 출생 연도 − (올해 생일이 기준일 이후이면 1)", example: { question: "2000년 12월 31일생의 2026년 12월 30일 기준 나이는?", answer: "2026년 생일 하루 전이므로 만 25세입니다." },
    notes: ["한국식 세는 나이가 아닌 만 나이 기준입니다."], faqs: [{ question: "기준일을 과거로 지정해도 되나요?", answer: "가능합니다. 출생일 이후의 날짜라면 해당 날짜 기준 만 나이를 구합니다." }, { question: "한국식 나이도 결과로 나오나요?", answer: "아니요. 이 계산기는 요청된 만 나이만 표시합니다." }],
  }),
  createCalculatorPage({
    slug: "workdays", name: "근무일수 계산기", shortName: "근무일수", category: "date-time", description: "기간 안의 평일 수를 세고 시작일과 종료일을 포함할지 각각 선택합니다.", title: "근무일수 계산기: 주말 제외 평일 수", keywords: ["근무일수 계산기", "평일 계산", "영업일 계산"], relatedCalculatorIds: ["date-difference", "dday", "age"],
    fields: [date("start", "시작일"), date("end", "종료일"), select("includeStart", "시작일 포함", [{ label: "포함", value: "true" }, { label: "제외", value: "false" }]), select("includeEnd", "종료일 포함", [{ label: "포함", value: "true" }, { label: "제외", value: "false" }])], calculate: calculateWorkdays,
    howTo: "기간과 시작일·종료일 포함 여부를 선택하세요. 토요일과 일요일만 제외해 평일 수를 계산합니다. 공휴일은 별도로 빼지 않습니다.", formula: "근무일수 = 선택한 기간에 포함되는 월요일~금요일 날짜의 개수", example: { question: "월요일부터 금요일까지 양 끝을 포함하면?", answer: "평일 근무일수는 5일입니다." },
    notes: ["한국 공휴일과 임시공휴일은 자동 제외하지 않습니다. 공휴일을 반영하려면 각 날짜의 휴일 여부를 별도로 확인하세요."], faqs: [{ question: "공휴일도 제외되나요?", answer: "아니요. 휴일 데이터의 정확성을 보장할 수 없어 토·일요일만 제외합니다." }, { question: "주말에 근무하는 일정도 계산할 수 있나요?", answer: "현재는 일반적인 월~금 평일 기준입니다. 다른 근무 일정은 별도 계산이 필요합니다." }],
  }),
  createCalculatorPage({
    slug: "bmi", name: "BMI 계산기", shortName: "BMI", category: "life", description: "키와 몸무게를 이용해 체질량지수(BMI)를 계산합니다.", title: "BMI 계산기: 키와 몸무게로 체질량지수", keywords: ["BMI 계산기", "체질량지수 계산", "키 몸무게 BMI"], relatedCalculatorIds: ["calorie-per-serving", "pace", "area"],
    fields: [number("height", "키", "cm", 0.1, 0.1), number("weight", "몸무게", "kg", 0.1, 0.1)], calculate: calculateBmi,
    howTo: "키는 cm, 몸무게는 kg 단위로 입력하세요. 결과는 소수점 첫째 자리까지 표시합니다.", formula: "BMI = 몸무게(kg) ÷ 키(m)² · 키(m) = 키(cm) ÷ 100", example: { question: "키 170cm, 몸무게 65kg이면?", answer: "65 ÷ 1.7² ≈ 22.5kg/m²입니다." },
    notes: ["BMI는 체중과 키를 이용한 일반적인 참고 지표입니다. 개인의 건강 상태를 진단하거나 치료 조언을 제공하지 않습니다."], faqs: [{ question: "BMI가 건강 진단 결과인가요?", answer: "아닙니다. 키와 몸무게만 사용한 참고 지표이며 개인 건강 상태를 판단하려면 전문가의 평가가 필요합니다." }, { question: "결과를 몇 자리까지 표시하나요?", answer: "읽기 쉽도록 소수점 첫째 자리까지 반올림합니다." }],
  }),
  createCalculatorPage({
    slug: "area", name: "평수·제곱미터 변환 계산기", shortName: "평수 변환", category: "life", description: "면적을 제곱미터와 평 사이에서 변환하고 두 단위의 관계를 확인합니다.", title: "평수 계산기: 평과 제곱미터(㎡) 변환", keywords: ["평수 계산기", "평 제곱미터 변환", "㎡ 평 변환"], relatedCalculatorIds: ["unit-converter", "ratio", "unit-price"],
    fields: [select("mode", "변환 방향", [{ label: "제곱미터 → 평", value: "sqm-to-pyeong" }, { label: "평 → 제곱미터", value: "pyeong-to-sqm" }]), number("value", "변환할 면적", "㎡ 또는 평", 0, 0.01)], calculate: calculateArea,
    howTo: "변환 방향과 면적을 입력하면 반대 단위로 환산합니다. 결과는 소수점 둘째 자리까지 표시하며 불필요한 0은 생략합니다.", formula: "평 = 제곱미터 ÷ (400 ÷ 121) · 제곱미터 = 평 × (400 ÷ 121) · 1평 ≈ 3.305785㎡", example: { question: "약 33.06㎡는 몇 평인가요?", answer: "약 10평입니다." },
    notes: ["평은 면적을 쉽게 가늠하기 위한 관용 단위이며, 공식 문서의 면적 표기는 제곱미터를 확인하세요."], faqs: [{ question: "1평은 몇 제곱미터인가요?", answer: "계산에는 1평을 400/121㎡, 약 3.305785㎡로 사용합니다." }, { question: "결과가 정확히 떨어지지 않는 이유는?", answer: "두 단위의 환산 관계에 소수가 포함되어 있어 표시 자릿수에 따라 반올림 차이가 생길 수 있습니다." }],
  }),
  createCalculatorPage({
    slug: "pace", name: "러닝 페이스 계산기", shortName: "러닝 페이스", category: "life", description: "달린 거리와 시간을 바탕으로 km당 페이스와 평균 속도를 구합니다.", title: "러닝 페이스 계산기: 분/km와 평균 속도", keywords: ["러닝 페이스 계산기", "페이스 계산", "분/km 계산"], relatedCalculatorIds: ["bmi", "calorie-per-serving", "date-difference"],
    fields: [number("distance", "달린 거리", "km", 0.01, 0.01), number("hours", "시간", "시간", 0, 1), number("minutes", "분", "분", 0, 1)], calculate: calculatePace,
    howTo: "달린 거리(km)와 운동 시간을 시간·분으로 입력하세요. 60초 단위로 올림이 발생하는 페이스는 자동 정리합니다.", formula: "평균 페이스(분/km) = 운동 시간(분) ÷ 거리(km) · 평균 속도(km/h) = 거리(km) ÷ 운동 시간(시간)", example: { question: "5km를 25분에 달리면?", answer: "평균 페이스는 5:00분/km, 평균 속도는 12km/h입니다." },
    faqs: [{ question: "거리 단위는 마일도 되나요?", answer: "현재 거리는 km 기준입니다. 마일 거리는 km로 환산해 입력해 주세요." }, { question: "운동 시간이 1시간 30분이면 어떻게 입력하나요?", answer: "시간에 1, 분에 30을 입력하면 됩니다." }],
  }),
  createCalculatorPage({
    slug: "fuel-cost", name: "주유비 계산기", shortName: "주유비", category: "life", description: "주행 거리, 평균 연비와 유가를 이용해 예상 연료량과 주유비를 계산합니다.", title: "주유비 계산기: 거리·연비·유가로 예상 비용", keywords: ["주유비 계산기", "기름값 계산", "연료비 계산"], relatedCalculatorIds: ["unit-price", "pace", "calorie-per-serving"],
    fields: [number("distance", "주행 거리", "km", 0, 1), number("efficiency", "평균 연비", "km/L", 0.01, 0.1), number("price", "유가", "원/L", 0, 1)], calculate: calculateFuelCost,
    howTo: "주행 거리, 차량의 평균 연비와 리터당 유가를 입력하세요. 예상 필요 연료와 비용을 계산합니다.", formula: "필요 연료(L) = 거리(km) ÷ 연비(km/L) · 예상 주유비 = 필요 연료 × 유가(원/L)", example: { question: "100km를 연비 10km/L, 리터당 1,700원으로 주행하면?", answer: "필요 연료는 10L, 예상 주유비는 17,000원입니다." },
    notes: ["실제 운전 조건과 주유 시점의 유가에 따라 연료 소비와 비용이 달라집니다."], faqs: [{ question: "왕복 거리를 계산하려면?", answer: "출발지와 목적지 사이 왕복 거리를 합산해 주행 거리로 입력하면 됩니다." }, { question: "연비는 어디서 확인하나요?", answer: "차량 계기판의 평균 연비나 차량 안내 자료를 참고해 입력할 수 있습니다." }],
  }),
  createCalculatorPage({
    slug: "calorie-per-serving", name: "1회분 칼로리 계산기", shortName: "1회분 칼로리", category: "life", description: "전체 음식의 칼로리와 총 분량, 먹을 분량으로 예상 섭취 열량을 계산합니다.", title: "1회분 칼로리 계산기: 분량별 열량 계산", keywords: ["1회분 칼로리 계산", "분량 칼로리 계산기", "음식 열량 나누기"], relatedCalculatorIds: ["bmi", "pace", "average"],
    fields: [number("calories", "전체 칼로리", "kcal", 0, 1), number("servings", "전체 음식 분량", "인분 또는 동일 단위", 0.01, 0.1), number("portion", "먹을 분량", "동일 단위", 0, 0.1)], calculate: calculateCaloriePerServing,
    howTo: "전체 열량과 총 분량, 실제 섭취 분량을 같은 단위 기준으로 입력하세요.", formula: "1회분 예상 열량 = 전체 열량 × (섭취 분량 ÷ 총 분량)", example: { question: "전체 600kcal인 음식 3인분 중 1인분을 먹으면?", answer: "예상 섭취량은 200kcal입니다." },
    notes: ["입력한 전체 열량과 분량으로 단순 배분한 참고값입니다. 영양·의료 조언이 아닙니다."], faqs: [{ question: "분량 단위는 무엇을 써야 하나요?", answer: "인분, g 등 어떤 단위든 전체 분량과 먹을 분량에 같은 기준을 사용하면 됩니다." }, { question: "실제 섭취 칼로리와 같나요?", answer: "재료와 조리법, 실제 양에 따라 다를 수 있어 입력값에 따른 추정치로 확인해 주세요." }],
  }),
];

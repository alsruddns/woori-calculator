import type { CalculatorCategory } from "@/types/calculator";

export const calculatorCategories: Record<CalculatorCategory, string> = {
  finance: "금융",
  salary: "급여·직장",
  tax: "세금",
  life: "생활",
  "date-time": "날짜·시간",
  math: "수학·변환",
};

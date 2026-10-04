import type { CalculatorCategory, CalculatorDefinition } from "@/types/calculator";

export type CalculatorField = {
  name: string;
  label: string;
  type?: "number" | "date" | "textarea" | "select";
  unit?: string;
  placeholder?: string;
  min?: number;
  step?: number;
  defaultValue?: string;
  showWhen?: { field: string; value: string };
  options?: readonly { label: string; value: string }[];
};

export type CalculatorValue = { label: string; value: number | string; unit?: string; precision?: number };
export type CalculatorOutput = { results: CalculatorValue[]; note?: string };
export type CalculatorOutcome = CalculatorOutput | { error: string; field?: string };
export type CalculatorFunction = (input: Record<string, string>) => CalculatorOutcome;

export type CalculatorPageDefinition = CalculatorDefinition & {
  title: string;
  keywords: readonly string[];
  fields: readonly CalculatorField[];
  calculate: CalculatorFunction;
  howTo: string;
  formula: string;
  example: { question: string; answer: string };
  notes?: readonly string[];
  faqs: readonly { question: string; answer: string }[];
  updatedAt: string;
  policyYear?: number;
  sources?: readonly { name: string; url: string; checkedAt: string }[];
};

export type CalculatorCategoryContent = {
  category: CalculatorCategory;
  items: readonly CalculatorPageDefinition[];
};

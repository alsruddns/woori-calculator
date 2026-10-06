import type { CalculatorPageDefinition } from "@/types/calculator-page";

type CalculatorPageInput = Omit<CalculatorPageDefinition, "id" | "isPublished" | "policyType" | "updatedAt"> & {
  policyType?: CalculatorPageDefinition["policyType"];
  updatedAt?: string;
};

export function createCalculatorPage(input: CalculatorPageInput): CalculatorPageDefinition {
  return { ...input, id: input.slug, isPublished: true, policyType: input.policyType ?? "STATIC", updatedAt: input.updatedAt ?? "2026-10-05" };
}

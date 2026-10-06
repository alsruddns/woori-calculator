export type CalculatorPolicyType = "STATIC" | "POLICY";

export type CalculatorCategory =
  | "finance"
  | "salary"
  | "tax"
  | "life"
  | "date-time"
  | "math";

export type CalculatorDefinition = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  category: CalculatorCategory;
  policyType: CalculatorPolicyType;
  keywords: readonly string[];
  isPublished: boolean;
  relatedCalculatorIds: readonly string[];
};

export type PolicySource = {
  name: string;
  url: string;
  checkedAt: string;
};

export type PolicyDataMetadata = {
  id: string;
  policyYear: number;
  version: string;
  updatedAt: string;
  effectiveFrom: string;
  effectiveTo?: string;
  source: PolicySource;
};

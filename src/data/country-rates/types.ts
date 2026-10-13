export type CountryRateConfig = {
  countryCode: string;
  countryName: string;
  currency: string;
  policyYear: number;
  updatedAt: string;
  vatRate?: number;
  socialEmployeeRate?: number;
  employerFundRate?: number;
  annualPersonalAllowance?: number;
  annualTaxBrackets?: readonly { upTo: number; rate: number }[];
  annualTaxBracketsByStatus?: Readonly<Record<string, readonly { upTo: number; rate: number }[]>>;
  rules?: Readonly<Record<string, number>>;
  sources: readonly { name: string; url: string }[];
  notes: string;
};

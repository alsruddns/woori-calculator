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
  sources: readonly { name: string; url: string }[];
  notes: string;
};

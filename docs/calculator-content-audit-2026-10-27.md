# Calculator content audit — 2026-10-27

This report records reproducible structural and calculation checks for the 169 published calculators. It does not claim that static checks replace editorial, translation, legal, or live-source review. Policy source URLs are recorded below by the data model; this run did not open and revalidate every authority page.

## Summary

- Published calculators: **169** (unique slugs: 169)
- Configured public locales: **26**; per-locale published calculator counts: ko 169, en 169, ja 169, zh 169, es 169, pt-br 169, de 169, fr 169, vi 169, id 169, th 169, zh-tw 169, it 169, nl 169, hi 169, ru 169, tr 169, pl 169, fil 169, bn 169, uk 169, ms 169, sv 169, cs 169, ro 169, el 169
- Policy calculators: **101**; with at least one listed source: **101/101**. Source records contain a check date for **81 unique URLs**, referenced by **72/101 pages**; **59 URLs** were opened and their relevant content compared with the configured rule or rate in this run. This does not validate every rule or input model on a page.
- Country-policy pages with a calculator-specific displayed formula or calculation explanation: **92/101**. Their examples are generated from the page calculation function; this does not certify policy eligibility, translation quality or legal completeness.
- Country-specific examples matching calculated result values: **92/92**. The check runs the page calculation function with the calculator example inputs (or the configured defaults) and verifies the displayed numeric results.
- Locale-aware short-content signals (review candidates, not automatic failures): ko 0, en 0, ja 0, zh 0, es 0, pt-br 0, de 0, fr 0, vi 0, id 0, th 0, zh-tw 0, it 0, nl 0, hi 0, ru 0, tr 0, pl 2, fil 3, bn 2, uk 1, ms 0, sv 1, cs 0, ro 0, el 0. The published route count does not certify translation quality.
- Exact duplicate content occurrences across description/how-to/FAQ/example blocks by locale: ko 0, en 0, ja 0, zh 0, es 0, pt-br 0, de 0, fr 0, vi 0, id 0, th 0, zh-tw 0, it 0, nl 0, hi 0, ru 0, tr 22, pl 3, fil 18, bn 0, uk 30, ms 4, sv 3, cs 0, ro 0, el 3. This includes partial locales that the legacy duplicate test does not yet cover.
- Generated country-policy pages requiring editorial review: **90** (48 global-country pages and 42 country-specific pages). The review is required because their copy is assembled from shared wording even when the inputs and examples differ.
- Calculation functions, rate tables, routes, canonical metadata, hreflang, sitemap, and currency behavior were not modified by this audit artifact.

## Page-by-page review register

`Example check` is marked for country-policy examples generated from structured calculator inputs; `matched` means the published answer contains the computed result. Other calculators store example prose without a machine-readable input, so their numeric examples need manual or future structured-input verification. `Editorial review` records known follow-up work; it is not an automatic quality score.

| Slug | Category | Policy | Inputs | Related links | Available locales | Example check | Policy sources | Locale review signals | Editorial review |
| --- | --- | --- | ---: | ---: | ---: | --- | ---: | --- | --- |
| `percentage` | math | STATIC | 3 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `discount` | math | STATIC | 4 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `change-rate` | math | STATIC | 2 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `ratio` | math | STATIC | 16 | 10 | 26/26 | manual | 0 | uk: short example | No structural flag; human usefulness review remains required |
| `average` | math | STATIC | 1 | 3 | 26/26 | manual | 0 | bn: short howTo | No structural flag; human usefulness review remains required |
| `weighted-average` | math | STATIC | 2 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `cagr` | math | STATIC | 3 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `proportion` | math | STATIC | 5 | 4 | 26/26 | manual | 0 | uk: exact duplicate howTo with ratio; ms: exact duplicate howTo with ratio; el: exact duplicate FAQ with ratio | No structural flag; human usefulness review remains required |
| `aspect-ratio` | math | STATIC | 2 | 4 | 26/26 | manual | 0 | uk: exact duplicate howTo with ratio; ms: exact duplicate howTo with ratio; el: exact duplicate FAQ with ratio | No structural flag; human usefulness review remains required |
| `scale-ratio` | math | STATIC | 6 | 4 | 26/26 | manual | 0 | bn: short howTo; uk: exact duplicate howTo with ratio; ms: exact duplicate howTo with ratio; el: exact duplicate FAQ with ratio | No structural flag; human usefulness review remains required |
| `fraction` | math | STATIC | 5 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `decimal-fraction` | math | STATIC | 4 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `standard-deviation` | math | STATIC | 2 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `median` | math | STATIC | 1 | 3 | 26/26 | manual | 0 | sv: exact duplicate howTo with average | No structural flag; human usefulness review remains required |
| `percentile` | math | STATIC | 2 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `probability` | math | STATIC | 4 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `fire-retirement-calculator` | finance | STATIC | 3 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `dividend-growth-calculator` | finance | STATIC | 4 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `inflation-adjusted-return-calculator` | finance | STATIC | 4 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `position-size-calculator` | finance | STATIC | 4 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `stop-loss-take-profit-calculator` | finance | STATIC | 4 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `stock-profit-after-fees-calculator` | finance | STATIC | 5 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `loan-early-repayment-calculator` | finance | STATIC | 6 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `rent-vs-buy-calculator` | life | STATIC | 8 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `electricity-cost-calculator` | life | STATIC | 5 | 3 | 26/26 | manual | 0 | pl: exact duplicate FAQ with rent-vs-buy-calculator | No structural flag; human usefulness review remains required |
| `travel-budget-calculator` | life | STATIC | 10 | 3 | 26/26 | manual | 0 | pl: exact duplicate FAQ with rent-vs-buy-calculator | No structural flag; human usefulness review remains required |
| `freelancer-hourly-rate-calculator` | finance | STATIC | 5 | 3 | 26/26 | manual | 0 | pl: exact duplicate FAQ with rent-vs-buy-calculator | No structural flag; human usefulness review remains required |
| `break-even-point-calculator` | tax | STATIC | 3 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `compound-interest` | finance | STATIC | 4 | 4 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `simple-interest` | finance | STATIC | 3 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `savings-interest` | finance | STATIC | 3 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `deposit-interest` | finance | STATIC | 3 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `loan-interest` | finance | STATIC | 4 | 4 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `ltv` | finance | STATIC | 2 | 3 | 26/26 | manual | 0 | sv: short howTo | No structural flag; human usefulness review remains required |
| `dti` | finance | STATIC | 3 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `dsr` | finance | STATIC | 2 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `stock-average-price` | finance | STATIC | 11 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `dividend` | finance | STATIC | 4 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `profit-loss` | finance | STATIC | 5 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `loan-refinance` | finance | STATIC | 6 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `prepayment-fee` | finance | STATIC | 2 | 2 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `loan-affordability` | finance | STATIC | 3 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `salary-conversion` | salary | STATIC | 2 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `hourly-wage` | salary | STATIC | 3 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `annual-leave-allowance` | salary | STATIC | 2 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `vat` | tax | POLICY 2026 | 3 | 3 | 26/26 | matched | 2 | — | No structural flag; human usefulness review remains required |
| `unit-price` | math | STATIC | 4 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `margin` | finance | STATIC | 2 | 3 | 26/26 | manual | 0 | pl: short howTo; fil: short howTo | No structural flag; human usefulness review remains required |
| `markup` | finance | STATIC | 2 | 3 | 26/26 | manual | 0 | pl: short howTo; fil: short howTo; fil: exact duplicate howTo with margin | No structural flag; human usefulness review remains required |
| `product-margin` | finance | STATIC | 7 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `withholding-tax-3-3` | tax | POLICY 2026 | 1 | 3 | 26/26 | matched | 2 | — | No structural flag; human usefulness review remains required |
| `date-difference` | date-time | STATIC | 3 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `dday` | date-time | STATIC | 3 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `age` | life | STATIC | 2 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `workdays` | date-time | STATIC | 4 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `bmi` | life | STATIC | 2 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `area` | life | STATIC | 2 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `pace` | life | STATIC | 3 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `fuel-cost` | life | STATIC | 3 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `fuel-efficiency` | life | STATIC | 7 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `calorie-per-serving` | life | STATIC | 3 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `tenure` | date-time | STATIC | 2 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `time-arithmetic` | date-time | STATIC | 5 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `pregnancy` | date-time | STATIC | 3 | 3 | 26/26 | manual | 2 | — | No structural flag; human usefulness review remains required |
| `utility-bill` | life | STATIC | 4 | 2 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `vehicle-cost` | life | STATIC | 9 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `taxi-fare` | life | STATIC | 6 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `trip-split` | life | STATIC | 2 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `tip-calculator` | life | STATIC | 3 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `unit-converter` | math | STATIC | 4 | 3 | 26/26 | manual | 0 | — | No structural flag; human usefulness review remains required |
| `unemployment-benefit` | salary | POLICY 2026 | 3 | 3 | 26/26 | manual | 2 | — | No structural flag; human usefulness review remains required |
| `minimum-wage` | salary | POLICY 2026 | 1 | 2 | 26/26 | manual | 1 | — | No structural flag; human usefulness review remains required |
| `severance-pay` | salary | POLICY 2026 | 3 | 3 | 26/26 | manual | 2 | tr: exact duplicate FAQ with minimum-wage | No structural flag; human usefulness review remains required |
| `social-insurance` | salary | POLICY 2026 | 1 | 2 | 26/26 | manual | 4 | — | No structural flag; human usefulness review remains required |
| `japan-consumption-tax-calculator` | tax | POLICY 2026 | 4 | 3 | 26/26 | manual | 2 | — | No structural flag; human usefulness review remains required |
| `japan-annual-salary-calculator` | salary | POLICY 2026 | 2 | 3 | 26/26 | manual | 6 | — | official source and effective rule not live-verified in this audit |
| `japan-monthly-salary-calculator` | salary | POLICY 2026 | 2 | 3 | 26/26 | manual | 6 | — | official source and effective rule not live-verified in this audit |
| `japan-overtime-pay-calculator` | salary | POLICY 2026 | 7 | 3 | 26/26 | manual | 1 | — | No structural flag; human usefulness review remains required |
| `japan-night-holiday-pay-calculator` | salary | POLICY 2026 | 14 | 3 | 26/26 | manual | 1 | — | No structural flag; human usefulness review remains required |
| `germany-gross-net-salary-calculator` | salary | POLICY 2026 | 3 | 2 | 26/26 | matched | 2 | — | official source and effective rule not live-verified in this audit; generated country-policy copy requires calculator-specific editorial review |
| `germany-income-tax-calculator` | tax | POLICY 2026 | 1 | 2 | 26/26 | matched | 2 | — | official source and effective rule not live-verified in this audit; generated country-policy copy requires calculator-specific editorial review |
| `germany-vat-calculator` | tax | POLICY 2026 | 3 | 2 | 26/26 | matched | 1 | — | generated country-policy copy requires calculator-specific editorial review |
| `germany-overtime-pay-calculator` | salary | POLICY 2026 | 3 | 2 | 26/26 | matched | 2 | — | official source and effective rule not live-verified in this audit; generated country-policy copy requires calculator-specific editorial review |
| `germany-vacation-pay-calculator` | salary | POLICY 2026 | 2 | 2 | 26/26 | matched | 2 | — | official source and effective rule not live-verified in this audit; generated country-policy copy requires calculator-specific editorial review |
| `spain-gross-net-salary-calculator` | salary | POLICY 2026 | 4 | 2 | 26/26 | matched | 5 | — | generated country-policy copy requires calculator-specific editorial review |
| `spain-irpf-calculator` | tax | POLICY 2026 | 2 | 2 | 26/26 | matched | 5 | — | generated country-policy copy requires calculator-specific editorial review |
| `spain-vat-calculator` | tax | POLICY 2026 | 3 | 2 | 26/26 | matched | 5 | — | generated country-policy copy requires calculator-specific editorial review |
| `spain-severance-pay-calculator` | salary | POLICY 2026 | 3 | 2 | 26/26 | matched | 5 | — | generated country-policy copy requires calculator-specific editorial review |
| `france-gross-net-salary-calculator` | salary | POLICY 2026 | 3 | 2 | 26/26 | matched | 5 | — | generated country-policy copy requires calculator-specific editorial review |
| `france-income-tax-calculator` | tax | POLICY 2026 | 1 | 2 | 26/26 | matched | 5 | — | generated country-policy copy requires calculator-specific editorial review |
| `france-vat-calculator` | tax | POLICY 2026 | 3 | 2 | 26/26 | matched | 5 | — | generated country-policy copy requires calculator-specific editorial review |
| `france-overtime-pay-calculator` | salary | POLICY 2026 | 3 | 2 | 26/26 | matched | 5 | — | generated country-policy copy requires calculator-specific editorial review |
| `netherlands-gross-net-salary-calculator` | salary | POLICY 2026 | 3 | 2 | 26/26 | matched | 3 | — | generated country-policy copy requires calculator-specific editorial review |
| `netherlands-vat-calculator` | tax | POLICY 2026 | 3 | 2 | 26/26 | matched | 3 | — | generated country-policy copy requires calculator-specific editorial review |
| `netherlands-30-percent-ruling-calculator` | salary | POLICY 2026 | 2 | 2 | 26/26 | matched | 3 | — | generated country-policy copy requires calculator-specific editorial review |
| `netherlands-holiday-allowance-calculator` | salary | POLICY 2026 | 2 | 2 | 26/26 | matched | 3 | — | generated country-policy copy requires calculator-specific editorial review |
| `india-gst-calculator` | tax | POLICY 2026 | 3 | 3 | 26/26 | matched | 6 | — | generated country-policy copy requires calculator-specific editorial review |
| `india-sip-calculator` | finance | POLICY 2026 | 3 | 3 | 26/26 | matched | 6 | — | generated country-policy copy requires calculator-specific editorial review |
| `india-ppf-calculator` | finance | POLICY 2026 | 3 | 3 | 26/26 | matched | 6 | — | generated country-policy copy requires calculator-specific editorial review |
| `india-nps-calculator` | finance | POLICY 2026 | 3 | 3 | 26/26 | matched | 6 | — | generated country-policy copy requires calculator-specific editorial review |
| `india-gross-net-salary-calculator` | salary | POLICY 2026 | 3 | 3 | 26/26 | matched | 6 | — | generated country-policy copy requires calculator-specific editorial review |
| `india-income-tax-calculator` | tax | POLICY 2026 | 1 | 3 | 26/26 | matched | 6 | — | generated country-policy copy requires calculator-specific editorial review |
| `brazil-gross-net-salary-calculator` | salary | POLICY 2026 | 4 | 3 | 26/26 | matched | 3 | — | generated country-policy copy requires calculator-specific editorial review |
| `brazil-inss-calculator` | salary | POLICY 2026 | 2 | 2 | 26/26 | matched | 3 | — | generated country-policy copy requires calculator-specific editorial review |
| `brazil-irrf-calculator` | tax | POLICY 2026 | 1 | 2 | 26/26 | matched | 3 | — | generated country-policy copy requires calculator-specific editorial review |
| `brazil-fgts-calculator` | salary | POLICY 2026 | 1 | 2 | 26/26 | matched | 3 | — | generated country-policy copy requires calculator-specific editorial review |
| `brazil-thirteenth-salary-calculator` | salary | POLICY 2026 | 2 | 2 | 26/26 | matched | 3 | — | generated country-policy copy requires calculator-specific editorial review |
| `vietnam-gross-net-salary-calculator` | salary | POLICY 2026 | 3 | 2 | 26/26 | matched | 3 | — | official source and effective rule not live-verified in this audit; generated country-policy copy requires calculator-specific editorial review |
| `vietnam-personal-income-tax-calculator` | tax | POLICY 2026 | 1 | 2 | 26/26 | matched | 3 | — | official source and effective rule not live-verified in this audit; generated country-policy copy requires calculator-specific editorial review |
| `vietnam-social-insurance-calculator` | salary | POLICY 2026 | 2 | 2 | 26/26 | matched | 3 | — | official source and effective rule not live-verified in this audit; generated country-policy copy requires calculator-specific editorial review |
| `china-gross-net-salary-calculator` | salary | POLICY 2026 | 3 | 3 | 26/26 | matched | 2 | — | official source and effective rule not live-verified in this audit; generated country-policy copy requires calculator-specific editorial review |
| `china-individual-income-tax-calculator` | tax | POLICY 2026 | 1 | 2 | 26/26 | matched | 2 | — | official source and effective rule not live-verified in this audit; generated country-policy copy requires calculator-specific editorial review |
| `china-social-insurance-calculator` | salary | POLICY 2026 | 2 | 2 | 26/26 | matched | 2 | — | official source and effective rule not live-verified in this audit; generated country-policy copy requires calculator-specific editorial review |
| `china-vat-calculator` | tax | POLICY 2026 | 3 | 2 | 26/26 | matched | 2 | — | official source and effective rule not live-verified in this audit; generated country-policy copy requires calculator-specific editorial review |
| `taiwan-gross-net-salary-calculator` | salary | POLICY 2026 | 3 | 3 | 26/26 | matched | 2 | — | official source and effective rule not live-verified in this audit; generated country-policy copy requires calculator-specific editorial review |
| `taiwan-income-tax-calculator` | tax | POLICY 2026 | 1 | 2 | 26/26 | matched | 2 | — | official source and effective rule not live-verified in this audit; generated country-policy copy requires calculator-specific editorial review |
| `taiwan-labor-insurance-calculator` | salary | POLICY 2026 | 2 | 2 | 26/26 | matched | 2 | — | official source and effective rule not live-verified in this audit; generated country-policy copy requires calculator-specific editorial review |
| `taiwan-vat-calculator` | tax | POLICY 2026 | 3 | 2 | 26/26 | matched | 2 | — | official source and effective rule not live-verified in this audit; generated country-policy copy requires calculator-specific editorial review |
| `italy-gross-net-salary-calculator` | salary | POLICY 2026 | 3 | 2 | 26/26 | matched | 2 | — | official source and effective rule not live-verified in this audit; generated country-policy copy requires calculator-specific editorial review |
| `italy-income-tax-calculator` | tax | POLICY 2026 | 1 | 2 | 26/26 | matched | 2 | — | official source and effective rule not live-verified in this audit; generated country-policy copy requires calculator-specific editorial review |
| `italy-vat-calculator` | tax | POLICY 2026 | 3 | 2 | 26/26 | matched | 2 | — | official source and effective rule not live-verified in this audit; generated country-policy copy requires calculator-specific editorial review |
| `us-paycheck-calculator` | salary | POLICY 2026 | 4 | 2 | 26/26 | matched | 2 | — | official source and effective rule not live-verified in this audit; generated country-policy copy requires calculator-specific editorial review |
| `us-income-tax-calculator` | tax | POLICY 2026 | 2 | 2 | 26/26 | matched | 2 | — | official source and effective rule not live-verified in this audit; generated country-policy copy requires calculator-specific editorial review |
| `us-sales-tax-calculator` | tax | POLICY 2026 | 3 | 1 | 26/26 | matched | 2 | — | official source and effective rule not live-verified in this audit; generated country-policy copy requires calculator-specific editorial review |
| `us-401k-calculator` | finance | POLICY 2026 | 6 | 2 | 26/26 | matched | 2 | — | official source and effective rule not live-verified in this audit; generated country-policy copy requires calculator-specific editorial review |
| `us-roth-ira-calculator` | finance | POLICY 2026 | 5 | 2 | 26/26 | matched | 2 | tr: exact duplicate FAQ with minimum-wage | official source and effective rule not live-verified in this audit; generated country-policy copy requires calculator-specific editorial review |
| `us-capital-gains-tax-calculator` | tax | POLICY 2026 | 6 | 2 | 26/26 | matched | 2 | fil: exact duplicate FAQ with us-roth-ira-calculator; uk: exact duplicate howTo with us-roth-ira-calculator; uk: exact duplicate example with us-roth-ira-calculator | official source and effective rule not live-verified in this audit; generated country-policy copy requires calculator-specific editorial review |
| `uk-gross-net-salary-calculator` | salary | POLICY 2026 | 2 | 3 | 26/26 | matched | 3 | tr: exact duplicate FAQ with minimum-wage | generated country-policy copy requires calculator-specific editorial review |
| `uk-income-tax-calculator` | tax | POLICY 2026 | 1 | 2 | 26/26 | matched | 3 | tr: exact duplicate FAQ with minimum-wage; fil: short howTo; fil: exact duplicate FAQ with uk-gross-net-salary-calculator; uk: exact duplicate howTo with uk-gross-net-salary-calculator; uk: exact duplicate example with uk-gross-net-salary-calculator | generated country-policy copy requires calculator-specific editorial review |
| `uk-national-insurance-calculator` | salary | POLICY 2026 | 2 | 2 | 26/26 | matched | 3 | tr: exact duplicate FAQ with minimum-wage; fil: exact duplicate FAQ with uk-gross-net-salary-calculator; uk: exact duplicate howTo with uk-gross-net-salary-calculator; uk: exact duplicate example with uk-gross-net-salary-calculator | generated country-policy copy requires calculator-specific editorial review |
| `uk-vat-calculator` | tax | POLICY 2026 | 3 | 1 | 26/26 | matched | 3 | tr: exact duplicate FAQ with minimum-wage; fil: exact duplicate FAQ with uk-gross-net-salary-calculator; uk: exact duplicate howTo with uk-gross-net-salary-calculator | generated country-policy copy requires calculator-specific editorial review |
| `uk-stamp-duty-calculator` | salary | POLICY 2026 | 2 | 2 | 26/26 | matched | 3 | tr: exact duplicate FAQ with minimum-wage; fil: exact duplicate FAQ with uk-gross-net-salary-calculator; uk: exact duplicate howTo with uk-gross-net-salary-calculator; uk: exact duplicate example with uk-gross-net-salary-calculator | generated country-policy copy requires calculator-specific editorial review |
| `uk-pension-calculator` | finance | POLICY 2026 | 5 | 2 | 26/26 | matched | 3 | tr: exact duplicate FAQ with minimum-wage; fil: exact duplicate FAQ with uk-gross-net-salary-calculator; uk: exact duplicate howTo with uk-gross-net-salary-calculator; uk: exact duplicate example with uk-gross-net-salary-calculator | generated country-policy copy requires calculator-specific editorial review |
| `canada-gross-net-salary-calculator` | salary | POLICY 2026 | 2 | 2 | 26/26 | matched | 4 | tr: exact duplicate FAQ with minimum-wage; fil: exact duplicate howTo with uk-gross-net-salary-calculator; sv: exact duplicate howTo with uk-national-insurance-calculator | generated country-policy copy requires calculator-specific editorial review |
| `canada-income-tax-calculator` | tax | POLICY 2026 | 1 | 2 | 26/26 | matched | 4 | tr: exact duplicate FAQ with minimum-wage; fil: exact duplicate FAQ with canada-gross-net-salary-calculator; uk: exact duplicate howTo with canada-gross-net-salary-calculator; uk: exact duplicate example with canada-gross-net-salary-calculator | generated country-policy copy requires calculator-specific editorial review |
| `canada-gst-hst-calculator` | tax | POLICY 2026 | 3 | 1 | 26/26 | matched | 4 | tr: exact duplicate FAQ with minimum-wage; fil: exact duplicate FAQ with canada-gross-net-salary-calculator; uk: exact duplicate howTo with canada-gross-net-salary-calculator | generated country-policy copy requires calculator-specific editorial review |
| `canada-cpp-ei-calculator` | salary | POLICY 2026 | 1 | 2 | 26/26 | matched | 4 | tr: exact duplicate FAQ with minimum-wage; fil: exact duplicate FAQ with canada-gross-net-salary-calculator; uk: exact duplicate howTo with canada-gross-net-salary-calculator; uk: exact duplicate example with canada-gross-net-salary-calculator | generated country-policy copy requires calculator-specific editorial review |
| `canada-rrsp-calculator` | finance | POLICY 2026 | 3 | 2 | 26/26 | matched | 4 | tr: exact duplicate FAQ with minimum-wage; fil: exact duplicate FAQ with canada-gross-net-salary-calculator; uk: exact duplicate howTo with canada-gross-net-salary-calculator; uk: exact duplicate example with canada-gross-net-salary-calculator | generated country-policy copy requires calculator-specific editorial review |
| `australia-gross-net-salary-calculator` | salary | POLICY 2026 | 2 | 2 | 26/26 | matched | 5 | — | generated country-policy copy requires calculator-specific editorial review |
| `australia-income-tax-calculator` | tax | POLICY 2026 | 1 | 2 | 26/26 | matched | 5 | tr: exact duplicate FAQ with minimum-wage | generated country-policy copy requires calculator-specific editorial review |
| `australia-gst-calculator` | tax | POLICY 2026 | 3 | 1 | 26/26 | matched | 5 | tr: exact duplicate FAQ with minimum-wage; fil: exact duplicate FAQ with australia-income-tax-calculator; uk: exact duplicate howTo with australia-income-tax-calculator | generated country-policy copy requires calculator-specific editorial review |
| `australia-superannuation-calculator` | finance | POLICY 2026 | 5 | 2 | 26/26 | matched | 5 | tr: exact duplicate FAQ with minimum-wage; fil: exact duplicate FAQ with australia-income-tax-calculator; uk: exact duplicate howTo with australia-income-tax-calculator | generated country-policy copy requires calculator-specific editorial review |
| `australia-stamp-duty-calculator` | salary | POLICY 2026 | 2 | 2 | 26/26 | matched | 5 | tr: exact duplicate FAQ with minimum-wage; fil: exact duplicate FAQ with australia-income-tax-calculator | generated country-policy copy requires calculator-specific editorial review |
| `singapore-gross-net-salary-calculator` | salary | POLICY 2026 | 2 | 2 | 26/26 | matched | 4 | — | generated country-policy copy requires calculator-specific editorial review |
| `singapore-income-tax-calculator` | tax | POLICY 2026 | 1 | 2 | 26/26 | matched | 4 | — | generated country-policy copy requires calculator-specific editorial review |
| `singapore-cpf-calculator` | salary | POLICY 2026 | 2 | 2 | 26/26 | matched | 4 | tr: exact duplicate FAQ with minimum-wage | generated country-policy copy requires calculator-specific editorial review |
| `singapore-gst-calculator` | tax | POLICY 2026 | 3 | 1 | 26/26 | matched | 4 | tr: exact duplicate FAQ with minimum-wage; fil: exact duplicate FAQ with singapore-cpf-calculator; uk: exact duplicate howTo with singapore-cpf-calculator | generated country-policy copy requires calculator-specific editorial review |
| `hong-kong-salary-tax-calculator` | salary | POLICY 2026 | 1 | 2 | 26/26 | matched | 4 | — | official source and effective rule not live-verified in this audit; generated country-policy copy requires calculator-specific editorial review |
| `hong-kong-mpf-calculator` | salary | POLICY 2026 | 1 | 2 | 26/26 | matched | 4 | — | official source and effective rule not live-verified in this audit; generated country-policy copy requires calculator-specific editorial review |
| `hong-kong-stamp-duty-calculator` | salary | POLICY 2026 | 1 | 2 | 26/26 | matched | 4 | — | official source and effective rule not live-verified in this audit; generated country-policy copy requires calculator-specific editorial review |
| `malaysia-income-tax-calculator` | tax | POLICY 2026 | 1 | 2 | 26/26 | matched | 7 | — | generated country-policy copy requires calculator-specific editorial review |
| `malaysia-epf-calculator` | salary | POLICY 2026 | 2 | 2 | 26/26 | matched | 7 | — | generated country-policy copy requires calculator-specific editorial review |
| `malaysia-socso-calculator` | salary | POLICY 2026 | 1 | 2 | 26/26 | matched | 7 | — | generated country-policy copy requires calculator-specific editorial review |
| `malaysia-sst-calculator` | tax | POLICY 2026 | 2 | 1 | 26/26 | matched | 7 | — | generated country-policy copy requires calculator-specific editorial review |
| `philippines-gross-net-salary-calculator` | salary | POLICY 2026 | 2 | 4 | 26/26 | matched | 10 | — | generated country-policy copy requires calculator-specific editorial review |
| `philippines-income-tax-calculator` | tax | POLICY 2026 | 1 | 2 | 26/26 | matched | 10 | — | generated country-policy copy requires calculator-specific editorial review |
| `philippines-sss-calculator` | salary | POLICY 2026 | 1 | 2 | 26/26 | matched | 10 | — | generated country-policy copy requires calculator-specific editorial review |
| `philippines-philhealth-calculator` | salary | POLICY 2026 | 1 | 2 | 26/26 | matched | 10 | — | generated country-policy copy requires calculator-specific editorial review |
| `philippines-pagibig-calculator` | salary | POLICY 2026 | 1 | 2 | 26/26 | matched | 10 | — | generated country-policy copy requires calculator-specific editorial review |
| `uae-gratuity-calculator` | salary | POLICY 2026 | 3 | 2 | 26/26 | matched | 4 | — | generated country-policy copy requires calculator-specific editorial review |
| `uae-end-of-service-calculator` | salary | POLICY 2026 | 3 | 2 | 26/26 | matched | 4 | uk: exact duplicate howTo with uae-gratuity-calculator | generated country-policy copy requires calculator-specific editorial review |
| `uae-vat-calculator` | tax | POLICY 2026 | 3 | 1 | 26/26 | matched | 4 | uk: exact duplicate howTo with uae-gratuity-calculator; ms: exact duplicate description with uk-vat-calculator | generated country-policy copy requires calculator-specific editorial review |
| `uae-corporate-tax-calculator` | tax | POLICY 2026 | 1 | 2 | 26/26 | matched | 4 | tr: exact duplicate FAQ with minimum-wage; uk: exact duplicate howTo with uae-gratuity-calculator | generated country-policy copy requires calculator-specific editorial review |
| `new-zealand-gross-net-salary-calculator` | salary | POLICY 2026 | 2 | 2 | 26/26 | matched | 5 | sv: exact duplicate howTo with uk-gross-net-salary-calculator | generated country-policy copy requires calculator-specific editorial review |
| `new-zealand-income-tax-calculator` | tax | POLICY 2026 | 1 | 2 | 26/26 | matched | 5 | fil: exact duplicate howTo with canada-income-tax-calculator; uk: exact duplicate howTo with new-zealand-gross-net-salary-calculator | generated country-policy copy requires calculator-specific editorial review |
| `new-zealand-gst-calculator` | tax | POLICY 2026 | 3 | 1 | 26/26 | matched | 5 | tr: exact duplicate FAQ with minimum-wage; fil: exact duplicate howTo with australia-gst-calculator; uk: exact duplicate howTo with new-zealand-gross-net-salary-calculator | generated country-policy copy requires calculator-specific editorial review |
| `new-zealand-kiwisaver-calculator` | finance | POLICY 2026 | 5 | 2 | 26/26 | matched | 5 | uk: exact duplicate howTo with new-zealand-gross-net-salary-calculator | generated country-policy copy requires calculator-specific editorial review |
| `spain-freelancer-tax-calculator` | salary | POLICY 2026 | 5 | 2 | 26/26 | matched | 5 | — | generated country-policy copy requires calculator-specific editorial review |
| `france-social-contribution-calculator` | salary | POLICY 2026 | 1 | 2 | 26/26 | matched | 5 | tr: exact duplicate FAQ with minimum-wage | generated country-policy copy requires calculator-specific editorial review |

## Follow-up required

- The model formula/explanation and engine-generated example were improved for the 90 country-policy pages. Review the remaining calculator-specific purpose, detailed assumptions and FAQs individually before treating the pages as fully edited.
- Verify the policy rules and effective dates for the remaining sources. Only sources with an explicit per-source checked date were opened in this review; source presence and checked links do not validate every country rule.
- Review translation terminology and long-copy rendering for each published locale. Core-locale formula improvements do not certify all 26 locale translations; short-content and duplicate signals remain review candidates.
- Check the flagged rows above before treating the catalog as fully editorially reviewed. Pages without structural flags still need a human content and domain review.

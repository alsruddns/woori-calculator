# Calculator content completion checkpoint

Updated: 2026-10-27

This register separates earlier result-note work from full content completion. A route or a non-empty content field alone does not make a calculator COMPLETE.

- Published calculators: 169
- Public locale routes: 26 per calculator (4394 detail pages)
- COMPLETE: 30
- VALIDATING: 5
- DRAFT: 10
- BLOCKED policy calculators: 99
- PENDING static calculators: 25
- Previously improved result-note calculators remain DRAFT: average, weighted-average, unit-price, probability, area, fraction, percentile, standard-deviation, aspect-ratio, scale-ratio

## Completion gate

COMPLETE requires calculator-specific purpose, input/unit meaning, implemented formula and assumptions, engine-matched example, result interpretation, limitations, useful FAQ, related links where present, all 26 localized page records, SSR body verification, and passing content/locale checks. Native-speaker review is not claimed.

## Latest completed batch

stock-profit-after-fees-calculator, loan-early-repayment-calculator, rent-vs-buy-calculator, electricity-cost-calculator, travel-budget-calculator. Added distinct examples and interpretation notes to all 26 locale records. Engine/content tests, TypeScript, lint, and diff checks passed. Playwright verified 26-locale SSR, five browser calculation flows, and all eight required viewport widths without horizontal overflow. Native-speaker review was not performed.

freelancer-hourly-rate-calculator, break-even-point-calculator, savings-interest, deposit-interest, loan-interest. Added distinct 26-locale worked examples with scope notes. Finance and content tests passed (35); TypeScript, lint, and diff checks passed. Playwright verified SSR content across all 26 locale routes, five real browser calculation flows, and five detail pages at all eight viewport widths without horizontal overflow. The loan example was corrected from 794 to 796 after browser output exposed monthly rounding; rerun passed. Native-speaker review was not performed.

change-rate, discount, cagr, simple-interest, compound-interest. Added distinct result interpretation copy to all 26 locale records. Calculation engine tests passed (29); content, locale, and example checks passed; TypeScript, lint, and diff checks passed. Playwright verified reviewed SSR across all 26 locales, example/FAQ rendering on all 15 calculators across the two completed batches, and all 8 viewport widths across both batches. Native-speaker review was not performed.

date-difference, dday, age, workdays, unit-converter. Added distinct interpretation notes across all 26 locale records. Date/conversion engine tests passed (29), content/locale/example checks passed, TypeScript/lint passed, and Playwright verified SSR on all 26 locale routes, all five example/FAQ pages, all five browser input/result flows, and all eight viewports with no horizontal overflow. Native-speaker review was not performed.

fire-retirement-calculator, dividend-growth-calculator, inflation-adjusted-return-calculator, position-size-calculator, stop-loss-take-profit-calculator. Added distinct financial scenario interpretations to all 26 locale records. Finance engine tests passed (12), content/locale/example checks passed, TypeScript/lint passed, and Playwright verified SSR on all 26 locale routes, all five example/FAQ pages, five browser input/result flows, and all eight viewport widths without horizontal overflow. Native-speaker review was not performed.

## Current batch under validation

stock-average-price, dividend, profit-loss, margin, markup. Static arithmetic calculators; avoid jurisdiction-specific or investment outcome claims. Match each scenario to the current calculation engine before localization.

## Calculator register

| Calculator | Category | Rule class | Locale records | Status | Checkpoint |
| --- | --- | --- | ---: | --- | --- |
| `percentage` | math | STATIC | 26/26 | COMPLETE | Localized details and examples verified; engine, 26-locale SSR, and 8-width responsive checks passed. |
| `discount` | math | STATIC | 26/26 | COMPLETE | Localized interpretation, engine example, SSR, FAQ, and responsive checks passed. |
| `change-rate` | math | STATIC | 26/26 | COMPLETE | Localized interpretation, engine example, SSR, FAQ, and responsive checks passed. |
| `ratio` | math | STATIC | 26/26 | COMPLETE | Engine example, localized details, and SSR verified for this batch. |
| `average` | math | STATIC | 26/26 | DRAFT | Result-interpretation additions only; full-content criteria not verified. |
| `weighted-average` | math | STATIC | 26/26 | DRAFT | Result-interpretation additions only; full-content criteria not verified. |
| `cagr` | math | STATIC | 26/26 | COMPLETE | Localized interpretation, engine example, SSR, FAQ, and responsive checks passed. |
| `proportion` | math | STATIC | 26/26 | COMPLETE | Engine example, localized details, and SSR verified for this batch. |
| `aspect-ratio` | math | STATIC | 26/26 | DRAFT | Result-interpretation additions only; full-content criteria not verified. |
| `scale-ratio` | math | STATIC | 26/26 | DRAFT | Result-interpretation additions only; full-content criteria not verified. |
| `fraction` | math | STATIC | 26/26 | DRAFT | Result-interpretation additions only; full-content criteria not verified. |
| `decimal-fraction` | math | STATIC | 26/26 | COMPLETE | Engine example, localized details, and SSR verified for this batch. |
| `standard-deviation` | math | STATIC | 26/26 | DRAFT | Result-interpretation additions only; full-content criteria not verified. |
| `median` | math | STATIC | 26/26 | COMPLETE | Engine example, localized details, and SSR verified for this batch. |
| `percentile` | math | STATIC | 26/26 | DRAFT | Result-interpretation additions only; full-content criteria not verified. |
| `probability` | math | STATIC | 26/26 | DRAFT | Result-interpretation additions only; full-content criteria not verified. |
| `fire-retirement-calculator` | finance | STATIC | 26/26 | COMPLETE | Withdrawal-rate assumption, target-only scope, engine example, SSR, browser, and responsive checks passed. |
| `dividend-growth-calculator` | finance | STATIC | 26/26 | COMPLETE | Compounded dividend scenario and non-guarantee note match engine; SSR, browser, and responsive checks passed. |
| `inflation-adjusted-return-calculator` | finance | STATIC | 26/26 | COMPLETE | Nominal and real annualized returns distinguished; engine precision, SSR, browser, and responsive checks passed. |
| `position-size-calculator` | finance | STATIC | 26/26 | COMPLETE | Risk budget and stop-distance example match engine; excluded execution costs are stated. |
| `stop-loss-take-profit-calculator` | finance | STATIC | 26/26 | COMPLETE | Stop, target, and potential ratio match engine; no execution or profit guarantee asserted. |
| `stock-profit-after-fees-calculator` | finance | STATIC | 26/26 | PENDING | Not yet reviewed for this editorial completion effort. |
| `loan-early-repayment-calculator` | finance | STATIC | 26/26 | PENDING | Not yet reviewed for this editorial completion effort. |
| `rent-vs-buy-calculator` | life | STATIC | 26/26 | PENDING | Not yet reviewed for this editorial completion effort. |
| `electricity-cost-calculator` | life | STATIC | 26/26 | PENDING | Not yet reviewed for this editorial completion effort. |
| `travel-budget-calculator` | life | STATIC | 26/26 | PENDING | Not yet reviewed for this editorial completion effort. |
| `freelancer-hourly-rate-calculator` | finance | STATIC | 26/26 | COMPLETE | Localized hourly-rate scenario verified against the engine; pre-tax scope stated. |
| `break-even-point-calculator` | tax | STATIC | 26/26 | COMPLETE | Contribution margin, integer threshold, and revenue scenario verified; no policy rule applied. |
| `compound-interest` | finance | STATIC | 26/26 | COMPLETE | Localized interpretation, engine example, SSR, FAQ, and responsive checks passed; tax and fee effects excluded. |
| `simple-interest` | finance | STATIC | 26/26 | COMPLETE | Localized interpretation, engine example, SSR, FAQ, and responsive checks passed; pre-tax simple-interest estimate. |
| `savings-interest` | finance | STATIC | 26/26 | COMPLETE | Monthly contribution example matches the engine's simple-rate approximation; product terms excluded. |
| `deposit-interest` | finance | STATIC | 26/26 | COMPLETE | Six-month simple-interest example matches engine output; compounding and tax excluded. |
| `loan-interest` | finance | STATIC | 26/26 | COMPLETE | Equal-payment scenario matches monthly rounded schedule; browser output verified, lender terms excluded. |
| `ltv` | finance | STATIC | 26/26 | PENDING | Not yet reviewed for this editorial completion effort. |
| `dti` | finance | STATIC | 26/26 | PENDING | Not yet reviewed for this editorial completion effort. |
| `dsr` | finance | STATIC | 26/26 | PENDING | Not yet reviewed for this editorial completion effort. |
| `stock-average-price` | finance | STATIC | 26/26 | VALIDATING | Selected for the next static arithmetic batch. |
| `dividend` | finance | STATIC | 26/26 | VALIDATING | Selected for the next static arithmetic batch; no yield guarantees. |
| `profit-loss` | finance | STATIC | 26/26 | VALIDATING | Selected for the next static arithmetic batch. |
| `loan-refinance` | finance | STATIC | 26/26 | PENDING | Not yet reviewed for this editorial completion effort. |
| `prepayment-fee` | finance | STATIC | 26/26 | PENDING | Not yet reviewed for this editorial completion effort. |
| `loan-affordability` | finance | STATIC | 26/26 | PENDING | Not yet reviewed for this editorial completion effort. |
| `salary-conversion` | salary | STATIC | 26/26 | PENDING | Not yet reviewed for this editorial completion effort. |
| `hourly-wage` | salary | STATIC | 26/26 | PENDING | Not yet reviewed for this editorial completion effort. |
| `annual-leave-allowance` | salary | STATIC | 26/26 | PENDING | Not yet reviewed for this editorial completion effort. |
| `vat` | tax | STATIC | 26/26 | PENDING | Not yet reviewed for this editorial completion effort. |
| `unit-price` | math | STATIC | 26/26 | DRAFT | Result-interpretation additions only; full-content criteria not verified. |
| `margin` | finance | STATIC | 26/26 | VALIDATING | Selected for the next static arithmetic batch. |
| `markup` | finance | STATIC | 26/26 | VALIDATING | Selected for the next static arithmetic batch. |
| `product-margin` | finance | STATIC | 26/26 | PENDING | Not yet reviewed for this editorial completion effort. |
| `withholding-tax-3-3` | tax | STATIC | 26/26 | PENDING | Not yet reviewed for this editorial completion effort. |
| `date-difference` | date-time | STATIC | 26/26 | COMPLETE | Engine example, localized endpoint-count explanation, SSR, browser form, and responsive checks passed. |
| `dday` | date-time | STATIC | 26/26 | COMPLETE | Engine example, localized D−N interpretation, SSR, browser form, and responsive checks passed. |
| `age` | life | STATIC | 26/26 | COMPLETE | Completed age and year-based reference values explained; browser example passed. Legal age is not asserted. |
| `workdays` | date-time | STATIC | 26/26 | COMPLETE | Inclusive endpoints and holiday exclusion are explained; engine, browser, and responsive checks passed. |
| `bmi` | life | STATIC | 26/26 | PENDING | Not yet reviewed for this editorial completion effort. |
| `area` | life | STATIC | 26/26 | DRAFT | Result-interpretation additions only; full-content criteria not verified. |
| `pace` | life | STATIC | 26/26 | PENDING | Not yet reviewed for this editorial completion effort. |
| `fuel-cost` | life | STATIC | 26/26 | PENDING | Not yet reviewed for this editorial completion effort. |
| `fuel-efficiency` | life | STATIC | 26/26 | PENDING | Not yet reviewed for this editorial completion effort. |
| `calorie-per-serving` | life | STATIC | 26/26 | PENDING | Not yet reviewed for this editorial completion effort. |
| `tenure` | date-time | STATIC | 26/26 | PENDING | Not yet reviewed for this editorial completion effort. |
| `time-arithmetic` | date-time | STATIC | 26/26 | PENDING | Not yet reviewed for this editorial completion effort. |
| `pregnancy` | date-time | STATIC | 26/26 | PENDING | Not yet reviewed for this editorial completion effort. |
| `utility-bill` | life | STATIC | 26/26 | PENDING | Not yet reviewed for this editorial completion effort. |
| `vehicle-cost` | life | STATIC | 26/26 | PENDING | Not yet reviewed for this editorial completion effort. |
| `taxi-fare` | life | STATIC | 26/26 | PENDING | Not yet reviewed for this editorial completion effort. |
| `trip-split` | life | STATIC | 26/26 | PENDING | Not yet reviewed for this editorial completion effort. |
| `tip-calculator` | life | STATIC | 26/26 | PENDING | Not yet reviewed for this editorial completion effort. |
| `unit-converter` | math | STATIC | 26/26 | COMPLETE | Mile conversion and temperature offset example match engine tests; browser flow and responsive checks passed. |
| `unemployment-benefit` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `minimum-wage` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `severance-pay` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `social-insurance` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `japan-consumption-tax-calculator` | tax | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `japan-annual-salary-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `japan-monthly-salary-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `japan-overtime-pay-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `japan-night-holiday-pay-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `germany-gross-net-salary-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `germany-income-tax-calculator` | tax | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `germany-vat-calculator` | tax | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `germany-overtime-pay-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `germany-vacation-pay-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `spain-gross-net-salary-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `spain-irpf-calculator` | tax | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `spain-vat-calculator` | tax | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `spain-severance-pay-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `france-gross-net-salary-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `france-income-tax-calculator` | tax | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `france-vat-calculator` | tax | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `france-overtime-pay-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `netherlands-gross-net-salary-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `netherlands-vat-calculator` | tax | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `netherlands-30-percent-ruling-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `netherlands-holiday-allowance-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `india-gst-calculator` | tax | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `india-sip-calculator` | finance | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `india-ppf-calculator` | finance | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `india-nps-calculator` | finance | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `india-gross-net-salary-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `india-income-tax-calculator` | tax | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `brazil-gross-net-salary-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `brazil-inss-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `brazil-irrf-calculator` | tax | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `brazil-fgts-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `brazil-thirteenth-salary-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `vietnam-gross-net-salary-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `vietnam-personal-income-tax-calculator` | tax | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `vietnam-social-insurance-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `china-gross-net-salary-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `china-individual-income-tax-calculator` | tax | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `china-social-insurance-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `china-vat-calculator` | tax | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `taiwan-gross-net-salary-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `taiwan-income-tax-calculator` | tax | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `taiwan-labor-insurance-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `taiwan-vat-calculator` | tax | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `italy-gross-net-salary-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `italy-income-tax-calculator` | tax | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `italy-vat-calculator` | tax | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `us-paycheck-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `us-income-tax-calculator` | tax | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `us-sales-tax-calculator` | tax | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `us-401k-calculator` | finance | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `us-roth-ira-calculator` | finance | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `us-capital-gains-tax-calculator` | tax | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `uk-gross-net-salary-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `uk-income-tax-calculator` | tax | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `uk-national-insurance-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `uk-vat-calculator` | tax | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `uk-stamp-duty-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `uk-pension-calculator` | finance | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `canada-gross-net-salary-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `canada-income-tax-calculator` | tax | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `canada-gst-hst-calculator` | tax | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `canada-cpp-ei-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `canada-rrsp-calculator` | finance | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `australia-gross-net-salary-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `australia-income-tax-calculator` | tax | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `australia-gst-calculator` | tax | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `australia-superannuation-calculator` | finance | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `australia-stamp-duty-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `singapore-gross-net-salary-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `singapore-income-tax-calculator` | tax | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `singapore-cpf-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `singapore-gst-calculator` | tax | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `hong-kong-salary-tax-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `hong-kong-mpf-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `hong-kong-stamp-duty-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `malaysia-income-tax-calculator` | tax | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `malaysia-epf-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `malaysia-socso-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `malaysia-sst-calculator` | tax | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `philippines-gross-net-salary-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `philippines-income-tax-calculator` | tax | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `philippines-sss-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `philippines-philhealth-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `philippines-pagibig-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `uae-gratuity-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `uae-end-of-service-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `uae-vat-calculator` | tax | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `uae-corporate-tax-calculator` | tax | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `new-zealand-gross-net-salary-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `new-zealand-income-tax-calculator` | tax | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `new-zealand-gst-calculator` | tax | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `new-zealand-kiwisaver-calculator` | finance | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `spain-freelancer-tax-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `france-social-contribution-calculator` | salary | POLICY | 26/26 | BLOCKED | Official rule and effective date need verification; do not change policy values. |

## Next batch queue

After the current batch is committed: change-rate, discount, cagr, simple-interest, compound-interest. Recheck status and existing copy before editing.

# Calculator content completion checkpoint

Updated: 2026-10-28

This register separates earlier result-note work from full content completion. A route or a non-empty content field alone does not make a calculator COMPLETE.

- Published calculators: 169
- Public locale routes: 26 per calculator (4394 detail pages)
- COMPLETE: 68
- VALIDATING: 0
- DRAFT: 0
- BLOCKED policy calculators: 99
- PENDING static calculators: 2
- Latest audit signals: short-content 16 (baseline 71); exact duplicate blocks 354 (baseline 359). These totals include locale records and remain review indicators, not quality completion scores.
- Remaining static candidates: vat, withholding-tax-3-3 (review policy basis before completing)

## Completion gate

COMPLETE requires calculator-specific purpose, input/unit meaning, implemented formula and assumptions, engine-matched example, result interpretation, limitations, useful FAQ, related links where present, all 26 localized page records, SSR body verification, and passing content/locale checks. Native-speaker review is not claimed.

## Latest completed batch

fraction, standard-deviation, vehicle-cost, taxi-fare, tip-calculator. Added calculator-specific worked examples and interpretation limits across all 26 locales. Tests verify each localized detail has purpose, input guidance, formula, example, and at least two FAQs; engine/content tests passed (16), full regression passed (1,105 tests across 210 files), content audit passed, TypeScript/lint passed, and production build generated all 4,423 static routes. Playwright verified 26 locale SSR examples, all five browser calculation flows, and all five detail pages at eight viewport widths without horizontal overflow. Native-speaker review was not performed.

annual-leave-allowance, tenure, time-arithmetic, pregnancy, utility-bill. Added distinct arithmetic/date examples and interpretation limits across all 26 locales. Date-life/finance/content tests passed (14); TypeScript, lint, and diff checks passed. Playwright verified localized SSR example content on all 26 locale routes, one browser calculation flow, and all eight viewport widths without horizontal overflow. No legal leave entitlement, clinical due-date guarantee, tariff schedule, tax, or additional fee rules are inferred. Native-speaker review was not performed.

loan-affordability, hourly-wage, fuel-efficiency, calorie-per-serving, trip-split. Added distinct worked examples and interpretation boundaries across all 26 locales. Finance/date-life/content tests passed (37); TypeScript, lint, and diff checks passed. Playwright verified initial SSR examples across 26 locales, five live calculation flows, and five detail pages at all eight viewport widths without horizontal overflow. Native-speaker review was not performed.

ltv, dti, dsr, loan-refinance, prepayment-fee. Added individual worked examples and interpretation limits in all 26 locales. Finance/content tests (29), TypeScript, lint, and diff checks passed. Playwright verified localized example text in initial SSR HTML across 26 locales, five live calculation flows, and five pages at all eight required widths without horizontal overflow. Fixed refinance month-unit rendering to use the active locale dictionary. No policy rates or approval rules were changed. Native-speaker review was not performed.

product-margin, salary-conversion, bmi, pace, fuel-cost. Added distinct 26-locale examples and interpretations tied to each implemented model. Engine/content tests passed (40); TypeScript, lint, and diff checks passed. Playwright verified five browser calculation flows, initial SSR examples across all 26 locales, and all eight required viewport widths without horizontal overflow. The AdSense external script logged its own console warning; no calculator page errors were reported. Native-speaker review was not performed.

stock-average-price, dividend, profit-loss, margin, markup. Added distinct calculation examples and interpretation notes to all 26 locale records. Finance/tax/content tests passed (45); TypeScript, lint, and diff checks passed. Playwright verified SSR across all 26 locale routes, five calculation flows, and all eight viewports without horizontal overflow. Browser output confirmed the average-price mode switch and locale-formatted percentage spacing; the test was aligned to the UI. Native-speaker review was not performed.

stock-profit-after-fees-calculator, loan-early-repayment-calculator, rent-vs-buy-calculator, electricity-cost-calculator, travel-budget-calculator. Added distinct examples and interpretation notes to all 26 locale records. Engine/content tests, TypeScript, lint, and diff checks passed. Playwright verified 26-locale SSR, five browser calculation flows, and all eight required viewport widths without horizontal overflow. Native-speaker review was not performed.

freelancer-hourly-rate-calculator, break-even-point-calculator, savings-interest, deposit-interest, loan-interest. Added distinct 26-locale worked examples with scope notes. Finance and content tests passed (35); TypeScript, lint, and diff checks passed. Playwright verified SSR content across all 26 locale routes, five real browser calculation flows, and five detail pages at all eight viewport widths without horizontal overflow. The loan example was corrected from 794 to 796 after browser output exposed monthly rounding; rerun passed. Native-speaker review was not performed.

change-rate, discount, cagr, simple-interest, compound-interest. Added distinct result interpretation copy to all 26 locale records. Calculation engine tests passed (29); content, locale, and example checks passed; TypeScript, lint, and diff checks passed. Playwright verified reviewed SSR across all 26 locales, example/FAQ rendering on all 15 calculators across the two completed batches, and all 8 viewport widths across both batches. Native-speaker review was not performed.

date-difference, dday, age, workdays, unit-converter. Added distinct interpretation notes across all 26 locale records. Date/conversion engine tests passed (29), content/locale/example checks passed, TypeScript/lint passed, and Playwright verified SSR on all 26 locale routes, all five example/FAQ pages, all five browser input/result flows, and all eight viewports with no horizontal overflow. Native-speaker review was not performed.

fire-retirement-calculator, dividend-growth-calculator, inflation-adjusted-return-calculator, position-size-calculator, stop-loss-take-profit-calculator. Added distinct financial scenario interpretations to all 26 locale records. Finance engine tests passed (12), content/locale/example checks passed, TypeScript/lint passed, and Playwright verified SSR on all 26 locale routes, all five example/FAQ pages, five browser input/result flows, and all eight viewport widths without horizontal overflow. Native-speaker review was not performed.

percentile, aspect-ratio, scale-ratio. Added localized nearest-rank, aspect simplification, and scale conversion examples in all 26 locales. Engine/content tests passed (14); TypeScript, lint, and diff checks passed. Playwright verified all 26 locale SSR examples, all three live calculator flows, and eight viewport widths with no horizontal overflow. The 320px viewport initially timed out during a loaded run, then passed on isolated rerun. Native-speaker review was not performed.

average, weighted-average, unit-price, probability, area. Added localized worked examples and interpretation limits for all 26 locales. Focused engine/content tests passed (48); TypeScript, lint, and diff checks passed. Playwright verified localized example text in initial SSR HTML across all 26 locales, all five calculator result flows in the browser, and all five pages at eight viewport widths without horizontal overflow. No native-speaker review was performed.

## Current batch under validation

None. The latest three-calculator batch passed engine/content tests, locale SSR, browser flows, and viewport checks.

## Calculator register

| Calculator | Category | Rule class | Locale records | Status | Checkpoint |
| --- | --- | --- | ---: | --- | --- |
| `percentage` | math | STATIC | 26/26 | COMPLETE | Localized details and examples verified; engine, 26-locale SSR, and 8-width responsive checks passed. |
| `discount` | math | STATIC | 26/26 | COMPLETE | Localized interpretation, engine example, SSR, FAQ, and responsive checks passed. |
| `change-rate` | math | STATIC | 26/26 | COMPLETE | Localized interpretation, engine example, SSR, FAQ, and responsive checks passed. |
| `ratio` | math | STATIC | 26/26 | COMPLETE | Engine example, localized details, and SSR verified for this batch. |
| `average` | math | STATIC | 26/26 | COMPLETE | Mean 20 for inputs 10, 20, 30; engine example, localized SSR, browser flow, and responsive checks passed. |
| `weighted-average` | math | STATIC | 26/26 | COMPLETE | Weighted mean 95 for values 80/100 with weights 1/3; scaling and engine example verified. |
| `cagr` | math | STATIC | 26/26 | COMPLETE | Localized interpretation, engine example, SSR, FAQ, and responsive checks passed. |
| `proportion` | math | STATIC | 26/26 | COMPLETE | Engine example, localized details, and SSR verified for this batch. |
| `aspect-ratio` | math | STATIC | 26/26 | COMPLETE | 2,560×1,440 reduces to 16:9; engine, localized SSR, browser input, and responsive checks passed. |
| `scale-ratio` | math | STATIC | 26/26 | COMPLETE | 1:100 drawing length 5 cm converts to actual 5 m; unit conversion, SSR, browser, and viewport checks passed. |
| `fraction` | math | STATIC | 26/26 | COMPLETE | Localized formula and example verified; denominator and zero-divisor limits documented; 26-locale SSR and browser calculation passed. |
| `decimal-fraction` | math | STATIC | 26/26 | COMPLETE | Engine example, localized details, and SSR verified for this batch. |
| `standard-deviation` | math | STATIC | 26/26 | COMPLETE | Population example matches engine (mean 5, variance 4, standard deviation 2); sample minimum and 26-locale SSR verified. |
| `median` | math | STATIC | 26/26 | COMPLETE | Engine example, localized details, and SSR verified for this batch. |
| `percentile` | math | STATIC | 26/26 | COMPLETE | Nearest-rank 60th percentile of 1–5 is 3; engine, localized SSR, browser, and viewport checks passed. |
| `probability` | math | STATIC | 26/26 | COMPLETE | Three independent 20% trials yield 48.8% chance of at least one success; independence and non-prediction limits stated. |
| `fire-retirement-calculator` | finance | STATIC | 26/26 | COMPLETE | Withdrawal-rate assumption, target-only scope, engine example, SSR, browser, and responsive checks passed. |
| `dividend-growth-calculator` | finance | STATIC | 26/26 | COMPLETE | Compounded dividend scenario and non-guarantee note match engine; SSR, browser, and responsive checks passed. |
| `inflation-adjusted-return-calculator` | finance | STATIC | 26/26 | COMPLETE | Nominal and real annualized returns distinguished; engine precision, SSR, browser, and responsive checks passed. |
| `position-size-calculator` | finance | STATIC | 26/26 | COMPLETE | Risk budget and stop-distance example match engine; excluded execution costs are stated. |
| `stop-loss-take-profit-calculator` | finance | STATIC | 26/26 | COMPLETE | Stop, target, and potential ratio match engine; no execution or profit guarantee asserted. |
| `stock-profit-after-fees-calculator` | finance | STATIC | 26/26 | COMPLETE | Localized scenario, engine example, SSR, browser flow, and responsive checks passed. |
| `loan-early-repayment-calculator` | finance | STATIC | 26/26 | COMPLETE | Localized extra-payment scenario, engine example, SSR, browser flow, and responsive checks passed. |
| `rent-vs-buy-calculator` | life | STATIC | 26/26 | COMPLETE | Localized comparison assumptions and engine example verified; SSR and responsive checks passed. |
| `electricity-cost-calculator` | life | STATIC | 26/26 | COMPLETE | Consumption and tariff example verified; browser and responsive checks passed. |
| `travel-budget-calculator` | life | STATIC | 26/26 | COMPLETE | Per-person trip budget scenario and limits verified; browser and responsive checks passed. |
| `freelancer-hourly-rate-calculator` | finance | STATIC | 26/26 | COMPLETE | Localized hourly-rate scenario verified against the engine; pre-tax scope stated. |
| `break-even-point-calculator` | tax | STATIC | 26/26 | COMPLETE | Contribution margin, integer threshold, and revenue scenario verified; no policy rule applied. |
| `compound-interest` | finance | STATIC | 26/26 | COMPLETE | Localized interpretation, engine example, SSR, FAQ, and responsive checks passed; tax and fee effects excluded. |
| `simple-interest` | finance | STATIC | 26/26 | COMPLETE | Localized interpretation, engine example, SSR, FAQ, and responsive checks passed; pre-tax simple-interest estimate. |
| `savings-interest` | finance | STATIC | 26/26 | COMPLETE | Monthly contribution example matches the engine's simple-rate approximation; product terms excluded. |
| `deposit-interest` | finance | STATIC | 26/26 | COMPLETE | Six-month simple-interest example matches engine output; compounding and tax excluded. |
| `loan-interest` | finance | STATIC | 26/26 | COMPLETE | Equal-payment scenario matches monthly rounded schedule; browser output verified, lender terms excluded. |
| `ltv` | finance | STATIC | 26/26 | COMPLETE | 40% loan-to-home value example verified against the ratio engine; no approval or regulatory cap is implied. |
| `dti` | finance | STATIC | 26/26 | COMPLETE | 22% example matches the simplified annual mortgage principal/interest plus other-debt interest calculation; regulatory formulas excluded. |
| `dsr` | finance | STATIC | 26/26 | COMPLETE | 20% example matches entered total annual debt principal and interest divided by income; stress tests and lender rules excluded. |
| `stock-average-price` | finance | STATIC | 26/26 | COMPLETE | Weighted cost-basis example verified; fees excluded and target-return mode left unchanged. |
| `dividend` | finance | STATIC | 26/26 | COMPLETE | Gross dividend and entered-price yield example verified; taxes and future payments excluded. |
| `profit-loss` | finance | STATIC | 26/26 | COMPLETE | User-entered purchase/sale costs example matches net proceeds and return formula. |
| `loan-refinance` | finance | STATIC | 26/26 | COMPLETE | Net-savings example matches monthly annuity formulas and rounded output; fixed-rate, equal-payment and fee assumptions stated. |
| `prepayment-fee` | finance | STATIC | 26/26 | COMPLETE | 1.5% of entered repayment example matches engine; exemptions, elapsed-time schedules, and contract-specific fees excluded. |
| `loan-affordability` | finance | STATIC | 26/26 | COMPLETE | Zero-rate annuity example matches engine principal, total payment, and interest; not an approval estimate. |
| `salary-conversion` | salary | STATIC | 26/26 | COMPLETE | Monthly-to-annual example matches the multiply-by-12 engine; no payroll deductions applied. |
| `hourly-wage` | salary | STATIC | 26/26 | COMPLETE | Monthly-to-hourly example matches entered-hours calculation; no statutory wage rule is asserted. |
| `annual-leave-allowance` | salary | STATIC | 26/26 | COMPLETE | Example: 100,000 times 3 days = 300,000; arithmetic only, no statutory entitlement assessment. Engine, locale SSR, and responsive checks passed. |
| `vat` | tax | STATIC | 26/26 | PENDING | Not yet reviewed for this editorial completion effort. |
| `unit-price` | math | STATIC | 26/26 | COMPLETE | 10,000 divided by 3 gives 3,333.33; engine rounding and comparable-unit limitation verified. |
| `margin` | finance | STATIC | 26/26 | COMPLETE | Sales-based margin denominator distinguished and example verified. |
| `markup` | finance | STATIC | 26/26 | COMPLETE | Cost-based markup denominator distinguished and example verified. |
| `product-margin` | finance | STATIC | 26/26 | COMPLETE | Localized example, engine output, 26-locale SSR, browser flow, and eight viewport checks passed. |
| `withholding-tax-3-3` | tax | STATIC | 26/26 | PENDING | Not yet reviewed for this editorial completion effort. |
| `date-difference` | date-time | STATIC | 26/26 | COMPLETE | Engine example, localized endpoint-count explanation, SSR, browser form, and responsive checks passed. |
| `dday` | date-time | STATIC | 26/26 | COMPLETE | Engine example, localized D−N interpretation, SSR, browser form, and responsive checks passed. |
| `age` | life | STATIC | 26/26 | COMPLETE | Completed age and year-based reference values explained; browser example passed. Legal age is not asserted. |
| `workdays` | date-time | STATIC | 26/26 | COMPLETE | Inclusive endpoints and holiday exclusion are explained; engine, browser, and responsive checks passed. |
| `bmi` | life | STATIC | 26/26 | COMPLETE | Height/weight calculation and rounded example verified; health metric only, not diagnosis. |
| `area` | life | STATIC | 26/26 | COMPLETE | 10 pyeong converts to 33.06 m² using 400/121; rounding and legal-area-category limitation stated. |
| `pace` | life | STATIC | 26/26 | COMPLETE | Distance/time example matches pace and speed outputs; unit labels verified in browser. |
| `fuel-cost` | life | STATIC | 26/26 | COMPLETE | Distance/efficiency/entered-price example matches fuel volume and cost outputs; price is user supplied. |
| `fuel-efficiency` | life | STATIC | 26/26 | COMPLETE | 520 km and 40 L example matches both km/L and L/100 km engine outputs. |
| `calorie-per-serving` | life | STATIC | 26/26 | COMPLETE | 600 kcal across three servings and one portion returns 200 kcal; proportional estimate only. |
| `tenure` | date-time | STATIC | 26/26 | COMPLETE | Calendar example: 2024-01-15 to 2025-03-20 = 1y 2m 5d, 14 complete months, 430 elapsed days. Engine, locale SSR, and responsive checks passed. |
| `time-arithmetic` | date-time | STATIC | 26/26 | COMPLETE | Example: 2h45m + 1h30m = 4h15m / 255 minutes. Engine, locale SSR, and responsive checks passed. |
| `pregnancy` | date-time | STATIC | 26/26 | COMPLETE | LMP 2026-01-01 + 280 days = estimated 2026-10-08; estimate only, clinical advice takes priority. Engine, locale SSR, and responsive checks passed. |
| `utility-bill` | life | STATIC | 26/26 | COMPLETE | Example: usage 20 times entered rate 500 + base 1,000 = 11,000; excludes tiered tariffs, taxes, and fees. Engine, locale SSR, and responsive checks passed. |
| `vehicle-cost` | life | STATIC | 26/26 | COMPLETE | User-entered distance, efficiency, fuel price, and monthly costs explained; 170,000 monthly fuel and 2,040,000 annual example verified. |
| `taxi-fare` | life | STATIC | 26/26 | COMPLETE | User-entered base, included distance, distance/time rates explained; 7,000 example verified, local fare adjustments excluded. |
| `trip-split` | life | STATIC | 26/26 | COMPLETE | 10,000 split among three matches fractional share and integer remainder allocation. |
| `tip-calculator` | life | STATIC | 26/26 | COMPLETE | Entered tip rate and equal split explained; 50,000 at 10% split by two yields 27,500 each. |
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

vat, withholding-tax-3-3. These use policy-related rates; verify official rules and applicable dates before presenting current-law claims. Keep the 99 blocked policy calculators in a separate official-source queue.

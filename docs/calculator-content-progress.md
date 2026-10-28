# Calculator content completion checkpoint

Updated: 2026-10-28

This register separates earlier result-note work from full content completion. A route or a non-empty content field alone does not make a calculator COMPLETE.

- Published calculators: 169
- Public locale routes: 26 per calculator (4394 detail pages)
- Content COMPLETE: 73
- VALIDATING: 0
- Content DRAFT: 96
- Policy VERIFIED: 9 (vat, uk-vat-calculator, australia-gst-calculator, singapore-gst-calculator, new-zealand-gst-calculator, minimum-wage, japan-overtime-pay-calculator, japan-night-holiday-pay-calculator, germany-vat-calculator)
- Policy PARTIAL: 8 (japan-consumption-tax-calculator; future schedule not date-modeled; canada-gst-hst-calculator; province/place classification absent; australia-income-tax-calculator; Medicare levy/offsets excluded; australia-superannuation-calculator; eligibility/contribution caps/tax excluded; singapore-cpf-calculator; graduated PR and additional-wage rules not modeled; severance-pay; eligibility and statutory average-wage calculation omitted; social-insurance; exact eligibility/pay-base adjustments excluded; unemployment-benefit; fixed 8-hour lower limit and monthly-wage × 3 ÷ 90 approximation do not establish eligibility or a legal personal daily wage)
- Policy BLOCKED: 84 (including withholding-tax-3-3)
- Policy PENDING: 0
- Latest audit signals: short-content 16 (baseline 71); exact duplicate blocks 345 (baseline 359). These totals include locale records and remain review indicators, not quality completion scores.
- Content completion and policy verification are tracked independently. The 97 DRAFT policy pages can receive safe, engine-grounded content while source review proceeds.

## Completion gate

COMPLETE requires calculator-specific purpose, input/unit meaning, implemented formula and assumptions, engine-matched example, result interpretation, limitations, useful FAQ, related links where present, all 26 localized page records, SSR body verification, and passing content/locale checks. Native-speaker review is not claimed.

## Latest policy/content batch (2026-10-28)

`canada-gst-hst-calculator`, `australia-gst-calculator`, `singapore-gst-calculator`, and `new-zealand-gst-calculator`: added localized worked examples and limitations in all 26 locales (104 localized calculator/locale records). Engine examples at CAD 100 ? 5%, AUD 100 ? 10%, SGD 100 ? 9%, and NZD 100 ? 15% produce tax/total pairs 5/105, 10/110, 9/109, and 15/115 respectively. The four examples and locale notes are checked by unit tests; SSR/page checks were added for Playwright. Source review on 2026-10-28: CRA confirms 5% GST in non-HST provinces and HST rates vary by province and place of supply; this page has a user-entered rate and no province selector, so Canada is PARTIAL. ATO confirms 10% on most supplies; IRAS confirms 9% effective 2024-01-01; Inland Revenue NZ confirms 15% on most taxable supplies. These three standard-rate arithmetic scopes are VERIFIED; supply classification remains outside the calculators. Engine/content tests passed (11 across two files), content audit passed (1), TypeScript and lint passed, and Playwright passed all 27 cases: locale SSR coverage, live calculations, and eight responsive widths without horizontal overflow. Content remains DRAFT until its purpose, formula, FAQs and remaining page copy are calculator-specific across locales. Native-speaker review not performed.

## Latest policy/content batch (2026-10-28): Australia tax/super and Singapore CPF

`australia-income-tax-calculator`, `australia-superannuation-calculator`, and `singapore-cpf-calculator`: added individually scoped worked examples to all 26 locales (78 localized calculator/locale records). Engine checks confirm AUD 80,000 gives AUD 14,520 income tax and 18.15% average rate in the configured resident 2026–27 schedule; AUD 100,000 salary with AUD 6,000 employee contribution, 12% employer, 0% return for one year projects AUD 18,000; SGD 6,000 monthly ordinary wages at age 35 gives SGD 1,200 employee + SGD 1,020 employer = SGD 2,220 under the configured full-rate category. ATO sources confirm the 2026–27 resident bands, SG 12% from 2025-07-01, and SG contribution cap/rules caveats. CPF Board confirms full contribution rates from 2026-01-01 and the SGD 8,000 ordinary-wage ceiling. All three policy entries remain PARTIAL because model exclusions affect the user's total liability/contribution. Source URLs checked 2026-10-28. Focused engine/content/audit tests passed (13 tests); TypeScript, lint and diff checks passed; Playwright passed 27 cases for locale SSR, the three live calculations and eight viewport widths with no horizontal overflow. Source URLs opened and compared this run: 17 total cumulative. No core calculation formula was changed.

## Latest policy/content batch (2026-10-28): South Korea minimum wage, severance, employee insurance

`minimum-wage`, `severance-pay`, and `social-insurance`: added worked examples and scope notes in all 26 locales (78 localized calculator/locale records). Official source review: the Minimum Wage Commission confirms the 2026 KRW 10,320 hourly, KRW 82,560 daily (8h), and KRW 2,156,880 monthly (209h) values; minimum-wage policy is VERIFIED for this displayed standard schedule. The Employee Retirement Benefit Security Act Article 8, effective 2026-09-18, confirms at least 30 days of average wage per continuous-service year; MOEL's calculator confirms 3-month wage averaging and ordinarily uses regular wage when higher. Since this engine takes average daily wage directly and does not test eligibility or statutory average-wage rules, severance is PARTIAL. NHIS confirms 2026 health 7.19% and long-term care 0.9448%; NPS confirms employee pension share 4.75% and July 2026–June 2027 standard monthly income limits KRW 410,000–6,590,000; EI confirms worker unemployment insurance 0.9%. Insurance remains PARTIAL for eligibility, pay-base exemptions and settlement detail. Example outcomes match current engines: KRW 10,000/hour is KRW 320 below the minimum; one inclusive service year at entered KRW 100,000 average daily wage estimates KRW 3,000,000; July–December 2026 employee insurance at KRW 4,000,000 wage base totals KRW 388,696. Sources checked 2026-10-28. Engine/content/audit tests passed (23); Playwright passed 26 locale SSR cases and the live calculation/responsive case across eight widths with no horizontal overflow or browser page errors. Full regression: 1,112/1,112 unit tests, lint, typecheck, production build (4,423 static routes) passed. Native-speaker review not performed.

## Latest policy/content batch (2026-10-28): Japan wage premiums and Germany VAT

`japan-overtime-pay-calculator`, `japan-night-holiday-pay-calculator`, and `germany-vat-calculator`: added distinct worked examples and scope notes for all 26 locales (78 localized calculator/locale records). MHLW confirms Japan's general minimum premium rates: overtime 25%, night work 25%, statutory holiday 35%, and overtime beyond 60 monthly hours 50%; the source also explains adding overlapping premiums. The overtime and night/holiday policy statuses are VERIFIED for those statutory minimum arithmetic rules; the calculator still relies on user-entered hours, base pay and rates. Example engine outputs: ¥1,500/hour × 10 ordinary overtime hours at 25% yields ¥15,000 base + ¥3,750 premium = ¥18,750; two overtime-and-night hours yield ¥3,000 base + ¥750 + ¥750 = ¥4,500. Germany VAT Act §12 confirms 19% standard and 7% reduced rates for specified supplies; the calculator accepts a user-entered rate and does not classify the transaction, so Germany VAT is VERIFIED for rate arithmetic only. Its example is €100 net at 19% = €19 VAT and €119 gross. Official pages checked 2026-10-28. Focused engine/content/audit/catalog checks: 27 tests passed; typecheck, lint and diff check passed. Playwright passed 26 locale SSR cases plus the live calculator case at 320, 360, 375, 390, 430, 768, 1024, and 1440px with no horizontal overflow or page errors. Payroll tax and social-insurance assumptions on Japan annual/monthly salary pages remain unreviewed and BLOCKED. Native-speaker review not performed.

## Latest completed batch

`vat` (South Korea): completed the policy review and calculator-specific content in all 26 locales. The 2026-01-02 effective VAT Act Article 30 confirms the 10% standard rate; the National Tax Service source distinguishes the simple calculation from exempt and simplified-taxpayer treatment. The localized example is KRW 100,000 supply → KRW 10,000 VAT → KRW 110,000 total; inclusive extraction divides by 1.1. It explains whole-won rounding, policy scope limits, and that display currency does not change the South Korean basis. Engine/content tests (23), TypeScript, lint, 26-locale SSR, live calculation, and all eight viewports passed. Native-speaker review was not performed.

`withholding-tax-3-3`, `japan-consumption-tax-calculator`, and `uk-vat-calculator`: added distinct worked examples and scope notes in all 26 locales. The examples match the existing engines: KRW 1,000,000 produces KRW 33,000 withholding under the coded 3% + 0.3% rule; ¥1,000 produces ¥100/¥80 tax at selected 10%/8%; £100 produces £20 VAT at the entered 20% rate. NTS sources confirm the 3.3% context and identify 2.2% as a proposal whose enactment/effective date remain unresolved, so withholding policy stays BLOCKED. NTA source checked 2026-10-28 confirms the 10%/8% options and identifies a scheduled 2027-04-01–2029-03-31 food-tax reduction; no date input exists, so Japan policy is PARTIAL. GOV.UK confirms the 20% standard rate; product classification and place-of-supply rules remain outside this rate-entry calculator. Focused engine/content tests (36), content audit, and TypeScript passed. Playwright passed all 27 cases, including locale SSR examples, live calculator flows, and eight responsive widths without horizontal overflow. Native-speaker review was not performed.

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

## Policy source review checkpoint — 2026-10-28

- `vat` (South Korea): VAT Act Article 30 states 10%; source checked on 2026-10-28: https://www.law.go.kr/LSW/lsLinkCommonInfo.do?lsJoLnkSeq=1031738785. The arithmetic matches the standard statutory rate. Its 26-locale copy now explains the South Korea basis and calculation limits, and the law/NTS sources are linked on-page.
- `withholding-tax-3-3` (South Korea): NTS pages state 3% withholding on qualifying business income and 3.3% including local income tax for qualifying resident personal-service business income: https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7902&mi=6466 and https://j.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=238925&mi=40349. However, an NTS notice dated 2026-10-01 describes a government tax-reform proposal to reduce the withholding rate from 3.3% to 2.2%, while noting that final approval was still being sought: https://i.nts.go.kr/wonju/na/ntt/selectNttInfo.do?mi=2201&nttSn=1355351. Leave this calculator BLOCKED until enacted status and effective date are confirmed; do not describe 3.3% as unconditionally current.

average, weighted-average, unit-price, probability, area. Added localized worked examples and interpretation limits for all 26 locales. Focused engine/content tests passed (48); TypeScript, lint, and diff checks passed. Playwright verified localized example text in initial SSR HTML across all 26 locales, all five calculator result flows in the browser, and all five pages at eight viewport widths without horizontal overflow. No native-speaker review was performed.

## Current batch under validation

`unemployment-benefit`: completed its calculator-specific localized worked example and policy source review on 2026-10-28. The official MOEL 1350 answer dated 2026-07-10 confirms the 2026-01-01 leaver daily cap of KRW 68,100, the 60% rate, the 8-hour floor of KRW 66,048 from the 2026 minimum wage, and duration bands. The Korea Minimum Wage Commission confirms KRW 10,320/hour for 2026. Example inputs KRW 3,400,000 monthly wage / age 35 / 0.9 insured years produce daily KRW 68,000, 120 days, and modeled total KRW 8,160,000 in the current engine. Sources checked 2026-10-28: https://1350.moel.go.kr/rtmview.do?id=1000324861 and https://www.minimumwage.go.kr/index.jsp. Policy status is PARTIAL because the model fixes 8 hours, approximates daily wage as monthly wage × 3 ÷ 90, and does not decide eligibility, separation reason, exact wage basis, prior benefit history, or official award. The generic Employment Insurance amount page was excluded from the listed current sources because it still displays the superseded KRW 66,000 cap. Example copy is authored in all 26 locales; native-speaker review was not performed.

Next policy candidates: continue with remaining country-specific POLICY DRAFT pages that can be safely described from the actual engine and checked official sources. Japan annual/monthly payroll pages remain BLOCKED pending resolution of current deduction schedule and simplified insurance assumptions. Keep withholding policy BLOCKED until the proposed rate change's enactment and effective date are confirmed; policy status remains separate from localized content completion.

## Calculator register

| Calculator | Category | Rule class | Locale records | Content status | Policy verification | Checkpoint |
| --- | --- | --- | ---: | --- | --- |
| `percentage` | math | STATIC | 26/26 | COMPLETE | N/A | Localized details and examples verified; engine, 26-locale SSR, and 8-width responsive checks passed. |
| `discount` | math | STATIC | 26/26 | COMPLETE | N/A | Localized interpretation, engine example, SSR, FAQ, and responsive checks passed. |
| `change-rate` | math | STATIC | 26/26 | COMPLETE | N/A | Localized interpretation, engine example, SSR, FAQ, and responsive checks passed. |
| `ratio` | math | STATIC | 26/26 | COMPLETE | N/A | Engine example, localized details, and SSR verified for this batch. |
| `average` | math | STATIC | 26/26 | COMPLETE | N/A | Mean 20 for inputs 10, 20, 30; engine example, localized SSR, browser flow, and responsive checks passed. |
| `weighted-average` | math | STATIC | 26/26 | COMPLETE | N/A | Weighted mean 95 for values 80/100 with weights 1/3; scaling and engine example verified. |
| `cagr` | math | STATIC | 26/26 | COMPLETE | N/A | Localized interpretation, engine example, SSR, FAQ, and responsive checks passed. |
| `proportion` | math | STATIC | 26/26 | COMPLETE | N/A | Engine example, localized details, and SSR verified for this batch. |
| `aspect-ratio` | math | STATIC | 26/26 | COMPLETE | N/A | 2,560×1,440 reduces to 16:9; engine, localized SSR, browser input, and responsive checks passed. |
| `scale-ratio` | math | STATIC | 26/26 | COMPLETE | N/A | 1:100 drawing length 5 cm converts to actual 5 m; unit conversion, SSR, browser, and viewport checks passed. |
| `fraction` | math | STATIC | 26/26 | COMPLETE | N/A | Localized formula and example verified; denominator and zero-divisor limits documented; 26-locale SSR and browser calculation passed. |
| `decimal-fraction` | math | STATIC | 26/26 | COMPLETE | N/A | Engine example, localized details, and SSR verified for this batch. |
| `standard-deviation` | math | STATIC | 26/26 | COMPLETE | N/A | Population example matches engine (mean 5, variance 4, standard deviation 2); sample minimum and 26-locale SSR verified. |
| `median` | math | STATIC | 26/26 | COMPLETE | N/A | Engine example, localized details, and SSR verified for this batch. |
| `percentile` | math | STATIC | 26/26 | COMPLETE | N/A | Nearest-rank 60th percentile of 1–5 is 3; engine, localized SSR, browser, and viewport checks passed. |
| `probability` | math | STATIC | 26/26 | COMPLETE | N/A | Three independent 20% trials yield 48.8% chance of at least one success; independence and non-prediction limits stated. |
| `fire-retirement-calculator` | finance | STATIC | 26/26 | COMPLETE | N/A | Withdrawal-rate assumption, target-only scope, engine example, SSR, browser, and responsive checks passed. |
| `dividend-growth-calculator` | finance | STATIC | 26/26 | COMPLETE | N/A | Compounded dividend scenario and non-guarantee note match engine; SSR, browser, and responsive checks passed. |
| `inflation-adjusted-return-calculator` | finance | STATIC | 26/26 | COMPLETE | N/A | Nominal and real annualized returns distinguished; engine precision, SSR, browser, and responsive checks passed. |
| `position-size-calculator` | finance | STATIC | 26/26 | COMPLETE | N/A | Risk budget and stop-distance example match engine; excluded execution costs are stated. |
| `stop-loss-take-profit-calculator` | finance | STATIC | 26/26 | COMPLETE | N/A | Stop, target, and potential ratio match engine; no execution or profit guarantee asserted. |
| `stock-profit-after-fees-calculator` | finance | STATIC | 26/26 | COMPLETE | N/A | Localized scenario, engine example, SSR, browser flow, and responsive checks passed. |
| `loan-early-repayment-calculator` | finance | STATIC | 26/26 | COMPLETE | N/A | Localized extra-payment scenario, engine example, SSR, browser flow, and responsive checks passed. |
| `rent-vs-buy-calculator` | life | STATIC | 26/26 | COMPLETE | N/A | Localized comparison assumptions and engine example verified; SSR and responsive checks passed. |
| `electricity-cost-calculator` | life | STATIC | 26/26 | COMPLETE | N/A | Consumption and tariff example verified; browser and responsive checks passed. |
| `travel-budget-calculator` | life | STATIC | 26/26 | COMPLETE | N/A | Per-person trip budget scenario and limits verified; browser and responsive checks passed. |
| `freelancer-hourly-rate-calculator` | finance | STATIC | 26/26 | COMPLETE | N/A | Localized hourly-rate scenario verified against the engine; pre-tax scope stated. |
| `break-even-point-calculator` | tax | STATIC | 26/26 | COMPLETE | N/A | Contribution margin, integer threshold, and revenue scenario verified; no policy rule applied. |
| `compound-interest` | finance | STATIC | 26/26 | COMPLETE | N/A | Localized interpretation, engine example, SSR, FAQ, and responsive checks passed; tax and fee effects excluded. |
| `simple-interest` | finance | STATIC | 26/26 | COMPLETE | N/A | Localized interpretation, engine example, SSR, FAQ, and responsive checks passed; pre-tax simple-interest estimate. |
| `savings-interest` | finance | STATIC | 26/26 | COMPLETE | N/A | Monthly contribution example matches the engine's simple-rate approximation; product terms excluded. |
| `deposit-interest` | finance | STATIC | 26/26 | COMPLETE | N/A | Six-month simple-interest example matches engine output; compounding and tax excluded. |
| `loan-interest` | finance | STATIC | 26/26 | COMPLETE | N/A | Equal-payment scenario matches monthly rounded schedule; browser output verified, lender terms excluded. |
| `ltv` | finance | STATIC | 26/26 | COMPLETE | N/A | 40% loan-to-home value example verified against the ratio engine; no approval or regulatory cap is implied. |
| `dti` | finance | STATIC | 26/26 | COMPLETE | N/A | 22% example matches the simplified annual mortgage principal/interest plus other-debt interest calculation; regulatory formulas excluded. |
| `dsr` | finance | STATIC | 26/26 | COMPLETE | N/A | 20% example matches entered total annual debt principal and interest divided by income; stress tests and lender rules excluded. |
| `stock-average-price` | finance | STATIC | 26/26 | COMPLETE | N/A | Weighted cost-basis example verified; fees excluded and target-return mode left unchanged. |
| `dividend` | finance | STATIC | 26/26 | COMPLETE | N/A | Gross dividend and entered-price yield example verified; taxes and future payments excluded. |
| `profit-loss` | finance | STATIC | 26/26 | COMPLETE | N/A | User-entered purchase/sale costs example matches net proceeds and return formula. |
| `loan-refinance` | finance | STATIC | 26/26 | COMPLETE | N/A | Net-savings example matches monthly annuity formulas and rounded output; fixed-rate, equal-payment and fee assumptions stated. |
| `prepayment-fee` | finance | STATIC | 26/26 | COMPLETE | N/A | 1.5% of entered repayment example matches engine; exemptions, elapsed-time schedules, and contract-specific fees excluded. |
| `loan-affordability` | finance | STATIC | 26/26 | COMPLETE | N/A | Zero-rate annuity example matches engine principal, total payment, and interest; not an approval estimate. |
| `salary-conversion` | salary | STATIC | 26/26 | COMPLETE | N/A | Monthly-to-annual example matches the multiply-by-12 engine; no payroll deductions applied. |
| `hourly-wage` | salary | STATIC | 26/26 | COMPLETE | N/A | Monthly-to-hourly example matches entered-hours calculation; no statutory wage rule is asserted. |
| `annual-leave-allowance` | salary | STATIC | 26/26 | COMPLETE | N/A | Example: 100,000 times 3 days = 300,000; arithmetic only, no statutory entitlement assessment. Engine, locale SSR, and responsive checks passed. |
| `vat` | tax | POLICY | 26/26 | COMPLETE | VERIFIED | South Korea VAT Act Art. 30 standard rate 10% checked 2026-10-28; current engine's whole-won example and inclusive extraction tested. Official law and NTS scope sources linked on page. |
| `unit-price` | math | STATIC | 26/26 | COMPLETE | N/A | 10,000 divided by 3 gives 3,333.33; engine rounding and comparable-unit limitation verified. |
| `margin` | finance | STATIC | 26/26 | COMPLETE | N/A | Sales-based margin denominator distinguished and example verified. |
| `markup` | finance | STATIC | 26/26 | COMPLETE | N/A | Cost-based markup denominator distinguished and example verified. |
| `product-margin` | finance | STATIC | 26/26 | COMPLETE | N/A | Localized example, engine output, 26-locale SSR, browser flow, and eight viewport checks passed. |
| `withholding-tax-3-3` | tax | POLICY | 26/26 | COMPLETE | BLOCKED | Localized example matches the implemented 3% + 0.3% whole-won truncation. NTS confirms qualifying context; the 2026-10-01 2.2% proposal enactment/effective date remain unconfirmed. No current-rule claim is made. |
| `date-difference` | date-time | STATIC | 26/26 | COMPLETE | N/A | Engine example, localized endpoint-count explanation, SSR, browser form, and responsive checks passed. |
| `dday` | date-time | STATIC | 26/26 | COMPLETE | N/A | Engine example, localized D−N interpretation, SSR, browser form, and responsive checks passed. |
| `age` | life | STATIC | 26/26 | COMPLETE | N/A | Completed age and year-based reference values explained; browser example passed. Legal age is not asserted. |
| `workdays` | date-time | STATIC | 26/26 | COMPLETE | N/A | Inclusive endpoints and holiday exclusion are explained; engine, browser, and responsive checks passed. |
| `bmi` | life | STATIC | 26/26 | COMPLETE | N/A | Height/weight calculation and rounded example verified; health metric only, not diagnosis. |
| `area` | life | STATIC | 26/26 | COMPLETE | N/A | 10 pyeong converts to 33.06 m² using 400/121; rounding and legal-area-category limitation stated. |
| `pace` | life | STATIC | 26/26 | COMPLETE | N/A | Distance/time example matches pace and speed outputs; unit labels verified in browser. |
| `fuel-cost` | life | STATIC | 26/26 | COMPLETE | N/A | Distance/efficiency/entered-price example matches fuel volume and cost outputs; price is user supplied. |
| `fuel-efficiency` | life | STATIC | 26/26 | COMPLETE | N/A | 520 km and 40 L example matches both km/L and L/100 km engine outputs. |
| `calorie-per-serving` | life | STATIC | 26/26 | COMPLETE | N/A | 600 kcal across three servings and one portion returns 200 kcal; proportional estimate only. |
| `tenure` | date-time | STATIC | 26/26 | COMPLETE | N/A | Calendar example: 2024-01-15 to 2025-03-20 = 1y 2m 5d, 14 complete months, 430 elapsed days. Engine, locale SSR, and responsive checks passed. |
| `time-arithmetic` | date-time | STATIC | 26/26 | COMPLETE | N/A | Example: 2h45m + 1h30m = 4h15m / 255 minutes. Engine, locale SSR, and responsive checks passed. |
| `pregnancy` | date-time | STATIC | 26/26 | COMPLETE | N/A | LMP 2026-01-01 + 280 days = estimated 2026-10-08; estimate only, clinical advice takes priority. Engine, locale SSR, and responsive checks passed. |
| `utility-bill` | life | STATIC | 26/26 | COMPLETE | N/A | Example: usage 20 times entered rate 500 + base 1,000 = 11,000; excludes tiered tariffs, taxes, and fees. Engine, locale SSR, and responsive checks passed. |
| `vehicle-cost` | life | STATIC | 26/26 | COMPLETE | N/A | User-entered distance, efficiency, fuel price, and monthly costs explained; 170,000 monthly fuel and 2,040,000 annual example verified. |
| `taxi-fare` | life | STATIC | 26/26 | COMPLETE | N/A | User-entered base, included distance, distance/time rates explained; 7,000 example verified, local fare adjustments excluded. |
| `trip-split` | life | STATIC | 26/26 | COMPLETE | N/A | 10,000 split among three matches fractional share and integer remainder allocation. |
| `tip-calculator` | life | STATIC | 26/26 | COMPLETE | N/A | Entered tip rate and equal split explained; 50,000 at 10% split by two yields 27,500 each. |
| `unit-converter` | math | STATIC | 26/26 | COMPLETE | N/A | Mile conversion and temperature offset example match engine tests; browser flow and responsive checks passed. |
| `unemployment-benefit` | salary | POLICY | 26/26 | COMPLETE | PARTIAL | KR 2026 60%/limits/duration checked against MOEL 1350 and minimum wage source; example matches engine. Fixed 8-hour floor, simplified 90-day wage proxy and eligibility/award limits disclosed. |
| `minimum-wage` | salary | POLICY | 26/26 | DRAFT | VERIFIED | Minimum Wage Commission confirms 2026 KRW 10,320/h, 82,560/day (8h), 2,156,880/month (209h); individual exemptions and wage compliance are outside scope. |
| `severance-pay` | salary | POLICY | 26/26 | DRAFT | PARTIAL | Article 8 30-day-per-year rule and MOEL formula checked; this engine takes average daily wage and does not calculate eligibility or legal average wage. |
| `social-insurance` | salary | POLICY | 26/26 | DRAFT | PARTIAL | NPS/NHIS/EI 2026 rates and bases checked; pay eligibility, exemptions and settlement specifics remain outside model. |
| `japan-consumption-tax-calculator` | tax | POLICY | 26/26 | COMPLETE | PARTIAL | NTA source checked 2026-10-28 confirms 10% standard/8% reduced options and eligibility limits; it also lists a temporary food-tax reduction scheduled 2027-04-01 through 2029-03-31. No transaction-date field exists, so future rates are not date-modeled. |
| `japan-annual-salary-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | 2026 deduction schedule applicability and simplified health/social-insurance assumptions require further reconciliation; do not describe as a verified current take-home result. |
| `japan-monthly-salary-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | 2026 deduction schedule applicability and simplified health/social-insurance assumptions require further reconciliation; do not describe as a verified current take-home result. |
| `japan-overtime-pay-calculator` | salary | POLICY | 26/26 | DRAFT | VERIFIED | MHLW confirms minimum 25% ordinary overtime and 50% for hours beyond 60/month; user-entered base wage/rate still determine arithmetic. |
| `japan-night-holiday-pay-calculator` | salary | POLICY | 26/26 | DRAFT | VERIFIED | MHLW confirms 25% night, 35% statutory holiday, and additive overlapping premiums; legal schedule classification remains user-supplied. |
| `germany-gross-net-salary-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `germany-income-tax-calculator` | tax | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `germany-vat-calculator` | tax | POLICY | 26/26 | DRAFT | VERIFIED | German VAT Act §12 confirms 19% standard and 7% reduced rates for listed supplies; calculator does not classify eligibility. |
| `germany-overtime-pay-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `germany-vacation-pay-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `spain-gross-net-salary-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `spain-irpf-calculator` | tax | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `spain-vat-calculator` | tax | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `spain-severance-pay-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `france-gross-net-salary-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `france-income-tax-calculator` | tax | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `france-vat-calculator` | tax | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `france-overtime-pay-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `netherlands-gross-net-salary-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `netherlands-vat-calculator` | tax | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `netherlands-30-percent-ruling-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `netherlands-holiday-allowance-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `india-gst-calculator` | tax | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `india-sip-calculator` | finance | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `india-ppf-calculator` | finance | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `india-nps-calculator` | finance | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `india-gross-net-salary-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `india-income-tax-calculator` | tax | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `brazil-gross-net-salary-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `brazil-inss-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `brazil-irrf-calculator` | tax | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `brazil-fgts-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `brazil-thirteenth-salary-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `vietnam-gross-net-salary-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `vietnam-personal-income-tax-calculator` | tax | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `vietnam-social-insurance-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `china-gross-net-salary-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `china-individual-income-tax-calculator` | tax | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `china-social-insurance-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `china-vat-calculator` | tax | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `taiwan-gross-net-salary-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `taiwan-income-tax-calculator` | tax | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `taiwan-labor-insurance-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `taiwan-vat-calculator` | tax | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `italy-gross-net-salary-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `italy-income-tax-calculator` | tax | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `italy-vat-calculator` | tax | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `us-paycheck-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `us-income-tax-calculator` | tax | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `us-sales-tax-calculator` | tax | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `us-401k-calculator` | finance | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `us-roth-ira-calculator` | finance | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `us-capital-gains-tax-calculator` | tax | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `uk-gross-net-salary-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `uk-income-tax-calculator` | tax | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `uk-national-insurance-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `uk-vat-calculator` | tax | POLICY | 26/26 | COMPLETE | VERIFIED | GOV.UK VAT rates page checked 2026-10-28 confirms the 20% standard rate. Example uses £100 × entered 20%; product classification, reduced/zero/exempt treatment, and place of supply are outside the tool. |
| `uk-stamp-duty-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `uk-pension-calculator` | finance | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `canada-gross-net-salary-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `canada-income-tax-calculator` | tax | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `canada-gst-hst-calculator` | tax | POLICY | 26/26 | DRAFT | PARTIAL | CRA rates checked 2026-10-28; province/place-of-supply and PST/QST classification are not modeled. |
| `canada-cpp-ei-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `canada-rrsp-calculator` | finance | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `australia-gross-net-salary-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `australia-income-tax-calculator` | tax | POLICY | 26/26 | DRAFT | PARTIAL | Resident 2026–27 brackets source-checked; Medicare levy, offsets and non-resident rules excluded. |
| `australia-gst-calculator` | tax | POLICY | 26/26 | DRAFT | VERIFIED | ATO confirms 10% on most goods/services; checked 2026-10-28. No GST-free classification. |
| `australia-superannuation-calculator` | finance | POLICY | 26/26 | DRAFT | PARTIAL | ATO confirms 12% SG from 2025-07-01; eligibility, contribution caps, tax and fund fees are not modeled. |
| `australia-stamp-duty-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `singapore-gross-net-salary-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `singapore-income-tax-calculator` | tax | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `singapore-cpf-calculator` | salary | POLICY | 26/26 | DRAFT | PARTIAL | CPF Board 2026 full-rate table and SGD 8,000 OW ceiling source-checked; graduated PR, low-wage, additional-wage rules not modeled. |
| `singapore-gst-calculator` | tax | POLICY | 26/26 | DRAFT | VERIFIED | IRAS confirms 9% from 2024-01-01; checked 2026-10-28. Transaction transition/exemption classification is not modeled. |
| `hong-kong-salary-tax-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `hong-kong-mpf-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `hong-kong-stamp-duty-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `malaysia-income-tax-calculator` | tax | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `malaysia-epf-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `malaysia-socso-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `malaysia-sst-calculator` | tax | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `philippines-gross-net-salary-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `philippines-income-tax-calculator` | tax | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `philippines-sss-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `philippines-philhealth-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `philippines-pagibig-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `uae-gratuity-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `uae-end-of-service-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `uae-vat-calculator` | tax | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `uae-corporate-tax-calculator` | tax | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `new-zealand-gross-net-salary-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `new-zealand-income-tax-calculator` | tax | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `new-zealand-gst-calculator` | tax | POLICY | 26/26 | DRAFT | VERIFIED | Inland Revenue confirms 15% on most taxable supplies; checked 2026-10-28. Exempt/zero-rated classification is not modeled. |
| `new-zealand-kiwisaver-calculator` | finance | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `spain-freelancer-tax-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |
| `france-social-contribution-calculator` | salary | POLICY | 26/26 | DRAFT | BLOCKED | Official rule and effective date need verification; do not change policy values. |

## Next batch queue

Next: continue with country-policy calculators that can be described safely from the engine and official sources. The three South Korea pages remain DRAFT pending full content structure and browser verification. Keep the reviewed GST and Australia/CPF pages DRAFT until full calculator-specific page sections are authored and validated. Content completion is tracked separately from VERIFIED, PARTIAL, and BLOCKED policy review.

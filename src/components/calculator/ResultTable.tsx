"use client";

import { useState } from "react";
import { formatKrw, formatNumber } from "@/lib/formatter/number";
import type { CalculatorTable } from "@/types/calculator-page";
import type { Locale } from "@/i18n/config";

const labels = {
  ko: { periodDetails: "기간별 상세 내역", repaymentSchedule: "월별 상환 내역", yearlyForecast: "연도별 예상 추이", period: "기간", openingBalance: "기초 금액", monthlyDeposit: "월 납입액", cumulativePrincipal: "누적 납입 원금", periodInterest: "해당 기간 이자", cumulativeInterest: "누적 이자", endingBalance: "기간 종료 금액", payment: "납입액", principal: "원금", interest: "이자", remainingBalance: "남은 원금", amount: "예상 금액", change: "전년 대비 증가액", showAll: "전체 보기", showLess: "일부만 보기", cagrAssumption: "같은 CAGR이 매년 유지된다고 가정한 수학적 추정이며 실제 투자 성과를 나타내지 않습니다." },
  en: { periodDetails: "Period details", repaymentSchedule: "Repayment schedule", yearlyForecast: "Yearly projection", period: "Period", openingBalance: "Opening balance", monthlyDeposit: "Monthly deposit", cumulativePrincipal: "Principal paid", periodInterest: "Period interest", cumulativeInterest: "Cumulative interest", endingBalance: "Ending balance", payment: "Payment", principal: "Principal", interest: "Interest", remainingBalance: "Remaining balance", amount: "Projected amount", change: "Change from prior year", showAll: "Show all", showLess: "Show fewer", cagrAssumption: "This mathematical projection assumes the same CAGR each period and does not represent actual investment performance." },
  ja: { periodDetails: "期間別の詳細", repaymentSchedule: "月別返済明細", yearlyForecast: "年別予測", period: "期間", openingBalance: "期首金額", monthlyDeposit: "毎月の積立額", cumulativePrincipal: "積立元本", periodInterest: "期間利息", cumulativeInterest: "累計利息", endingBalance: "期末金額", payment: "返済額", principal: "元金", interest: "利息", remainingBalance: "残元金", amount: "予想金額", change: "前年比増加額", showAll: "すべて表示", showLess: "一部を表示", cagrAssumption: "同じCAGRが各期間続くと仮定した数学上の推計で、実際の投資実績を示すものではありません。" },
  zh: { periodDetails: "分期明细", repaymentSchedule: "每月还款明细", yearlyForecast: "年度预测", period: "期间", openingBalance: "期初金额", monthlyDeposit: "每月存入", cumulativePrincipal: "累计本金", periodInterest: "本期利息", cumulativeInterest: "累计利息", endingBalance: "期末金额", payment: "还款额", principal: "本金", interest: "利息", remainingBalance: "剩余本金", amount: "预测金额", change: "较上年增加", showAll: "显示全部", showLess: "收起部分", cagrAssumption: "此数学推算假设每期保持相同CAGR，不代表实际投资表现。" },
} as const;

export function ResultTable({ table, locale = "ko" }: { table: CalculatorTable; locale?: Locale }) {
  const [expanded, setExpanded] = useState(false);
  const text = labels[locale];
  const visibleRows = table.rows.length > 24 && !expanded ? table.rows.slice(0, 12) : table.rows;
  return <section className="mt-6 min-w-0" aria-label={text[table.title]}>
    <h3 className="mb-3 text-base font-bold text-slate-900">{text[table.title]}</h3>
    <div className="max-w-full overflow-x-auto rounded-lg border border-slate-200">
      <table className="min-w-[680px] w-full border-collapse text-sm">
        <thead className="bg-slate-100"><tr>{table.columns.map((column) => <th key={column} scope="col" className={`sticky top-0 whitespace-nowrap px-3 py-3 font-semibold text-slate-700 ${column === "period" ? "text-left" : "text-right"}`}>{text[column]}</th>)}</tr></thead>
        <tbody>{visibleRows.map((row, rowIndex) => <tr key={rowIndex} className="border-t border-slate-100 odd:bg-white even:bg-slate-50">{row.map((value, columnIndex) => { const column = table.columns[columnIndex]!; const display = typeof value !== "number" ? value : column === "period" ? `${formatNumber(value, Number.isInteger(value) ? 0 : 2, locale)} ${table.periodUnit === "year" ? (locale === "en" ? "years" : locale === "ja" ? "年" : locale === "zh" ? "年" : "년") : (locale === "en" ? "months" : locale === "ja" ? "か月" : locale === "zh" ? "个月" : "개월")}` : formatKrw(value, 0, locale); return <td key={columnIndex} className={`whitespace-nowrap px-3 py-3 tabular-nums ${column === "period" ? "text-left" : "text-right"}`}>{display}</td>; })}</tr>)}</tbody>
      </table>
    </div>
    {table.note ? <p className="mt-3 text-sm leading-6 text-slate-600">{text[table.note]}</p> : null}
    {table.rows.length > 24 ? <button type="button" className="mt-3 min-h-10 rounded-lg border border-slate-300 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50" onClick={() => setExpanded((value) => !value)}>{expanded ? text.showLess : text.showAll}</button> : null}
  </section>;
}

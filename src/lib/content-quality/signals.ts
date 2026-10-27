type CalculatorContent = { description: string; howTo: string; formula: string; example: { question: string; answer: string }; faqs: readonly { question: string; answer: string }[] };

export function calculatorContentQualitySignals(content: CalculatorContent, locale: string) {
  const issues: string[] = [];
  const cjk = locale === "ja" || locale === "zh" || locale === "zh-tw";
  const minimums = cjk
    ? { description: 20, howTo: 20, formula: 10, example: 14 }
    : { description: 45, howTo: 45, formula: 25, example: 30 };
  if (content.description.trim().length < minimums.description) issues.push("short description");
  if (content.howTo.trim().length < minimums.howTo) issues.push("short howTo");
  const conciseEquation = /[=＝]/u.test(content.formula)
    && ["×", "*", "÷", "/", "+", "−", "-"].some((operator) => content.formula.includes(operator))
    && /[\p{L}\d]/u.test(content.formula);
  if (content.formula.trim().length < minimums.formula && !conciseEquation) issues.push("short formula");
  if (content.example.answer.trim().length < minimums.example) issues.push("short example");
  if (content.faqs.length < 2) issues.push("few FAQs");
  return issues;
}

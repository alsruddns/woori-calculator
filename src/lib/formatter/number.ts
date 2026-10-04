const currencyFormatter = new Intl.NumberFormat("ko-KR", {
  style: "currency",
  currency: "KRW",
  maximumFractionDigits: 0,
});

export function formatNumber(value: number, maximumFractionDigits = 2): string {
  return new Intl.NumberFormat("ko-KR", { maximumFractionDigits }).format(value);
}

export function formatInputNumber(value: string): string {
  if (!value || value === "-" || value === "." || value === "-.") return value;
  const negative = value.startsWith("-");
  const normalized = value.replace(/,/g, "").replace(/[^\d.]/g, "");
  const [integer = "", ...fractionParts] = normalized.split(".");
  const fraction = fractionParts.join("");
  const grouped = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${negative ? "-" : ""}${grouped}${fractionParts.length ? `.${fraction}` : ""}`;
}

export function formatKrw(value: number): string {
  return currencyFormatter.format(value);
}

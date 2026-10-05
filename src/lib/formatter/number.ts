export function formatNumber(value: number, maximumFractionDigits = 2): string {
  if (!Number.isFinite(value)) return "—";
  const requestedDigits = Number.isFinite(maximumFractionDigits) ? Math.trunc(maximumFractionDigits) : 2;
  const digits = Math.max(0, Math.min(20, requestedDigits));
  const normalized = Object.is(value, -0) || Math.abs(value) < 0.5 * 10 ** -digits ? 0 : value;
  return new Intl.NumberFormat("ko-KR", { maximumFractionDigits: digits }).format(normalized);
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

export function formatKrw(value: number, maximumFractionDigits = 0): string {
  if (!Number.isFinite(value)) return "—";
  return `${formatNumber(value, maximumFractionDigits)}원`;
}

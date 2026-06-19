import type { Locale } from "@/i18n/config";

const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function formatBengaliNumber(amount: number): string {
  const rounded = Math.round(amount);
  const [intPart, fracPart] = Math.abs(rounded).toString().split(".");

  let lastThree = intPart.slice(-3);
  const otherDigits = intPart.slice(0, -3);
  if (otherDigits !== "") {
    lastThree = "," + lastThree;
  }
  const grouped =
    otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

  const withSign = (rounded < 0 ? "-" : "") + grouped + (fracPart ? `.${fracPart}` : "");

  return withSign.replace(/[0-9]/g, (digit) => bengaliDigits[Number(digit)]);
}

// জার্মান গ্রুপিং (1.000, 570.000) — Latin digits, hydration-safe (bn-BD-এর মতো glyph mismatch নেই
function formatGermanNumber(amount: number): string {
  const rounded = Math.round(amount);
  const grouped = Math.abs(rounded)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return (rounded < 0 ? "-" : "") + grouped;
}

export function formatNumber(amount: number, locale: Locale): string {
  return locale === "bn" ? formatBengaliNumber(amount) : formatGermanNumber(amount);
}

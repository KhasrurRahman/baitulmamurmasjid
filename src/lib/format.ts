import type { Locale } from "@/i18n/config";

// সংখ্যা সবসময় Latin digits-এ রাখা হয় (Bengali numeral glyph ছোট/বোল্ড টেক্সটে পড়তে কষ্ট হয়) —
// শুধু গ্রুপিং স্টাইল locale অনুযায়ী আলাদা: জার্মান 3-digit grouping (570.000),
// বাংলা/বাংলাদেশি ঐতিহ্যবাহী 2-2-3 grouping (৫,৭০,০০০ স্টাইল কিন্তু Latin digits দিয়ে: 5,70,000)
function groupGerman(digits: string): string {
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function groupBangladeshi(digits: string): string {
  if (digits.length <= 3) return digits;
  const lastThree = digits.slice(-3);
  const rest = digits.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return `${rest},${lastThree}`;
}

export function formatNumber(amount: number, locale: Locale): string {
  const rounded = Math.round(amount);
  const digits = Math.abs(rounded).toString();
  const grouped = locale === "bn" ? groupBangladeshi(digits) : groupGerman(digits);
  return (rounded < 0 ? "-" : "") + grouped;
}

// ISO (YYYY-MM-DD) থেকে ইউরোপীয় DD.MM.YYYY ফরম্যাটে — locale-নিরপেক্ষ, উভয় ভাষার সোর্স ডকুমেন্টেই এই ফরম্যাট ব্যবহৃত
export function formatEuroDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  return `${day}.${month}.${year}`;
}

import Papa from "papaparse";
import { siteConfig } from "./site-config";

export type Donation = {
  date: string;
  donor: string;
  amount: number;
  method: string;
};

export type DocumentItem = {
  driveLink?: string;
  fileUrl?: string;
  title: string;
  description: string;
};

async function fetchCsv(url: string): Promise<Record<string, string>[]> {
  if (!url) return [];
  const res = await fetch(url, {
    next: { revalidate: siteConfig.sheet.revalidateSeconds },
  });
  if (!res.ok) return [];
  const text = await res.text();
  const parsed = Papa.parse<Record<string, string>>(text, {
    header: true,
    skipEmptyLines: true,
  });
  return parsed.data;
}

const mockDonations: Donation[] = [
  { date: "2026-01-05", donor: "মোহাম্মদ করিম", amount: 5000, method: "ব্যাংক ট্রান্সফার" },
  { date: "2026-02-12", donor: "আবদুল্লাহ হোসেন", amount: 2000, method: "বিকাশ" },
  { date: "2026-03-18", donor: "নাম প্রকাশে অনিচ্ছুক", amount: 10000, method: "ব্যাংক ট্রান্সফার" },
  { date: "2026-04-02", donor: "সালমা বেগম", amount: 1500, method: "নগদ" },
  { date: "2026-05-20", donor: "ইউসুফ আলী", amount: 3000, method: "বিকাশ" },
  { date: "2026-06-10", donor: "ফাতিমা খাতুন", amount: 7500, method: "ব্যাংক ট্রান্সফার" },
];

export async function getDonations(): Promise<Donation[]> {
  const rows = await fetchCsv(siteConfig.sheet.donationsCsvUrl);
  if (rows.length === 0) return mockDonations;
  return rows.map((row) => ({
    date: row.date ?? "",
    donor: row.donor ?? "",
    amount: Number(row.amount ?? 0),
    method: row.method ?? "",
  }));
}

// CSV-এ থাকা যেকোনো অতিরিক্ত ডকুমেন্ট — মূল ৪টা পরিচিত ডকুমেন্ট (চুক্তি, আহ্বান পত্র) dictionary-তে আছে (i18n/dictionaries.ts)
export async function getDocuments(): Promise<DocumentItem[]> {
  const rows = await fetchCsv(siteConfig.sheet.documentsCsvUrl);
  return rows.map((row) => ({
    driveLink: row.drive_link ?? "",
    title: row.title ?? "",
    description: row.description ?? "",
  }));
}

export function totalCollected(donations: Donation[]): number {
  return donations.reduce((sum, d) => sum + d.amount, 0);
}

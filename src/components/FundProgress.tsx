"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Donation } from "@/lib/sheet";
import { formatBengaliNumber as formatAmount } from "@/lib/format";

function monthlySeries(donations: Donation[]) {
  const totals = new Map<string, number>();
  for (const d of donations) {
    const month = d.date.slice(0, 7);
    totals.set(month, (totals.get(month) ?? 0) + d.amount);
  }
  let running = 0;
  return Array.from(totals.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, amount]) => {
      running += amount;
      return { month, amount, cumulative: running };
    });
}

export default function FundProgress({
  donations,
  target,
  currency,
}: {
  donations: Donation[];
  target: number;
  currency: string;
}) {
  const collected = donations.reduce((sum, d) => sum + d.amount, 0);
  const remaining = Math.max(target - collected, 0);
  const percent = Math.min(Math.round((collected / target) * 100), 100);
  const series = monthlySeries(donations);

  return (
    <div className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-sm text-emerald-700">সংগৃহীত</p>
          <p className="text-2xl font-bold text-emerald-800 sm:text-3xl">
            {formatAmount(collected)} {currency}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-stone-500">লক্ষ্য</p>
          <p className="text-lg font-semibold text-stone-700 sm:text-xl">
            {formatAmount(target)} {currency}
          </p>
        </div>
      </div>

      <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-emerald-50">
        <div
          className="h-full rounded-full bg-emerald-600 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="mt-1 flex justify-between text-xs text-stone-500">
        <span>{percent}% সংগৃহীত</span>
        <span>বাকি {formatAmount(remaining)} {currency}</span>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="h-48 sm:h-56">
          <p className="mb-2 text-sm font-medium text-stone-600">মাসিক অনুদান</p>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={series} margin={{ left: -16, right: 4, top: 4, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ecfdf5" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} width={40} />
              <Tooltip formatter={(value) => `${formatAmount(Number(value))} ${currency}`} />
              <Bar dataKey="amount" fill="#059669" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="h-48 sm:h-56">
          <p className="mb-2 text-sm font-medium text-stone-600">সামগ্রিক ট্রেন্ড</p>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={series} margin={{ left: -16, right: 4, top: 4, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ecfdf5" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} width={40} />
              <Tooltip formatter={(value) => `${formatAmount(Number(value))} ${currency}`} />
              <Line type="monotone" dataKey="cumulative" stroke="#059669" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

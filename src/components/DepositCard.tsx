"use client";

import { useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { formatNumber, formatEuroDate } from "@/lib/format";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

function CopyField({
  label,
  value,
  copyLabel,
  copiedLabel,
  accent = false,
}: {
  label: string;
  value: string;
  copyLabel: string;
  copiedLabel: string;
  accent?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value.replace(/\s/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`group w-full text-left transition-all duration-200 ${
        accent
          ? "relative overflow-hidden rounded-lg border border-emerald-100 bg-white p-3 shadow-sm hover:border-emerald-300 hover:shadow-md sm:col-span-2"
          : "sm:col-span-2"
      }`}
    >
      {accent && (
        <div className="absolute inset-y-0 left-0 w-1 bg-emerald-500 transition-all group-hover:w-1.5" />
      )}
      <div className="flex items-center justify-between gap-3">
        <div className={accent ? "pl-2" : ""}>
          <dt
            className={`text-[11px] font-bold uppercase tracking-wider ${
              accent ? "text-emerald-700" : "text-stone-500"
            }`}
          >
            {label}
          </dt>
          <dd
            className={`mt-1 font-mono font-bold tracking-wider break-all select-all ${
              accent
                ? "text-lg text-emerald-950 sm:text-xl"
                : "text-base text-stone-900"
            }`}
          >
            {value}
          </dd>
        </div>
        <span
          className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-200 ${
            copied
              ? "bg-emerald-600 text-white"
              : "bg-emerald-50 text-emerald-700 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
          }`}
        >
          {copied ? (
            <>
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                <path
                  fillRule="evenodd"
                  d="M16.704 5.29a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L4.296 9.5a.75.75 0 111.06-1.06l3.55 3.55 6.72-6.72a.75.75 0 011.06 0z"
                  clipRule="evenodd"
                />
              </svg>
              {copiedLabel}
            </>
          ) : (
            <>
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.121A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
                <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-7.42a1.5 1.5 0 00-.44-1.06L9.44 5.439A1.5 1.5 0 008.378 5H4.5z" />
              </svg>
              {copyLabel}
            </>
          )}
        </span>
      </div>
    </button>
  );
}

export default function DepositCard({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const bank = siteConfig.deposit.bank;
  const fmt = (amount: number) => `${formatNumber(amount, locale)} ${dict.fund.currencyWord}`;

  return (
    <div className="group/card relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-lg sm:p-8">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald-100/40 blur-3xl transition-transform duration-700 group-hover/card:scale-125"
        aria-hidden
      />

      <div className="relative flex flex-col justify-between gap-8 md:flex-row">
        <div className="flex-1 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-emerald-900">{dict.deposit.title}</h3>
            <p className="mt-2 text-sm text-stone-500">{dict.deposit.subtitle}</p>
          </div>

          <div className="inline-flex flex-wrap items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50/50 px-4 py-3 sm:gap-4">
            <span className="text-sm text-emerald-800">
              <strong className="font-bold text-emerald-900">{dict.deposit.targetLabel}:</strong>{" "}
              {fmt(siteConfig.fund.targetAmount)}
            </span>
            <span className="hidden text-emerald-300 sm:inline">|</span>
            <span className="text-sm text-emerald-800">
              <strong className="font-bold text-emerald-900">{dict.deposit.deadlineLabel}:</strong>{" "}
              {formatEuroDate(siteConfig.fund.purchaseDeadline)}
            </span>
            <span className="hidden text-emerald-300 sm:inline">|</span>
            <span className="text-sm text-emerald-800">
              <strong className="font-bold text-emerald-900">{dict.deposit.goalLabel}:</strong>{" "}
              {formatNumber(siteConfig.fund.planPeopleMin, locale)}–
              {formatNumber(siteConfig.fund.planPeopleMax, locale)} {dict.fund.peopleUnit}
            </span>
          </div>

          <div className="rounded-xl border border-stone-100 bg-stone-50 p-5">
            <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  {dict.deposit.accountNameLabel}
                </dt>
                <dd className="mt-1 text-sm font-bold text-stone-900">{bank.accountName}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  {dict.deposit.bankLabel}
                </dt>
                <dd className="mt-1 text-sm font-bold text-stone-900">{bank.bankName}</dd>
              </div>

              <CopyField
                label="IBAN"
                value={bank.iban}
                copyLabel={dict.deposit.copyLabel}
                copiedLabel={dict.deposit.copiedLabel}
                accent
              />

              <CopyField
                label="BIC / SWIFT"
                value={bank.bic}
                copyLabel={dict.deposit.copyLabel}
                copiedLabel={dict.deposit.copiedLabel}
              />
            </dl>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-center justify-center self-center rounded-2xl border border-stone-100 bg-stone-50 p-6 transition-colors duration-300 hover:bg-emerald-50/60 md:self-start">
          <div className="relative rounded-xl border border-stone-200 bg-white p-2 shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-md sm:p-3">
            <span className="absolute -inset-1 -z-10 animate-pulse rounded-xl bg-emerald-200/40 blur-md" aria-hidden />
            <Image
              src={bank.qrImage}
              alt="Bank QR Code"
              width={160}
              height={160}
              className="relative object-contain sm:h-44 sm:w-44"
            />
          </div>
          <span className="mt-4 flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-700">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
            </span>
            {dict.deposit.scanToPay}
          </span>
        </div>
      </div>
    </div>
  );
}

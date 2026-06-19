import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { formatNumber, formatEuroDate } from "@/lib/format";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export default function DepositCard({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const bank = siteConfig.deposit.bank;
  const fmt = (amount: number) => `${formatNumber(amount, locale)} ${dict.fund.currencyWord}`;

  return (
    <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm sm:p-8">
      <div className="flex flex-col justify-between gap-8 md:flex-row">
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
              <div className="relative overflow-hidden rounded-lg border border-emerald-100 bg-white p-3 shadow-sm sm:col-span-2">
                <div className="absolute inset-y-0 left-0 w-1 bg-emerald-500" />
                <dt className="pl-2 text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                  IBAN
                </dt>
                <dd className="mt-1 pl-2 text-lg font-mono font-bold tracking-wider break-all text-emerald-950 select-all sm:text-xl">
                  {bank.iban}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  BIC / SWIFT
                </dt>
                <dd className="mt-1 text-base font-mono font-bold text-stone-900 select-all">
                  {bank.bic}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-center justify-center self-center rounded-2xl border border-stone-100 bg-stone-50 p-6 md:self-start">
          <div className="rounded-xl border border-stone-200 bg-white p-2 shadow-sm sm:p-3">
            <Image
              src={bank.qrImage}
              alt="Bank QR Code"
              width={160}
              height={160}
              className="object-contain sm:h-44 sm:w-44"
            />
          </div>
          <span className="mt-4 text-xs font-bold uppercase tracking-widest text-emerald-700">
            Scan to Pay
          </span>
        </div>
      </div>
    </div>
  );
}

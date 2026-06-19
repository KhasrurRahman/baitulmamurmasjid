import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import type { Dictionary } from "@/i18n/dictionaries";

export default function DepositCard({ dict }: { dict: Dictionary }) {
  const bank = siteConfig.deposit.bank;

  return (
    <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm sm:p-8">
      <div className="flex flex-col md:flex-row justify-between gap-8">
        
        {/* Left Side: Info */}
        <div className="flex-1 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-emerald-900">{dict.deposit.title}</h3>
            <p className="mt-2 text-sm text-stone-500">{dict.deposit.subtitle}</p>
          </div>

          {/* Funding Brief */}
          <div className="inline-flex flex-wrap items-center gap-3 sm:gap-4 rounded-xl bg-emerald-50/50 px-4 py-3 border border-emerald-100">
            <span className="text-sm text-emerald-800">
              <strong className="font-bold text-emerald-900">Target:</strong> 570.000 €
            </span>
            <span className="hidden sm:inline text-emerald-300">|</span>
            <span className="text-sm text-emerald-800">
              <strong className="font-bold text-emerald-900">Deadline:</strong> 31.07.2029
            </span>
            <span className="hidden sm:inline text-emerald-300">|</span>
            <span className="text-sm text-emerald-800">
              <strong className="font-bold text-emerald-900">Goal:</strong> 100-150 {dict.languageSwitch?.label === "Sprache" ? "Personen" : "জন"}
            </span>
          </div>

          {/* Bank Details */}
          <div className="rounded-xl border border-stone-100 bg-stone-50 p-5">
            <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold text-stone-500 uppercase tracking-wider">{dict.deposit.accountNameLabel}</dt>
                <dd className="mt-1 text-sm font-bold text-stone-900">{bank.accountName}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold text-stone-500 uppercase tracking-wider">{dict.deposit.bankLabel}</dt>
                <dd className="mt-1 text-sm font-bold text-stone-900">{bank.bankName}</dd>
              </div>
              <div className="sm:col-span-2 rounded-lg bg-white p-3 border border-emerald-100 shadow-sm relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"></div>
                <dt className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider pl-2">IBAN</dt>
                <dd className="mt-1 pl-2 text-lg sm:text-xl font-mono font-bold text-emerald-950 tracking-wider break-all select-all">{bank.iban}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs font-semibold text-stone-500 uppercase tracking-wider">BIC / SWIFT</dt>
                <dd className="mt-1 text-base font-mono font-bold text-stone-900 select-all">{bank.bic}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Right Side: QR Code */}
        <div className="flex shrink-0 flex-col items-center justify-center rounded-2xl bg-stone-50 p-6 border border-stone-100 self-center md:self-start">
          <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-2 sm:p-3">
            <Image src={bank.qrImage} alt="Bank QR Code" width={160} height={160} className="object-contain sm:w-[176px] sm:h-[176px]" />
          </div>
          <span className="mt-4 text-xs font-bold text-emerald-700 uppercase tracking-widest">Scan to Pay</span>
        </div>

      </div>
    </div>
  );
}

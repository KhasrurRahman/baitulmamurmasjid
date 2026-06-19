import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

const methods = [
  {
    key: "bank",
    label: siteConfig.deposit.bank.label,
    qrImage: siteConfig.deposit.bank.qrImage,
    rows: [
      ["অ্যাকাউন্টের নাম", siteConfig.deposit.bank.accountName],
      ["ব্যাংক", siteConfig.deposit.bank.bankName],
      ["IBAN", siteConfig.deposit.bank.iban],
      ["BIC", siteConfig.deposit.bank.bic],
    ],
  },
  {
    key: "paypal",
    label: siteConfig.deposit.paypal.label,
    qrImage: siteConfig.deposit.paypal.qrImage,
    rows: [["অ্যাকাউন্ট", siteConfig.deposit.paypal.account]],
  },
  {
    key: "cash",
    label: siteConfig.deposit.cash.label,
    qrImage: siteConfig.deposit.cash.qrImage,
    rows: [["নোট", siteConfig.deposit.cash.note]],
  },
];

export default function DepositCard() {
  return (
    <div className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm sm:p-6">
      <h3 className="text-base font-semibold text-emerald-800 sm:text-lg">কোথায় টাকা জমা দেবেন</h3>
      <p className="mt-1 text-sm text-stone-500">
        নিচের যেকোনো মাধ্যমে অনুদান পাঠাতে পারেন (অস্ট্রিয়া/ইউরোপ থেকে)।
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {methods.map((method) => (
          <div
            key={method.key}
            className="flex flex-col items-center gap-3 rounded-xl border border-emerald-50 bg-emerald-50/40 p-4 text-center"
          >
            <p className="font-semibold text-emerald-800">{method.label}</p>
            <div className="relative h-28 w-28 overflow-hidden rounded-lg bg-white">
              <Image
                src={method.qrImage}
                alt={`${method.label} QR কোড`}
                fill
                className="object-contain"
              />
            </div>
            <dl className="w-full space-y-1 text-left text-xs text-stone-600">
              {method.rows.map(([label, value]) => (
                <div key={label} className="flex justify-between gap-2">
                  <dt className="shrink-0 text-stone-400">{label}</dt>
                  <dd className="font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}

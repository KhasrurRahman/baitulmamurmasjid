import { siteConfig } from "@/lib/site-config";
import { getDonations } from "@/lib/sheet";
import { formatBengaliNumber } from "@/lib/format";
import FundProgress from "@/components/FundProgress";
import DepositCard from "@/components/DepositCard";

export default async function FundPage() {
  const donations = await getDonations();
  const sorted = [...donations].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <h1 className="text-2xl font-bold text-emerald-900 sm:text-3xl">ফান্ড ডিটেইলস</h1>
      <p className="mt-2 text-sm text-stone-600 sm:text-base">
        মসজিদ স্থায়ীভাবে ক্রয়ের জন্য সংগৃহীত প্রতিটি অনুদানের সম্পূর্ণ হিস্টোরি ও অগ্রগতি।
      </p>

      <div className="mt-6">
        <FundProgress
          donations={donations}
          target={siteConfig.fund.targetAmount}
          currency={siteConfig.fund.currency}
        />
      </div>

      <div className="mt-8 sm:mt-10">
        <DepositCard />
      </div>

      <div className="mt-8 sm:mt-10">
        <h2 className="mb-4 text-lg font-bold text-emerald-900 sm:text-xl">সম্পূর্ণ দান হিস্টোরি</h2>
        <div className="overflow-x-auto rounded-2xl border border-emerald-100">
          <table className="w-full text-sm">
            <thead className="bg-emerald-50 text-emerald-800">
              <tr>
                <th className="px-4 py-3 text-left">তারিখ</th>
                <th className="px-4 py-3 text-left">দাতা</th>
                <th className="px-4 py-3 text-left">মাধ্যম</th>
                <th className="px-4 py-3 text-right">পরিমাণ</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((donation, i) => (
                <tr key={i} className="border-t border-emerald-50">
                  <td className="px-4 py-3 text-stone-600">{donation.date}</td>
                  <td className="px-4 py-3 font-medium text-stone-800">{donation.donor}</td>
                  <td className="px-4 py-3 text-stone-600">{donation.method}</td>
                  <td className="px-4 py-3 text-right font-semibold text-emerald-700">
                    {formatBengaliNumber(donation.amount)} {siteConfig.fund.currency}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { getDonations } from "@/lib/sheet";
import { formatNumber, formatEuroDate } from "@/lib/format";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import FundProgress from "@/components/FundProgress";
import DepositCard from "@/components/DepositCard";

export default async function FundPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);

  const donations = await getDonations();
  const sorted = [...donations].sort((a, b) => b.date.localeCompare(a.date));

  const fmt = (amount: number) => `${formatNumber(amount, locale)} ${dict.fund.currencyWord}`;
  const facts = [
    { label: dict.fund.factLabels.purchasePrice, value: fmt(siteConfig.fund.targetAmount) },
    { label: dict.fund.factLabels.deadline, value: formatEuroDate(siteConfig.fund.purchaseDeadline) },
    { label: dict.fund.factLabels.renovationCost, value: fmt(siteConfig.fund.renovationCost) },
    {
      label: dict.fund.factLabels.donorGoal,
      value: `${formatNumber(siteConfig.fund.planPeopleMin, locale)}–${formatNumber(siteConfig.fund.planPeopleMax, locale)} ${dict.fund.peopleUnit}`,
    },
    {
      label: dict.fund.factLabels.monthlyMin,
      value: `${fmt(siteConfig.fund.monthlyPlanAmount)}/${dict.fund.monthUnit}`,
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <h1 className="text-2xl font-bold text-emerald-900 sm:text-3xl">{dict.fund.title}</h1>
      <p className="mt-2 text-sm text-stone-600 sm:text-base">{dict.fund.subtitle}</p>

      <div className="mt-6">
        <FundProgress
          donations={donations}
          target={siteConfig.fund.targetAmount}
          currency={siteConfig.fund.currency}
          locale={locale}
          dict={dict}
        />
      </div>

      <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2">
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5">
          <h2 className="font-semibold text-emerald-800">{dict.fund.contextTitle}</h2>
          <p className="mt-2 text-sm leading-7 text-stone-700">{dict.fund.contextText}</p>
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5">
          <h2 className="font-semibold text-emerald-800">{dict.fund.planTitle}</h2>
          <p className="mt-2 text-sm leading-7 text-stone-700">{dict.fund.planText}</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-emerald-100 bg-white p-5">
        <h2 className="font-semibold text-emerald-800">{dict.fund.factsTitle}</h2>
        <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="flex items-center justify-between gap-3 rounded-xl bg-emerald-50/60 px-4 py-3"
            >
              <dt className="text-stone-600">{fact.label}</dt>
              <dd className="font-semibold text-emerald-800">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-8 sm:mt-10">
        <DepositCard dict={dict} locale={locale} />
      </div>

      <div className="mt-8 sm:mt-10">
        <h2 className="mb-4 text-lg font-bold text-emerald-900 sm:text-xl">{dict.fund.historyTitle}</h2>
        <div className="overflow-x-auto rounded-2xl border border-emerald-100">
          <table className="w-full text-sm">
            <thead className="bg-emerald-50 text-emerald-800">
              <tr>
                <th className="px-4 py-3 text-left">{dict.home.tableDate}</th>
                <th className="px-4 py-3 text-left">{dict.home.tableDonor}</th>
                <th className="px-4 py-3 text-left">{dict.home.tableMethod}</th>
                <th className="px-4 py-3 text-right">{dict.home.tableAmount}</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((donation, i) => (
                <tr key={i} className="border-t border-emerald-50">
                  <td className="px-4 py-3 text-stone-600">{donation.date}</td>
                  <td className="px-4 py-3 font-medium text-stone-800">{donation.donor}</td>
                  <td className="px-4 py-3 text-stone-600">{donation.method}</td>
                  <td className="px-4 py-3 text-right font-semibold text-emerald-700">
                    {formatNumber(donation.amount, locale)} {siteConfig.fund.currency}
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

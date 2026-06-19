import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { getDonations } from "@/lib/sheet";
import { formatNumber } from "@/lib/format";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import FundProgress from "@/components/FundProgress";
import DepositCard from "@/components/DepositCard";
import DriveFolderGallery from "@/components/DriveFolderGallery";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);

  const donations = await getDonations();
  const recentDonations = [...donations]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  return (
    <div>
      <section className="relative isolate flex h-[68vh] min-h-120 max-h-180 w-full items-end overflow-hidden">
        <Image
          src="/banner.jpeg"
          alt={siteConfig.nameEn}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-emerald-950/95 via-emerald-950/55 to-emerald-950/10" />
        <div className="absolute inset-0 bg-linear-to-r from-emerald-950/60 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-10 sm:pb-14">
          <p className="text-sm font-medium uppercase tracking-widest text-emerald-200">
            {dict.home.tagline}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white drop-shadow-sm sm:text-5xl">
            {siteConfig.name}
          </h1>
          <p className="mt-3 max-w-2xl text-balance text-emerald-50/90 sm:text-base">
            {dict.about.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/${locale}/fund`}
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-emerald-900 shadow-lg shadow-emerald-950/30 transition hover:bg-emerald-50"
            >
              {dict.home.ctaDonate}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="rounded-full border border-white/50 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
            >
              {dict.home.ctaAbout}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2 sm:mb-6">
          <h2 className="text-xl font-bold text-emerald-900 sm:text-2xl">{dict.home.fundTitle}</h2>
          <Link href={`/${locale}/fund`} className="text-sm font-medium text-emerald-700 hover:underline">
            {dict.common.viewFullHistory}
          </Link>
        </div>
        <FundProgress
          donations={donations}
          target={siteConfig.fund.targetAmount}
          currency={siteConfig.fund.currency}
          locale={locale}
          dict={dict}
        />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        <DepositCard dict={dict} />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2 sm:mb-6">
          <h2 className="text-xl font-bold text-emerald-900 sm:text-2xl">{dict.home.recentTitle}</h2>
          <Link href={`/${locale}/fund`} className="text-sm font-medium text-emerald-700 hover:underline">
            {dict.common.viewAll}
          </Link>
        </div>
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
              {recentDonations.map((donation, i) => (
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
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2 sm:mb-6">
          <h2 className="text-xl font-bold text-emerald-900 sm:text-2xl">{dict.home.galleryTitle}</h2>
          <Link href={`/${locale}/gallery`} className="text-sm font-medium text-emerald-700 hover:underline">
            {dict.common.fullGallery}
          </Link>
        </div>
        <DriveFolderGallery
          folderId={siteConfig.drive.photosFolderId}
          kind="image"
          emptyLabel={dict.home.galleryEmpty}
          limit={8}
        />
      </section>
    </div>
  );
}

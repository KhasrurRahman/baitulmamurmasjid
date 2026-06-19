import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { getDonations, getGallery } from "@/lib/sheet";
import { driveImageUrl } from "@/lib/drive";
import { formatBengaliNumber } from "@/lib/format";
import FundProgress from "@/components/FundProgress";
import DepositCard from "@/components/DepositCard";

export default async function HomePage() {
  const [donations, gallery] = await Promise.all([getDonations(), getGallery()]);
  const recentDonations = [...donations]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);
  const previewGallery = gallery.slice(0, 6);

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
            {siteConfig.nameEn}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white drop-shadow-sm sm:text-5xl">
            {siteConfig.name}
          </h1>
          <p className="mt-3 max-w-2xl text-balance text-emerald-50/90 sm:text-base">
            {siteConfig.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="#fund"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-emerald-900 shadow-lg shadow-emerald-950/30 transition hover:bg-emerald-50"
            >
              ফান্ডে অনুদান দিন
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-white/50 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
            >
              মসজিদ সম্পর্কে জানুন
            </Link>
          </div>
        </div>
      </section>

      <section id="fund" className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2 sm:mb-6">
          <h2 className="text-xl font-bold text-emerald-900 sm:text-2xl">
            মসজিদ স্থায়ীভাবে ক্রয়ের ফান্ড
          </h2>
          <Link href="/fund" className="text-sm font-medium text-emerald-700 hover:underline">
            সম্পূর্ণ হিস্টোরি দেখুন →
          </Link>
        </div>
        <FundProgress
          donations={donations}
          target={siteConfig.fund.targetAmount}
          currency={siteConfig.fund.currency}
        />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        <DepositCard />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2 sm:mb-6">
          <h2 className="text-xl font-bold text-emerald-900 sm:text-2xl">সাম্প্রতিক অনুদান</h2>
          <Link href="/fund" className="text-sm font-medium text-emerald-700 hover:underline">
            সব দেখুন →
          </Link>
        </div>
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
              {recentDonations.map((donation, i) => (
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
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2 sm:mb-6">
          <h2 className="text-xl font-bold text-emerald-900 sm:text-2xl">গ্যালারি</h2>
          <Link href="/gallery" className="text-sm font-medium text-emerald-700 hover:underline">
            সম্পূর্ণ গ্যালারি →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {previewGallery.map((item, i) => (
            <div
              key={i}
              className="relative aspect-square overflow-hidden rounded-xl bg-emerald-50"
            >
              {item.driveLink ? (
                <Image
                  src={driveImageUrl(item.driveLink)}
                  alt={item.caption}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="flex h-full items-center justify-center px-2 text-center text-xs text-emerald-700">
                  {item.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

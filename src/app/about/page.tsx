import { siteConfig } from "@/lib/site-config";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      <h1 className="text-2xl font-bold text-emerald-900 sm:text-3xl">মসজিদ সম্পর্কে</h1>
      <p className="mt-4 text-sm leading-7 text-stone-700 sm:text-base">{siteConfig.description}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5">
          <h2 className="font-semibold text-emerald-800">ঠিকানা</h2>
          <p className="mt-1 text-stone-700">{siteConfig.address}</p>
          <p className="mt-1 text-sm text-stone-500">Plus Code: {siteConfig.plusCode}</p>
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5">
          <h2 className="font-semibold text-emerald-800">রেটিং</h2>
          <p className="mt-1 text-stone-700">
            ⭐ {siteConfig.rating.toFixed(1)} ({siteConfig.reviewCount}টি রিভিউ)
          </p>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-emerald-100">
        <iframe
          title="মসজিদের মানচিত্র"
          className="h-64 w-full sm:h-80"
          loading="lazy"
          src={`https://www.google.com/maps?q=${siteConfig.mapsQuery}&z=17&output=embed`}
        />
      </div>
      <a
        href={siteConfig.mapsViewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block text-sm font-medium text-emerald-700 hover:underline"
      >
        Google Maps-এ মসজিদের প্রবেশপথ দেখুন →
      </a>
    </div>
  );
}

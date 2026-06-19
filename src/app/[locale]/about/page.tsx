import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      <h1 className="text-2xl font-bold text-emerald-900 sm:text-3xl">{dict.about.title}</h1>
      <p className="mt-4 text-sm leading-7 text-stone-700 sm:text-base">{dict.about.description}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5">
          <h2 className="font-semibold text-emerald-800">{dict.about.addressLabel}</h2>
          <p className="mt-1 text-stone-700">{siteConfig.address}</p>
          <p className="mt-1 text-sm text-stone-500">Plus Code: {siteConfig.plusCode}</p>
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5">
          <h2 className="font-semibold text-emerald-800">{dict.about.ratingLabel}</h2>
          <p className="mt-1 text-stone-700">
            ⭐ {siteConfig.rating.toFixed(1)} ({siteConfig.reviewCount}
            {dict.about.reviewsSuffix})
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-emerald-100 bg-white p-5">
        <h2 className="font-semibold text-emerald-800">{dict.about.factsTitle}</h2>
        <ul className="mt-3 grid gap-2 text-sm text-stone-700 sm:grid-cols-2">
          {dict.about.facts.map((fact, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />
              <span>{fact}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-emerald-100">
        <iframe
          title={dict.about.title}
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
        {dict.about.mapLink}
      </a>
    </div>
  );
}

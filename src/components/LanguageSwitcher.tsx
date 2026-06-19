"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { locales, type Locale } from "@/i18n/config";

const labels: Record<Locale, string> = {
  de: "DE",
  bn: "বাং",
};

function withLocale(pathname: string, locale: Locale): string {
  const segments = pathname.split("/");
  segments[1] = locale;
  return segments.join("/") || "/";
}

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 rounded-full border border-emerald-200 bg-white p-0.5 text-xs">
      {locales.map((l) => (
        <Link
          key={l}
          href={withLocale(pathname, l)}
          className={`rounded-full px-2.5 py-1 font-medium transition ${
            l === locale
              ? "bg-emerald-700 text-white"
              : "text-emerald-800 hover:bg-emerald-50"
          }`}
        >
          {labels[l]}
        </Link>
      ))}
    </div>
  );
}

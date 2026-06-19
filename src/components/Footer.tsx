import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-emerald-100 bg-emerald-50/60">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-emerald-900/80">
        <p className="font-semibold text-emerald-900">{siteConfig.name}</p>
        <p className="mt-1">{siteConfig.address}</p>

        <div className="mt-6 flex flex-col gap-3 border-t border-emerald-900/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-emerald-900/60">
            &copy; {new Date().getFullYear()} {siteConfig.nameEn}. সর্বস্বত্ব সংরক্ষিত।
          </p>
          <a
            href="https://www.linkedin.com/in/khasrur-rahmna/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-emerald-900/70 transition hover:text-emerald-900"
          >
            Developed by <span className="font-medium text-emerald-900">Khasrur Rahman</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

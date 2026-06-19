import { notFound } from "next/navigation";
import { getDocuments } from "@/lib/sheet";
import { drivePreviewUrl } from "@/lib/drive";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function DocumentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);

  const extraDocuments = await getDocuments();
  const documents = [...dict.documents.items, ...extraDocuments];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <h1 className="text-2xl font-bold text-emerald-900 sm:text-3xl">{dict.documents.title}</h1>
      <p className="mt-2 text-sm text-stone-600 sm:text-base">{dict.documents.subtitle}</p>

      <div className="mt-6 space-y-6 sm:space-y-8">
        {documents.map((doc, i) => (
          <div key={i} className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm sm:p-5">
            <h2 className="text-base font-semibold text-emerald-800 sm:text-lg">{doc.title}</h2>
            <p className="mt-1 text-sm text-stone-600">{doc.description}</p>
            {doc.fileUrl ? (
              <div className="mt-4 flex flex-col gap-4">
                <div className="overflow-hidden rounded-xl border border-emerald-50 bg-stone-50">
                  <object
                    data={doc.fileUrl}
                    type={doc.fileUrl.endsWith(".jpg") || doc.fileUrl.endsWith(".png") ? "image/jpeg" : "application/pdf"}
                    className="h-80 w-full sm:h-120"
                  >
                    <div className="flex h-full items-center justify-center p-4 text-center text-sm text-stone-500">
                      Preview not available. Please download the file to view it.
                    </div>
                  </object>
                </div>
                <a
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {locale === "bn" ? "ডাউনলোড / ফুলস্ক্রিন" : "Download / Vollbild"}
                </a>
              </div>
            ) : doc.driveLink ? (
              <div className="mt-4 overflow-hidden rounded-xl border border-emerald-50">
                <iframe
                  title={doc.title}
                  src={drivePreviewUrl(doc.driveLink)}
                  className="h-80 w-full sm:h-120"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="mt-4 flex h-28 items-center justify-center rounded-xl bg-emerald-50 px-3 text-center text-sm text-emerald-700 sm:h-32">
                {dict.documents.previewPlaceholder}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

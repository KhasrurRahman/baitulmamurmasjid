import { getDocuments } from "@/lib/sheet";
import { drivePreviewUrl } from "@/lib/drive";

export default async function DocumentsPage() {
  const documents = await getDocuments();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <h1 className="text-2xl font-bold text-emerald-900 sm:text-3xl">ডকুমেন্টস</h1>
      <p className="mt-2 text-sm text-stone-600 sm:text-base">
        মসজিদ ক্রয় সম্পর্কিত দলিল, চুক্তিপত্র ও অন্যান্য গুরুত্বপূর্ণ কাগজপত্র।
      </p>

      <div className="mt-6 space-y-6 sm:space-y-8">
        {documents.map((doc, i) => (
          <div key={i} className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm sm:p-5">
            <h2 className="text-base font-semibold text-emerald-800 sm:text-lg">{doc.title}</h2>
            <p className="mt-1 text-sm text-stone-600">{doc.description}</p>
            {doc.driveLink ? (
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
                ডকুমেন্ট লিংক যুক্ত করা হলে এখানে প্রিভিউ দেখা যাবে
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

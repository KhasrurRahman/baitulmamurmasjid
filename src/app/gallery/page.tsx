import Image from "next/image";
import { getGallery } from "@/lib/sheet";
import { driveImageUrl } from "@/lib/drive";

export default async function GalleryPage() {
  const gallery = await getGallery();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <h1 className="text-2xl font-bold text-emerald-900 sm:text-3xl">গ্যালারি</h1>
      <p className="mt-2 text-sm text-stone-600 sm:text-base">মসজিদের ছবি ও ভিডিও সংগ্রহ।</p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4">
        {gallery.map((item, i) => (
          <figure
            key={i}
            className="overflow-hidden rounded-xl border border-emerald-100 bg-emerald-50/40"
          >
            <div className="relative aspect-square">
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
            {item.caption && (
              <figcaption className="px-2 py-2 text-xs text-stone-600">{item.caption}</figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  );
}

import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import DriveFolderGallery from "@/components/DriveFolderGallery";

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <h1 className="text-2xl font-bold text-emerald-900 sm:text-3xl">{dict.gallery.title}</h1>
      <p className="mt-2 text-sm text-stone-600 sm:text-base">{dict.gallery.subtitle}</p>

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold text-emerald-800 sm:text-xl">
          {dict.gallery.photosTitle}
        </h2>
        <DriveFolderGallery
          folderId={siteConfig.drive.photosFolderId}
          kind="image"
          emptyLabel={dict.gallery.photosEmpty}
        />
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-lg font-semibold text-emerald-800 sm:text-xl">
          {dict.gallery.videosTitle}
        </h2>
        <DriveFolderGallery
          folderId={siteConfig.drive.videosFolderId}
          kind="video"
          emptyLabel={dict.gallery.videosEmpty}
        />
      </section>
    </div>
  );
}

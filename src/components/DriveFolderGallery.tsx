import Image from "next/image";
import { getDrivePhotos, getDriveVideos } from "@/lib/drive-api";

export default async function DriveFolderGallery({
  folderId,
  kind,
  emptyLabel,
  limit,
}: {
  folderId: string;
  kind: "image" | "video";
  emptyLabel: string;
  limit?: number;
}) {
  const files = folderId
    ? kind === "image"
      ? await getDrivePhotos(folderId)
      : await getDriveVideos(folderId)
    : [];

  const items = limit ? files.slice(0, limit) : files;

  if (items.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/40 px-4 text-center text-sm text-emerald-700">
        {emptyLabel}
      </div>
    );
  }

  if (kind === "video") {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {items.map((file) => (
          <div
            key={file.id}
            className="overflow-hidden rounded-xl border border-emerald-100 bg-white shadow-sm"
          >
            <iframe
              title={file.name}
              src={`https://drive.google.com/file/d/${file.id}/preview`}
              allow="autoplay"
              className="aspect-video w-full"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4">
      {items.map((file) => (
        <div
          key={file.id}
          className="relative aspect-square overflow-hidden rounded-xl border border-emerald-100 bg-emerald-50"
        >
          <Image
            src={file.thumbnailUrl}
            alt={file.name}
            fill
            sizes="(min-width: 768px) 25vw, 50vw"
            className="object-cover"
            unoptimized
          />
        </div>
      ))}
    </div>
  );
}

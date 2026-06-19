import { siteConfig } from "./site-config";

export type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  thumbnailUrl: string;
};



async function listFolderFiles(
  folderId: string,
  mimeTypeFilter: "image" | "video"
): Promise<DriveFile[]> {
  const apiKey = siteConfig.drive.apiKey;
  if (!folderId || !apiKey) return [];

  const files: DriveFile[] = [];
  let pageToken: string | undefined;
  let pageCount = 0;

  try {
    do {
      const params = new URLSearchParams({
        q: `'${folderId}' in parents and trashed = false and mimeType contains '${mimeTypeFilter}/'`,
        key: apiKey,
        fields: "nextPageToken, files(id, name, mimeType, thumbnailLink)",
        orderBy: "createdTime desc",
        pageSize: "100",
      });
      if (pageToken) params.set("pageToken", pageToken);

      const res = await fetch(`https://www.googleapis.com/drive/v3/files?${params}`, {
        next: { revalidate: siteConfig.sheet.revalidateSeconds },
      });
      if (!res.ok) break;

      const data = await res.json();
      for (const file of data.files ?? []) {
        // Use official thumbnailLink and increase the size parameter (default is =s220)
        let tUrl = file.thumbnailLink;
        if (tUrl) {
           tUrl = tUrl.replace(/=s\d+$/, "=s1000");
        } else {
           // Fallback if somehow missing
           tUrl = `https://drive.google.com/uc?export=view&id=${file.id}`;
        }
        
        files.push({
          id: file.id,
          name: file.name,
          mimeType: file.mimeType,
          thumbnailUrl: tUrl,
        });
      }
      pageToken = data.nextPageToken;
      pageCount += 1;
    } while (pageToken && pageCount < 5);
  } catch {
    return [];
  }

  return files;
}

export async function getDrivePhotos(folderId: string): Promise<DriveFile[]> {
  return listFolderFiles(folderId, "image");
}

export async function getDriveVideos(folderId: string): Promise<DriveFile[]> {
  return listFolderFiles(folderId, "video");
}

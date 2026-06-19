function extractDriveId(url: string): string | null {
  const patterns = [/\/d\/([a-zA-Z0-9_-]+)/, /id=([a-zA-Z0-9_-]+)/];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export function driveImageUrl(url: string): string {
  const id = extractDriveId(url);
  return id ? `https://drive.google.com/uc?export=view&id=${id}` : url;
}

export function drivePreviewUrl(url: string): string {
  const id = extractDriveId(url);
  return id ? `https://drive.google.com/file/d/${id}/preview` : url;
}

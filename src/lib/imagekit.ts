import 'server-only';

/** Minimal ImageKit client over its REST API (no SDK needed). Server-side only: uses the private key. */
const PRIVATE = process.env.IMAGEKIT_PRIVATE_KEY;
const auth = () => 'Basic ' + Buffer.from(`${PRIVATE}:`).toString('base64');

export const imagekitConfigured = () => Boolean(PRIVATE && process.env.IMAGEKIT_URL_ENDPOINT);

export const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
const TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

/** Checks a file from a form. Returns an error message, or null when it is fine (or absent). */
export function photoProblem(file: File | null): string | null {
  if (!file || file.size === 0) return null;
  if (!TYPES.includes(file.type)) return 'Photos must be JPG, PNG, WebP or AVIF.';
  if (file.size > MAX_PHOTO_BYTES) return 'Photos must be 5 MB or smaller.';
  if (!imagekitConfigured()) return 'Photo uploads are not set up yet: add the ImageKit keys to the environment.';
  return null;
}

export async function uploadPhoto(file: File, name: string, folder = '/pet-shelter-ng/animals') {
  const body = new FormData();
  body.append('file', file);
  body.append('fileName', name);
  body.append('folder', folder);
  body.append('useUniqueFileName', 'true');
  const res = await fetch('https://upload.imagekit.io/api/v1/files/upload', { method: 'POST', headers: { Authorization: auth() }, body });
  if (!res.ok) throw new Error(`ImageKit upload failed (${res.status}): ${await res.text()}`);
  const json = (await res.json()) as { url: string; fileId: string };
  return { url: json.url, fileId: json.fileId };
}

/** Best effort: a failed delete only leaves an unused file in ImageKit. */
export async function deletePhoto(fileId: string | null | undefined) {
  if (!fileId || !PRIVATE) return;
  try {
    const res = await fetch(`https://api.imagekit.io/v1/files/${encodeURIComponent(fileId)}`, { method: 'DELETE', headers: { Authorization: auth() } });
    if (!res.ok && res.status !== 404) console.error('[imagekit] delete failed', res.status);
  } catch (e) {
    console.error('[imagekit] delete failed', e);
  }
}

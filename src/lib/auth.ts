/**
 * Minimal password gate for /admin.
 * The session cookie holds a SHA-256 of ADMIN_PASSWORD + SESSION_SECRET, so it can be
 * verified in middleware (Edge runtime) without a database.
 * Replace with a proper auth library (e.g. Auth.js, Clerk, Supabase Auth) before going live.
 */
export const SESSION_COOKIE = 'psng_admin';

async function sha256(text: string) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export const authConfigured = () => Boolean(process.env.ADMIN_PASSWORD && process.env.SESSION_SECRET);

export async function sessionToken() {
  return sha256(`${process.env.ADMIN_PASSWORD}:${process.env.SESSION_SECRET}`);
}

export async function isValidSession(value: string | undefined) {
  if (!value || !authConfigured()) return false;
  return value === (await sessionToken());
}

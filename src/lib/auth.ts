/**
 * Staff sessions. Accounts live in the admin_users table (bcrypt hashes).
 * The cookie holds "username.expiry.signature", signed with SESSION_SECRET (HMAC-SHA256),
 * so middleware on the Edge runtime can verify it without a database call.
 */
export const SESSION_COOKIE = 'psng_admin';
export const SESSION_HOURS = 8;

const enc = new TextEncoder();
const b64url = (buf: ArrayBuffer) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

export const authConfigured = () => Boolean(process.env.SESSION_SECRET);

async function sign(data: string) {
  const key = await crypto.subtle.importKey('raw', enc.encode(process.env.SESSION_SECRET!), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return b64url(await crypto.subtle.sign('HMAC', key, enc.encode(data)));
}

export async function createSessionToken(username: string) {
  const exp = Date.now() + SESSION_HOURS * 3600_000;
  const body = `${encodeURIComponent(username)}.${exp}`;
  return `${body}.${await sign(body)}`;
}

/** Returns the username for a valid, unexpired token, otherwise null. */
export async function readSession(value: string | undefined): Promise<string | null> {
  if (!value || !authConfigured()) return null;
  const [user, exp, sig] = value.split('.');
  if (!user || !exp || !sig || Number(exp) < Date.now()) return null;
  const expected = await sign(`${user}.${exp}`);
  if (expected.length !== sig.length) return null;
  let diff = 0;
  for (let i = 0; i < sig.length; i++) diff |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0 ? decodeURIComponent(user) : null;
}

export const isValidSession = async (value: string | undefined) => (await readSession(value)) !== null;

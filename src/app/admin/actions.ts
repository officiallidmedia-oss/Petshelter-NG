'use server';

import bcrypt from 'bcryptjs';
import { eq, sql } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { db, schema } from '@/db';
import { SESSION_COOKIE, SESSION_HOURS, authConfigured, createSessionToken } from '@/lib/auth';

// Real hash of a random string: compared against when the username is unknown, so timing reveals nothing.
const DUMMY_HASH = bcrypt.hashSync(crypto.randomUUID(), 12);

export type LoginState = { error?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!authConfigured()) return { error: 'Sign-in is not set up yet: SESSION_SECRET is missing.' };
  const username = String(formData.get('username') ?? '').trim();
  const password = String(formData.get('password') ?? '');
  if (!username || !password) return { error: 'Enter your username and password.' };

  const [user] = await db
    .select()
    .from(schema.adminUsers)
    .where(eq(sql`lower(${schema.adminUsers.username})`, username.toLowerCase()))
    .limit(1);
  const ok = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH);
  if (!user || !ok) return { error: 'That username or password is not right.' };

  (await cookies()).set(SESSION_COOKIE, await createSessionToken(user.username), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_HOURS * 3600,
  });
  redirect('/admin');
}

export async function logout() {
  (await cookies()).delete({ name: SESSION_COOKIE, path: '/' });
  redirect('/admin/login');
}

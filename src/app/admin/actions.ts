'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE, authConfigured, sessionToken } from '@/lib/auth';

export type LoginState = { error?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!authConfigured()) {
    return { error: 'Admin sign-in is not set up. Add ADMIN_PASSWORD and SESSION_SECRET to .env.local.' };
  }
  const password = String(formData.get('password') ?? '');
  if (password !== process.env.ADMIN_PASSWORD) return { error: 'That password is not right. Try again.' };

  (await cookies()).set(SESSION_COOKIE, await sessionToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/admin',
    maxAge: 60 * 60 * 8,
  });
  redirect('/admin');
}

export async function logout() {
  (await cookies()).delete({ name: SESSION_COOKIE, path: '/admin' });
  redirect('/admin/login');
}

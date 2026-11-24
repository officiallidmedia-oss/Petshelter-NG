import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIE, isValidSession } from '@/lib/auth';

/** Keeps everything under /admin behind the sign-in page. */
export async function middleware(req: NextRequest) {
  const signedIn = await isValidSession(req.cookies.get(SESSION_COOKIE)?.value);
  const onLogin = req.nextUrl.pathname === '/admin/login';

  if (onLogin && signedIn) return NextResponse.redirect(new URL('/admin', req.url));
  if (!onLogin && !signedIn) return NextResponse.redirect(new URL('/admin/login', req.url));
  return NextResponse.next();
}

export const config = { matcher: ['/admin/:path*'] };

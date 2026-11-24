import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db, schema } from '@/db';
import { sendFormEmails } from '@/lib/email';

const KINDS = ['adoption', 'foster', 'volunteer', 'partner', 'vendor', 'report', 'contact'];

const Field = z.string().max(5000);
const Email = z.string().trim().email().max(200);

/**
 * Receives every public form: validates it, stores it in Neon,
 * then sends the staff alert and confirmation through Resend.
 */
export async function POST(req: Request, { params }: { params: Promise<{ kind: string }> }) {
  const { kind } = await params;
  if (!KINDS.includes(kind)) return NextResponse.json({ ok: false, error: 'Unknown form' }, { status: 404 });

  const form = await req.formData();
  const data: Record<string, string | string[]> = {};
  form.forEach((value, key) => {
    if (typeof value !== 'string') return; // photo uploads: add object storage (e.g. Vercel Blob) later
    const prev = data[key];
    data[key] = prev === undefined ? value : Array.isArray(prev) ? [...prev, value] : [prev, value];
  });

  // Honeypot: real visitors never fill this hidden field.
  if (data.website) return NextResponse.json({ ok: true });

  const keys = Object.keys(data);
  if (!keys.length || keys.length > 80) return NextResponse.json({ ok: false, error: 'Invalid form' }, { status: 400 });

  const valid = z.record(z.string().max(100), z.union([Field, z.array(Field)])).safeParse(data);
  if (!valid.success) return NextResponse.json({ ok: false, error: 'Invalid form' }, { status: 400 });

  if (typeof data.email === 'string' && data.email.trim() && !Email.safeParse(data.email).success) {
    return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 });
  }

  const str = (k: string) => (typeof data[k] === 'string' && data[k] ? (data[k] as string).trim() : null);

  try {
    await db.insert(schema.submissions).values({ kind, name: str('name'), email: str('email'), phone: str('phone'), data });
  } catch (e) {
    console.error(`[form:${kind}] database error`, e);
    return NextResponse.json({ ok: false, error: 'Could not save your submission' }, { status: 500 });
  }

  await sendFormEmails(kind, data);
  return NextResponse.json({ ok: true });
}

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db, schema } from '@/db';
import { sendFormEmails } from '@/lib/email';
import {
  MAX_FIELD_LENGTH,
  MAX_FORM_FIELDS,
  isFormKind,
  refFor,
  validateSubmission,
  type FormResponse,
} from '@/lib/forms';

const Field = z.string().max(MAX_FIELD_LENGTH);
const Payload = z.record(z.string().max(100), z.union([Field, z.array(Field)]));

const reply = (body: FormResponse, status = 200) => NextResponse.json(body, { status });

/**
 * Receives every public form. It enforces the same required fields as the
 * browser form, stores the submission in Neon, then sends the staff alert and
 * confirmation through Resend. Always answers with the FormResponse contract.
 */
export async function POST(req: Request, { params }: { params: Promise<{ kind: string }> }) {
  const { kind } = await params;
  if (!isFormKind(kind)) return reply({ ok: false, error: 'Unknown form.' }, 404);

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return reply({ ok: false, error: 'Could not read the form. Please try again.' }, 400);
  }

  // Honeypot: real visitors never see or fill this hidden field.
  const honey = form.get('website');
  if (typeof honey === 'string' && honey.trim()) return reply({ ok: true });

  const data: Record<string, string | string[]> = {};
  form.forEach((value, key) => {
    if (key === 'website' || typeof value !== 'string') return; // file inputs: object storage later
    const prev = data[key];
    data[key] = prev === undefined ? value : Array.isArray(prev) ? [...prev, value] : [prev, value];
  });

  const keys = Object.keys(data);
  if (!keys.length || keys.length > MAX_FORM_FIELDS) return reply({ ok: false, error: 'Invalid form.' }, 400);

  const payload = Payload.safeParse(data);
  if (!payload.success) return reply({ ok: false, error: 'Invalid form.' }, 400);

  const problem = validateSubmission(kind, data);
  if (problem) return reply(problem, 400);

  const str = (k: string) => (typeof data[k] === 'string' && data[k] ? (data[k] as string).trim() : null);

  let id: number;
  try {
    const [row] = await db
      .insert(schema.submissions)
      .values({ kind, name: str('name'), email: str('email'), phone: str('phone'), data })
      .returning({ id: schema.submissions.id });
    id = row.id;
  } catch (e) {
    console.error(`[form:${kind}] database error`, e);
    return reply({ ok: false, error: 'Could not save your submission. Please try again.' }, 500);
  }

  await sendFormEmails(kind, data);
  return reply({ ok: true, ref: refFor(kind, id) });
}

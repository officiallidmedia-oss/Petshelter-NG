'use server';

import { desc, eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db, schema } from '@/db';
import { SESSION_COOKIE, isValidSession } from '@/lib/auth';
import { STATUS_OPTIONS } from '@/lib/admin-queries';

/** Server actions are public endpoints, so check the staff session in every one. */
async function requireAdmin() {
  if (!(await isValidSession((await cookies()).get(SESSION_COOKIE)?.value))) redirect('/admin/login');
}

export type SaveState = { error?: string; ok?: string };

const AnimalInput = z.object({
  name: z.string().trim().min(1, 'Name is required').max(80),
  breed: z.string().trim().max(120),
  species: z.enum(['Dog', 'Cat']),
  sex: z.enum(['Male', 'Female']),
  age: z.string().trim().max(40),
  size: z.enum(['Small', 'Medium', 'Large']),
  status: z.enum(['available', 'treatment', 'fostered', 'adopted', 'rescued']),
  story: z.string().trim().max(5000),
});

function ageGroupOf(age: string): 'young' | 'adult' | 'senior' {
  const n = parseFloat(age) || 0;
  if (/month|week|day/i.test(age)) return 'young';
  return n >= 6 ? 'senior' : 'adult';
}

const slugify = (s: string) => s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'animal';

function refreshAnimalPages(slug: string) {
  ['/', '/adopt', '/impact', '/donate', `/adopt/${slug}`].forEach((p) => revalidatePath(p));
}

export async function saveAnimal(_prev: SaveState, formData: FormData): Promise<SaveState> {
  await requireAdmin();

  const parsed = AnimalInput.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Please check the form.' };
  const v = parsed.data;
  const flags = {
    vax: formData.get('vax') === 'on',
    ster: formData.get('ster') === 'on',
    dew: formData.get('dew') === 'on',
    chip: formData.get('chip') === 'on',
  };

  const id = String(formData.get('id') ?? '');
  if (id) {
    const [existing] = await db.select().from(schema.animals).where(eq(schema.animals.id, id)).limit(1);
    if (!existing) return { error: 'That animal no longer exists.' };
    await db.update(schema.animals).set({ ...v, ...flags, ageGroup: ageGroupOf(v.age) }).where(eq(schema.animals.id, id));
    refreshAnimalPages(existing.slug);
    revalidatePath('/admin/animals');
    return { ok: `${v.name} saved.` };
  }

  // New animal: next PSNG number and a unique slug.
  const [last] = await db.select({ id: schema.animals.id }).from(schema.animals).orderBy(desc(schema.animals.id)).limit(1);
  const next = (parseInt(last?.id.replace(/\D/g, '') ?? '100', 10) || 100) + 1;
  const base = slugify(v.name);
  const taken = new Set((await db.select({ slug: schema.animals.slug }).from(schema.animals)).map((r) => r.slug));
  let slug = base;
  for (let n = 2; taken.has(slug); n++) slug = `${base}-${n}`;

  await db.insert(schema.animals).values({
    ...v,
    ...flags,
    id: `PSNG-${String(next).padStart(4, '0')}`,
    slug,
    ageGroup: ageGroupOf(v.age),
    good: [],
    c: (['c1', 'c2', 'c3', 'c4'] as const)[next % 4],
  });
  refreshAnimalPages(slug);
  redirect('/admin/animals');
}

export async function setSubmissionStatus(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get('id'));
  const status = String(formData.get('status') ?? '');
  const [row] = Number.isInteger(id) ? await db.select().from(schema.submissions).where(eq(schema.submissions.id, id)).limit(1) : [];
  if (!row || !(STATUS_OPTIONS[row.kind] ?? []).includes(status)) return;
  await db.update(schema.submissions).set({ status }).where(eq(schema.submissions.id, id));
  revalidatePath('/admin', 'layout');
}

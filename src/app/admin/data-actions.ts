'use server';

import { desc, eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db, schema } from '@/db';
import { SESSION_COOKIE, isValidSession } from '@/lib/auth';
import { STATUS_OPTIONS } from '@/lib/admin-queries';
import { deletePhoto, photoProblem, uploadPhoto } from '@/lib/imagekit';

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

  const parsed = AnimalInput.safeParse(Object.fromEntries([...formData].filter(([, v]) => typeof v === 'string')));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? 'Please check the form.' };
  const v = parsed.data;
  const flags = {
    vax: formData.get('vax') === 'on',
    ster: formData.get('ster') === 'on',
    dew: formData.get('dew') === 'on',
    chip: formData.get('chip') === 'on',
  };
  const good = formData.getAll('good').map(String).filter((g) => ['kids', 'dogs', 'cats'].includes(g));

  const photo = formData.get('photo');
  const file = photo instanceof File && photo.size > 0 ? photo : null;
  const problem = photoProblem(file);
  if (problem) return { error: problem };
  const removePhoto = formData.get('removePhoto') === 'on';

  const id = String(formData.get('id') ?? '');
  const existing = id ? (await db.select().from(schema.animals).where(eq(schema.animals.id, id)).limit(1))[0] : undefined;
  if (id && !existing) return { error: 'That animal no longer exists.' };

  // Upload first, so a failed upload changes nothing.
  let img: { img: string | null; imgFileId: string | null } | undefined;
  if (file) {
    try {
      const up = await uploadPhoto(file, `${slugify(v.name)}-${Date.now()}`);
      img = { img: up.url, imgFileId: up.fileId };
    } catch (e) {
      console.error(e);
      return { error: 'The photo could not be uploaded. Please try again.' };
    }
  } else if (removePhoto) {
    img = { img: null, imgFileId: null };
  }

  if (existing) {
    await db.update(schema.animals).set({ ...v, ...flags, good, ageGroup: ageGroupOf(v.age), ...(img ?? {}) }).where(eq(schema.animals.id, existing.id));
    if (img) await deletePhoto(existing.imgFileId);
    refreshAnimalPages(existing.slug);
    revalidatePath('/admin', 'layout');
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
    ...(img ?? {}),
    id: `PSNG-${String(next).padStart(4, '0')}`,
    slug,
    ageGroup: ageGroupOf(v.age),
    good,
    c: (['c1', 'c2', 'c3', 'c4'] as const)[next % 4],
  });
  refreshAnimalPages(slug);
  revalidatePath('/admin', 'layout');
  redirect('/admin/animals?saved=1');
}

export async function deleteAnimal(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get('id') ?? '');
  const [a] = await db.select().from(schema.animals).where(eq(schema.animals.id, id)).limit(1);
  if (!a) redirect('/admin/animals');

  // Keep history: an animal with medical or follow-up records can't be deleted, only marked adopted.
  const [med] = await db.select({ id: schema.medicalRecords.id }).from(schema.medicalRecords).where(eq(schema.medicalRecords.animalId, id)).limit(1);
  const [fu] = await db.select({ id: schema.followUps.id }).from(schema.followUps).where(eq(schema.followUps.animalId, id)).limit(1);
  if (med || fu) redirect(`/admin/animals/${a.slug}?blocked=1`);

  await db.delete(schema.animals).where(eq(schema.animals.id, id));
  await deletePhoto(a.imgFileId);
  refreshAnimalPages(a.slug);
  revalidatePath('/admin', 'layout');
  redirect('/admin/animals?deleted=1');
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

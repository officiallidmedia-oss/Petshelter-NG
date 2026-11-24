import { asc, desc, eq, inArray, ne, or } from 'drizzle-orm';
import { db, schema } from '@/db';
import 'server-only';
import type { Animal, Story } from './types';

/** Animals and stories come from the Neon database (see src/db). */

type StoryRow = Story & { body: string };
const toAnimal = (r: typeof schema.animals.$inferSelect): Animal => r as unknown as Animal;
const toStory = (r: typeof schema.stories.$inferSelect): StoryRow => r as unknown as StoryRow;

/* Query helpers */
export const getAnimals = async () => (await db.select().from(schema.animals).orderBy(desc(schema.animals.id))).map(toAnimal);
export const getAnimal = async (slug: string) => {
  const [r] = await db.select().from(schema.animals).where(eq(schema.animals.slug, slug)).limit(1);
  return r ? toAnimal(r) : undefined;
};
export const getAdoptable = async () => (await db.select().from(schema.animals).where(ne(schema.animals.status, 'adopted')).orderBy(asc(schema.animals.id))).map(toAnimal);
export const getAvailable = async () => (await db.select().from(schema.animals).where(eq(schema.animals.status, 'available')).orderBy(asc(schema.animals.id))).map(toAnimal);
export const getSponsorable = async () =>
  (await db.select().from(schema.animals).where(or(inArray(schema.animals.status, ['treatment', 'fostered']), eq(schema.animals.ageGroup, 'senior'))).orderBy(asc(schema.animals.id))).map(toAnimal);
export const getStories = async () => (await db.select().from(schema.stories)).map(toStory);
export const getStory = async (slug: string) => {
  const [r] = await db.select().from(schema.stories).where(eq(schema.stories.slug, slug)).limit(1);
  return r ? toStory(r) : undefined;
};

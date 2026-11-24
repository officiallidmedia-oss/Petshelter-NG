import { boolean, index, integer, jsonb, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const animals = pgTable('animals', {
  id: text('id').primaryKey(), // e.g. PSNG-0101
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  species: text('species').notNull(),
  sex: text('sex').notNull(),
  age: text('age').notNull(),
  ageGroup: text('age_group').notNull(),
  size: text('size').notNull(),
  breed: text('breed').notNull(),
  status: text('status').notNull(),
  good: jsonb('good').$type<string[]>().notNull().default([]),
  vax: boolean('vax').notNull().default(false),
  ster: boolean('ster').notNull().default(false),
  dew: boolean('dew').notNull().default(false),
  chip: boolean('chip').notNull().default(false),
  story: text('story').notNull().default(''),
  c: text('c').notNull().default('c1'),
  img: text('img'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const stories = pgTable('stories', {
  slug: text('slug').primaryKey(),
  name: text('name').notNull(),
  summary: text('summary').notNull(),
  body: text('body').notNull(),
  c: text('c').notNull().default('c1'),
  journey: jsonb('journey').$type<string[]>().notNull().default([]),
});

/** Every public form (adoption, foster, volunteer, partner, vendor, report, contact). */
export const submissions = pgTable(
  'submissions',
  {
    id: serial('id').primaryKey(),
    kind: text('kind').notNull(),
    status: text('status').notNull().default('new'),
    name: text('name'),
    email: text('email'),
    phone: text('phone'),
    data: jsonb('data').$type<Record<string, string | string[]>>().notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (t) => [index('submissions_kind_idx').on(t.kind, t.createdAt)],
);

export const donations = pgTable('donations', {
  id: serial('id').primaryKey(),
  donor: text('donor'),
  email: text('email'),
  amountNgn: integer('amount_ngn').notNull(),
  purpose: text('purpose'),
  reference: text('reference'),
  status: text('status').notNull().default('pending'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const followUps = pgTable('follow_ups', {
  id: serial('id').primaryKey(),
  animalId: text('animal_id').references(() => animals.id),
  adopterName: text('adopter_name').notNull(),
  adopterEmail: text('adopter_email'),
  milestone: text('milestone').notNull(), // 7d, 30d, 90d, 6m, 12m
  dueOn: timestamp('due_on').notNull(),
  sentAt: timestamp('sent_at'),
  done: boolean('done').notNull().default(false),
  notes: text('notes'),
});

export const medicalRecords = pgTable('medical_records', {
  id: serial('id').primaryKey(),
  animalId: text('animal_id')
    .notNull()
    .references(() => animals.id),
  kind: text('kind').notNull(), // vaccination, surgery, treatment...
  notes: text('notes'),
  vet: text('vet'),
  recordedOn: timestamp('recorded_on').notNull().defaultNow(),
});

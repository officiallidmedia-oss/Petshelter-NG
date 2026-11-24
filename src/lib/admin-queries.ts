import { desc, inArray } from 'drizzle-orm';
import { db, schema } from '@/db';

export type Submission = typeof schema.submissions.$inferSelect;

/** Status choices per kind of submission. The first one is the default ("new"). */
export const STATUS_OPTIONS: Record<string, string[]> = {
  adoption: ['New', 'In review', 'Home visit', 'Approved', 'Declined'],
  foster: ['New', 'In review', 'Home visit', 'Approved', 'Declined'],
  report: ['New', 'Team dispatched', 'Rescued', 'Closed'],
  volunteer: ['New', 'Orientation booked', 'Active'],
  vendor: ['New', 'Requested', 'Quote sent', 'Confirmed'],
  partner: ['New', 'In review', 'Closed'],
  contact: ['New', 'Closed'],
};

export const REF_PREFIX: Record<string, string> = {
  adoption: 'AD', foster: 'FO', report: 'RP', volunteer: 'VO', vendor: 'VN', partner: 'PN', contact: 'CT',
};

export async function getSubmissions(kinds: string[]): Promise<Submission[]> {
  return db.select().from(schema.submissions).where(inArray(schema.submissions.kind, kinds)).orderBy(desc(schema.submissions.createdAt));
}

export const refOf = (s: Submission) => `${REF_PREFIX[s.kind] ?? 'SB'}-${String(s.id).padStart(4, '0')}`;
export const statusOf = (s: Submission) => (s.status === 'new' ? 'New' : s.status);
export const fmtDate = (d: Date) => d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
export const field = (s: Submission, key: string) => {
  const v = s.data[key];
  return Array.isArray(v) ? v.join(', ') : (v ?? '');
};
export const countStatus = (rows: Submission[], label: string) => rows.filter((r) => statusOf(r) === label).length;

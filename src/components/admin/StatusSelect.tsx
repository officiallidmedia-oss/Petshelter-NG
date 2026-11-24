'use client';

import { setSubmissionStatus } from '@/app/admin/data-actions';

/** Dropdown that saves the new status as soon as it changes. */
export default function StatusSelect({ id, value, options }: { id: number; value: string; options: string[] }) {
  return (
    <form action={setSubmissionStatus}>
      <input type="hidden" name="id" value={id} />
      <select name="status" defaultValue={value} aria-label="Status" onChange={(e) => e.currentTarget.form?.requestSubmit()}>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </form>
  );
}

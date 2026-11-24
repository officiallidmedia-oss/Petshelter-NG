'use client';

import Link from 'next/link';
import { useActionState, useEffect } from 'react';
import { saveAnimal, type SaveState } from '@/app/admin/data-actions';
import { STATUS } from '@/lib/content';
import type { Animal } from '@/lib/types';
import { useToast } from '../Toast';

/** Add / edit form. Saves to the database through the saveAnimal server action. */
export default function AnimalEditor({ animal }: { animal?: Animal }) {
  const toast = useToast();
  const a = animal;
  const [state, action, pending] = useActionState<SaveState, FormData>(saveAnimal, {});

  useEffect(() => {
    if (state.ok) toast(state.ok);
    else if (state.error) toast(state.error);
  }, [state, toast]);

  return (
    <form className="form" action={action}>
      {a && <input type="hidden" name="id" value={a.id} />}
      <fieldset>
        <legend>Profile</legend>
        <div className="row2">
          <div className="field"><label htmlFor="an-name">Name</label><input id="an-name" name="name" defaultValue={a?.name} required /></div>
          <div className="field"><label htmlFor="an-breed">Breed</label><input id="an-breed" name="breed" defaultValue={a?.breed} /></div>
        </div>
        <div className="row2">
          <div className="field">
            <label htmlFor="an-species">Species</label>
            <select id="an-species" name="species" defaultValue={a?.species ?? 'Dog'}><option>Dog</option><option>Cat</option></select>
          </div>
          <div className="field">
            <label htmlFor="an-sex">Sex</label>
            <select id="an-sex" name="sex" defaultValue={a?.sex ?? 'Male'}><option>Male</option><option>Female</option></select>
          </div>
        </div>
        <div className="row2">
          <div className="field"><label htmlFor="an-age">Age</label><input id="an-age" name="age" defaultValue={a?.age} placeholder="e.g. 2 years" /></div>
          <div className="field">
            <label htmlFor="an-size">Size</label>
            <select id="an-size" name="size" defaultValue={a?.size ?? 'Medium'}><option>Small</option><option>Medium</option><option>Large</option></select>
          </div>
        </div>
        <div className="field">
          <label htmlFor="an-status">Status</label>
          <select id="an-status" name="status" defaultValue={a?.status ?? 'rescued'}>
            {Object.entries(STATUS).map(([value, s]) => (
              <option key={value} value={value}>{s.label}</option>
            ))}
          </select>
        </div>
        <div className="field"><label htmlFor="an-story">Story</label><textarea id="an-story" name="story" defaultValue={a?.story} /></div>
      </fieldset>

      <fieldset>
        <legend>Health record</legend>
        <div className="opts">
          {([['vax', 'Vaccinated'], ['ster', 'Sterilised'], ['dew', 'Dewormed'], ['chip', 'Microchipped']] as const).map(([k, label]) => (
            <label className="opt" key={k}>
              <input type="checkbox" name={k} defaultChecked={a?.[k]} />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button className="btn btn-dark" type="submit" disabled={pending}>{pending ? 'Saving…' : a ? 'Save changes' : 'Add animal'}</button>
        <Link className="btn btn-line" href="/admin/animals">Cancel</Link>
      </div>
    </form>
  );
}

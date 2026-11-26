'use client';

import Link from 'next/link';
import { useActionState, useEffect, useState } from 'react';
import { deleteAnimal, saveAnimal, type SaveState } from '@/app/admin/data-actions';
import { STATUS } from '@/lib/content';
import type { Animal } from '@/lib/types';
import { useToast } from '../Toast';

const GOOD = [['kids', 'Children'], ['dogs', 'Dogs'], ['cats', 'Cats']] as const;
const HEALTH = [['vax', 'Vaccinated'], ['ster', 'Sterilised'], ['dew', 'Dewormed'], ['chip', 'Microchipped']] as const;

/** Add / edit an animal, including its ImageKit photo. Saves through server actions. */
export default function AnimalEditor({ animal }: { animal?: Animal }) {
  const toast = useToast();
  const a = animal;
  const [state, action, pending] = useActionState<SaveState, FormData>(saveAnimal, {});
  const [preview, setPreview] = useState<string | null>(a?.img ?? null);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    if (state.ok) toast(state.ok);
    else if (state.error) toast(state.error);
  }, [state, toast]);

  const hasPhoto = Boolean(preview) && !removed;

  return (
    <>
      <form className="form adm-editor" action={action}>
        {a && <input type="hidden" name="id" value={a.id} />}
        {state.error && <p className="login-err" role="alert">{state.error}</p>}

        <div className="adm-editor-grid">
          <fieldset className="adm-photo">
            <legend>Photo</legend>
            <div className="adm-photo-box">
              {hasPhoto ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={preview!} alt={a ? `Photo of ${a.name}` : 'Selected photo'} />
              ) : (
                <span>No photo yet</span>
              )}
            </div>
            <label className="btn btn-line btn-sm btn-block" htmlFor="an-photo">{hasPhoto ? 'Replace photo' : 'Upload photo'}</label>
            <input
              id="an-photo"
              name="photo"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              className="sr"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                if (f.size > 5 * 1024 * 1024) {
                  toast('Photos must be 5 MB or smaller.');
                  e.target.value = '';
                  return;
                }
                setRemoved(false);
                setPreview(URL.createObjectURL(f));
              }}
            />
            <small className="muted">JPG, PNG, WebP or AVIF, up to 5 MB. Square photos look best.</small>
            {a?.img && (
              <label className="adm-check">
                <input type="checkbox" name="removePhoto" checked={removed} onChange={(e) => setRemoved(e.target.checked)} />
                Remove current photo
              </label>
            )}
          </fieldset>

          <div className="adm-fields">
            <fieldset>
              <legend>Profile</legend>
              <div className="row2">
                <div className="field"><label htmlFor="an-name">Name</label><input id="an-name" name="name" defaultValue={a?.name} required maxLength={80} /></div>
                <div className="field"><label htmlFor="an-breed">Breed</label><input id="an-breed" name="breed" defaultValue={a?.breed} maxLength={120} /></div>
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
                <div className="field"><label htmlFor="an-age">Age</label><input id="an-age" name="age" defaultValue={a?.age} placeholder="e.g. 2 years or 4 months" maxLength={40} /></div>
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
              <div className="field"><label htmlFor="an-story">Story</label><textarea id="an-story" name="story" defaultValue={a?.story} maxLength={5000} /></div>
            </fieldset>

            <fieldset>
              <legend>Good with</legend>
              <div className="opts">
                {GOOD.map(([k, label]) => (
                  <label className="opt" key={k}>
                    <input type="checkbox" name="good" value={k} defaultChecked={a?.good.includes(k)} />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend>Health record</legend>
              <div className="opts">
                {HEALTH.map(([k, label]) => (
                  <label className="opt" key={k}>
                    <input type="checkbox" name={k} defaultChecked={a?.[k]} />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        </div>

        <div className="btn-row adm-actions">
          <button className="btn btn-brand" type="submit" disabled={pending}>{pending ? 'Saving…' : a ? 'Save changes' : 'Add animal'}</button>
          <Link className="btn btn-line" href="/admin/animals">Cancel</Link>
        </div>
      </form>

      {a && (
        <form
          className="adm-danger"
          action={deleteAnimal}
          onSubmit={(e) => {
            if (!confirm(`Delete ${a.name} permanently? This removes the profile and photo and cannot be undone.`)) e.preventDefault();
          }}
        >
          <input type="hidden" name="id" value={a.id} />
          <div>
            <b>Delete this animal</b>
            <p className="muted">Removes the profile and its photo from the website. If {a.name} was adopted, change the status instead.</p>
          </div>
          <button className="btn btn-danger btn-sm" type="submit">Delete {a.name}</button>
        </form>
      )}
    </>
  );
}

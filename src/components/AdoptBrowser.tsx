'use client';

import { useMemo, useState } from 'react';
import type { Animal } from '@/lib/types';
import AnimalGrid from './AnimalGrid';

type Filters = { species: '' | 'Dog' | 'Cat'; age: string; sex: string; size: string; good: string };

/** Filter bar + results for /adopt. Receives the adoptable animals from the server page. */
export default function AdoptBrowser({ animals }: { animals: Animal[] }) {
  const [f, setF] = useState<Filters>({ species: '', age: '', sex: '', size: '', good: '' });
  const set = (patch: Partial<Filters>) => setF((p) => ({ ...p, ...patch }));

  const list = useMemo(
    () =>
      animals.filter(
        (a) =>
          (!f.species || a.species === f.species) &&
          (!f.age || a.ageGroup === f.age) &&
          (!f.sex || a.sex === f.sex) &&
          (!f.size || a.size === f.size) &&
          (!f.good || a.good.includes(f.good as Animal['good'][number])),
      ),
    [animals, f],
  );

  return (
    <>
      <div className="filters" role="group" aria-label="Filter animals">
        <div className="seg">
          {([['', 'All'], ['Dog', 'Dogs'], ['Cat', 'Cats']] as const).map(([v, label]) => (
            <button key={label} aria-pressed={f.species === v} onClick={() => set({ species: v })}>
              {label}
            </button>
          ))}
        </div>
        <select aria-label="Age" value={f.age} onChange={(e) => set({ age: e.target.value })}>
          <option value="">Any age</option>
          <option value="young">Puppy or kitten</option>
          <option value="adult">Adult</option>
          <option value="senior">Senior</option>
        </select>
        <select aria-label="Sex" value={f.sex} onChange={(e) => set({ sex: e.target.value })}>
          <option value="">Any sex</option>
          <option>Male</option>
          <option>Female</option>
        </select>
        <select aria-label="Size" value={f.size} onChange={(e) => set({ size: e.target.value })}>
          <option value="">Any size</option>
          <option>Small</option>
          <option>Medium</option>
          <option>Large</option>
        </select>
        <select aria-label="Good with" value={f.good} onChange={(e) => set({ good: e.target.value })}>
          <option value="">Good with anyone</option>
          <option value="kids">Good with children</option>
          <option value="dogs">Good with dogs</option>
          <option value="cats">Good with cats</option>
        </select>
        <span className="count">{`${list.length} ${list.length === 1 ? 'animal' : 'animals'}`}</span>
      </div>

      {list.length ? (
        <AnimalGrid animals={list} />
      ) : (
        <div className="grid-animals">
          <div className="empty">
            <b>No animals match those filters</b>
            Try widening your search, or check back soon.
          </div>
        </div>
      )}
    </>
  );
}

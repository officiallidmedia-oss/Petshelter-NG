import Link from 'next/link';
import { goodLabel } from '@/lib/content';
import type { Animal } from '@/lib/types';
import { AnimalPic, StatusChip } from './AnimalPic';

export function AnimalCard({ animal: a }: { animal: Animal }) {
  return (
    <Link href={`/adopt/${a.slug}`} className="animal" aria-label={`Meet ${a.name}`}>
      <div className="pic">
        <AnimalPic animal={a} />
        <StatusChip status={a.status} />
      </div>
      <div className="body">
        <h3>{a.name}</h3>
        <span className="meta">{`${a.species}, ${a.sex.toLowerCase()}, ${a.age}`}</span>
        <div className="chips">
          {a.good.slice(0, 2).map((g) => (
            <span className="chip" key={g}>
              {goodLabel(g)}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default function AnimalGrid({ animals }: { animals: Animal[] }) {
  return (
    <div className="grid-animals">
      {animals.map((a) => (
        <AnimalCard key={a.id} animal={a} />
      ))}
    </div>
  );
}

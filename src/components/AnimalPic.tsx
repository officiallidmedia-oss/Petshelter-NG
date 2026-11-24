import Image from 'next/image';
import { STATUS } from '@/lib/content';
import type { Animal, AnimalStatus } from '@/lib/types';

/** Animal photo, or an illustrated stand-in until a real photo is added. */
export function AnimalPic({ animal }: { animal: Pick<Animal, 'img' | 'name' | 'c'> }) {
  if (animal.img) {
    return <Image src={animal.img} alt={animal.name} width={800} height={800} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />;
  }
  return (
    <div className={`ph ${animal.c}`}>
      <svg viewBox="0 0 510 502" aria-hidden="true">
        <use href="#pets" />
      </svg>
    </div>
  );
}

export function StatusChip({ status, inline = false }: { status: AnimalStatus; inline?: boolean }) {
  const s = STATUS[status];
  return (
    <span className={`status ${s.cls}`} style={inline ? { position: 'static' } : undefined}>
      {s.label}
    </span>
  );
}

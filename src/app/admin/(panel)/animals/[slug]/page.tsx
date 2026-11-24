import Link from 'next/link';
import { notFound } from 'next/navigation';
import AnimalEditor from '@/components/admin/AnimalEditor';
import { PageHead } from '@/components/admin/ui';
import { getAnimal } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function EditAnimal({ params }: { params: Promise<{ slug: string }> }) {
  const animal = await getAnimal((await params).slug);
  if (!animal) notFound();

  return (
    <>
      <PageHead title={animal.name} sub={`${animal.id} · ${animal.species}, ${animal.age}`} />
      <p>
        <Link className="link" href={`/adopt/${animal.slug}`}>View public profile</Link>
      </p>
      <AnimalEditor animal={animal} />
    </>
  );
}

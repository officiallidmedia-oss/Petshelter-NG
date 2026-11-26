import Link from 'next/link';
import { notFound } from 'next/navigation';
import AnimalEditor from '@/components/admin/AnimalEditor';
import { PageHead } from '@/components/admin/ui';
import { getAnimal } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function EditAnimal({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ blocked?: string }> }) {
  const [{ slug }, { blocked }] = await Promise.all([params, searchParams]);
  const animal = await getAnimal(slug);
  if (!animal) notFound();

  return (
    <>
      <PageHead title={animal.name} sub={`${animal.id} · ${animal.species}, ${animal.age}`} />
      <p>
        <Link className="link" href={`/adopt/${animal.slug}`} target="_blank">View public profile</Link>
      </p>
      {blocked && (
        <p className="flash warn" role="alert">
          {animal.name} has medical or follow-up records, so the profile can&apos;t be deleted. Change the status to Adopted instead.
        </p>
      )}
      <AnimalEditor animal={animal} />
    </>
  );
}

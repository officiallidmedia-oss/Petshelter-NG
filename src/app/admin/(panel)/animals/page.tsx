import Link from 'next/link';
import { StatusChip } from '@/components/AnimalPic';
import { PageHead, Panel, Table } from '@/components/admin/ui';
import { getAnimals } from '@/lib/data';

export const metadata = { title: 'Animals' };

export const dynamic = 'force-dynamic';

export default async function AnimalsAdmin() {
  const animals = await getAnimals();
  return (
    <>
      <PageHead title="Animals" sub="Every animal in the shelter's care." action={{ href: '/admin/animals/new', label: 'Add an animal' }} />
      <Panel>
        <Table head={['ID', 'Name', 'Species', 'Sex', 'Age', 'Status', 'Vaccinated', 'Sterilised', '']}>
          {animals.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td><Link href={`/admin/animals/${a.slug}`}>{a.name}</Link></td>
              <td>{a.species}</td>
              <td>{a.sex}</td>
              <td>{a.age}</td>
              <td><StatusChip status={a.status} /></td>
              <td>{a.vax ? 'Yes' : 'No'}</td>
              <td>{a.ster ? 'Yes' : 'Due'}</td>
              <td><Link href={`/adopt/${a.slug}`}>Public page</Link></td>
            </tr>
          ))}
        </Table>
      </Panel>
    </>
  );
}

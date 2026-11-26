import Link from 'next/link';
import { AnimalPic, StatusChip } from '@/components/AnimalPic';
import { PageHead, Panel, Table } from '@/components/admin/ui';
import { getAnimals } from '@/lib/data';

export const metadata = { title: 'Animals' };
export const dynamic = 'force-dynamic';

export default async function AnimalsAdmin({ searchParams }: { searchParams: Promise<{ saved?: string; deleted?: string }> }) {
  const [{ saved, deleted }, animals] = await Promise.all([searchParams, getAnimals()]);
  return (
    <>
      <PageHead title="Animals" sub={`${animals.length} animals in the shelter's records.`} action={{ href: '/admin/animals/new', label: 'Add an animal' }} />
      {saved && <p className="flash" role="status">Animal added. It is now live on the website.</p>}
      {deleted && <p className="flash" role="status">Animal deleted.</p>}
      <Panel>
        <Table head={['', 'ID', 'Name', 'Species', 'Age', 'Status', 'Vaccinated', 'Sterilised', '']}>
          {animals.map((a) => (
            <tr key={a.id}>
              <td><span className="thumb"><AnimalPic animal={a} /></span></td>
              <td className="nowrap">{a.id}</td>
              <td><Link href={`/admin/animals/${a.slug}`}>{a.name}</Link></td>
              <td>{a.species}, {a.sex.toLowerCase()}</td>
              <td>{a.age}</td>
              <td><StatusChip status={a.status} /></td>
              <td>{a.vax ? 'Yes' : 'No'}</td>
              <td>{a.ster ? 'Yes' : 'Due'}</td>
              <td>
                <span className="row-actions">
                  <Link href={`/admin/animals/${a.slug}`}>Edit</Link>
                  <Link href={`/adopt/${a.slug}`} target="_blank">View</Link>
                </span>
              </td>
            </tr>
          ))}
        </Table>
        {!animals.length && <p className="muted">No animals yet. Add the first one.</p>}
      </Panel>
    </>
  );
}

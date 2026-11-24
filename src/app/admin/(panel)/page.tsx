import Link from 'next/link';
import { StatusChip } from '@/components/AnimalPic';
import { Kpis, PageHead, Panel, Table } from '@/components/admin/ui';
import { FOLLOW_UPS } from '@/lib/admin-data';
import { getAnimals } from '@/lib/data';

export const metadata = { title: 'Overview' };

export const dynamic = 'force-dynamic';

export default async function AdminOverview() {
  const animals = await getAnimals();
  return (
    <>
      <PageHead title="Good morning" sub="Here's what needs attention today. Preview with sample data." action={{ href: '/admin/animals/new', label: 'Add an animal' }} />
      <Kpis items={[['In shelter', 34], ['Under treatment', 6], ['Applications to review', 9], ['Follow-ups due this week', 5]]} />
      <div className="adm-cols">
        <Panel title="Animals">
          <Table head={['ID', 'Name', 'Species', 'Status', 'Vaccinated', 'Sterilised']}>
            {animals.slice(0, 8).map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td><Link href={`/admin/animals/${a.slug}`}>{a.name}</Link></td>
                <td>{a.species}</td>
                <td><StatusChip status={a.status} /></td>
                <td>{a.vax ? 'Yes' : 'No'}</td>
                <td>{a.ster ? 'Yes' : 'Due'}</td>
              </tr>
            ))}
          </Table>
        </Panel>
        <Panel title="Post-adoption follow-ups">
          <div className="fu">
            {FOLLOW_UPS.filter((f) => !f.done).map((f) => (
              <div key={f.animal}>
                <span><b>{f.animal}</b> {f.task.split(' ').slice(0, 2).join(' ')}</span>
                <span className="muted">{f.due}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}

import Link from 'next/link';
import { StatusChip } from '@/components/AnimalPic';
import { Kpis, PageHead, Panel, Table } from '@/components/admin/ui';
import { FOLLOW_UPS } from '@/lib/admin-data';
import { getAnimals } from '@/lib/data';
import { getSubmissions, statusOf } from '@/lib/admin-queries';

export const metadata = { title: 'Overview' };

export const dynamic = 'force-dynamic';

export default async function AdminOverview() {
  const [animals, apps, reports] = await Promise.all([getAnimals(), getSubmissions(['adoption', 'foster']), getSubmissions(['report'])]);
  const inCare = animals.filter((a) => a.status !== 'adopted').length;
  const treatment = animals.filter((a) => a.status === 'treatment').length;
  const toReview = apps.filter((r) => ['New', 'In review'].includes(statusOf(r))).length;
  const newReports = reports.filter((r) => statusOf(r) === 'New').length;
  return (
    <>
      <PageHead title="Overview" sub="Here's what needs attention today." action={{ href: '/admin/animals/new', label: 'Add an animal' }} />
      <Kpis items={[['In our care', inCare], ['Under treatment', treatment], ['Applications to review', toReview], ['New rescue reports', newReports]]} />
      <div className="adm-cols">
        <Panel title="Animals">
          <Table head={['ID', 'Name', 'Species', 'Status']}>
            {animals.slice(0, 8).map((a) => (
              <tr key={a.id}>
                <td className="nowrap">{a.id}</td>
                <td><Link href={`/admin/animals/${a.slug}`}>{a.name}</Link></td>
                <td>{a.species}</td>
                <td><StatusChip status={a.status} /></td>
              </tr>
            ))}
          </Table>
        </Panel>
        <Panel title="Post-adoption follow-ups (sample)">
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

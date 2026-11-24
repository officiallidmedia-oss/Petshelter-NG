import { Kpis, PageHead, Panel, Table } from '@/components/admin/ui';
import StatusSelect from '@/components/admin/StatusSelect';
import { STATUS_OPTIONS, countStatus, field, fmtDate, getSubmissions, refOf, statusOf } from '@/lib/admin-queries';

export const metadata = { title: 'Applications' };
export const dynamic = 'force-dynamic';

export default async function Applications() {
  const rows = await getSubmissions(['adoption', 'foster']);
  return (
    <>
      <PageHead title="Applications" sub="Adoption and foster applications from the website." />
      <Kpis items={[['New', countStatus(rows, 'New')], ['In review', countStatus(rows, 'In review')], ['Home visits', countStatus(rows, 'Home visit')], ['Approved', countStatus(rows, 'Approved')]]} />
      <Panel>
        <Table head={['Ref', 'Type', 'Applicant', 'Animal', 'Area', 'Received', 'Status']}>
          {rows.map((a) => (
            <tr key={a.id}>
              <td>{refOf(a)}</td>
              <td>{a.kind === 'foster' ? 'Foster' : 'Adoption'}</td>
              <td><b>{a.name}</b><br /><small>{a.email}</small></td>
              <td>{field(a, 'animal') || (a.kind === 'foster' ? 'Any' : '—')}</td>
              <td>{field(a, 'area')}</td>
              <td>{fmtDate(a.createdAt)}</td>
              <td><StatusSelect id={a.id} value={statusOf(a)} options={STATUS_OPTIONS[a.kind]} /></td>
            </tr>
          ))}
        </Table>
        {!rows.length && <p className="muted">No applications yet. They appear here when someone submits the adopt or foster form.</p>}
      </Panel>
    </>
  );
}

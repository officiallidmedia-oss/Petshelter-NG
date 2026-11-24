import { Kpis, PageHead, Panel, Table } from '@/components/admin/ui';
import StatusSelect from '@/components/admin/StatusSelect';
import { STATUS_OPTIONS, countStatus, field, fmtDate, getSubmissions, refOf, statusOf } from '@/lib/admin-queries';

export const metadata = { title: 'Rescue reports' };
export const dynamic = 'force-dynamic';

export default async function Reports() {
  const rows = await getSubmissions(['report']);
  return (
    <>
      <PageHead title="Rescue reports" sub="Animals in need reported through the website." />
      <Kpis items={[['New', countStatus(rows, 'New')], ['Team dispatched', countStatus(rows, 'Team dispatched')], ['Rescued', countStatus(rows, 'Rescued')], ['Closed', countStatus(rows, 'Closed')]]} />
      <Panel>
        <Table head={['Ref', 'Animal', 'Situation', 'Location', 'Reported by', 'Date', 'Status']}>
          {rows.map((r) => (
            <tr key={r.id}>
              <td>{refOf(r)}</td>
              <td>{field(r, 'kind')}</td>
              <td>{field(r, 'situation')}</td>
              <td>{field(r, 'location')}</td>
              <td>{r.name || 'Anonymous'}<br /><small>{r.phone}</small></td>
              <td>{fmtDate(r.createdAt)}</td>
              <td><StatusSelect id={r.id} value={statusOf(r)} options={STATUS_OPTIONS.report} /></td>
            </tr>
          ))}
        </Table>
        {!rows.length && <p className="muted">No reports yet.</p>}
      </Panel>
    </>
  );
}

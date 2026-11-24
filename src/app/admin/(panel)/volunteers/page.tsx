import { PageHead, Panel, Table } from '@/components/admin/ui';
import StatusSelect from '@/components/admin/StatusSelect';
import { STATUS_OPTIONS, field, fmtDate, getSubmissions, statusOf } from '@/lib/admin-queries';

export const metadata = { title: 'Volunteers' };
export const dynamic = 'force-dynamic';

export default async function Volunteers() {
  const rows = await getSubmissions(['volunteer']);
  return (
    <>
      <PageHead title="Volunteers" sub="People who registered on the website." />
      <Panel>
        <Table head={['Name', 'Wants to help with', 'Available', 'Registered', 'Status']}>
          {rows.map((v) => (
            <tr key={v.id}>
              <td><b>{v.name}</b><br /><small>{v.email}</small></td>
              <td>{field(v, 'idLikeToHelpWith')}</td>
              <td>{field(v, 'whenAreYouFree')}</td>
              <td>{fmtDate(v.createdAt)}</td>
              <td><StatusSelect id={v.id} value={statusOf(v)} options={STATUS_OPTIONS.volunteer} /></td>
            </tr>
          ))}
        </Table>
        {!rows.length && <p className="muted">No volunteers yet.</p>}
      </Panel>
    </>
  );
}

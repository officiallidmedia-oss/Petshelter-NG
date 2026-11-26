import { Kpis, PageHead, Panel, Table } from '@/components/admin/ui';
import StatusSelect from '@/components/admin/StatusSelect';
import { STATUS_OPTIONS, countStatus, field, fmtDate, getSubmissions, refOf, statusOf } from '@/lib/admin-queries';

export const metadata = { title: 'Messages' };
export const dynamic = 'force-dynamic';

export default async function Messages() {
  const rows = await getSubmissions(['contact']);
  return (
    <>
      <PageHead title="Messages" sub="General enquiries sent through the contact form." />
      <Kpis items={[['New', countStatus(rows, 'New')], ['Closed', countStatus(rows, 'Closed')], ['Total', rows.length]]} />
      <Panel>
        <Table head={['Ref', 'From', 'Phone', 'Topic', 'Message', 'Received', 'Status']}>
          {rows.map((c) => (
            <tr key={c.id}>
              <td>{refOf(c)}</td>
              <td><b>{c.name}</b><br /><small>{c.email}</small></td>
              <td>{c.phone || '—'}</td>
              <td>{field(c, 'topic')}</td>
              <td>{field(c, 'message')}</td>
              <td>{fmtDate(c.createdAt)}</td>
              <td><StatusSelect id={c.id} value={statusOf(c)} options={STATUS_OPTIONS.contact} /></td>
            </tr>
          ))}
        </Table>
        {!rows.length && <p className="muted">No messages yet.</p>}
      </Panel>
    </>
  );
}

import { Kpis, PageHead, Panel, Table } from '@/components/admin/ui';
import StatusSelect from '@/components/admin/StatusSelect';
import { STATUS_OPTIONS, countStatus, field, fmtDate, getSubmissions, statusOf } from '@/lib/admin-queries';

export const metadata = { title: 'PetFest' };
export const dynamic = 'force-dynamic';

export default async function PetFestAdmin() {
  const [vendors, partners] = [await getSubmissions(['vendor']), await getSubmissions(['partner'])];
  return (
    <>
      <PageHead title="PetFest Abuja" sub="2027 planning: vendors and partner enquiries." />
      <Kpis items={[['Vendor requests', vendors.length], ['Confirmed stands', countStatus(vendors, 'Confirmed')], ['Partner enquiries', partners.length]]} />
      <Panel title="Vendor requests">
        <Table head={['Business', 'Contact', 'Selling', 'Requested', 'Status']}>
          {vendors.map((v) => (
            <tr key={v.id}>
              <td><b>{field(v, 'business')}</b></td>
              <td>{v.name}<br /><small>{v.email}</small></td>
              <td>{field(v, 'whatWillYouSell')}</td>
              <td>{fmtDate(v.createdAt)}</td>
              <td><StatusSelect id={v.id} value={statusOf(v)} options={STATUS_OPTIONS.vendor} /></td>
            </tr>
          ))}
        </Table>
        {!vendors.length && <p className="muted">No vendor requests yet.</p>}
      </Panel>
      <Panel title="Partner enquiries">
        <Table head={['Organisation', 'Contact', 'Type', 'Message', 'Received', 'Status']}>
          {partners.map((p) => (
            <tr key={p.id}>
              <td><b>{field(p, 'organisation')}</b></td>
              <td>{p.name}<br /><small>{p.email}</small></td>
              <td>{field(p, 'type')}</td>
              <td>{field(p, 'message')}</td>
              <td>{fmtDate(p.createdAt)}</td>
              <td><StatusSelect id={p.id} value={statusOf(p)} options={STATUS_OPTIONS.partner} /></td>
            </tr>
          ))}
        </Table>
        {!partners.length && <p className="muted">No partner enquiries yet.</p>}
      </Panel>
    </>
  );
}

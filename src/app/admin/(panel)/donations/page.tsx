import { Kpis, PageHead, Panel, Pill, Table } from '@/components/admin/ui';
import { DONATIONS } from '@/lib/admin-data';

export const metadata = { title: 'Donations' };

const naira = (n: number) => `₦${n.toLocaleString('en-NG')}`;

export default function Donations() {
  const total = DONATIONS.reduce((s, d) => s + d.amount, 0);
  return (
    <>
      <PageHead title="Donations" sub="Sample data. Live figures arrive once a payment provider is connected." />
      <Kpis items={[['This month', naira(total)], ['Gifts', DONATIONS.length], ['Monthly givers', DONATIONS.filter((d) => d.kind === 'Monthly').length], ['Average gift', naira(Math.round(total / DONATIONS.length))]]} />
      <Panel>
        <Table head={['Ref', 'Donor', 'Amount', 'For', 'Type', 'Date']}>
          {DONATIONS.map((d) => (
            <tr key={d.ref}>
              <td>{d.ref}</td>
              <td><b>{d.donor}</b></td>
              <td>{naira(d.amount)}</td>
              <td>{d.purpose}</td>
              <td><Pill tone={d.kind === 'Monthly' ? 'info' : 'mute'}>{d.kind}</Pill></td>
              <td>{d.date}</td>
            </tr>
          ))}
        </Table>
      </Panel>
    </>
  );
}

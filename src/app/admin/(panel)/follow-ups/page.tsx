import { PageHead, Panel, Pill, Table } from '@/components/admin/ui';
import { FOLLOW_UPS } from '@/lib/admin-data';

export const metadata = { title: 'Follow-ups' };

export default function FollowUps() {
  return (
    <>
      <PageHead title="Post-adoption follow-ups" sub="Check-ins at 7, 30 and 90 days, then 6 and 12 months." />
      <Panel>
        <Table head={['Animal', 'Adopter', 'Check-in', 'Due', 'Status']}>
          {FOLLOW_UPS.map((f) => (
            <tr key={`${f.animal}-${f.task}`}>
              <td><b>{f.animal}</b></td>
              <td>{f.owner}</td>
              <td>{f.task}</td>
              <td>{f.due}</td>
              <td><Pill tone={f.done ? 'ok' : 'warn'}>{f.done ? 'Done' : 'Due'}</Pill></td>
            </tr>
          ))}
        </Table>
      </Panel>
    </>
  );
}

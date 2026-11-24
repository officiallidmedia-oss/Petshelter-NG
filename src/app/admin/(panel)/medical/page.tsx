import { PageHead, Panel, Table } from '@/components/admin/ui';
import { MEDICAL } from '@/lib/admin-data';

export const metadata = { title: 'Medical records' };

export default function Medical() {
  return (
    <>
      <PageHead title="Medical records" sub="Vaccinations, treatments and the next date due." />
      <Panel>
        <Table head={['Animal', 'Record', 'Date', 'Next due', 'Vet']}>
          {MEDICAL.map((m) => (
            <tr key={`${m.animal}-${m.record}`}>
              <td><b>{m.animal}</b></td>
              <td>{m.record}</td>
              <td>{m.date}</td>
              <td>{m.next}</td>
              <td>{m.vet}</td>
            </tr>
          ))}
        </Table>
      </Panel>
    </>
  );
}

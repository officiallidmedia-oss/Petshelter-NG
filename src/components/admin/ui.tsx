import Link from 'next/link';
import type { ReactNode } from 'react';
import { TONE } from '@/lib/admin-data';

export function PageHead({ title, sub, action }: { title: string; sub?: string; action?: { href: string; label: string } }) {
  return (
    <div className="adm-head">
      <div>
        <h1>{title}</h1>
        {sub && <p className="muted">{sub}</p>}
      </div>
      {action && (
        <Link className="btn btn-dark btn-sm" href={action.href}>
          {action.label}
        </Link>
      )}
    </div>
  );
}

export function Pill({ children, tone }: { children: string; tone?: 'ok' | 'info' | 'warn' | 'mute' }) {
  return <span className={`pill ${tone ?? TONE[children] ?? 'mute'}`}>{children}</span>;
}

export function Kpis({ items }: { items: [string, string | number][] }) {
  return (
    <div className="kpis">
      {items.map(([label, value]) => (
        <div className="kpi" key={label}>
          <small>{label}</small>
          <b>{value}</b>
        </div>
      ))}
    </div>
  );
}

export function Panel({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="panel">
      {title && <h3>{title}</h3>}
      {children}
    </div>
  );
}

export function Table({ head, children }: { head: string[]; children: ReactNode }) {
  return (
    <table className="t">
      <thead>
        <tr>
          {head.map((h) => (
            <th key={h}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

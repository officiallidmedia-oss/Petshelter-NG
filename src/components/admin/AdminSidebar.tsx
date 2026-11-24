'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '@/app/admin/actions';
import Photo from '@/components/Photo';
import Icon from './icons';

const LINKS = [
  { href: '/admin', label: 'Overview', icon: 'overview' },
  { href: '/admin/animals', label: 'Animals', icon: 'animals' },
  { href: '/admin/applications', label: 'Applications', icon: 'applications' },
  { href: '/admin/follow-ups', label: 'Follow-ups', icon: 'followups' },
  { href: '/admin/medical', label: 'Medical records', icon: 'medical' },
  { href: '/admin/volunteers', label: 'Volunteers', icon: 'volunteers' },
  { href: '/admin/donations', label: 'Donations', icon: 'donations' },
  { href: '/admin/petfest', label: 'PetFest', icon: 'petfest' },
  { href: '/admin/reports', label: 'Rescue reports', icon: 'reports' },
];

/** Fixed left pane. Stays in place while the page content scrolls. */
export default function AdminSidebar() {
  const path = usePathname();
  const active = (href: string) => (href === '/admin' ? path === '/admin' : path.startsWith(href));

  return (
    <aside className="adm-side" aria-label="Staff navigation">
      <Link href="/admin" className="adm-brand" aria-label="Staff portal home">
        <Photo k="logo" alt="Pet Shelter NG" sizes="48px" />
        <b>Staff portal</b>
      </Link>

      <nav className="adm-nav">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} aria-current={active(l.href) ? 'page' : undefined}>
            <Icon name={l.icon} />
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="adm-foot">
        <Link href="/">
          <Icon name="site" />
          View public site
        </Link>
        <form action={logout}>
          <button type="submit">
            <Icon name="logout" />
            Sign out
          </button>
        </form>
        <span className="role">Signed in as Administrator. Staff and volunteers will see fewer sections.</span>
      </div>
    </aside>
  );
}

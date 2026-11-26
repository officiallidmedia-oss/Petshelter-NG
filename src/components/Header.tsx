'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Brand from './Brand';

const NAV = [
  { href: '/', label: 'Home', mobile: 'Home' },
  { href: '/about', label: 'About us', mobile: 'About us' },
  { href: '/adopt', label: 'Adopt', mobile: 'Adopt a pet' },
  { href: '/foster', label: 'Foster', mobile: 'Foster a pet' },
  { href: '/impact', label: 'Our impact', mobile: 'Our impact' },
  { href: '/petfest', label: 'PetFest', mobile: 'PetFest Abuja' },
  { href: '/get-involved', label: 'Get involved', mobile: 'Get involved' },
  { href: '/contact', label: 'Contact', mobile: 'Contact us' },
];

const isActive = (path: string, href: string) => (href === '/' ? path === '/' : path === href || path.startsWith(`${href}/`));

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  // close the drawer on navigation
  useEffect(() => setOpen(false), [path]);

  // lock page scroll + Escape to close while the drawer is open
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <header className="site">
        <div className="wrap">
          <Link className="brand" href="/" aria-label="Pet Shelter NG home">
            <Brand />
          </Link>
          <nav className="main" aria-label="Main">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} aria-current={isActive(path, n.href) ? 'page' : undefined}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="head-cta">
            <Link className="btn btn-yellow btn-sm btn-donate-h" href="/donate">
              Donate
            </Link>
          </div>
          <button className="menu-btn" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </header>

      {open && (
        <div className="drawer" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="drawer-top">
            <Brand />
            <button className="menu-btn" aria-label="Close menu" autoFocus onClick={() => setOpen(false)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <nav aria-label="Mobile">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href}>
                {n.mobile}
              </Link>
            ))}
          </nav>
          <div className="drawer-cta">
            <Link className="btn btn-yellow" href="/donate">
              Donate
            </Link>
            <Link className="btn btn-line" href="/report">
              Report an animal in need
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

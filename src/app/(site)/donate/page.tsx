import Link from 'next/link';
import AnimalGrid from '@/components/AnimalGrid';
import DonateSection from '@/components/DonateSection';
import { getSponsorable } from '@/lib/data';

export const metadata = { title: "Donate" };

export default async function Page({ searchParams }: { searchParams: Promise<{ for?: string }> }) {
  const { for: purpose } = await searchParams;
  const sponsorable = await getSponsorable();
  return (
    <>
        <div className="page-head"><div className="wrap">
          <div><p className="crumb"><Link href="/">Home</Link> / Donate</p><h1>Your gift heals, feeds and rehomes</h1><p className="lede">Pet Shelter NG relies on supporters like you. Give once, give monthly, or support a specific animal or need.</p></div>
          <svg className="art" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 17h22l-2.2 8.2a2 2 0 0 1-2 1.5H9.2a2 2 0 0 1-2-1.5z" /><path d="M10 13.5c0-1.6 2.7-2.8 6-2.8s6 1.2 6 2.8c0 1.2-2.7 2-6 2s-6-.8-6-2z" fill="currentColor" /></svg>
        </div></div>

        <div className="section">
          <DonateSection initialFor={purpose} />
        </div>

        <div className="section bg-sand">
          <div className="wrap">
            <div className="sec-head"><div><h2>Sponsor an animal</h2><p>Cover one animal&apos;s care until adoption, and get photo updates along the way.</p></div></div>
            <AnimalGrid animals={sponsorable} />
          </div>
        </div>
    </>
  );
}

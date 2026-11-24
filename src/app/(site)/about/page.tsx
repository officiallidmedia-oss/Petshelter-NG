import Link from 'next/link';
import Photo from '@/components/Photo';
import { TEAM } from '@/lib/content';

export const metadata = { title: "About us" };

export default function Page() {
  return (
    <>
        <div className="page-head"><div className="wrap">
          <div><p className="crumb"><Link href="/">Home</Link> / About us</p><h1>A safe place to call home</h1><p className="lede">Pet Shelter NG is an animal shelter initiative in Abuja, dedicated to rescuing, rehabilitating and rehoming abandoned and vulnerable animals.</p></div>
          <svg className="art" viewBox="0 0 1095 850" aria-hidden="true"><use href="#mark" fill="currentColor" /></svg>
        </div></div>

        <div className="section">
          <div className="wrap split">
            <div>
              <h2>Our story</h2>
              <p className="lede" style={{ marginTop: "16px" }}>Pet Shelter NG began with a simple belief: that no animal in Abuja should be left on the street, sick or alone.</p>
              <p className="muted" style={{ marginTop: "16px" }}>What started as a few people taking in strays has grown into a shelter initiative with volunteers, foster families and partners across the city. We rescue animals from the street, nurse them back to health and match them with families who will love them for life.</p>
              <p className="muted" style={{ marginTop: "16px" }}>We promote responsible pet ownership, animal welfare and a community where every pet has a chance at a better life. We are also the organisers of PetFest Abuja, which brings the city&apos;s pet community together.</p>
            </div>
            <div style={{ display: "grid", gap: "16px" }}>
            <Photo k="cat" style={{ width: "100%", aspectRatio: "16/10", objectFit: "cover", objectPosition: "center 30%", borderRadius: "var(--r)" }} alt="A PetFest guest cuddling her cat" />
            <div className="card" style={{ padding: "32px 32px", background: "var(--yellow-soft)", border: "0" }}>
              <p className="quote">&quot;To protect vulnerable animals, promote responsible pet ownership and create lasting homes for animals in need.&quot;</p>
              <p style={{ marginTop: "12px", fontWeight: "800", color: "var(--ink)" }}>Our mission</p>
            </div>
            </div>
          </div>
        </div>

        <div className="section bg-sand">
          <div className="wrap">
            <div className="sec-head"><div><h2>What we work towards</h2><p>Our animal welfare objectives guide every rescue, adoption and campaign.</p></div></div>
            <div className="cards3">
              <div className="card"><span className="ico"><svg viewBox="0 0 32 32"><path d="M16 27s-10-6.2-10-13a5.5 5.5 0 0 1 10-3.2A5.5 5.5 0 0 1 26 14c0 6.8-10 13-10 13z" /></svg></span><h3>Rescue</h3><p>Respond to reports of abandoned, injured and vulnerable animals across Abuja.</p></div>
              <div className="card"><span className="ico"><svg viewBox="0 0 32 32"><path d="M12 5h8v7h7v8h-7v7h-8v-7H5v-8h7z" /></svg></span><h3>Rehabilitate</h3><p>Provide vet care, vaccination, sterilisation and the time each animal needs to recover.</p></div>
              <div className="card"><span className="ico"><svg viewBox="0 0 32 32"><path d="M5 14.5 16 5l11 9.5" /><path d="M8 12.5V26h16V12.5" /><path d="M13.5 26v-6h5v6" /></svg></span><h3>Rehome</h3><p>Match animals with screened families, and follow up for twelve months after adoption.</p></div>
              <div className="card"><span className="ico"><svg viewBox="0 0 32 32"><path d="M5 8h9a3 3 0 0 1 2 1 3 3 0 0 1 2-1h9v17h-9a3 3 0 0 0-2 1 3 3 0 0 0-2-1H5z" /><path d="M16 9v17" /></svg></span><h3>Educate</h3><p>Teach responsible pet ownership in schools, estates and online.</p></div>
              <div className="card"><span className="ico"><svg viewBox="0 0 32 32"><path d="M10 21a5 5 0 1 1 0-10M22 21a5 5 0 1 0 0-10" /><path d="M10 16h12" /></svg></span><h3>Sterilise and vaccinate</h3><p>Reduce stray populations and disease through community health campaigns.</p></div>
              <div className="card"><span className="ico"><svg viewBox="0 0 32 32"><circle cx="11" cy="11" r="4" /><circle cx="22" cy="12" r="3" /><path d="M4 26c0-4 3-7 7-7s7 3 7 7M18 26c0-3 1.8-5.5 4-5.5s4.5 2.5 4.5 5.5" /></svg></span><h3>Build community</h3><p>Bring pet lovers together through PetFest and volunteering.</p></div>
            </div>
          </div>
        </div>

        <div className="section">
          <div className="wrap">
            <div className="sec-head"><div><h2>Meet the team</h2><p>The people who keep the shelter running, every single day.</p></div><Link className="btn btn-line btn-sm" href="/get-involved">Join us as a volunteer</Link></div>
            <div className="team">
        {TEAM.map(([name, role]) => (
          <div className="person" key={role}>
            <div className="face">
              <svg viewBox="0 0 32 32"><circle cx="16" cy="12" r="6" /><path d="M4 30c0-7 5.4-11 12-11s12 4 12 11z" /></svg>
            </div>
            <b>{name}</b>
            <span>{role}</span>
          </div>
        ))}
      </div>
          </div>
        </div>
    </>
  );
}

import Link from 'next/link';
import Photo from '@/components/Photo';
import AnimalGrid from '@/components/AnimalGrid';
import AdoptionShowcase from '@/components/AdoptionShowcase';
import { getAvailable } from '@/lib/data';

export const revalidate = 60;

export default async function Page() {
  const available = await getAvailable();
  return (
    <>
        <div className="hero">
          <div className="wrap">
            <div>
              <h1>Every animal deserves a safe place to call home.</h1>
              <p className="lede">Pet Shelter NG rescues, rehabilitates and rehomes abandoned and vulnerable animals across Abuja, and helps every pet find a family that will love it for life.</p>
              <div className="hero-ctas">
                <Link className="btn btn-dark" href="/adopt">Adopt a pet</Link>
                <Link className="btn btn-yellow" href="/donate">Donate</Link>
              </div>
              <p className="hero-report"><span className="dot" aria-hidden="true"></span><span>Seen an animal in need? <Link className="link" href="/report">Report it to us</Link></span></p>
            </div>
            <div className="house-frame">
              <svg className="roof" viewBox="0 0 560 170" aria-hidden="true"><path d="M24 146 L280 24 L536 146" fill="none" stroke="currentColor" strokeWidth="30" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <Photo k="hero" className="photo" priority sizes="(max-width: 900px) 90vw, 500px" alt="A fluffy white dog held in someone's arms, looking at the camera" />
              <div className="hero-badge">
                <svg viewBox="0 0 1095 850" aria-hidden="true"><use href="#mark" fill="#E2870A" /></svg>
                <div><b>Abuja&apos;s home for animals in need</b><span>Rescue, rehabilitate, rehome</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="wrap home-tiles">
          <div className="tiles">
            <Link className="tile" href="/adopt"><span className="ico"><svg viewBox="0 0 32 32"><path d="M16 27s-10-6.2-10-13a5.5 5.5 0 0 1 10-3.2A5.5 5.5 0 0 1 26 14c0 6.8-10 13-10 13z" /><circle className="fill" cx="16" cy="16.5" r="2.6" /><circle className="fill" cx="12.4" cy="13" r="1.3" /><circle className="fill" cx="14.6" cy="11.2" r="1.3" /><circle className="fill" cx="17.4" cy="11.2" r="1.3" /><circle className="fill" cx="19.6" cy="13" r="1.3" /></svg></span><h3>Adopt a pet</h3><p>Meet dogs and cats ready for a loving, permanent home.</p><span className="go">Meet the animals</span></Link>
            <Link className="tile" href="/foster"><span className="ico"><svg viewBox="0 0 32 32"><path d="M5 14.5 16 5l11 9.5" /><path d="M8 12.5V26h16V12.5" /><path d="M16 22.5s-4-2.4-4-5.1a2.2 2.2 0 0 1 4-1.3 2.2 2.2 0 0 1 4 1.3c0 2.7-4 5.1-4 5.1z" className="fill" /></svg></span><h3>Foster a pet</h3><p>Open your home for a few weeks while an animal recovers.</p><span className="go">Become a foster</span></Link>
            <Link className="tile" href="/donate"><span className="ico"><svg viewBox="0 0 32 32"><path d="M5 17h22l-2.2 8.2a2 2 0 0 1-2 1.5H9.2a2 2 0 0 1-2-1.5z" /><path className="fill" d="M10 13.5c0-1.6 2.7-2.8 6-2.8s6 1.2 6 2.8c0 1.2-2.7 2-6 2s-6-.8-6-2z" /><path d="M12 8.5c1-1.4 3-1.4 4 0M17 6.5c1-1.4 3-1.4 4 0" /></svg></span><h3>Donate</h3><p>Fund food, vaccinations, sterilisation and vet care.</p><span className="go">Give today</span></Link>
            <Link className="tile" href="/report"><span className="ico o"><svg viewBox="0 0 32 32"><path d="M16 4.5 29 27H3z" /><path d="M16 12.5v6.5" /><circle className="fill" cx="16" cy="22.6" r="1.5" /></svg></span><h3>Report a rescue</h3><p>Tell us about an abandoned, injured or vulnerable animal.</p><span className="go">Report an animal</span></Link>
          </div>
        </div>

        <div className="section bg-sand">
          <div className="wrap split">
            <div className="mark-art"><svg viewBox="0 0 1095 850" role="img" aria-label="Pet Shelter NG house with a dog and a cat"><use href="#mark" fill="#E2870A" /></svg></div>
            <div className="copy">
              <h2>Rescue, rehabilitate, rehome.</h2>
              <p className="lede">Our mission is to protect vulnerable animals, promote responsible pet ownership and create lasting homes for animals in need.</p>
              <div className="obj-list">
                <div className="obj"><span className="ico"><svg viewBox="0 0 32 32"><path d="M16 27s-10-6.2-10-13a5.5 5.5 0 0 1 10-3.2A5.5 5.5 0 0 1 26 14c0 6.8-10 13-10 13z" /></svg></span><div><h4>Rescue and recovery</h4><p>We take in abandoned and injured animals and give them vet care, food and time to heal.</p></div></div>
                <div className="obj"><span className="ico"><svg viewBox="0 0 32 32"><path d="M5 14.5 16 5l11 9.5" /><path d="M8 12.5V26h16V12.5" /><path d="M13.5 26v-6h5v6" /></svg></span><div><h4>Lasting homes</h4><p>Every adoption is matched with care, and we check in for a full year afterwards.</p></div></div>
                <div className="obj"><span className="ico"><svg viewBox="0 0 32 32"><path d="M6 9h20v14H6z" /><path d="M6 9l10 8 10-8" /></svg></span><div><h4>Responsible ownership</h4><p>We educate owners on vaccination, sterilisation and everyday welfare.</p></div></div>
              </div>
              <p className="link-row"><Link className="link" href="/about">Read our story</Link></p>
            </div>
          </div>
        </div>

        <div className="section">
          <div className="wrap">
            <div className="sec-head"><div className="copy"><h2>Waiting for a home</h2><p>Each of these animals has been vet-checked and is ready to meet you.</p></div><Link className="btn btn-line btn-sm" href="/adopt">See all animals</Link></div>
            <AnimalGrid animals={available.slice(0, 4)} />
          </div>
        </div>

        <div className="section bg-sand">
          <AdoptionShowcase title="Happy endings" blurb={"Real adoptions from Pet Shelter NG. Every one of these animals now has a family of its own. Swipe to see them all."}>
      <div className="adopt-foot"><p className="muted">Adopted from us? Send your photos and updates to <a href="mailto:info@petshelterng.org">info@petshelterng.org</a>.</p><Link className="btn btn-dark btn-sm" href="/adopt">Adopt a pet</Link></div>
      </AdoptionShowcase>
        </div>

        <div className="section bg-ink">
          <div className="wrap">
            <div className="sec-head"><div className="copy"><h2>Every number is a life changed</h2><p>Since we began, our volunteers, fosters and supporters have made all of this possible.</p></div><Link className="btn btn-white btn-sm" href="/impact">See our impact</Link></div>
            <div className="stats">
              <div className="stat"><b data-count="250">250+</b><span>Animals rescued</span></div>
              <div className="stat"><b data-count="180">180+</b><span>Adopted into loving homes</span></div>
              <div className="stat"><b data-count="60">60+</b><span>Foster families</span></div>
              <div className="stat"><b data-count="120">120+</b><span>Active volunteers</span></div>
            </div>
            <p className="note-small">Sample figures for the design preview.</p>
          </div>
        </div>

        <div className="section">
          <div className="wrap">
            <div className="sec-head"><div className="copy"><h2>How adoption works</h2><p>A simple, caring process that puts the right animal with the right family.</p></div></div>
            <ol className="steps">
              <li><h3>Find your match</h3><p>Browse animals online and read their stories, needs and personalities.</p></li>
              <li><h3>Apply online</h3><p>Fill in a short application. We reply to every one.</p></li>
              <li><h3>Meet and greet</h3><p>Visit the shelter and spend time with your new friend.</p></li>
              <li><h3>Welcome home</h3><p>Sign the adoption agreement and we stay in touch for a year.</p></li>
            </ol>
          </div>
        </div>

        <div className="wrap">
          <div className="pf">
            <div className="txt">
              <div className="wordmark">PetFest<span>Abuja</span></div>
              <p>Organised by Pet Shelter NG, PetFest brings Abuja&apos;s pet community together. The 2026 edition filled Jabi Lake Mall with pet owners, vendors and The Pet Pageant.</p>
              <div><Link className="btn btn-yellow" href="/petfest">Explore PetFest</Link></div>
            </div>
            <Photo k="runway" className="pos-30" alt="Pet owners walking their dogs down the red carpet at PetFest Abuja 2026" />
          </div>
        </div>

        <div className="section">
          <div className="wrap cta-pair">
            <div className="cta-card report">
              <span className="ico"><svg viewBox="0 0 32 32"><path d="M16 4.5 29 27H3z" /><path d="M16 12.5v6.5" /><circle className="fill" cx="16" cy="22.6" r="1.5" /></svg></span>
              <h2 className="h-sub">Seen an animal in need?</h2>
              <p className="muted">Send us a photo and location of an abandoned, injured or vulnerable animal, and our rescue team will follow up.</p>
              <Link className="btn btn-dark" href="/report">Report an animal</Link>
            </div>
            <div className="cta-card give">
              <span className="ico"><svg viewBox="0 0 32 32"><path d="M5 17h22l-2.2 8.2a2 2 0 0 1-2 1.5H9.2a2 2 0 0 1-2-1.5z" /><path className="fill" d="M10 13.5c0-1.6 2.7-2.8 6-2.8s6 1.2 6 2.8c0 1.2-2.7 2-6 2s-6-.8-6-2z" /></svg></span>
              <h2 className="h-sub">Help us feed, heal and rehome</h2>
              <p>Your gift pays for food, vaccinations, sterilisation and vet care for animals in our shelter.</p>
              <Link className="btn btn-dark" href="/donate">Donate now</Link>
            </div>
          </div>
        </div>
    </>
  );
}

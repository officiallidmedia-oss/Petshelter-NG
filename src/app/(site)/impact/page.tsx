import Link from 'next/link';
import AdoptionShowcase from '@/components/AdoptionShowcase';
import { AnimalPic, StatusChip } from '@/components/AnimalPic';
import { getAnimals, getStories } from '@/lib/data';

export const metadata = { title: "Our impact" };

export const revalidate = 60;

export default async function Page() {
  const [stories, animals] = await Promise.all([getStories(), getAnimals()]);
  return (
    <>
        <div className="page-head"><div className="wrap">
          <div><p className="crumb"><Link href="/">Home</Link> / Our impact</p><h1>Rescues, recoveries and new beginnings</h1><p className="lede">Every rescue is a story. Here are a few of the animals whose lives changed, and the campaigns that protect many more.</p></div>
          <svg className="art" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 27s-10-6.2-10-13a5.5 5.5 0 0 1 10-3.2A5.5 5.5 0 0 1 26 14c0 6.8-10 13-10 13z" /></svg>
        </div></div>

        <div className="section bg-ink tight">
          <div className="wrap">
            <div className="stats">
              <div className="stat"><b>250+</b><span>Animals rescued</span></div>
              <div className="stat"><b>180+</b><span>Adoptions</span></div>
              <div className="stat"><b>300+</b><span>Vaccinations given</span></div>
              <div className="stat"><b>90+</b><span>Sterilisations funded</span></div>
            </div>
            <p className="note-small">Sample figures for the design preview.</p>
          </div>
        </div>

        <div className="section">
          <div className="wrap">
            <div className="sec-head"><div><h2>Rescue stories</h2><p>From the street, to our care, to a home of their own.</p></div></div>
            <div className="stack-lg">
        {stories.map((s) => {
          const a = animals.find((x) => x.name === s.name);
          return (
            <article className="story" key={s.slug}>
              <div className="pic"><AnimalPic animal={a ?? { name: s.name, c: s.c }} /></div>
              <div className="txt">
                <div className="journey">
                  {s.journey.map((j, n) => (
                    <span key={j} style={{ display: 'contents' }}>
                      {n > 0 && <em>›</em>}
                      <StatusChip status={j} inline />
                    </span>
                  ))}
                </div>
                <h3>{`${s.name}'s story`}</h3>
                <p>{s.summary}</p>
                <Link className="link" href={`/impact/${s.slug}`}>{`Read ${s.name}'s story`}</Link>
              </div>
            </article>
          );
        })}
      </div>
          </div>
        </div>

        <div className="section bg-sand">
          <AdoptionShowcase title="Happy in their new homes" blurb={"Recent adoptions from Pet Shelter NG, with their new families."}>
      <p className="link-row"><Link className="btn btn-dark" href="/adopt">Adopt a pet</Link></p>
      </AdoptionShowcase></div>

        <div className="section">
          <div className="wrap">
            <div className="sec-head"><div><h2>Animal welfare campaigns</h2><p>Long-term work that keeps animals safe and healthy across Abuja.</p></div></div>
            <div className="cards3">
              <div className="campaign a"><h3>Sterilise to save</h3><p>Funding sterilisation for stray and community animals to reduce the number born onto the street.</p><Link className="link" href="/donate">Support this campaign</Link></div>
              <div className="campaign b"><h3>Vaccinate Abuja</h3><p>Low-cost vaccination days for pets in underserved communities, against rabies and other diseases.</p><Link className="link" href="/get-involved">Volunteer at a clinic day</Link></div>
              <div className="campaign c"><h3>Responsible ownership</h3><p>Talks in schools and estates on feeding, vet care, training and never abandoning a pet.</p><Link className="link" href="/contact">Invite us to speak</Link></div>
            </div>
          </div>
        </div>
    </>
  );
}

import Link from 'next/link';
import Photo from '@/components/Photo';
import PetFestTabs from '@/components/PetFestTabs';

export const metadata = { title: "PetFest Abuja" };

export default function Page() {
  return (
    <>
      <div className="pf-page">
          <div className="pf-hero">
            <div className="wrap">
              <div>
                <p className="crumb"><Link href="/">Home</Link> / PetFest Abuja</p>
                <div className="wordmark">PetFest<span>Abuja</span></div>
                <p className="lede">Abuja&apos;s biggest celebration of pets and the people who love them, organised by Pet Shelter NG.</p>
                <div className="pf-facts"><span>2026 edition: Saturday 14th November</span><span>Jabi Lake Mall, Abuja</span></div>
                <div className="btn-row"><Link className="btn btn-dark" href="/petfest#pf-get">Get involved in 2027</Link><Link className="btn btn-line" href="/petfest#pf-gallery">See 2026 highlights</Link></div>
              </div>
              <Photo k="runway" className="pos-30" alt="The Pet Pageant red carpet at PetFest Abuja 2026, Jabi Lake Mall" />
            </div>
          </div>

          <div className="section flush-top">
            <div className="wrap">
              <div className="sec-head"><div><h2>What happens at PetFest</h2></div></div>
              <div className="cards3">
                <div className="pf-card"><h3>The Pet Pageant</h3><p>Ten categories, from Crowd Favourite to Best Dressed, with public voting online before the big day.</p></div>
                <div className="pf-card"><h3>Vendors and market</h3><p>Pet food, accessories, grooming and vet services from Abuja&apos;s best pet businesses.</p></div>
                <div className="pf-card"><h3>Adoption and awareness</h3><p>Meet adoptable animals from Pet Shelter NG and learn about responsible ownership.</p></div>
              </div>
            </div>
          </div>

          <div className="section flush-top" id="pf-gallery">
            <div className="wrap">
              <div className="sec-head"><div><h2>PetFest Abuja 2026</h2><p className="muted">The first edition, at Jabi Lake Mall on 14th November 2026.</p></div></div>
              <div className="gallery">
                <Photo k="pom" alt="A white Pomeranian held by smiling attendees at PetFest Abuja 2026" />
                <Photo k="cat" className="pos-35" alt="A guest holding her cat, dressed in a checked bow" />
                <Photo k="frenchie" className="pos-40" alt="A grinning French bulldog on a lead" />
                <Photo k="whitecat" className="pos-30" alt="A pet owner with her white cat, pointing at the stage" />
                <Photo k="tunnel" className="pos-40" alt="A German Shepherd running through an agility tunnel" />
              </div>
            </div>
          </div>

          <div className="section flush-top" id="pf-get">
            <div className="wrap">
              <div className="sec-head"><div><h2>PetFest Abuja 2027</h2><p className="muted">Date and venue to be announced. Get your tickets, book a stand or partner with us.</p></div></div>
              <PetFestTabs />
            </div>
          </div>
      </div>
    </>
  );
}

import Link from 'next/link';
import FormShell from '@/components/FormShell';

export const metadata = { title: "Get involved" };

export default function Page() {
  return (
    <>
        <div className="page-head"><div className="wrap">
          <div><p className="crumb"><Link href="/">Home</Link> / Get involved</p><h1>There&apos;s a place for you here</h1><p className="lede">Volunteer your time, partner with us as a business, or sponsor an animal. Every bit of help counts.</p></div>
          <svg className="art" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="4" /><circle cx="22" cy="12" r="3" /><path d="M4 26c0-4 3-7 7-7s7 3 7 7M18 26c0-3 1.8-5.5 4-5.5s4.5 2.5 4.5 5.5" /></svg>
        </div></div>

        <div className="section">
          <div className="wrap">
            <div className="cards3">
              <Link className="tile" href="/get-involved#volunteer"><span className="ico"><svg viewBox="0 0 32 32"><path d="M10 15V7.5a2 2 0 0 1 4 0V14M14 13V6a2 2 0 0 1 4 0v7M18 13.5V8a2 2 0 0 1 4 0v9c0 5-3 9-8 9-3 0-5-1.5-6.5-4L5 17a2 2 0 0 1 3.4-2.1L10 17" /></svg></span><h3>Volunteer</h3><p>Help with animal care, dog walking, events, transport or social media.</p><span className="go">Register as a volunteer</span></Link>
              <Link className="tile" href="/get-involved#partner"><span className="ico"><svg viewBox="0 0 32 32"><path d="M4 12h24v14H4z" /><path d="M4 12l3-6h18l3 6" /><path d="M13 26v-7h6v7" /></svg></span><h3>Partner with us</h3><p>Vets, pet businesses, schools and companies working alongside the shelter.</p><span className="go">Become a partner</span></Link>
              <Link className="tile" href="/donate"><span className="ico"><svg viewBox="0 0 32 32"><circle cx="16" cy="12" r="7" /><path d="M11.5 17.5 9 28l7-3.5 7 3.5-2.5-10.5" /></svg></span><h3>Sponsor an animal</h3><p>Cover one animal&apos;s care until they find a home, and get updates on their journey.</p><span className="go">Sponsor now</span></Link>
            </div>
          </div>
        </div>

        <div className="section bg-sand" id="volunteer">
          <div className="wrap split top">
            <div className="copy">
              <h2>Volunteer with us</h2>
              <p className="lede">No experience needed, just a love for animals and a few hours to spare.</p>
              <ul className="check">
                <li><span><b>Animal care:</b> feeding, cleaning, grooming and socialising.</span></li>
                <li><span><b>Dog walking</b> on weekday mornings and weekends.</span></li>
                <li><span><b>Events:</b> adoption days, clinic days and PetFest.</span></li>
                <li><span><b>Transport:</b> drive animals to vet appointments and new homes.</span></li>
                <li><span><b>Skills:</b> photography, social media, design and fundraising.</span></li>
              </ul>
            </div>
            <FormShell kind="volunteer" className="form">
              <h3>Volunteer registration</h3>
              <div className="row2"><div className="field"><label htmlFor="vo-name">Full name</label><input name="name" id="vo-name" required /></div><div className="field"><label htmlFor="vo-phone">Phone or WhatsApp</label><input name="phone" id="vo-phone" type="tel" required /></div></div>
              <div className="row2"><div className="field"><label htmlFor="vo-email">Email</label><input name="email" id="vo-email" type="email" required /></div><div className="field"><label htmlFor="vo-age">Age range</label><select name="age" id="vo-age" required><option value="">Choose</option><option>16 to 17 (with parent&apos;s consent)</option><option>18 to 25</option><option>26 to 40</option><option>41 and over</option></select></div></div>
              <div className="field"><span className="lbl">I&apos;d like to help with</span><div className="opts"><label className="opt"><input type="checkbox" name="idLikeToHelpWith" value="Animal care" /><span>Animal care</span></label><label className="opt"><input type="checkbox" name="idLikeToHelpWith" value="Dog walking" /><span>Dog walking</span></label><label className="opt"><input type="checkbox" name="idLikeToHelpWith" value="Events" /><span>Events</span></label><label className="opt"><input type="checkbox" name="idLikeToHelpWith" value="Transport" /><span>Transport</span></label><label className="opt"><input type="checkbox" name="idLikeToHelpWith" value="Social media" /><span>Social media</span></label><label className="opt"><input type="checkbox" name="idLikeToHelpWith" value="Fundraising" /><span>Fundraising</span></label></div></div>
              <div className="field"><span className="lbl">When are you free?</span><div className="opts"><label className="opt"><input type="checkbox" name="whenAreYouFree" value="Weekdays" /><span>Weekdays</span></label><label className="opt"><input type="checkbox" name="whenAreYouFree" value="Weekends" /><span>Weekends</span></label><label className="opt"><input type="checkbox" name="whenAreYouFree" value="Evenings" /><span>Evenings</span></label></div></div>
              <button className="btn btn-dark btn-block" type="submit">Register as a volunteer</button>
            </FormShell>
          </div>
        </div>

        <div className="section" id="partner">
          <div className="wrap split top">
            <div className="copy">
              <h2>Partnerships and sponsorship</h2>
              <p className="lede">We work with vets, pet businesses, schools and companies who share our love for animals.</p>
              <div className="cards2">
                <div className="card"><h4>Vet partners</h4><p>Discounted treatment, vaccination and sterilisation for shelter animals.</p></div>
                <div className="card"><h4>Corporate sponsors</h4><p>Staff volunteering days, campaign sponsorship and PetFest branding.</p></div>
                <div className="card"><h4>Pet businesses</h4><p>Donate food and supplies, or host adoption days in your store.</p></div>
                <div className="card"><h4>Schools and estates</h4><p>Invite us to teach responsible pet ownership.</p></div>
              </div>
            </div>
            <FormShell kind="partner" className="form">
              <h3>Partnership enquiry</h3>
              <div className="field"><label htmlFor="pa-org">Organisation</label><input name="organisation" id="pa-org" required /></div>
              <div className="row2"><div className="field"><label htmlFor="pa-name">Contact person</label><input name="name" id="pa-name" required /></div><div className="field"><label htmlFor="pa-email">Email</label><input name="email" id="pa-email" type="email" required /></div></div>
              <div className="field"><label htmlFor="pa-type">Type of partnership</label><select name="type" id="pa-type" required><option value="">Choose</option><option>Vet partner</option><option>Corporate sponsor</option><option>Pet business</option><option>School or estate</option><option>Other</option></select></div>
              <div className="field"><label htmlFor="pa-msg">How would you like to work together?</label><textarea name="message" id="pa-msg" required></textarea></div>
              <button className="btn btn-dark btn-block" type="submit">Send enquiry</button>
            </FormShell>
          </div>
        </div>
    </>
  );
}

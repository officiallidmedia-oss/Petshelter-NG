import Link from 'next/link';
import FormShell from '@/components/FormShell';
import AdoptBrowser from '@/components/AdoptBrowser';
import { getAdoptable, getAvailable } from '@/lib/data';

export const metadata = { title: "Adopt a pet" };

export default async function Page({ searchParams }: { searchParams: Promise<{ animal?: string }> }) {
  const { animal } = await searchParams;
  const [adoptable, available] = await Promise.all([getAdoptable(), getAvailable()]);
  return (
    <>
        <div className="page-head"><div className="wrap">
          <div><p className="crumb"><Link href="/">Home</Link> / Adopt a pet</p><h1>Find your new best friend</h1><p className="lede">Every animal here has been vet-checked, vaccinated and is waiting for a loving, permanent home.</p></div>
          <svg className="art" viewBox="0 0 510 502" aria-hidden="true"><use href="#pets" fill="currentColor" /></svg>
        </div></div>

        <div className="section tight">
          <div className="wrap">
            <AdoptBrowser animals={adoptable} />
          </div>
        </div>

        <div className="section bg-sand">
          <div className="wrap">
            <div className="sec-head"><div><h2>We stay in touch after adoption</h2><p>Every adopter gets scheduled check-ins, and can send us photos and health updates at any time.</p></div></div>
            <div className="timeline">
              <div className="tl"><i>7</i><div><b>7 days</b><span>Settling-in call</span></div></div>
              <div className="tl"><i>30</i><div><b>30 days</b><span>Health and behaviour check</span></div></div>
              <div className="tl"><i>90</i><div><b>90 days</b><span>Progress report and photos</span></div></div>
              <div className="tl"><i>6m</i><div><b>6 months</b><span>Vet and vaccination review</span></div></div>
              <div className="tl"><i>12m</i><div><b>12 months</b><span>One-year celebration</span></div></div>
            </div>
          </div>
        </div>

        <div className="section" id="apply">
          <div className="wrap split" style={{ alignItems: "start" }}>
            <div>
              <h2>Apply to adopt</h2>
              <p className="lede" style={{ marginTop: "16px" }}>Tell us about you and your home. We read every application and reply within a few days.</p>
              <ul className="check">
                <li><span><b>Be 18 or older</b> and able to show a valid ID.</span></li>
                <li><span><b>Have your landlord&apos;s permission</b> if you rent.</span></li>
                <li><span><b>Agree to follow-up visits</b> at 7, 30 and 90 days, then 6 and 12 months.</span></li>
                <li><span><b>Commit to vet care,</b> vaccinations and a safe, secure home.</span></li>
              </ul>
            </div>
            <FormShell kind="adoption" className="form">
              <div className="field"><label htmlFor="ad-animal">Animal you&apos;d like to adopt</label><select id="ad-animal" name="animal" defaultValue={animal ?? ''}>
        <option value="">I&apos;m not sure yet</option>
        {available.map((a) => (
          <option key={a.id} value={a.slug}>{`${a.name} (${a.id})`}</option>
        ))}
      </select></div>
              <fieldset><legend>About you</legend>
                <div className="row2"><div className="field"><label htmlFor="ad-name">Full name</label><input name="name" id="ad-name" required autoComplete="name" /></div><div className="field"><label htmlFor="ad-phone">Phone or WhatsApp</label><input name="phone" id="ad-phone" type="tel" required autoComplete="tel" /></div></div>
                <div className="row2"><div className="field"><label htmlFor="ad-email">Email</label><input name="email" id="ad-email" type="email" required autoComplete="email" /></div><div className="field"><label htmlFor="ad-area">Area of Abuja</label><input name="area" id="ad-area" required placeholder="e.g. Wuse 2, Gwarinpa" /></div></div>
              </fieldset>
              <fieldset><legend>Your home</legend>
                <div className="field"><span className="lbl">Type of home</span><div className="opts"><label className="opt"><input type="radio" name="home" value="House" required /><span>House</span></label><label className="opt"><input type="radio" name="home" value="Flat" /><span>Flat</span></label><label className="opt"><input type="radio" name="home" value="Duplex" /><span>Duplex</span></label></div></div>
                <div className="field"><span className="lbl">Do you have a fenced compound?</span><div className="opts"><label className="opt"><input type="radio" name="fence" value="Yes" required /><span>Yes</span></label><label className="opt"><input type="radio" name="fence" value="No" /><span>No</span></label></div></div>
                <div className="field"><label htmlFor="ad-pets">Other pets at home</label><input name="otherPets" id="ad-pets" placeholder="e.g. one cat, 3 years old" /></div>
                <div className="field"><label htmlFor="ad-why">Why would you like to adopt?</label><textarea name="reason" id="ad-why" required></textarea></div>
              </fieldset>
              <label className="agree"><input name="agree" type="checkbox" required /> <span>I agree to the adoption terms, a home check and follow-ups for 12 months.</span></label>
              <button className="btn btn-dark btn-block" type="submit">Submit application</button>
            </FormShell>
          </div>
        </div>

        <div className="section bg-sand tight">
          <div className="wrap narrow">
            <h2 style={{ marginBottom: "24px" }}>Adoption questions</h2>
            <div className="faq">
              <details><summary>Is there an adoption fee?</summary><p>A small adoption fee helps cover vaccinations, sterilisation and vet care. We&apos;ll share the amount when we review your application.</p></details>
              <details><summary>How long does the process take?</summary><p>Most adoptions take one to two weeks from application to welcome home, including a meet-and-greet and a home check.</p></details>
              <details><summary>What if it doesn&apos;t work out?</summary><p>Talk to us first. We&apos;ll help with any problems, and if needed, the animal can always come back to Pet Shelter NG.</p></details>
            </div>
          </div>
        </div>
    </>
  );
}

import Link from 'next/link';
import Photo from '@/components/Photo';
import FormShell from '@/components/FormShell';

export const metadata = { title: "Foster a pet" };

export default function Page() {
  return (
    <>
        <div className="page-head"><div className="wrap">
          <div><p className="crumb"><Link href="/">Home</Link> / Foster a pet</p><h1>Open your home, for a little while</h1><p className="lede">Fosters give animals a calm place to recover, grow and learn to trust people, until they&apos;re ready for adoption.</p></div>
          <svg className="art" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 15 16 4l13 11" /><path d="M6.5 12.5V28h19V12.5" /><path d="M16 24s-5-3-5-6.5a2.8 2.8 0 0 1 5-1.6 2.8 2.8 0 0 1 5 1.6c0 3.5-5 6.5-5 6.5z" fill="currentColor" /></svg>
        </div></div>

        <div className="section">
          <div className="wrap">
            <div className="cards3">
              <div className="card"><span className="ico"><svg viewBox="0 0 32 32"><path d="M5 17h22l-2.2 8.2a2 2 0 0 1-2 1.5H9.2a2 2 0 0 1-2-1.5z" /><path className="fill" d="M10 13.5c0-1.6 2.7-2.8 6-2.8s6 1.2 6 2.8c0 1.2-2.7 2-6 2s-6-.8-6-2z" /></svg></span><h3>We cover the costs</h3><p>Food, bedding, medication and all vet visits are provided by Pet Shelter NG.</p></div>
              <div className="card"><span className="ico"><svg viewBox="0 0 32 32"><rect x="5" y="7" width="22" height="20" rx="3" /><path d="M5 13h22M11 4v6M21 4v6" /></svg></span><h3>Flexible time</h3><p>Placements usually last two to eight weeks. You choose what fits your life.</p></div>
              <div className="card"><span className="ico"><svg viewBox="0 0 32 32"><path d="M7 25c0-6 4-10 9-10s9 4 9 10" /><circle cx="16" cy="9" r="4.5" /></svg></span><h3>Support all the way</h3><p>A foster coordinator checks in weekly and is a WhatsApp message away.</p></div>
            </div>
          </div>
        </div>

        <div className="section bg-sand">
          <div className="wrap">
            <div className="sec-head"><div><h2>How fostering works</h2></div></div>
            <ol className="steps">
              <li><h3>Apply</h3><p>Tell us about your home, routine and the animals you can care for.</p></li>
              <li><h3>Home visit</h3><p>A short visit to make sure your space is safe and ready.</p></li>
              <li><h3>Placement</h3><p>We match you with an animal and bring everything you&apos;ll need.</p></li>
              <li><h3>Ready for adoption</h3><p>When they&apos;re healthy and confident, we find their forever home together.</p></li>
            </ol>
          </div>
        </div>

        <div className="section">
          <div className="wrap split" style={{ alignItems: "start" }}>
            <div>
              <h2>Who we need most</h2>
              <ul className="check">
                <li><span><b>Puppy and kitten fosters,</b> for young animals who need round-the-clock care.</span></li>
                <li><span><b>Recovery fosters,</b> for animals healing after surgery or illness.</span></li>
                <li><span><b>Calm homes</b> for shy or anxious animals learning to trust people.</span></li>
                <li><span><b>Emergency fosters</b> who can take an animal at short notice.</span></li>
              </ul>
              <Photo k="care" style={{ width: "100%", aspectRatio: "16/10", objectFit: "cover", objectPosition: "center 40%", borderRadius: "var(--r)", marginTop: "32px" }} alt="A hand gently resting on a dog's neck" />
            </div>
            <FormShell kind="foster" className="form">
              <h3>Foster application</h3>
              <div className="row2"><div className="field"><label htmlFor="fo-name">Full name</label><input name="name" id="fo-name" required autoComplete="name" /></div><div className="field"><label htmlFor="fo-phone">Phone or WhatsApp</label><input name="phone" id="fo-phone" type="tel" required /></div></div>
              <div className="row2"><div className="field"><label htmlFor="fo-email">Email</label><input name="email" id="fo-email" type="email" required /></div><div className="field"><label htmlFor="fo-area">Area of Abuja</label><input name="area" id="fo-area" required /></div></div>
              <div className="field"><span className="lbl">I can foster</span><div className="opts"><label className="opt"><input type="checkbox" name="can" value="Dogs" /><span>Dogs</span></label><label className="opt"><input type="checkbox" name="can" value="Cats" /><span>Cats</span></label><label className="opt"><input type="checkbox" name="can" value="Puppies or kittens" /><span>Puppies or kittens</span></label><label className="opt"><input type="checkbox" name="can" value="Animals in recovery" /><span>Animals in recovery</span></label></div></div>
              <div className="field"><label htmlFor="fo-len">How long can you foster?</label><select name="duration" id="fo-len" required><option value="">Choose</option><option>Up to 2 weeks</option><option>2 to 4 weeks</option><option>1 to 2 months</option><option>Longer</option></select></div>
              <div className="field"><label htmlFor="fo-about">Tell us about your home and routine</label><textarea name="about" id="fo-about" required></textarea></div>
              <button className="btn btn-dark btn-block" type="submit">Apply to foster</button>
            </FormShell>
          </div>
        </div>
    </>
  );
}

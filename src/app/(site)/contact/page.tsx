import Link from 'next/link';
import WaButton from '@/components/WaButton';
import FormShell from '@/components/FormShell';

export const metadata = { title: "Contact us" };

export default function Page() {
  return (
    <>
        <div className="page-head"><div className="wrap">
          <div><p className="crumb"><Link href="/">Home</Link> / Contact us</p><h1>We&apos;d love to hear from you</h1><p className="lede">Questions about adoption, fostering, PetFest or partnerships? Send us a message or visit the shelter.</p></div>
          <svg className="art" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 8h22v16H5z" /><path d="M5 8l11 9 11-9" /></svg>
        </div></div>
        <div className="section">
          <div className="wrap contact-grid">
            <div>
              <div className="c-item"><span className="ico"><svg viewBox="0 0 32 32"><path d="M16 28s-9-8.3-9-15a9 9 0 0 1 18 0c0 6.7-9 15-9 15z" /><circle cx="16" cy="13" r="3" /></svg></span><div><b>Visit us</b><span>Don Smart Kennel, Bala Sokoto Way, Jabi, Abuja, Nigeria</span></div></div>
              <div className="c-item"><span className="ico"><svg viewBox="0 0 32 32"><path d="M5 8h22v16H5z" /><path d="M5 8l11 9 11-9" /></svg></span><div><b>Email</b><a href="mailto:info@petshelterng.org">info@petshelterng.org</a></div></div>
              <div className="c-item"><span className="ico"><svg viewBox="0 0 32 32"><path d="M9 4h5l2 7-3 2a15 15 0 0 0 6 6l2-3 7 2v5a3 3 0 0 1-3 3C14 26 6 18 6 7a3 3 0 0 1 3-3z" /></svg></span><div><b>Phone and WhatsApp</b><span>[Phone number to be added]</span></div></div>
              <div className="c-item"><span className="ico"><svg viewBox="0 0 32 32"><rect x="5" y="5" width="22" height="22" rx="7" /><circle cx="16" cy="16" r="5" /><circle cx="22.5" cy="9.5" r="1" fill="currentColor" /></svg></span><div><b>Instagram and TikTok</b><a href="https://instagram.com/petfestabuja" target="_blank" rel="noopener">@petfestabuja</a></div></div>
              <div className="map">
                <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                  <rect width="400" height="250" fill="#EFE5D1" />
                  <path d="M-10 70 C80 60 160 110 250 95 S380 60 420 80" stroke="#fff" strokeWidth="14" fill="none" />
                  <path d="M120 -10 C130 80 110 160 140 260" stroke="#fff" strokeWidth="10" fill="none" />
                  <path d="M-10 190 C100 175 220 205 420 170" stroke="#fff" strokeWidth="10" fill="none" />
                  <path d="M300 -10 C290 90 320 170 300 260" stroke="#fff" strokeWidth="8" fill="none" />
                  <ellipse cx="70" cy="140" rx="55" ry="30" fill="#CFE3EC" />
                  <rect x="200" y="125" width="60" height="38" rx="6" fill="#E3D6BC" /><rect x="330" y="110" width="44" height="30" rx="6" fill="#E3D6BC" /><rect x="160" y="20" width="70" height="40" rx="6" fill="#D9E6CF" />
                </svg>
                <div className="pin"><span>Pet Shelter NG</span><i></i></div>
                <a className="btn btn-white btn-sm open" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&amp;query=Don%20Smart%20Kennel%2C%20Bala%20Sokoto%20Way%2C%20Jabi%2C%20Abuja">Open in Google Maps</a>
              </div>
            </div>
            <FormShell kind="contact" className="form">
              <h3>Send us a message</h3>
              <div className="row2"><div className="field"><label htmlFor="co-name">Full name</label><input name="name" id="co-name" required autoComplete="name" /></div><div className="field"><label htmlFor="co-email">Email</label><input name="email" id="co-email" type="email" required autoComplete="email" /></div></div>
              <div className="row2"><div className="field"><label htmlFor="co-phone">Phone <span className="hint">(optional)</span></label><input name="phone" id="co-phone" type="tel" autoComplete="tel" /></div><div className="field"><label htmlFor="co-topic">Topic</label><select name="topic" id="co-topic" required><option value="">Choose a topic</option><option>Adoption</option><option>Fostering</option><option>Volunteering</option><option>Donations</option><option>PetFest</option><option>Partnerships</option><option>Something else</option></select></div></div>
              <div className="field"><label htmlFor="co-msg">Message</label><textarea name="message" id="co-msg" required></textarea></div>
              <div className="btn-row"><button className="btn btn-dark" type="submit">Send message</button><WaButton className="btn btn-wa" type="button"><svg viewBox="0 0 24 24" fill="currentColor"><use href="#wa" /></svg>Chat on WhatsApp</WaButton></div>
            </FormShell>
          </div>
        </div>
    </>
  );
}

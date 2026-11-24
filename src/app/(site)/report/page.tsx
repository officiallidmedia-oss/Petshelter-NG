import Link from 'next/link';
import WaButton from '@/components/WaButton';
import ReportForm from '@/components/ReportForm';

export const metadata = { title: "Report an animal in need" };

export default function Page() {
  return (
    <>
        <div className="page-head"><div className="wrap">
          <div><p className="crumb"><Link href="/">Home</Link> / Report an animal</p><h1>Report an animal in need</h1><p className="lede">Tell us about an abandoned, injured or vulnerable animal. Our rescue team reviews every report.</p></div>
          <svg className="art" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 4.5 29 27H3z" /><path d="M16 12.5v6.5" /><circle cx="16" cy="22.6" r="1.3" fill="currentColor" /></svg>
        </div></div>
        <div className="section">
          <div className="wrap split" style={{ alignItems: "start" }}>
            <div>
              <div className="card" style={{ background: "var(--orange-soft)", border: "0" }}>
                <h3>In an emergency</h3>
                <p>If an animal is badly injured or in immediate danger, message us on WhatsApp straight away, as well as filling in this form.</p>
                <WaButton className="btn btn-wa" style={{ alignSelf: "start", marginTop: "6px" }}><svg viewBox="0 0 24 24" fill="currentColor"><use href="#wa" /></svg>Message us on WhatsApp</WaButton>
              </div>
              <h3 style={{ margin: "36px 0 12px" }}>Until we arrive</h3>
              <ul className="check">
                <li><span><b>Keep a safe distance</b> from frightened or injured animals.</span></li>
                <li><span><b>Offer water</b> if it&apos;s safe to do so.</span></li>
                <li><span><b>Note landmarks</b> so we can find the exact spot.</span></li>
                <li><span><b>Take a photo</b> if you can, it helps us prepare.</span></li>
              </ul>
            </div>
            <ReportForm />
          </div>
        </div>
    </>
  );
}

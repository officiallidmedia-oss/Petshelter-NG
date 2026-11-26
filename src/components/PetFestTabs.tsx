'use client';

import Link from 'next/link';
import { useState } from 'react';
import FormShell from './FormShell';
import { useToast } from './Toast';

const TABS = [
  ['tickets', 'Tickets'],
  ['vendors', 'Vendor registration'],
  ['sponsors', 'Sponsorship'],
] as const;

/** Tickets / vendor registration / sponsorship panels on the PetFest page. */
export default function PetFestTabs() {
  const toast = useToast();
  const [tab, setTab] = useState<(typeof TABS)[number][0]>('tickets');
  const notify = () => toast("Thanks! We'll let you know when PetFest 2027 tickets go on sale.");

  return (
    <>
      <div className="pf-tabs" role="tablist" aria-label="PetFest options">
        {TABS.map(([id, label]) => (
          <button key={id} role="tab" aria-selected={tab === id} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>
      {tab === 'tickets' && (
        <div role="tabpanel">
        <div className="cards3">
                  <div className="pf-card"><h3>Early bird</h3><div className="price">₦[price]</div><ul><li>Entry for one adult</li><li>Pets go free</li></ul><button className="btn btn-dark btn-sm" onClick={notify}>Notify me</button></div>
                  <div className="pf-card feature"><h3>Family</h3><div className="price">₦[price]</div><ul><li>Entry for two adults and two children</li><li>Pet Pageant entry included</li></ul><button className="btn btn-yellow btn-sm" onClick={notify}>Notify me</button></div>
                  <div className="pf-card"><h3>VIP</h3><div className="price">₦[price]</div><ul><li>Reserved lounge and goodie bag</li><li>Meet the pageant winners</li></ul><button className="btn btn-dark btn-sm" onClick={notify}>Notify me</button></div>
                </div>
        </div>
      )}
      {tab === 'vendors' && (
        <div role="tabpanel">
        <FormShell kind="vendor" className="form">
                  <h3>Book a vendor stand</h3>
                  <div className="row2"><div className="field"><label htmlFor="ve-biz">Business name</label><input name="business" id="ve-biz" required /></div><div className="field"><label htmlFor="ve-name">Contact person</label><input name="name" id="ve-name" required /></div></div>
                  <div className="row2"><div className="field"><label htmlFor="ve-phone">Phone or WhatsApp</label><input name="phone" id="ve-phone" type="tel" required /></div><div className="field"><label htmlFor="ve-email">Email</label><input name="email" id="ve-email" type="email" required /></div></div>
                  <div className="field"><span className="lbl">What will you sell?</span><div className="opts"><label className="opt"><input type="checkbox" name="whatWillYouSell" value="Food and treats" /><span>Food and treats</span></label><label className="opt"><input type="checkbox" name="whatWillYouSell" value="Accessories" /><span>Accessories</span></label><label className="opt"><input type="checkbox" name="whatWillYouSell" value="Grooming" /><span>Grooming</span></label><label className="opt"><input type="checkbox" name="whatWillYouSell" value="Vet services" /><span>Vet services</span></label><label className="opt"><input type="checkbox" name="whatWillYouSell" value="Other" /><span>Other</span></label></div></div>
                  <div className="field"><label htmlFor="ve-ig">Instagram handle</label><input name="instagram" id="ve-ig" placeholder="@yourbusiness" /></div>
                  <button className="btn btn-dark" type="submit">Request a stand</button>
                </FormShell>
        </div>
      )}
      {tab === 'sponsors' && (
        <div role="tabpanel">
        <div className="cards3">
                  <div className="pf-card"><h3>Headline sponsor</h3><p>Naming rights, main stage branding, award presentation and the largest booth.</p></div>
                  <div className="pf-card"><h3>Category sponsor</h3><p>Sponsor one Pet Pageant category, with branding on its voting page and trophy.</p></div>
                  <div className="pf-card"><h3>Community partner</h3><p>Logo on our website and event materials, plus a stand at PetFest.</p></div>
                </div>
                <p className="link-row"><Link className="btn btn-dark" href="/contact">Request the sponsorship pack</Link></p>
        </div>
      )}
    </>
  );
}

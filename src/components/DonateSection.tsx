'use client';

import { useRef, useState } from 'react';
import { SITE } from '@/lib/config';
import { useToast } from './Toast';

const AMOUNTS = [5000, 10000, 25000, 50000];
const PURPOSES = ["Where it's needed most", 'Food and supplies', 'Vet care and medicine', 'Sterilisation campaign', 'A specific animal'];
const NEEDS = [
  { title: 'Monthly food supply', pct: 64, purpose: 'Food and supplies', d: 'M5 17h22l-2.2 8.2a2 2 0 0 1-2 1.5H9.2a2 2 0 0 1-2-1.5z' },
  { title: 'Vaccines and medicine', pct: 38, purpose: 'Vet care and medicine', d: 'M12 5h8v7h7v8h-7v7h-8v-7H5v-8h7z' },
  { title: 'Sterilisation drive', pct: 21, purpose: 'Sterilisation campaign', d: 'M10 21a5 5 0 1 1 0-10M22 21a5 5 0 1 0 0-10M10 16h12' },
];

const fmt = (n: number) => `₦${Number(n).toLocaleString('en-NG')}`;

export default function DonateSection({ initialFor }: { initialFor?: string }) {
  const toast = useToast();
  const box = useRef<HTMLDivElement>(null);
  const [freq, setFreq] = useState<'once' | 'monthly'>('once');
  const [amount, setAmount] = useState(10000);
  const [other, setOther] = useState('');
  const [purpose, setPurpose] = useState(initialFor && PURPOSES.includes(initialFor) ? initialFor : PURPOSES[0]);

  return (
    <div className="wrap split top">
      <div className="form" id="donate-box" ref={box}>
        <h3>Make a donation</h3>
        <div className="freq" role="group" aria-label="Frequency">
          <button aria-pressed={freq === 'once'} onClick={() => setFreq('once')}>Give once</button>
          <button aria-pressed={freq === 'monthly'} onClick={() => setFreq('monthly')}>Give monthly</button>
        </div>
        <div className="amounts" role="group" aria-label="Amount">
          {AMOUNTS.map((a) => (
            <button
              key={a}
              className="amount"
              aria-pressed={!other && amount === a}
              onClick={() => {
                setAmount(a);
                setOther('');
              }}
            >
              {fmt(a)}
            </button>
          ))}
        </div>
        <div className="field">
          <label htmlFor="do-other">Or enter an amount (₦)</label>
          <input
            id="do-other"
            inputMode="numeric"
            placeholder="Other amount"
            value={other}
            onChange={(e) => {
              const v = e.target.value.replace(/\D/g, '');
              setOther(v);
              if (v) setAmount(Number(v));
            }}
          />
        </div>
        <div className="field">
          <label htmlFor="do-for">Use my gift for</label>
          <select id="do-for" value={purpose} onChange={(e) => setPurpose(e.target.value)}>
            {PURPOSES.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
        <button
          className="btn btn-yellow btn-block"
          onClick={() => (amount < 500 ? toast('Please enter at least ₦500.') : toast(`In the live site, this opens secure checkout for ${fmt(amount)}.`))}
        >
          {`Donate ${fmt(amount)}${freq === 'monthly' ? ' a month' : ''}`}
        </button>
        {SITE.gofundme ? (
          <a className="btn btn-line btn-block" href={SITE.gofundme} target="_blank" rel="noopener noreferrer">
            Give through our GoFundMe
          </a>
        ) : (
          <button className="btn btn-line btn-block" onClick={() => toast("This will open Pet Shelter NG's GoFundMe page once the link is added.")}>
            Give through our GoFundMe
          </button>
        )}
        <p className="muted note">
          Payments will be processed securely by a payment provider such as Paystack or Flutterwave, chosen at the build stage.
        </p>
      </div>

      <div className="copy">
        <h2 className="h-sub">Current shelter needs</h2>
        <p className="muted">Pick a need to support it directly.</p>
        <div className="needs">
          {NEEDS.map((n) => (
            <div className="need" key={n.title}>
              <span className="ico">
                <svg viewBox="0 0 32 32">
                  <path d={n.d} />
                </svg>
              </span>
              <div>
                <h4>{n.title}</h4>
                <div className="bar"><i style={{ width: `${n.pct}%` }} /></div>
                <small>{n.pct}% funded</small>
              </div>
              <button
                className="btn btn-dark btn-sm"
                onClick={() => {
                  setPurpose(n.purpose);
                  box.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
              >
                Give
              </button>
            </div>
          ))}
        </div>
        <h3>Bank transfer</h3>
        <div className="bank">
          <b>Pet Shelter NG</b>
          <span>Bank: [Bank name]</span>
          <span>Account number: [0000000000]</span>
        </div>
      </div>
    </div>
  );
}

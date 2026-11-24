'use client';

import { useState, type CSSProperties, type FormEvent, type ReactNode } from 'react';
import { useToast } from './Toast';

export const FORM_OK: Record<string, [string, string]> = {
  adoption: ['Application received', 'Thank you! Our adoption team will review your application and contact you within a few days.'],
  foster: ['Thank you for applying to foster', 'Our foster coordinator will call you to arrange a short home visit.'],
  volunteer: ['Welcome to the team', "We'll send details of our next volunteer orientation to your email and WhatsApp."],
  partner: ['Enquiry sent', 'Thank you. Our partnerships team will get back to you shortly.'],
  vendor: ['Stand request received', "We'll send vendor packages and pricing for PetFest 2027 when bookings open."],
  report: ['Report sent', 'Thank you for speaking up. Our rescue team will review your report and contact you.'],
  contact: ['Message sent', "Thanks for getting in touch. We'll reply to your email soon."],
};

type Props = { kind: string; className?: string; style?: CSSProperties; children: ReactNode };

/**
 * Wraps every public form: checks required fields, posts to /api/forms/[kind],
 * then swaps the form for a confirmation message.
 */
export default function FormShell({ kind, className = 'form', style, children }: Props) {
  const toast = useToast();
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const required = Array.from(form.querySelectorAll<HTMLInputElement>('[required]'));
    const bad = required.filter((el) => {
      if (el.type === 'radio') return !form.querySelector(`input[name="${el.name}"]:checked`);
      if (el.type === 'checkbox') return !el.checked;
      return !el.value.trim() || (el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value));
    });
    if (bad.length) {
      toast('Please complete the highlighted fields.');
      bad.forEach((el) => (el.style.borderColor = '#B3261E'));
      bad[0].focus();
      return;
    }

    setSending(true);
    try {
      const res = await fetch(`/api/forms/${kind}`, { method: 'POST', body: new FormData(form) });
      if (!res.ok) throw new Error('Request failed');
      setDone(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      toast('Something went wrong. Please try again, or message us on WhatsApp.');
    } finally {
      setSending(false);
    }
  }

  if (done) {
    const [title, text] = FORM_OK[kind] ?? ['Thank you', 'We have received your submission.'];
    return (
      <div className="form form-ok" role="status">
        <span className="ico">
          <svg viewBox="0 0 32 32" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 16.5l5.5 5.5L24 11" />
          </svg>
        </span>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    );
  }

  return (
    <form
      className={className}
      style={style}
      noValidate
      aria-busy={sending}
      onSubmit={onSubmit}
      onInput={(e) => {
        const t = e.target as HTMLElement;
        t.style.borderColor = '';
      }}
    >
      {children}
    </form>
  );
}

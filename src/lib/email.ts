import { Resend } from 'resend';
import { SITE } from './config';

const FROM = process.env.EMAIL_FROM ?? `${SITE.name} <onboarding@resend.dev>`;
const STAFF = process.env.STAFF_EMAIL || SITE.email;

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const CONFIRM: Record<string, [string, string]> = {
  adoption: ['We received your adoption application', 'Our adoption team will review it and contact you within a few days.'],
  foster: ['Thank you for applying to foster', 'Our foster coordinator will call you to arrange a short home visit.'],
  volunteer: ['Welcome to the team', "We'll send details of our next volunteer orientation soon."],
  partner: ['We received your enquiry', 'Our partnerships team will get back to you shortly.'],
  vendor: ['We received your stand request', "We'll send vendor packages and pricing when bookings open."],
  report: ['We received your report', 'Our rescue team will review it and contact you.'],
  contact: ['We received your message', "Thanks for getting in touch. We'll reply soon."],
};

/** Sends the staff alert and (when an email address was given) a confirmation. Never throws. */
export async function sendFormEmails(kind: string, data: Record<string, string | string[]>) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn('[email] RESEND_API_KEY not set; skipping emails');
    return;
  }
  const resend = new Resend(key);
  const rows = Object.entries(data)
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#666"><b>${esc(k)}</b></td><td>${esc(Array.isArray(v) ? v.join(', ') : v)}</td></tr>`)
    .join('');
  const email = typeof data.email === 'string' ? data.email : '';

  const jobs = [
    resend.emails.send({
      from: FROM,
      to: STAFF,
      replyTo: email || undefined,
      subject: `New ${kind} submission`,
      html: `<h2>New ${esc(kind)} submission</h2><table>${rows}</table>`,
    }),
  ];
  const confirm = CONFIRM[kind];
  if (email && confirm) {
    jobs.push(
      resend.emails.send({
        from: FROM,
        to: email,
        subject: confirm[0],
        html: `<p>Hello${typeof data.name === 'string' && data.name ? ` ${esc(data.name)}` : ''},</p><p>${esc(confirm[1])}</p><p>Thank you,<br/>${esc(SITE.name)}</p>`,
      }),
    );
  }
  const results = await Promise.allSettled(jobs);
  results.forEach((r) => {
    if (r.status === 'rejected') console.error('[email] send failed', r.reason);
    else if (r.value.error) console.error('[email] send failed', r.value.error);
  });
}

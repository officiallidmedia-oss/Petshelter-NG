import { z } from 'zod';

/**
 * The contract between the public forms and POST /api/forms/[kind].
 * Both sides import from here so field names, required values and the
 * response shape stay in sync.
 */

export const FORM_KINDS = ['adoption', 'foster', 'volunteer', 'partner', 'vendor', 'report', 'contact'] as const;
export type FormKind = (typeof FORM_KINDS)[number];

export const isFormKind = (value: string): value is FormKind => (FORM_KINDS as readonly string[]).includes(value);

export const FORM_REF_PREFIX: Record<FormKind, string> = {
  adoption: 'AD',
  foster: 'FO',
  report: 'RP',
  volunteer: 'VO',
  vendor: 'VN',
  partner: 'PN',
  contact: 'CT',
};

export const refFor = (kind: FormKind, id: number) => `${FORM_REF_PREFIX[kind]}-${String(id).padStart(4, '0')}`;

/** What the browser form receives. `ref` is shown on the confirmation screen. */
export type FormSuccess = { ok: true; ref?: string };
export type FormFailure = { ok: false; error: string; fields?: Record<string, string> };
export type FormResponse = FormSuccess | FormFailure;

export const MAX_FIELD_LENGTH = 5000;
export const MAX_FORM_FIELDS = 80;

const text = (max = MAX_FIELD_LENGTH) =>
  z.preprocess((v) => (typeof v === 'string' ? v.trim() : ''), z.string().max(max));

const required = (label: string, max = MAX_FIELD_LENGTH) =>
  z.preprocess((v) => (typeof v === 'string' ? v.trim() : ''), z.string().min(1, `${label} is required`).max(max));

const email = z.preprocess(
  (v) => (typeof v === 'string' ? v.trim().toLowerCase() : ''),
  z.string().min(1, 'Email is required').max(200).email('Enter a valid email address'),
);

const choice = (values: readonly string[], label: string) =>
  z.preprocess(
    (v) => (typeof v === 'string' ? v.trim() : ''),
    z.string().refine((v) => values.includes(v), `Choose a valid ${label}`),
  );

const list = z.preprocess(
  (v) => (typeof v === 'string' ? [v] : Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []),
  z.array(z.string().trim().max(100)).max(20),
);

const ADOPTION = z.object({
  animal: text(120),
  name: required('Full name', 120),
  phone: required('Phone or WhatsApp', 40),
  email,
  area: required('Area of Abuja', 120),
  home: choice(['House', 'Flat', 'Duplex'], 'type of home'),
  fence: choice(['Yes', 'No'], 'fenced compound answer'),
  otherPets: text(300),
  reason: required('Reason for adopting'),
  agree: z.preprocess(
    (v) => (typeof v === 'string' ? v.trim() : ''),
    z.string().min(1, 'Please agree to the adoption terms'),
  ),
});

const FOSTER = z.object({
  name: required('Full name', 120),
  phone: required('Phone or WhatsApp', 40),
  email,
  area: required('Area of Abuja', 120),
  can: list,
  duration: choice(['Up to 2 weeks', '2 to 4 weeks', '1 to 2 months', 'Longer'], 'foster duration'),
  about: required('Tell us about your home'),
});

const VOLUNTEER = z.object({
  name: required('Full name', 120),
  phone: required('Phone or WhatsApp', 40),
  email,
  age: choice(["16 to 17 (with parent's consent)", '18 to 25', '26 to 40', '41 and over'], 'age range'),
  idLikeToHelpWith: list,
  whenAreYouFree: list,
});

const PARTNER = z.object({
  organisation: required('Organisation', 160),
  name: required('Contact person', 120),
  email,
  type: choice(['Vet partner', 'Corporate sponsor', 'Pet business', 'School or estate', 'Other'], 'partnership type'),
  message: required('Message'),
});

const VENDOR = z.object({
  business: required('Business name', 160),
  name: required('Contact person', 120),
  phone: required('Phone or WhatsApp', 40),
  email,
  whatWillYouSell: list,
  instagram: text(100),
});

const REPORT = z.object({
  kind: choice(['Dog', 'Cat', 'Other'], 'animal type'),
  situation: choice(['Injured', 'Abandoned', 'Sick or weak', 'Being mistreated'], 'situation'),
  location: required('Location', 300),
  description: required('Description'),
  name: required('Your name', 120),
  phone: required('Phone or WhatsApp', 40),
});

const CONTACT = z.object({
  name: required('Full name', 120),
  email,
  phone: text(40),
  topic: choice(
    ['Adoption', 'Fostering', 'Volunteering', 'Donations', 'PetFest', 'Partnerships', 'Something else'],
    'topic',
  ),
  message: required('Message'),
});

const SCHEMAS: Record<FormKind, z.ZodType> = {
  adoption: ADOPTION,
  foster: FOSTER,
  volunteer: VOLUNTEER,
  partner: PARTNER,
  vendor: VENDOR,
  report: REPORT,
  contact: CONTACT,
};

/** Validates the fields the matching browser form marks as required. */
export function validateSubmission(
  kind: FormKind,
  data: Record<string, string | string[]>,
): FormFailure | null {
  const result = SCHEMAS[kind].safeParse(data);
  if (result.success) return null;

  const fields: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0];
    if (typeof key === 'string' && !fields[key]) fields[key] = issue.message;
  }

  return {
    ok: false,
    error: result.error.issues[0]?.message ?? 'Please check the form and try again.',
    fields,
  };
}

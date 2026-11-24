/** Sample records for the admin preview. Replace with database queries in the build stage. */

export type Tone = 'ok' | 'info' | 'warn' | 'mute';

export const APPLICATIONS = [
  { id: 'AD-0031', type: 'Adoption', name: 'Chidinma Okafor', animal: 'Tobi', area: 'Wuse 2', date: '22 Nov', status: 'New' },
  { id: 'AD-0030', type: 'Adoption', name: 'Ibrahim Musa', animal: 'Bisi', area: 'Gwarinpa', date: '21 Nov', status: 'In review' },
  { id: 'FO-0012', type: 'Foster', name: 'Aisha Bello', animal: 'Any dog', area: 'Maitama', date: '20 Nov', status: 'Home visit' },
  { id: 'AD-0029', type: 'Adoption', name: 'Emeka Eze', animal: 'Zara', area: 'Jabi', date: '19 Nov', status: 'Approved' },
  { id: 'AD-0028', type: 'Adoption', name: 'Funke Adeyemi', animal: 'Kuli', area: 'Asokoro', date: '17 Nov', status: 'Declined' },
] as const;

export const FOLLOW_UPS = [
  { animal: 'Ada', owner: 'Ngozi Peters', task: '7-day settling-in call', due: 'Today', done: false },
  { animal: 'Simba', owner: 'Yusuf Danjuma', task: '30-day health and behaviour check', due: 'Wed', done: false },
  { animal: 'Lola', owner: 'Hauwa Sani', task: '90-day progress report', due: 'Thu', done: false },
  { animal: 'Kuli', owner: 'Tunde Alabi', task: '6-month vet review', due: 'Fri', done: false },
  { animal: 'Bingo', owner: 'Mercy Obi', task: '12-month celebration', due: 'Sat', done: false },
  { animal: 'Coco', owner: 'Ada Nwosu', task: '90-day progress report', due: 'Last week', done: true },
] as const;

export const MEDICAL = [
  { animal: 'Tobi', record: 'Rabies vaccine', date: '02 Oct', next: '02 Oct 2027', vet: 'Dr. [Name]' },
  { animal: 'Bingo', record: 'Leg surgery follow-up', date: '18 Nov', next: '02 Dec', vet: 'Dr. [Name]' },
  { animal: 'Zara', record: 'Puppy booster', date: '10 Nov', next: '08 Dec', vet: 'Dr. [Name]' },
  { animal: 'Ada', record: 'Deworming', date: '14 Nov', next: '14 Dec', vet: 'Dr. [Name]' },
  { animal: 'Kuli', record: 'Microchip', date: '05 Nov', next: '—', vet: 'Dr. [Name]' },
] as const;

export const VOLUNTEERS = [
  { name: 'Amara Obi', help: 'Animal care, Dog walking', free: 'Weekends', joined: '12 Nov', status: 'Orientation booked' },
  { name: 'Sadiq Lawal', help: 'Transport', free: 'Weekdays, Evenings', joined: '09 Nov', status: 'Active' },
  { name: 'Kemi Ojo', help: 'Social media, Events', free: 'Weekends', joined: '02 Nov', status: 'Active' },
  { name: 'Peter Eke', help: 'Fundraising', free: 'Evenings', joined: '28 Oct', status: 'New' },
] as const;

export const DONATIONS = [
  { ref: 'DN-1042', donor: 'Anonymous', amount: 25000, purpose: 'Food and supplies', kind: 'Once', date: '23 Nov' },
  { ref: 'DN-1041', donor: 'Bola Adewale', amount: 10000, purpose: 'Where it’s needed most', kind: 'Monthly', date: '22 Nov' },
  { ref: 'DN-1040', donor: 'Greenfield Vets', amount: 50000, purpose: 'Sterilisation campaign', kind: 'Once', date: '20 Nov' },
  { ref: 'DN-1039', donor: 'Sandra Ike', amount: 5000, purpose: 'Sponsor: Bingo', kind: 'Monthly', date: '19 Nov' },
] as const;

export const REPORTS = [
  { id: 'RP-0074', kind: 'Dog', what: 'Injured', where: 'Kubwa expressway, near the overhead bridge', by: 'Samuel A.', date: '23 Nov', status: 'New' },
  { id: 'RP-0073', kind: 'Cat', what: 'Abandoned', where: 'Wuse Market, Zone 5', by: 'Linda O.', date: '22 Nov', status: 'Team dispatched' },
  { id: 'RP-0072', kind: 'Dog', what: 'Sick or weak', where: 'Gwarinpa, 3rd Avenue', by: 'Musa K.', date: '20 Nov', status: 'Rescued' },
  { id: 'RP-0071', kind: 'Other', what: 'Being mistreated', where: 'Karu, near the motor park', by: 'Anonymous', date: '18 Nov', status: 'Closed' },
] as const;

export const VENDORS = [
  { business: 'Paws & Co', contact: 'Tola B.', sells: 'Accessories', date: '21 Nov', status: 'Requested' },
  { business: 'Chow Chow Pet Food', contact: 'Dayo M.', sells: 'Food and treats', date: '18 Nov', status: 'Quote sent' },
  { business: 'Fur & Fluff Grooming', contact: 'Ify N.', sells: 'Grooming', date: '15 Nov', status: 'Confirmed' },
] as const;

/** Status label → pill colour */
export const TONE: Record<string, Tone> = {
  New: 'warn', 'In review': 'info', 'Home visit': 'info', Approved: 'ok', Declined: 'mute',
  'Team dispatched': 'info', Rescued: 'ok', Closed: 'mute',
  Requested: 'warn', 'Quote sent': 'info', Confirmed: 'ok',
  'Orientation booked': 'info', Active: 'ok',
};

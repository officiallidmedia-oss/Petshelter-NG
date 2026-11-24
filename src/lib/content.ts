import type { Adoption, AnimalStatus } from './types';

/** Static content. Safe to import from client components (no database code here). */
/** Real adoptions (photos supplied by Pet Shelter NG). */
export const ADOPTIONS: Adoption[] = [
  { k: 'ad1', cap: 'A fluffy white cat', alt: 'A woman cradling a fluffy white cat' },
  { k: 'ad2', cap: 'A long-haired white cat', alt: 'A woman kissing a long-haired white cat' },
  { k: 'ad3', cap: 'A curly black puppy', alt: 'A smiling woman holding a curly black puppy' },
  { k: 'ad4', cap: 'A cream puppy', alt: 'A woman holding a small cream puppy wrapped in a yellow cloth' },
  { k: 'ad5', cap: 'A tabby and white kitten', alt: 'A man in sunglasses holding a tiny tabby and white kitten' },
  { k: 'ad6', cap: 'A golden scruffy pup', alt: 'A woman carrying a golden scruffy dog on a blue lead' },
  { k: 'ad7', cap: 'A ginger and white kitten', alt: 'A woman cuddling a ginger and white kitten' },
  { k: 'ad8', cap: 'A cream fluffy dog', alt: 'Two women in aprons holding a fluffy cream dog' },
];

export const STATUS: Record<AnimalStatus, { label: string; cls: string }> = {
  available: { label: 'Available', cls: 'st-available' },
  treatment: { label: 'Under treatment', cls: 'st-treatment' },
  fostered: { label: 'In foster care', cls: 'st-fostered' },
  adopted: { label: 'Adopted', cls: 'st-adopted' },
  rescued: { label: 'Just rescued', cls: 'st-rescued' },
};

export const TEAM: [string, string][] = [
  ['[Name]', 'Founder and director'],
  ['[Name]', 'Shelter manager'],
  ['[Name]', 'Veterinary lead'],
  ['[Name]', 'Volunteer and foster coordinator'],
];

export const goodLabel = (g: string) => `Good with ${g === 'kids' ? 'children' : g}`;

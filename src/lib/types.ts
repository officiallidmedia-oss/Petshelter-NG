export type Species = 'Dog' | 'Cat';
export type AnimalStatus = 'available' | 'treatment' | 'fostered' | 'adopted' | 'rescued';
export type AgeGroup = 'young' | 'adult' | 'senior';
export type Good = 'kids' | 'dogs' | 'cats';

export type Animal = {
  id: string;
  slug: string;
  name: string;
  species: Species;
  sex: 'Male' | 'Female';
  age: string;
  ageGroup: AgeGroup;
  size: 'Small' | 'Medium' | 'Large';
  breed: string;
  status: AnimalStatus;
  good: Good[];
  vax: boolean;
  ster: boolean;
  dew: boolean;
  chip: boolean;
  story: string;
  /** colour variant for the illustrated placeholder (c1..c4) */
  c: 'c1' | 'c2' | 'c3' | 'c4';
  /** replace with a real photo path once available, e.g. /images/animals/tobi.jpg */
  img?: string;
};

export type Adoption = { k: string; cap: string; alt: string };
export type Story = { slug: string; name: string; summary: string; c: Animal['c']; journey: AnimalStatus[] };

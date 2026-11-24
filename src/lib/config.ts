/** Site-wide settings. Fill these in via .env.local (see .env.example). */
export const SITE = {
  name: 'Pet Shelter NG',
  email: 'info@petshelterng.org',
  address: 'Don Smart Kennel, Bala Sokoto Way, Jabi, Abuja, Nigeria',
  instagram: 'https://instagram.com/petfestabuja',
  tiktok: 'https://www.tiktok.com/@petfestabuja',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? '',
  gofundme: process.env.NEXT_PUBLIC_GOFUNDME ?? '',
};

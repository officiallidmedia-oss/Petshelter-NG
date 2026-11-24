export type ImageMeta = { src: string; w: number; h: number };

/** Every photo on the site, keyed by the short names used in the pages. */
export const IMAGES: Record<string, ImageMeta> = {
  logo: { src: '/images/logo.png', w: 480, h: 475 },
  hero: { src: '/images/hero.jpg', w: 880, h: 1100 },
  runway: { src: '/images/runway.jpg', w: 1400, h: 826 },
  cat: { src: '/images/cat.jpg', w: 1400, h: 826 },
  whitecat: { src: '/images/whitecat.jpg', w: 1400, h: 826 },
  frenchie: { src: '/images/frenchie.jpg', w: 1400, h: 826 },
  tunnel: { src: '/images/tunnel.jpg', w: 1400, h: 826 },
  care: { src: '/images/care.jpg', w: 1400, h: 826 },
  pom: { src: '/images/pom.jpg', w: 1600, h: 900 },
  ad1: { src: '/images/adopt/ad1.jpg', w: 560, h: 700 },
  ad2: { src: '/images/adopt/ad2.jpg', w: 560, h: 700 },
  ad3: { src: '/images/adopt/ad3.jpg', w: 560, h: 700 },
  ad4: { src: '/images/adopt/ad4.jpg', w: 560, h: 700 },
  ad5: { src: '/images/adopt/ad5.jpg', w: 560, h: 700 },
  ad6: { src: '/images/adopt/ad6.jpg', w: 560, h: 700 },
  ad7: { src: '/images/adopt/ad7.jpg', w: 560, h: 700 },
  ad8: { src: '/images/adopt/ad8.jpg', w: 560, h: 700 },
};

// All original assets now live under /public/assets. Next.js (App Router) serves
// anything in /public from the site root, so these are plain string paths rather
// than webpack asset imports — simpler, and works for the .mp4 too.
const images = {
  bg: '/assets/bg.png',
  chef: '/assets/chef.png',
  G: '/assets/G.png',
  gallery01: '/assets/gallery01.png',
  gallery02: '/assets/gallery02.png',
  gallery03: '/assets/gallery03.png',
  gallery04: '/assets/gallery04.png',
  knife: '/assets/knife.png',
  logo: '/assets/logo.png',
  menu: '/assets/menu.png',
  overlaybg: '/assets/overlaybg.png',
  spoon: '/assets/spoon.svg',
  welcome: '/assets/welcome.png',
  findus: '/assets/findus.png',
  laurels: '/assets/laurels.png',
  award01: '/assets/award01.png',
  award02: '/assets/award02.png',
  award03: '/assets/award03.png',
  award05: '/assets/award05.png',
  sign: '/assets/sign.png',
  quote: '/assets/quote.png',
  gericht: '/assets/gericht.png',
} as const;

export default images;

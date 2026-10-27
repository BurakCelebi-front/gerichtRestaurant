import type { Config } from 'tailwindcss';

// Tailwind is scoped to the new feature pages (/daily-specials,
// /reservations) added during the Next.js migration — the original design
// (container/* and components/* CSS files) is untouched plain CSS so the
// restaurant's existing look is preserved pixel-for-pixel.
const config: Config = {
  content: ['./src/app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        golden: '#DCCA87',
      },
    },
  },
  plugins: [],
};

export default config;

# Gericht Restaurant 🍽️

**🔗 Live demo:** https://gericht-restaurant-beige.vercel.app/

A fully responsive restaurant site, migrated from a Create React App single-page app to **Next.js 15 (App Router) + TypeScript**. The original design — layout, colors, copy, images — is preserved pixel-for-pixel; only the technical foundation changed, plus three new feature pages that exercise Next.js's three rendering modes end to end.

<img width="780" height="412" alt="Gericht1" src="https://github.com/user-attachments/assets/2ad0f80e-ab9e-4b8f-8cfc-a5bd9ee148f7" />
<img width="780" height="412" alt="Gericht2" src="https://github.com/user-attachments/assets/a89e40ed-8523-4d7e-9093-7f01cc9fc987" />
<img width="780" height="412" alt="Gericht3" src="https://github.com/user-attachments/assets/7baaa464-fda3-486d-86f9-8b6a7788b7a1" />

## 🛠 Tech Stack

<img src="https://skillicons.dev/icons?i=nextjs,typescript,react,tailwind,vercel">

- **Next.js 15** — App Router
- **TypeScript** (strict mode, no `any`)
- **Tailwind CSS** — used for the new feature pages; the original sections keep their existing plain CSS (custom properties, Flexbox, media queries) so the look stays identical to the CRA version
- **react-icons**

## 🧱 Rendering strategy — SSG, ISR, SSR, side by side

This project deliberately uses all three Next.js rendering modes, each where it actually makes sense, rather than picking one and forcing everything into it.

| Route | Mode | Why |
|---|---|---|
| `/` | **SSG** (Static) | The restaurant's story, menu, awards, gallery and location don't change per visitor. No `revalidate`, no dynamic APIs — Next.js renders it once at build time and serves the same static HTML to everyone, exactly like the original CRA `npm run build` did. |
| `/daily-specials` | **ISR** (`export const revalidate = 60`) | "Today's Special" changes occasionally through the day but shouldn't be recomputed on every request. Next.js serves the cached static page instantly and regenerates it in the background at most once every 60 seconds. The data comes from `lib/dailySpecials.ts`, standing in for a kitchen-inventory/specials feed — the same mock data is also served live over HTTP at `GET /api/daily-specials`. |
| `/reservations` | **SSR** (`export const dynamic = 'force-dynamic'`) | "Live table availability" is only meaningful if it's actually live. This route is excluded from the cache entirely and re-rendered on the server for every request — reload it twice and you'll get two different occupancy readings. |
| `/api/reservations` | **Route Handler** | Real server-side logic: validates the booking payload, then calls a simulated (intentionally flaky, ~40% failure rate) downstream booking system with **retry + exponential backoff** (3 attempts: 200ms → 400ms → 800ms) before giving up, returning a well-formed JSON error instead of ever throwing. See `lib/reservations.ts`. |
| `/api/daily-specials` | **Route Handler** | A standalone, independently callable JSON endpoint serving the same mock specials data the ISR page uses. |

### Third-party API integration

`/reservations` calls [Open-Meteo](https://open-meteo.com) — a free, keyless public weather API — on the server (`lib/weather.ts`) to turn the current temperature/conditions near the restaurant into a plain-English seating suggestion ("the garden terrace is the move" vs. "cosier by the fire indoors tonight"). The call is wrapped in try/catch: if Open-Meteo is unreachable the page still renders correctly with a graceful fallback message instead of crashing.

## 🧩 Pages & Sections

- **`/`** — `Navbar` · `Header` · `About Us` · `Special Menu` · `Chef` · `Intro (video)` · `Laurels` · `Gallery` · `Find Us` · `Footer` (all ported from the original CRA components, now typed `.tsx`)
- **`/daily-specials`** — ISR specials board (new)
- **`/reservations`** — live occupancy + weather-based seating suggestion + booking form wired to the retry-enabled API route (new)

## 📁 Project Structure

```
public/
├── assets/              # images + video, moved out of src/ so Next.js can serve them statically
├── favicon.ico, manifest.json, logo192.png, logo512.png
src/
├── app/
│   ├── layout.tsx       # root layout, metadata
│   ├── page.tsx         # "/" — SSG home page
│   ├── globals.css      # Tailwind directives + the original index.css/App.css, verbatim
│   ├── daily-specials/
│   │   └── page.tsx     # ISR
│   ├── reservations/
│   │   ├── page.tsx     # SSR
│   │   └── ReservationForm.tsx  # client component, posts to /api/reservations
│   └── api/
│       ├── reservations/route.ts    # retry + backoff, validation, error handling
│       └── daily-specials/route.ts  # mock specials JSON endpoint
├── components/          # SubHeading, Navbar, MenuItem, Footer bits — ported to .tsx
├── container/            # AboutUs, Header, Chef, Intro, Laurels, Gallery, FindUs, Footer, SpecialMenu — ported to .tsx
├── constants/            # images.ts (paths into /public/assets), data.ts (menu/awards), typed
├── lib/                  # weather.ts, dailySpecials.ts, reservations.ts — all the "real" logic
└── types/                # shared TypeScript interfaces (no `any` anywhere in the project)
```

## 🚀 Getting Started

```bash
git clone https://github.com/BurakCelebi-front/gerichtRestaurantDemo.git
cd gerichtRestaurantDemo
npm install
npm run dev          # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

## ☁️ Deployment

Deployed on **Vercel** — framework preset **Next.js**, zero extra configuration needed. `vercel.json` is intentionally omitted; Next.js App Router projects work out of the box.

## 🙏 Credits

UI design and original concept: **Gericht** by [JavaScript Mastery](https://www.youtube.com/@javascriptmastery) ([tutorial](https://www.youtube.com/watch?v=4oV65GVVits)). Originally built as a Create React App practice project, then migrated to Next.js (App Router) + TypeScript with added SSG/ISR/SSR routes, a retry-enabled API route, and a live third-party weather integration.

## 📄 License

[MIT](./LICENSE)

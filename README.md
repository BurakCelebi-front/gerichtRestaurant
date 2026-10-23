
# Gericht Restaurant 🍽️

A fully responsive **one-page restaurant landing page** built with **React**, designed to deliver an elegant, modern experience.

**🔗 Live demo:** https://gericht-restaurant-beige.vercel.app/

<img width="780" height="412" alt="Gericht1" src="https://github.com/user-attachments/assets/2ad0f80e-ab9e-4b8f-8cfc-a5bd9ee148f7" />

<img width="780" height="412" alt="Gericht2" src="https://github.com/user-attachments/assets/a89e40ed-8523-4d7e-9093-7f01cc9fc987" />

<img width="780" height="412" alt="Gericht3" src="https://github.com/user-attachments/assets/7baaa464-fda3-486d-86f9-8b6a7788b7a1" />


## 📌 Features

- Fully responsive layout (desktop, tablet, mobile)
- Mobile navigation with animated overlay menu
- In-page navigation between sections
- Special menu, chef's word, awards and gallery sections
- Intro video with custom play/pause control
- Newsletter sign-up block and footer with contact info

## 💡 What I learned & what I changed

**Learned**
- Turning a Figma design into a pixel-faithful, fully responsive layout with plain CSS (custom properties, Flexbox, media queries) — no UI framework
- Splitting a one-page React app into reusable components (`SubHeading`, `MenuItem`) and section containers, with menu and awards content driven by data files

**Changed after the original build**
- Cleaned the repo: removed committed build output, fixed a broken `public/index.html` that referenced a non-existent bundle, added `.gitignore`
- Fixed ESLint issues that made the Vercel build fail (`CI=true` treats warnings as errors)
- Migrated to the React 18 `createRoot` API and added SEO / Open Graph meta tags
- Deployed on Vercel

## 🧩 Sections

`Navbar` · `Header` · `About Us` · `Special Menu` · `Chef` · `Intro (video)` · `Laurels` · `Gallery` · `Find Us` · `Footer`

## 🛠 Tech Stack

<img src="https://skillicons.dev/icons?i=html,css,react,figma">

- **React 18** (Create React App)
- **CSS3** — custom properties, Flexbox, media queries
- **react-icons**

## 🚀 Getting Started

```bash
git clone https://github.com/BurakCelebi-front/gerichtRestaurantDemo.git
cd gerichtRestaurantDemo
npm install
npm start          # http://localhost:3000
```

Production build:

```bash
npm run build      # output in /build
```

## ☁️ Deployment

Deployed on **Vercel**: import the repo, framework preset **Create React App** — no extra configuration needed.

## 📁 Project Structure

```
src/
├── assets/        # images, video, svg
├── components/    # Navbar, MenuItem, SubHeading, Footer overlay, Newsletter
├── constants/     # image map + menu/awards data
├── container/     # page sections (Header, AboutUs, SpecialMenu, ...)
├── App.jsx
└── index.jsx
public/            # index.html, favicon, manifest
```

## 🙏 Credits

UI design and original concept: **Gericht** by [JavaScript Mastery](https://www.youtube.com/@javascriptmastery) ([tutorial]([TUTORIAL_LINK](https://www.youtube.com/watch?v=4oV65GVVits))). Built as a practice project to sharpen my React and responsive CSS skills; all code in this repository was written by me while following and then extending the design.

## 📄 License

[MIT](./LICENSE)

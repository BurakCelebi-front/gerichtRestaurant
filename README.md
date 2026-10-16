# Gericht Restaurant 🍽️

A fully responsive **one-page restaurant landing page** built with **React**, designed to deliver an elegant, modern experience.

**🔗 Live demo:** _coming soon_ <!-- replace with the Vercel URL after deploy -->

<!-- Add a screenshot after deploy: ![Gericht Restaurant preview](./preview.png) -->

## 📌 Features

- Fully responsive layout (desktop, tablet, mobile)
- Mobile navigation with animated overlay menu
- In-page navigation between sections
- Special menu, chef's word, awards and gallery sections
- Intro video with custom play/pause control
- Newsletter sign-up block and footer with contact info

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

## 📄 License

[MIT](./LICENSE)

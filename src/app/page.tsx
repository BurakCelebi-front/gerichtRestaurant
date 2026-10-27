import React from 'react';
import {
  AboutUs,
  Chef,
  FindUs,
  Footer,
  Gallery,
  Header,
  Intro,
  Laurels,
  SpecialMenu,
} from '../container';
import { Navbar } from '../components';

// --- Why SSG? -------------------------------------------------------------
// This page has no `revalidate`, no `dynamic = 'force-dynamic'`, and calls
// no request-scoped APIs (headers(), cookies(), searchParams, etc.) — so
// Next.js renders it to static HTML once at build time and serves that same
// file to every visitor (Static Site Generation), exactly like the original
// Create React App build did. It's the right choice because none of this
// content (the restaurant's story, menu, awards, gallery, location) changes
// per-request.
export default function HomePage() {
  return (
    <div>
      <Navbar />
      <Header />
      <AboutUs />
      <SpecialMenu />
      <Chef />
      <Intro />
      <Laurels />
      <Gallery />
      <FindUs />
      <Footer />
    </div>
  );
}

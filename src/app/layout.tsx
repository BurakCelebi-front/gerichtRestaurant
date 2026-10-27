import type { Metadata, Viewport } from 'next';
import React from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gericht Restaurant',
  description:
    'Gericht Restaurant — a fully responsive restaurant site built with Next.js (App Router) and TypeScript.',
  openGraph: {
    title: 'Gericht Restaurant',
    description: 'A fully responsive restaurant site built with Next.js.',
    type: 'website',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/logo192.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#0C0C0C',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

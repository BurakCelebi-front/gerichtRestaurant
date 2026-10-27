import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getDailySpecials } from '../../lib/dailySpecials';

export const metadata: Metadata = {
  title: "Today's Special | Gericht Restaurant",
  description: "Gericht Restaurant's daily specials, refreshed throughout the day.",
};

// --- Why ISR? ----------------------------------------------------------
// `revalidate = 60` makes this an Incremental Static Regeneration (ISR)
// page: Next.js serves the statically generated HTML instantly (same speed
// as SSG) but, at most once every 60 seconds, regenerates it in the
// background against the latest data. That's the right trade-off for a
// "today's specials" board — it changes occasionally through the day, but
// doesn't need to be computed fresh on every single request like the live
// reservation status on /reservations does.
//
// `getDailySpecials()` stands in for a call to an external kitchen
// inventory / specials API (see src/lib/dailySpecials.ts and the real,
// independently-callable JSON endpoint at /api/daily-specials, which uses
// the exact same mock data source). Calling the function directly here
// — instead of self-fetching our own API route over HTTP — keeps the page
// statically buildable in any environment, while still being driven by the
// same "mock API" data.
export const revalidate = 60;

export default function DailySpecialsPage() {
  const { specials, generatedAt } = getDailySpecials();

  return (
    <main className="min-h-screen bg-[#0C0C0C] px-6 py-16 text-white sm:px-10 lg:px-24">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="mb-6 inline-block text-xs text-gray-400 hover:text-[#DCCA87]">← Back to Gericht Restaurant</Link>
        <p className="mb-2 text-sm uppercase tracking-[0.2em] text-[#DCCA87]">Gericht Restaurant</p>
        <h1 className="mb-3 font-serif text-4xl font-semibold sm:text-5xl">Today&apos;s Special</h1>
        <p className="mb-10 text-sm text-gray-400">
          Refreshed every minute from the kitchen board · last generated{' '}
          {new Date(generatedAt).toLocaleTimeString()}
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {specials.map((special) => (
            <article
              key={special.id}
              className="flex flex-col justify-between rounded-lg border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/30 transition hover:border-[#DCCA87]/60"
            >
              <div>
                <span className="mb-3 inline-block rounded-full bg-[#DCCA87]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#DCCA87]">
                  {special.tag}
                </span>
                <h2 className="mb-2 text-xl font-semibold">{special.title}</h2>
                <p className="text-sm text-gray-300">{special.description}</p>
              </div>
              <p className="mt-4 text-lg font-semibold text-[#DCCA87]">{special.price}</p>
            </article>
          ))}
        </div>

        <p className="mt-10 text-xs text-gray-500">
          This page is statically generated and regenerated via ISR (<code>revalidate: 60</code>) — reload after a
          minute to see a new board.
        </p>
      </div>
    </main>
  );
}

import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getLiveOccupancy } from '../../lib/reservations';
import { getWeatherSuggestion } from '../../lib/weather';
import ReservationForm from './ReservationForm';

export const metadata: Metadata = {
  title: 'Reservations | Gericht Restaurant',
  description: 'Check live table availability and book a table at Gericht Restaurant.',
};

// --- Why SSR? ------------------------------------------------------------
// `dynamic = 'force-dynamic'` opts this route out of static rendering and
// out of the Full Route Cache entirely: Next.js renders it fresh, on the
// server, for every single request. That's the correct choice here —
// "live occupancy" is only meaningful if it's actually current, so unlike
// the daily specials page (ISR, cached for up to 60s) this one must never
// serve a stale snapshot.
export const dynamic = 'force-dynamic';

const STATUS_STYLES: Record<string, string> = {
  quiet: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
  busy: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
  full: 'bg-red-500/15 text-red-300 border-red-500/40',
};

export default async function ReservationsPage() {
  // Computed fresh on every request — proof this page is server-rendered
  // per-request rather than served from a cached static file.
  const occupancy = getLiveOccupancy();
  const weather = await getWeatherSuggestion();

  return (
    <main className="min-h-screen bg-[#0C0C0C] px-6 py-16 text-white sm:px-10 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="mb-6 inline-block text-xs text-gray-400 hover:text-[#DCCA87]">← Back to Gericht Restaurant</Link>
        <p className="mb-2 text-sm uppercase tracking-[0.2em] text-[#DCCA87]">Gericht Restaurant</p>
        <h1 className="mb-3 font-serif text-4xl font-semibold sm:text-5xl">Reservations</h1>
        <p className="mb-10 max-w-2xl text-sm text-gray-400">
          Live floor status, checked the moment you loaded this page (server-rendered on every
          request — see <code>dynamic = &apos;force-dynamic&apos;</code> in this route).
        </p>

        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className={`rounded-lg border p-6 ${STATUS_STYLES[occupancy.status]}`}>
            <p className="text-xs uppercase tracking-wide opacity-80">Current status</p>
            <p className="mt-1 text-2xl font-semibold capitalize">{occupancy.status}</p>
            <p className="mt-2 text-sm opacity-80">
              {occupancy.tablesAvailable} of {occupancy.tablesTotal} tables open ({occupancy.occupancyPercent}% full)
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-wide text-gray-400">Estimated wait</p>
            <p className="mt-1 text-2xl font-semibold">
              {occupancy.waitTimeMinutes > 0 ? `${occupancy.waitTimeMinutes} min` : 'No wait'}
            </p>
            <p className="mt-2 text-sm text-gray-400">
              Checked at {new Date(occupancy.checkedAt).toLocaleTimeString()}
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 p-6">
            <p className="text-xs uppercase tracking-wide text-gray-400">Tonight&apos;s seating suggestion</p>
            {weather ? (
              <>
                <p className="mt-1 text-2xl font-semibold capitalize">{weather.suggestion} seating</p>
                <p className="mt-2 text-sm text-gray-400">{weather.reason}</p>
              </>
            ) : (
              <p className="mt-1 text-sm text-gray-400">Weather data is unavailable right now — either seating works great.</p>
            )}
          </div>
        </div>

        <ReservationForm />
      </div>
    </main>
  );
}

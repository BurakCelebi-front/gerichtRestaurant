'use client';

import React, { useState } from 'react';
import type { ReservationResult } from '../../types';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const inputClasses =
  'w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-[#DCCA87] focus:outline-none';

export default function ReservationForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [result, setResult] = useState<ReservationResult | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    setResult(null);

    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get('name') ?? ''),
      email: String(form.get('email') ?? ''),
      partySize: Number(form.get('partySize') ?? 0),
      date: String(form.get('date') ?? ''),
      time: String(form.get('time') ?? ''),
      notes: String(form.get('notes') ?? ''),
    };

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data: ReservationResult = await res.json();
      setResult(data);
      setStatus(data.ok ? 'success' : 'error');
      if (data.ok) {
        event.currentTarget.reset();
      }
    } catch (error) {
      // Network failure (client offline, DNS, etc.) — the fetch itself
      // never reached the server, so there's no ReservationResult to parse.
      setResult({ ok: false, error: 'Could not reach the server. Check your connection and try again.', attempts: 0 });
      setStatus('error');
    }
  }

  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 sm:p-8">
      <h2 className="mb-1 text-xl font-semibold">Book a table</h2>
      <p className="mb-6 text-sm text-gray-400">
        Submits to <code>/api/reservations</code>, which retries the booking system up to 3 times with
        exponential backoff before giving up.
      </p>

      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label className="mb-1 block text-xs uppercase tracking-wide text-gray-400" htmlFor="name">Name</label>
          <input id="name" name="name" required className={inputClasses} placeholder="Jane Doe" />
        </div>
        <div className="sm:col-span-1">
          <label className="mb-1 block text-xs uppercase tracking-wide text-gray-400" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required className={inputClasses} placeholder="jane@example.com" />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wide text-gray-400" htmlFor="partySize">Party size</label>
          <input id="partySize" name="partySize" type="number" min={1} max={20} required defaultValue={2} className={inputClasses} />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wide text-gray-400" htmlFor="date">Date</label>
          <input id="date" name="date" type="date" required className={inputClasses} />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wide text-gray-400" htmlFor="time">Time</label>
          <input id="time" name="time" type="time" required className={inputClasses} />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs uppercase tracking-wide text-gray-400" htmlFor="notes">Notes (optional)</label>
          <input id="notes" name="notes" className={inputClasses} placeholder="Window seat, allergy info, celebration..." />
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="rounded-md bg-[#DCCA87] px-5 py-2 text-sm font-semibold text-[#0C0C0C] transition hover:bg-[#c9b874] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'submitting' ? 'Booking…' : 'Request table'}
          </button>
        </div>
      </form>

      {result && (
        <div
          className={`mt-6 rounded-md border p-4 text-sm ${
            result.ok
              ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
              : 'border-red-500/40 bg-red-500/10 text-red-300'
          }`}
        >
          {result.ok ? (
            <>
              <p className="font-semibold">Confirmed — #{result.confirmationId}</p>
              <p className="mt-1 opacity-90">{result.message}</p>
              <p className="mt-1 text-xs opacity-60">Succeeded on attempt {result.attempts} of 3.</p>
            </>
          ) : (
            <>
              <p className="font-semibold">Could not book your table</p>
              <p className="mt-1 opacity-90">{result.error}</p>
              {result.attempts > 0 && (
                <p className="mt-1 text-xs opacity-60">Retried {result.attempts} time(s) before failing.</p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

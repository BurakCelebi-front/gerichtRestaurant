import { NextRequest, NextResponse } from 'next/server';
import { submitReservation } from '../../../lib/reservations';
import type { ReservationRequest } from '../../../types';

// This route is the "real" error handling requirement: it validates input,
// talks to a (simulated) flaky downstream booking system with retry +
// exponential backoff (see lib/reservations.ts), and always returns a
// well-formed JSON response — success or failure — instead of throwing.
export async function POST(req: NextRequest) {
  let body: Partial<ReservationRequest>;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Request body must be valid JSON.', attempts: 0 },
      { status: 400 },
    );
  }

  try {
    const result = await submitReservation({
      name: body.name ?? '',
      email: body.email ?? '',
      partySize: Number(body.partySize) || 0,
      date: body.date ?? '',
      time: body.time ?? '',
      notes: body.notes,
    });

    if (!result.ok) {
      // Distinguish "bad input" (0 attempts made) from "downstream kept failing".
      const status = result.attempts === 0 ? 422 : 502;
      return NextResponse.json(result, { status });
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    // Catch-all: never let an unexpected error leak a stack trace to the client.
    console.error('[api/reservations] unexpected error:', error);
    return NextResponse.json(
      { ok: false, error: 'Something went wrong while processing your reservation. Please try again.', attempts: 0 },
      { status: 500 },
    );
  }
}

import type { LiveOccupancy, ReservationRequest, ReservationResult } from '../types';

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Stands in for a call to a third-party booking system (e.g. OpenTable,
 * SevenRooms). Deliberately flaky — fails ~40% of the time — so the retry
 * logic in `submitReservation` below has something real to do.
 */
async function callUpstreamBookingSystem(request: ReservationRequest): Promise<string> {
  // Simulate real network latency.
  await sleep(150 + Math.random() * 150);

  if (Math.random() < 0.4) {
    throw new Error('Upstream booking system timed out');
  }

  return `GR-${Date.now().toString(36).toUpperCase()}`;
}

function validate(request: ReservationRequest): string | null {
  if (!request.name?.trim()) return 'Name is required.';
  if (!request.email?.includes('@')) return 'A valid email is required.';
  if (!request.date) return 'Reservation date is required.';
  if (!request.time) return 'Reservation time is required.';
  if (!request.partySize || request.partySize < 1 || request.partySize > 20) {
    return 'Party size must be between 1 and 20.';
  }
  return null;
}

const MAX_ATTEMPTS = 3;
const BASE_DELAY_MS = 200;

/**
 * Submits a reservation to the (simulated) upstream booking system, retrying
 * up to MAX_ATTEMPTS times with exponential backoff before giving up. This
 * is the retry/error-handling logic the API route (`/api/reservations`)
 * delegates to.
 */
export async function submitReservation(request: ReservationRequest): Promise<ReservationResult> {
  const validationError = validate(request);
  if (validationError) {
    return { ok: false, error: validationError, attempts: 0 };
  }

  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      const confirmationId = await callUpstreamBookingSystem(request);
      return {
        ok: true,
        confirmationId,
        attempts: attempt,
        message: `Table for ${request.partySize} confirmed for ${request.date} at ${request.time}.`,
      };
    } catch (error) {
      lastError = error;
      const isLastAttempt = attempt === MAX_ATTEMPTS;
      console.warn(
        `[reservations] attempt ${attempt}/${MAX_ATTEMPTS} failed:`,
        error instanceof Error ? error.message : error,
      );

      if (!isLastAttempt) {
        // Exponential backoff: 200ms, 400ms, 800ms, ...
        const delay = BASE_DELAY_MS * 2 ** (attempt - 1);
        await sleep(delay);
      }
    }
  }

  const message = lastError instanceof Error ? lastError.message : 'Unknown error';
  return {
    ok: false,
    error: `Could not reach the booking system after ${MAX_ATTEMPTS} attempts (${message}). Please try again shortly.`,
    attempts: MAX_ATTEMPTS,
  };
}

/**
 * Generates a fresh "live occupancy" reading. Used by the SSR
 * /reservations page — every request recomputes this, which is the whole
 * point of rendering that page with `dynamic = 'force-dynamic'` instead of
 * letting Next.js cache it statically.
 */
export function getLiveOccupancy(): LiveOccupancy {
  const tablesTotal = 24;
  const tablesAvailable = Math.floor(Math.random() * (tablesTotal + 1));
  const occupancyPercent = Math.round(((tablesTotal - tablesAvailable) / tablesTotal) * 100);
  const status: LiveOccupancy['status'] =
    occupancyPercent >= 90 ? 'full' : occupancyPercent >= 60 ? 'busy' : 'quiet';
  const waitTimeMinutes = status === 'full' ? 25 + Math.floor(Math.random() * 20) : status === 'busy' ? Math.floor(Math.random() * 15) : 0;

  return {
    checkedAt: new Date().toISOString(),
    tablesTotal,
    tablesAvailable,
    occupancyPercent,
    waitTimeMinutes,
    status,
  };
}

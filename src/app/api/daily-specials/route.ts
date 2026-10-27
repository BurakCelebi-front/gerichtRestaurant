import { NextResponse } from 'next/server';
import { getDailySpecials } from '../../../lib/dailySpecials';

// Plays the role of an external "kitchen inventory" API. The /daily-specials
// page fetches this with `{ next: { revalidate: 60 } }`, which is what makes
// that page ISR rather than plain SSG — Next.js caches the rendered page for
// 60 seconds, then regenerates it in the background on the next request.
export async function GET() {
  try {
    const data = getDailySpecials();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('[api/daily-specials] failed to build specials:', error);
    return NextResponse.json({ error: 'Could not load daily specials.' }, { status: 500 });
  }
}

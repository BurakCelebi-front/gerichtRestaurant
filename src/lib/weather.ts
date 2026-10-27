import type { WeatherSuggestion } from '../types';

// Restaurant's location (Rudheath, Cheshire, UK — see the Find Us section).
const LAT = 53.263;
const LON = -2.376;

// Open-Meteo (https://open-meteo.com) is a free, keyless public weather API —
// a genuine third-party integration with zero credentials to manage, which
// makes it a good fit for a demo project like this one.
const OPEN_METEO_URL = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,weather_code&timezone=auto`;

// Minimal WMO weather-code -> description mapping (open-meteo uses the WMO code table).
function describeWeatherCode(code: number): string {
  if (code === 0) return 'Clear sky';
  if ([1, 2, 3].includes(code)) return 'Partly cloudy';
  if ([45, 48].includes(code)) return 'Foggy';
  if ([51, 53, 55, 56, 57].includes(code)) return 'Drizzle';
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'Rainy';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'Snowy';
  if ([95, 96, 99].includes(code)) return 'Thunderstorms';
  return 'Overcast';
}

function isWetOrSevere(code: number): boolean {
  return (
    [45, 48, 51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 71, 73, 75, 77, 80, 81, 82, 85, 86, 95, 96, 99].includes(code)
  );
}

interface OpenMeteoResponse {
  current: {
    time: string;
    temperature_2m: number;
    weather_code: number;
  };
}

/**
 * Fetches current conditions from Open-Meteo and turns them into a seating
 * suggestion for the restaurant. Called from a Server Component, so the API
 * key-free request happens on the server and the result is streamed down as
 * plain HTML/JSON — the browser never talks to Open-Meteo directly.
 */
export async function getWeatherSuggestion(): Promise<WeatherSuggestion | null> {
  try {
    const res = await fetch(OPEN_METEO_URL, {
      // Weather is cheap to refresh; cache briefly rather than on every request.
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      throw new Error(`Open-Meteo responded with ${res.status}`);
    }

    const payload = (await res.json()) as OpenMeteoResponse;
    const temperatureC = Math.round(payload.current.temperature_2m);
    const code = payload.current.weather_code;
    const condition = describeWeatherCode(code);
    const suggestion = !isWetOrSevere(code) && temperatureC >= 16 ? 'garden' : 'indoor';
    const reason =
      suggestion === 'garden'
        ? `It's ${temperatureC}°C and ${condition.toLowerCase()} — the garden terrace is the move.`
        : `It's ${temperatureC}°C and ${condition.toLowerCase()} — cosier by the fire indoors tonight.`;

    return {
      temperatureC,
      condition,
      suggestion,
      reason,
      fetchedAt: payload.current.time,
    };
  } catch (error) {
    // Third-party APIs can and do fail — never let that break the page.
    console.error('[weather] failed to fetch Open-Meteo data:', error);
    return null;
  }
}

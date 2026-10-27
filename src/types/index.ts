// Shared TypeScript types for the Gericht Restaurant app.
// Centralising these keeps every component/container fully typed (no `any`).

export interface MenuEntry {
  title: string;
  price: string;
  tags: string;
}

export interface Award {
  imgUrl: string;
  title: string;
  subtitle: string;
}

export interface DailySpecial {
  id: string;
  title: string;
  description: string;
  price: string;
  tag: 'Chef Special' | 'Limited' | 'Seasonal';
}

export interface DailySpecialsResponse {
  generatedAt: string;
  specials: DailySpecial[];
}

export type SeatingSuggestion = 'garden' | 'indoor';

export interface WeatherSuggestion {
  temperatureC: number;
  condition: string;
  suggestion: SeatingSuggestion;
  reason: string;
  fetchedAt: string;
}

export interface ReservationRequest {
  name: string;
  email: string;
  partySize: number;
  date: string;
  time: string;
  notes?: string;
}

export interface ReservationSuccess {
  ok: true;
  confirmationId: string;
  attempts: number;
  message: string;
}

export interface ReservationFailure {
  ok: false;
  error: string;
  attempts: number;
}

export type ReservationResult = ReservationSuccess | ReservationFailure;

export interface LiveOccupancy {
  checkedAt: string;
  tablesTotal: number;
  tablesAvailable: number;
  occupancyPercent: number;
  waitTimeMinutes: number;
  status: 'quiet' | 'busy' | 'full';
}

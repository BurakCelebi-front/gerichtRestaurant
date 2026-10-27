import type { DailySpecial, DailySpecialsResponse } from '../types';

// Stands in for a real "kitchen inventory / specials board" service. In a
// production app this would be a call to an internal microservice or CMS;
// here it's randomised so every regeneration visibly produces new data,
// which makes the ISR behaviour on /daily-specials easy to observe.
const SPECIAL_POOL: DailySpecial[] = [
  { id: 'duck', title: 'Seared Duck Breast', description: 'Cherry gastrique, charred fennel, potato gratin.', price: '$34', tag: 'Chef Special' },
  { id: 'halibut', title: 'Pan-Roasted Halibut', description: 'Brown butter, capers, heirloom tomato.', price: '$36', tag: 'Seasonal' },
  { id: 'truffle-risotto', title: 'Black Truffle Risotto', description: 'Aged parmesan, white wine, chive oil.', price: '$29', tag: 'Limited' },
  { id: 'short-rib', title: 'Braised Short Rib', description: '12-hour braise, celeriac purée, red wine jus.', price: '$32', tag: 'Chef Special' },
  { id: 'scallops', title: 'Seared Scallops', description: 'Pea purée, pancetta crumb, lemon beurre blanc.', price: '$30', tag: 'Seasonal' },
  { id: 'mushroom-tart', title: 'Wild Mushroom Tart', description: 'Puff pastry, taleggio, truffle honey.', price: '$24', tag: 'Limited' },
  { id: 'lamb-rack', title: 'Herb-Crusted Lamb Rack', description: 'Rosemary jus, confit potato, charred greens.', price: '$38', tag: 'Chef Special' },
];

function pickRandom<T>(pool: T[], count: number): T[] {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Builds "today's specials" from the mock pool. Deliberately randomised so
 * each regeneration (every 60s, per the ISR `revalidate` window on
 * /daily-specials) returns a visibly different board.
 */
export function getDailySpecials(): DailySpecialsResponse {
  return {
    generatedAt: new Date().toISOString(),
    specials: pickRandom(SPECIAL_POOL, 3),
  };
}

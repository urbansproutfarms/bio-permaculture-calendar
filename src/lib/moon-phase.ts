/**
 * Moon Phase Calculations
 * Provides moon phase determination and display helpers
 */

import { MoonPhase } from '@/types/calendar';

/**
 * Calculate moon phase for a given date
 * Uses simplified lunar cycle approximation
 */
export function calculateMoonPhase(date: Date): MoonPhase {
  // Known new moon reference: January 6, 2000
  const knownNewMoon = new Date(2000, 0, 6, 18, 14);
  const lunarCycle = 29.53058867; // days

  const diff = date.getTime() - knownNewMoon.getTime();
  const days = diff / (1000 * 60 * 60 * 24);
  const phase = ((days % lunarCycle) + lunarCycle) % lunarCycle;

  // Determine phase name based on position in cycle
  if (phase < 1.84566) return 'New';
  if (phase < 7.38264) return 'Waxing Crescent';
  if (phase < 9.22830) return 'First Quarter';
  if (phase < 14.76528) return 'Waxing Gibbous';
  if (phase < 16.61094) return 'Full';
  if (phase < 22.14792) return 'Waning Gibbous';
  if (phase < 23.99358) return 'Last Quarter';
  return 'Waning Crescent';
}

/**
 * Get emoji representation of moon phase
 */
export function getMoonEmoji(phase: MoonPhase): string {
  const emojiMap: Record<MoonPhase, string> = {
    'New': '🌑',
    'Waxing Crescent': '🌒',
    'First Quarter': '🌓',
    'Waxing Gibbous': '🌔',
    'Full': '🌕',
    'Waning Gibbous': '🌖',
    'Last Quarter': '🌗',
    'Waning Crescent': '🌘'
  };

  return emojiMap[phase] || '🌑';
}

/**
 * Check if moon is waxing (growing)
 */
export function isWaxing(phase: MoonPhase): boolean {
  return ['Waxing Crescent', 'First Quarter', 'Waxing Gibbous'].includes(phase);
}

/**
 * Check if moon is waning (shrinking)
 */
export function isWaning(phase: MoonPhase): boolean {
  return ['Waning Gibbous', 'Last Quarter', 'Waning Crescent'].includes(phase);
}

/**
 * Get planting recommendations based on moon phase
 */
export function getMoonPlantingAdvice(phase: MoonPhase): string {
  const advice: Record<MoonPhase, string> = {
    'New': 'Rest period. Good for planning and soil preparation.',
    'Waxing Crescent': 'Excellent for sowing leafy annuals and grains.',
    'First Quarter': 'Ideal for planting above-ground crops that produce seeds outside fruit.',
    'Waxing Gibbous': 'Best time for planting crops that produce seeds inside fruit.',
    'Full': 'Peak energy. Good for transplanting and watering.',
    'Waning Gibbous': 'Plant root crops and perennials.',
    'Last Quarter': 'Focus on pruning, harvesting, and composting.',
    'Waning Crescent': 'Rest and observe. Minimal disturbance to plants.'
  };

  return advice[phase];
}

/**
 * Seasonal Mode Inference
 * Determines current gardening mode based on user profile and date
 */

import { UserProfile } from '@/types/profile';
import { SeasonalMode } from '@/types/calendar';

/**
 * Infer current seasonal mode based on profile and date
 */
export function inferSeasonalMode(profile: UserProfile, date: Date): SeasonalMode {
  const month = date.getMonth(); // 0-11
  const location = profile.location;
  const climate = profile.climate;

  // Adjust for hemisphere
  const isNorthernHemisphere = (location.latitude ?? 0) >= 0;
  const adjustedMonth = isNorthernHemisphere ? month : (month + 6) % 12;

  // Consider climate zone
  const isColdClimate = climate.zone && parseInt(climate.zone) <= 6;
  const isWarmClimate = climate.zone && parseInt(climate.zone) >= 9;

  // Determine mode based on adjusted month and climate
  if (adjustedMonth === 11 || adjustedMonth === 0 || adjustedMonth === 1) {
    // Dec, Jan, Feb (Northern winter)
    if (isColdClimate) {
      return 'Dormancy';
    } else if (isWarmClimate) {
      return 'Succession Planting';
    }
    return 'Dormancy';
  } else if (adjustedMonth === 2 || adjustedMonth === 3) {
    // Mar, Apr (Northern spring)
    return 'Seed Starting';
  } else if (adjustedMonth === 4 || adjustedMonth === 5) {
    // May, Jun (Northern late spring/early summer)
    return 'Transplanting';
  } else if (adjustedMonth === 6 || adjustedMonth === 7) {
    // Jul, Aug (Northern summer)
    if (climate.avgSummerHigh && climate.avgSummerHigh > 85) {
      return 'Heat Management';
    }
    return 'Succession Planting';
  } else if (adjustedMonth === 8 || adjustedMonth === 9) {
    // Sep, Oct (Northern fall)
    return 'Harvest';
  } else {
    // Nov (Northern late fall)
    return 'Cover Cropping';
  }
}

/**
 * Get description of seasonal mode
 */
export function getSeasonalModeDescription(mode: SeasonalMode): string {
  const descriptions: Record<SeasonalMode, string> = {
    'Seed Starting': 'Start seeds indoors for transplanting after last frost.',
    'Transplanting': 'Move seedlings outdoors and direct sow warm-season crops.',
    'Succession Planting': 'Plant crops in stages for continuous harvest throughout the season.',
    'Heat Management': 'Protect plants from heat stress, provide shade, and ensure adequate water.',
    'Harvest': 'Harvest mature crops, preserve food, and save seeds.',
    'Cover Cropping': 'Plant cover crops to protect and enrich soil over winter.',
    'Dormancy': 'Light maintenance, mulching, protecting plants, and planning next season.'
  };

  return descriptions[mode];
}

/**
 * Get priority tasks for seasonal mode
 */
export function getSeasonalPriorities(mode: SeasonalMode): string[] {
  const priorities: Record<SeasonalMode, string[]> = {
    'Seed Starting': [
      'Start seeds indoors',
      'Harden off seedlings',
      'Prepare transplant beds',
      'Monitor frost dates'
    ],
    'Transplanting': [
      'Transplant hardened seedlings',
      'Direct sow warm crops',
      'Mulch beds',
      'Install supports'
    ],
    'Succession Planting': [
      'Plant quick crops every 2 weeks',
      'Water consistently',
      'Weed regularly',
      'Monitor pests'
    ],
    'Heat Management': [
      'Provide afternoon shade',
      'Deep water less frequently',
      'Apply mulch heavily',
      'Harvest early morning'
    ],
    'Harvest': [
      'Harvest at peak ripeness',
      'Preserve and store',
      'Save seeds',
      'Remove spent plants'
    ],
    'Cover Cropping': [
      'Sow winter cover crops',
      'Mulch perennial beds',
      'Protect tender plants',
      'Build soil structure'
    ],
    'Dormancy': [
      'Mulch heavily',
      'Protect from freeze',
      'Prune dormant trees',
      'Plan next season'
    ]
  };

  return priorities[mode];
}

/**
 * Check if it's a good time for specific activities
 */
export function isGoodTimeFor(mode: SeasonalMode, activity: string): boolean {
  const goodTimes: Record<string, SeasonalMode[]> = {
    'planting': ['Seed Starting', 'Transplanting', 'Succession Planting'],
    'harvesting': ['Harvest', 'Succession Planting'],
    'pruning': ['Dormancy'],
    'soil_work': ['Cover Cropping', 'Dormancy'],
    'transplanting': ['Transplanting']
  };

  return goodTimes[activity]?.includes(mode) ?? false;
}

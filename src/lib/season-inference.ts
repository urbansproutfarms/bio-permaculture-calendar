/**
 * Seasonal Mode Inference
 * Determines current gardening mode based on user profile and date
 */

import { UserProfile } from '@/types/profile';

export type SeasonalMode =
  | 'Winter Planning'
  | 'Spring Preparation'
  | 'Seed Starting'
  | 'Transplanting'
  | 'Active Growth'
  | 'Heat Management'
  | 'Harvest Season'
  | 'Fall Planting'
  | 'Cover Cropping'
  | 'Winter Dormancy';

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
      return 'Winter Planning';
    } else if (isWarmClimate) {
      return 'Active Growth';
    }
    return 'Winter Dormancy';
  } else if (adjustedMonth === 2 || adjustedMonth === 3) {
    // Mar, Apr (Northern spring)
    if (isColdClimate) {
      return 'Seed Starting';
    }
    return 'Spring Preparation';
  } else if (adjustedMonth === 4 || adjustedMonth === 5) {
    // May, Jun (Northern late spring/early summer)
    return 'Transplanting';
  } else if (adjustedMonth === 6 || adjustedMonth === 7) {
    // Jul, Aug (Northern summer)
    if (climate.avgSummerHigh && climate.avgSummerHigh > 85) {
      return 'Heat Management';
    }
    return 'Active Growth';
  } else if (adjustedMonth === 8 || adjustedMonth === 9) {
    // Sep, Oct (Northern fall)
    return 'Harvest Season';
  } else {
    // Nov (Northern late fall)
    if (isColdClimate) {
      return 'Cover Cropping';
    }
    return 'Fall Planting';
  }
}

/**
 * Get description of seasonal mode
 */
export function getSeasonalModeDescription(mode: SeasonalMode): string {
  const descriptions: Record<SeasonalMode, string> = {
    'Winter Planning': 'Time for planning next season, ordering seeds, and studying garden design.',
    'Spring Preparation': 'Prepare beds, amend soil, and get ready for planting season.',
    'Seed Starting': 'Start seeds indoors for transplanting after last frost.',
    'Transplanting': 'Move seedlings outdoors and direct sow warm-season crops.',
    'Active Growth': 'Maintain gardens with regular watering, weeding, and pest management.',
    'Heat Management': 'Protect plants from heat stress, provide shade, and ensure adequate water.',
    'Harvest Season': 'Harvest mature crops, preserve food, and save seeds.',
    'Fall Planting': 'Plant cool-season crops and perennials for fall/winter harvest.',
    'Cover Cropping': 'Plant cover crops to protect and enrich soil over winter.',
    'Winter Dormancy': 'Light maintenance, mulching, and protecting plants from cold.'
  };

  return descriptions[mode];
}

/**
 * Get priority tasks for seasonal mode
 */
export function getSeasonalPriorities(mode: SeasonalMode): string[] {
  const priorities: Record<SeasonalMode, string[]> = {
    'Winter Planning': [
      'Review last season notes',
      'Order seeds and supplies',
      'Design garden layout',
      'Clean and sharpen tools'
    ],
    'Spring Preparation': [
      'Test and amend soil',
      'Build or repair beds',
      'Set up irrigation',
      'Start compost piles'
    ],
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
    'Active Growth': [
      'Water consistently',
      'Weed regularly',
      'Monitor pests',
      'Side-dress with compost'
    ],
    'Heat Management': [
      'Provide afternoon shade',
      'Deep water less frequently',
      'Apply mulch heavily',
      'Harvest early morning'
    ],
    'Harvest Season': [
      'Harvest at peak ripeness',
      'Preserve and store',
      'Save seeds',
      'Remove spent plants'
    ],
    'Fall Planting': [
      'Plant garlic and onions',
      'Sow cool-season greens',
      'Plant cover crops',
      'Divide perennials'
    ],
    'Cover Cropping': [
      'Sow winter cover crops',
      'Mulch perennial beds',
      'Protect tender plants',
      'Build soil structure'
    ],
    'Winter Dormancy': [
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
    'planting': ['Spring Preparation', 'Seed Starting', 'Transplanting', 'Fall Planting'],
    'harvesting': ['Active Growth', 'Harvest Season'],
    'pruning': ['Winter Dormancy', 'Winter Planning'],
    'soil_work': ['Spring Preparation', 'Fall Planting', 'Cover Cropping'],
    'transplanting': ['Transplanting', 'Fall Planting']
  };

  return goodTimes[activity]?.includes(mode) ?? false;
}

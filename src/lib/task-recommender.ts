/**
 * Task Recommendation Engine
 * Generates personalized gardening tasks based on:
 * - User profile (climate, goals, experience)
 * - Current season
 * - Biodynamic day type
 * - Moon phase
 */

import { UserProfile } from '@/types/profile';
import { BiodynamicDayType } from './biodynamic';
import { MoonPhase } from './moon-phase';
import { SeasonalMode } from './season-inference';
import { seedRandom } from './utils';

export interface TaskRecommendation {
  bestActions: string[];
  avoidActions: string[];
  bestCrops: string[];
  microTask: string;
}

export function generateTaskRecommendations(
  profile: UserProfile,
  dayType: BiodynamicDayType,
  moonPhase: MoonPhase,
  seasonalMode: SeasonalMode,
  date: Date
): TaskRecommendation {
  const rng = seedRandom(profile.country + date.toISOString());

  return {
    bestActions: getBestActions(dayType, moonPhase, seasonalMode, profile, rng),
    avoidActions: getAvoidActions(dayType, moonPhase),
    bestCrops: getBestCrops(dayType, profile, rng),
    microTask: getMicroTask(seasonalMode, dayType, rng)
  };
}

function getBestActions(
  dayType: BiodynamicDayType,
  moonPhase: MoonPhase,
  mode: SeasonalMode,
  profile: UserProfile,
  rng: () => number
): string[] {
  const actions: string[] = [];

  // Day type specific
  const dayTypeActions: Record<BiodynamicDayType, string[]> = {
    'Root': [
      'Plant root vegetables (carrots, potatoes, beets)',
      'Harvest root crops for storage',
      'Work on soil improvement and composting',
      'Prune to encourage root development'
    ],
    'Leaf': [
      'Sow leafy greens and herbs',
      'Fertilize with nitrogen-rich amendments',
      'Harvest lettuce, spinach, and kale',
      'Water deeply to encourage leaf growth'
    ],
    'Flower': [
      'Plant flowers and flowering herbs',
      'Harvest herbs for highest essential oil content',
      'Sow broccoli, cauliflower, artichokes',
      'Deadhead flowers to encourage blooming'
    ],
    'Fruit': [
      'Plant fruiting vegetables (tomatoes, peppers, beans)',
      'Harvest fruits at peak ripeness',
      'Prune fruit trees and berry bushes',
      'Save seeds from best fruit producers'
    ]
  };

  actions.push(...shuffle(dayTypeActions[dayType], rng).slice(0, 2));

  // Moon phase influence
  if (moonPhase === 'Waxing Crescent' || moonPhase === 'First Quarter') {
    actions.push('Good time for sowing above-ground crops');
  } else if (moonPhase === 'Full') {
    actions.push('Excellent for transplanting and harvesting');
  } else if (moonPhase === 'Waning Gibbous' || moonPhase === 'Last Quarter') {
    actions.push('Focus on root crops and soil building');
  }

  // Seasonal mode
  const seasonalActions: Record<SeasonalMode, string[]> = {
    'Seed Starting': ['Start seeds indoors', 'Prepare seed starting mix'],
    'Transplanting': ['Harden off seedlings', 'Transplant after frost'],
    'Succession Planting': ['Sow quick crops every 2 weeks'],
    'Heat Management': ['Apply mulch heavily', 'Provide shade cloth'],
    'Harvest': ['Harvest regularly', 'Preserve excess produce'],
    'Cover Cropping': ['Sow cover crops', 'Prepare garlic beds'],
    'Dormancy': ['Protect perennials', 'Plan next season']
  };

  if (seasonalActions[mode]) {
    actions.push(seasonalActions[mode][0]);
  }

  // Experience level adjustments
  if (profile.experienceLevel === 'Beginner') {
    actions.push('Focus on easy-to-grow varieties');
  }

  return actions.slice(0, 5);
}

function getAvoidActions(dayType: BiodynamicDayType, moonPhase: MoonPhase): string[] {
  const avoidMap: Record<BiodynamicDayType, string[]> = {
    'Root': ['Avoid planting leafy greens', 'Postpone flower planting'],
    'Leaf': ['Avoid root crop sowing', 'Postpone fruiting crop planting'],
    'Flower': ['Avoid heavy root work', 'Postpone leaf crop harvesting'],
    'Fruit': ['Avoid transplanting leafy greens', 'Postpone root crop work']
  };

  const avoid = [...avoidMap[dayType]];

  if (moonPhase === 'New') {
    avoid.push('Avoid major planting - rest and plan');
  }

  return avoid.slice(0, 2);
}

function getBestCrops(
  dayType: BiodynamicDayType,
  profile: UserProfile,
  rng: () => number
): string[] {
  const cropMap: Record<BiodynamicDayType, string[]> = {
    'Root': ['Carrots', 'Potatoes', 'Beets', 'Turnips', 'Radishes', 'Onions', 'Garlic'],
    'Leaf': ['Lettuce', 'Spinach', 'Kale', 'Chard', 'Cabbage', 'Celery', 'Parsley'],
    'Flower': ['Broccoli', 'Cauliflower', 'Artichokes', 'Sunflowers', 'Chamomile', 'Calendula'],
    'Fruit': ['Tomatoes', 'Peppers', 'Cucumbers', 'Squash', 'Beans', 'Peas', 'Melons']
  };

  let crops = cropMap[dayType];

  // Filter by user's top crops if specified
  if (profile.topCrops && profile.topCrops.length > 0) {
    const userCrops = crops.filter(c =>
      profile.topCrops.some(uc => c.toLowerCase().includes(uc.toLowerCase()))
    );
    if (userCrops.length > 0) {
      crops = userCrops;
    }
  }

  return shuffle(crops, rng).slice(0, 4);
}

function getMicroTask(mode: SeasonalMode, dayType: BiodynamicDayType, rng: () => number): string {
  const tasks = [
    'Check soil moisture in one container',
    'Deadhead 5 spent flowers',
    'Pull weeds from one bed',
    'Inspect plants for pests (5 min)',
    'Add compost to one plant',
    'Thin one row of seedlings',
    'Water one dry plant deeply',
    'Record one observation in journal',
    'Harvest greens for tonight\'s salad',
    'Collect fallen leaves for mulch'
  ];

  const index = Math.floor(rng() * tasks.length);
  return tasks[index];
}

function shuffle<T>(array: T[], rng: () => number): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generatePermacultureTip(date: Date) {
  const tips = [
    {
      category: 'Water Retention',
      title: 'Mulch for Moisture',
      description: 'Apply 3-4 inches of organic mulch to reduce evaporation and keep soil cool. Wood chips, straw, or shredded leaves work great.'
    },
    {
      category: 'Soil Building',
      title: 'Chop and Drop',
      description: 'Cut back nitrogen-fixing plants and leave cuttings in place as mulch. This feeds soil organisms and builds fertility.'
    },
    {
      category: 'Companion Planting',
      title: 'Three Sisters Garden',
      description: 'Plant corn, beans, and squash together. Corn provides structure, beans fix nitrogen, squash shades soil and deters pests.'
    },
    {
      category: 'Pest Management',
      title: 'Habitat for Beneficials',
      description: 'Plant flowers to attract predatory insects. Yarrow, dill, and fennel support lacewings and parasitic wasps.'
    },
    {
      category: 'Landscape Design',
      title: 'Zone Planning',
      description: 'Place frequently-used plants close to your door (Zone 1). Less-visited areas can be farther away (Zones 2-5).'
    },
    {
      category: 'Perennials',
      title: 'Food Forest Layers',
      description: 'Stack functions: canopy trees, understory, shrubs, herbaceous, ground cover, root crops, and vines create a productive ecosystem.'
    }
  ];

  const index = date.getDate() % tips.length;
  return tips[index];
}

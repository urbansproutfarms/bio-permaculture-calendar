/**
 * Calendar Generation Engine
 * Orchestrates all calendar logic to generate personalized 14-day view
 */

import { UserProfile } from '@/types/profile';
import { CalendarDay } from '@/types/calendar';
import { calculateMoonPhase } from './moon-phase';
import { calculateBiodynamicDay } from './biodynamic';
import { inferSeasonalMode } from './season-inference';
import { generateTaskRecommendations, generatePermacultureTip } from './task-recommender';

export interface CalendarConfig {
  daysToGenerate?: number; // Default: 30
  includeEducationalContent?: boolean; // Default: false for MVP
}

/**
 * Generate personalized calendar for user
 */
export function generateCalendar(
  profile: UserProfile,
  startDate: Date = new Date(),
  config: CalendarConfig = {}
): CalendarDay[] {
  const { daysToGenerate = 30, includeEducationalContent = false } = config;
  const calendar: CalendarDay[] = [];

  for (let i = 0; i < daysToGenerate; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    const dayData = generateDayData(profile, date, includeEducationalContent);
    calendar.push(dayData);
  }

  return calendar;
}

/**
 * Generate complete data for a single day
 */
export function generateDayData(
  profile: UserProfile,
  date: Date,
  includeEducationalContent: boolean = false
): CalendarDay {
  // Calculate astronomical and biodynamic data
  const moonPhase = calculateMoonPhase(date);
  const dayType = calculateBiodynamicDay(date);
  const seasonalMode = inferSeasonalMode(profile, date);

  // Generate personalized recommendations
  const recommendations = generateTaskRecommendations(
    profile,
    dayType,
    moonPhase,
    seasonalMode,
    date
  );

  // Get daily permaculture tip
  const permacultureTip = generatePermacultureTip(date);

  // Build calendar day object
  const calendarDay: CalendarDay = {
    date,
    moonPhase,
    dayType,
    seasonalMode,
    bestActions: recommendations.bestActions,
    avoidActions: recommendations.avoidActions,
    bestCrops: recommendations.bestCrops,
    microTask: recommendations.microTask,
    permacultureTip,
  };

  // Add educational content if requested
  if (includeEducationalContent) {
    calendarDay.educationalContent = generateEducationalContent(dayType, moonPhase);
  }

  return calendarDay;
}

/**
 * Generate educational content explaining the science and philosophy
 */
function generateEducationalContent(
  dayType: any,
  moonPhase: any
) {
  const philosophyContent = {
    'Root': 'Biodynamic agriculture views root days as times when Earth forces are strongest, making it ideal for working with root vegetables that store energy below ground.',
    'Leaf': 'Leaf days align with Water element, supporting lush vegetative growth. Traditional farmers have long observed better leafy crop establishment during these periods.',
    'Flower': 'Flower days correspond to Air element, thought to enhance aromatic and essential oil content in flowering plants and herbs.',
    'Fruit': 'Fruit days align with Fire element, traditionally seen as favorable for fruiting crops and seed-saving activities.'
  };

  const scienceContent = {
    'Root': 'While controlled studies on biodynamic planting are limited, some research suggests moon phases may influence soil moisture availability and germination rates.',
    'Leaf': 'Plant physiology research shows that water uptake varies with environmental factors. Some farmers report anecdotal success timing leaf crop planting with moon phases.',
    'Flower': 'Essential oil content in herbs can vary based on harvest timing. Traditional timing methods complement modern understanding of volatile compound production.',
    'Fruit': 'Fruit ripening is influenced by multiple factors including temperature, light, and plant hormones. Moon phase timing is one traditional consideration among many.'
  };

  return {
    philosophySection: {
      title: 'Traditional Wisdom',
      content: philosophyContent[dayType] || 'Biodynamic practices integrate traditional farming wisdom with ecological principles.'
    },
    scienceSection: {
      title: 'Modern Understanding',
      content: scienceContent[dayType] || 'Research continues to explore the relationship between lunar cycles and plant growth.',
      evidenceLevel: 'Traditional' as const
    }
  };
}

/**
 * Get today's data for quick access
 */
export function getTodayData(profile: UserProfile): CalendarDay {
  return generateDayData(profile, new Date(), false);
}

/**
 * Get this week's calendar (7 days starting today)
 */
export function getWeekCalendar(profile: UserProfile): CalendarDay[] {
  return generateCalendar(profile, new Date(), { daysToGenerate: 7 });
}

/**
 * Filter calendar by day type
 */
export function filterByDayType(calendar: CalendarDay[], dayType: string): CalendarDay[] {
  return calendar.filter(day => day.dayType === dayType);
}

/**
 * Find next occurrence of specific day type
 */
export function findNextDayType(
  profile: UserProfile,
  dayType: string,
  startDate: Date = new Date()
): CalendarDay | null {
  // Search up to 30 days ahead
  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const dayData = generateDayData(profile, date);

    if (dayData.dayType === dayType) {
      return dayData;
    }
  }

  return null;
}

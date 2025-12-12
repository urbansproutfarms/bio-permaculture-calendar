/**
 * Biodynamic Day Type Calculations
 * Determines day types based on constellation positions
 */

export type DayType = 'Root' | 'Leaf' | 'Flower' | 'Fruit';

/**
 * Calculate biodynamic day type for a given date
 * Uses simplified 4-day rotation pattern
 * In production, this would use actual astronomical calculations
 */
export function calculateBiodynamicDay(date: Date): DayType {
  // Reference date: Jan 1, 2024 (Root day)
  const referenceDate = new Date(2024, 0, 1);
  const daysSinceReference = Math.floor(
    (date.getTime() - referenceDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const dayTypes: DayType[] = ['Root', 'Flower', 'Leaf', 'Fruit'];
  const index = ((daysSinceReference % 4) + 4) % 4;

  return dayTypes[index];
}

/**
 * Get element association for day type
 */
export function getDayTypeElement(dayType: DayType): string {
  const elements: Record<DayType, string> = {
    'Root': '🜃 Earth',
    'Leaf': '🜄 Water',
    'Flower': '🜁 Air',
    'Fruit': '🜂 Fire'
  };

  return elements[dayType];
}

/**
 * Get color scheme for day type (Tailwind classes)
 */
export function getDayTypeColor(dayType: DayType): string {
  const colors: Record<DayType, string> = {
    'Root': 'bg-amber-50 border-amber-200',
    'Leaf': 'bg-green-50 border-green-200',
    'Flower': 'bg-purple-50 border-purple-200',
    'Fruit': 'bg-red-50 border-red-200'
  };

  return colors[dayType];
}

/**
 * Get description of day type focus
 */
export function getDayTypeDescription(dayType: DayType): string {
  const descriptions: Record<DayType, string> = {
    'Root': 'Focus on root vegetables like carrots, potatoes, beets, and radishes. Good for soil work and underground development.',
    'Leaf': 'Ideal for leafy greens like lettuce, spinach, kale, and herbs. Supports vigorous vegetative growth.',
    'Flower': 'Perfect for flowers, broccoli, cauliflower, and artichokes. Enhances blooming and aromatic plants.',
    'Fruit': 'Best for tomatoes, peppers, beans, peas, and fruit trees. Supports fruiting and seed development.'
  };

  return descriptions[dayType];
}

/**
 * Get recommended crops for day type
 */
export function getRecommendedCrops(dayType: DayType): string[] {
  const crops: Record<DayType, string[]> = {
    'Root': ['Carrots', 'Potatoes', 'Beets', 'Radishes', 'Turnips', 'Onions', 'Garlic'],
    'Leaf': ['Lettuce', 'Spinach', 'Kale', 'Chard', 'Cabbage', 'Basil', 'Parsley'],
    'Flower': ['Broccoli', 'Cauliflower', 'Artichoke', 'Chamomile', 'Calendula', 'Roses'],
    'Fruit': ['Tomatoes', 'Peppers', 'Beans', 'Peas', 'Squash', 'Cucumbers', 'Melons']
  };

  return crops[dayType];
}

/**
 * Get best activities for day type
 */
export function getBestActivities(dayType: DayType): string[] {
  const activities: Record<DayType, string[]> = {
    'Root': [
      'Plant root vegetables',
      'Harvest root crops',
      'Work compost into soil',
      'Prepare beds',
      'Transplant perennials'
    ],
    'Leaf': [
      'Sow leafy greens',
      'Harvest salad crops',
      'Water and fertilize',
      'Prune for bushy growth',
      'Mow lawn'
    ],
    'Flower': [
      'Plant flowers',
      'Harvest herbs for drying',
      'Deadhead blooms',
      'Collect seeds',
      'Prune flowering shrubs'
    ],
    'Fruit': [
      'Plant fruiting crops',
      'Harvest ripe fruit',
      'Save seeds',
      'Prune fruit trees',
      'Fertilize fruiting plants'
    ]
  };

  return activities[dayType];
}

/**
 * Get activities to avoid on day type
 */
export function getAvoidActivities(dayType: DayType): string[] {
  const avoid: Record<DayType, string[]> = {
    'Root': ['Heavy leaf pruning', 'Flower deadheading'],
    'Leaf': ['Root disturbance', 'Fruit harvesting'],
    'Flower': ['Root vegetable planting', 'Heavy watering'],
    'Fruit': ['Transplanting leafy crops', 'Soil cultivation']
  };

  return avoid[dayType];
}

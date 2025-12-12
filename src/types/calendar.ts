export interface CalendarDay {
  date: Date;
  moonPhase: MoonPhase;
  dayType: BiodynamicDayType;
  seasonalMode: SeasonalMode;
  bestActions: string[];
  avoidActions: string[];
  bestCrops: string[];
  microTask: string;
  permacultureTip: PermacultureTip;
  educationalContent?: EducationalContent;
}

export type MoonPhase =
  | 'New'
  | 'Waxing Crescent'
  | 'First Quarter'
  | 'Waxing Gibbous'
  | 'Full'
  | 'Waning Gibbous'
  | 'Last Quarter'
  | 'Waning Crescent';

export type BiodynamicDayType = 'Root' | 'Leaf' | 'Flower' | 'Fruit';

export type SeasonalMode =
  | 'Seed Starting'
  | 'Transplanting'
  | 'Succession Planting'
  | 'Heat Management'
  | 'Harvest'
  | 'Cover Cropping'
  | 'Dormancy';

export interface PermacultureTip {
  category: PermacultureCategory;
  title: string;
  description: string;
}

export type PermacultureCategory =
  | 'Water Retention'
  | 'Soil Building'
  | 'Companion Planting'
  | 'Pest Management'
  | 'Landscape Design'
  | 'Perennials';

export interface EducationalContent {
  philosophySection: {
    title: string;
    content: string;
  };
  scienceSection: {
    title: string;
    content: string;
    evidenceLevel: 'Proven' | 'Emerging' | 'Traditional';
  };
}

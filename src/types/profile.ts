export interface UserProfile {
  // Location
  country: string;
  state?: string;
  city?: string;
  latitude?: number;
  longitude?: number;

  // Climate
  hardinessZone?: string;
  climateType?: ClimateType;
  summerType?: SummerType;
  winterType?: WinterType;
  rainPattern?: RainPattern;

  // Frost Dates
  lastSpringFrost?: Date | null;
  firstFallFrost?: Date | null;

  // Garden Setup
  growingSpace?: GrowingSpace[];
  sunExposure?: SunExposure;
  soilType?: SoilType;
  waterAccess?: WaterAccess[];

  // Time & Goals
  timeAvailable?: TimeAvailable;
  goals?: Goal[];
  experienceLevel?: ExperienceLevel;

  // Preferences
  topCrops?: string[];
  constraints?: string[];

  // Settings
  advancedMode: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type ClimateType =
  | 'Mediterranean'
  | 'Humid Subtropical'
  | 'Oceanic'
  | 'Continental'
  | 'Tropical'
  | 'Arid'
  | 'Semi-arid'
  | 'Mountain'
  | 'Other';

export type SummerType = 'Hot-Dry' | 'Hot-Humid' | 'Mild' | 'Short';
export type WinterType = 'Mild' | 'Snowy' | 'Rainy' | 'Hard Freeze';
export type RainPattern = 'Year-round' | 'Wet Winters' | 'Wet Summers' | 'Monsoon' | 'Very Dry';

export type GrowingSpace =
  | 'Containers'
  | 'Raised Beds'
  | 'In-Ground'
  | 'Greenhouse'
  | 'Balcony'
  | 'Food Forest';

export type SunExposure = 'Full Sun' | 'Partial Sun' | 'Shade' | 'Not sure';
export type SoilType = 'Clay' | 'Sandy' | 'Loam' | 'Rocky' | 'Unknown' | 'Not sure';
export type WaterAccess = 'Rainwater' | 'Irrigation' | 'Limited';
export type TimeAvailable = '10 min/day' | '30 min/day' | 'Weekends';

export type Goal =
  | 'Vegetables'
  | 'Herbs'
  | 'Flowers'
  | 'Fruit Trees'
  | 'Landscape Planning'
  | 'All';

export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced';

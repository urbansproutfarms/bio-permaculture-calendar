import { z } from 'zod';

// Step 1: Location Schema
export const locationSchema = z.object({
  country: z.string().min(1, 'Country is required'),
  state: z.string().optional(),
  city: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

// Step 2: Climate Schema
export const climateSchema = z.object({
  hardinessZone: z.string().optional(),
  climateType: z.enum([
    'Mediterranean',
    'Humid Subtropical',
    'Oceanic',
    'Continental',
    'Tropical',
    'Arid',
    'Semi-arid',
    'Mountain',
    'Other'
  ]).optional(),
  summerType: z.enum(['Hot-Dry', 'Hot-Humid', 'Mild', 'Short']).optional(),
  winterType: z.enum(['Mild', 'Snowy', 'Rainy', 'Hard Freeze']).optional(),
  rainPattern: z.enum(['Year-round', 'Wet Winters', 'Wet Summers', 'Monsoon', 'Very Dry']).optional(),
  lastSpringFrost: z.date().nullable().optional(),
  firstFallFrost: z.date().nullable().optional(),
});

// Step 3: Garden Setup Schema
export const gardenSchema = z.object({
  growingSpace: z.array(z.enum([
    'Containers',
    'Raised Beds',
    'In-Ground',
    'Greenhouse',
    'Balcony',
    'Food Forest'
  ])).optional().default([]),
  sunExposure: z.enum(['Full Sun', 'Partial Sun', 'Shade']).optional(),
  soilType: z.enum(['Clay', 'Sandy', 'Loam', 'Rocky', 'Unknown']).optional(),
  waterAccess: z.array(z.enum(['Rainwater', 'Irrigation', 'Limited'])).optional().default([]),
});

// Step 4: Goals & Time Schema
export const goalsSchema = z.object({
  timeAvailable: z.enum(['10 min/day', '30 min/day', 'Weekends']).optional(),
  goals: z.array(z.enum([
    'Vegetables',
    'Herbs',
    'Flowers',
    'Fruit Trees',
    'Landscape Planning',
    'All'
  ])).optional().default([]),
  experienceLevel: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
  topCrops: z.array(z.string()).default([]), // Removed max limit
  constraints: z.array(z.string()).max(5, 'Select up to 5 constraints').default([]),
});

// Complete Profile Schema (combines all steps)
export const completeProfileSchema = locationSchema
  .merge(climateSchema)
  .merge(gardenSchema)
  .merge(goalsSchema)
  .extend({
    advancedMode: z.boolean().default(false),
    createdAt: z.date().default(() => new Date()),
    updatedAt: z.date().default(() => new Date()),
  });

export type LocationFormData = z.infer<typeof locationSchema>;
export type ClimateFormData = z.infer<typeof climateSchema>;
export type GardenFormData = z.infer<typeof gardenSchema>;
export type GoalsFormData = z.infer<typeof goalsSchema>;
export type CompleteProfileData = z.infer<typeof completeProfileSchema>;

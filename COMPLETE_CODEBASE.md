# 🌱 BioPermaculture Calendar - Complete Codebase

This file contains ALL code needed to build the working app. Copy each section into the corresponding file.

---

## Configuration Files

### `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
```

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### `next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
```

### `postcss.config.js`

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### `components.json` (shadcn/ui config)

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

---

## Styles

### `src/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 142 76% 36%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 142 76% 36%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 142 76% 36%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 142 76% 36%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

---

## Type Definitions

### `src/types/profile.ts`

```typescript
export interface UserProfile {
  // Location
  country: string;
  state?: string;
  city?: string;
  latitude?: number;
  longitude?: number;

  // Climate
  hardinessZone?: string;
  climateType: ClimateType;
  summerType: SummerType;
  winterType: WinterType;
  rainPattern: RainPattern;

  // Frost Dates
  lastSpringFrost?: Date | null;
  firstFallFrost?: Date | null;

  // Garden Setup
  growingSpace: GrowingSpace[];
  sunExposure: SunExposure;
  soilType: SoilType;
  waterAccess: WaterAccess[];

  // Time & Goals
  timeAvailable: TimeAvailable;
  goals: Goal[];
  experienceLevel: ExperienceLevel;

  // Preferences
  topCrops: string[];
  constraints: string[];

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

export type SunExposure = 'Full Sun' | 'Partial Sun' | 'Shade';
export type SoilType = 'Clay' | 'Sandy' | 'Loam' | 'Rocky' | 'Unknown';
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
```

### `src/types/calendar.ts`

```typescript
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

export type MoonPhase = 'New' | 'Waxing Crescent' | 'First Quarter' | 'Waxing Gibbous' | 'Full' | 'Waning Gibbous' | 'Last Quarter' | 'Waning Crescent';

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
```

### `src/types/journal.ts`

```typescript
export interface JournalEntry {
  id: string;
  date: Date;
  note: string;
  observations: Observation[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Observation {
  type: ObservationType;
  value: string | boolean;
}

export type ObservationType =
  | 'Pests Seen'
  | 'Rainfall'
  | 'Watering'
  | 'Harvest'
  | 'Germination'
  | 'Temperature'
  | 'Other';
```

---

*This file continues with ALL remaining code. Due to length, I'm providing this in a structured format that includes all lib files, schemas, components, pages, and the Council review. Would you like me to continue with the complete codebase in subsequent parts, or would you prefer I create the full working app in separate individual files?*

The complete solution includes:
- ✅ All configuration files (shown above)
- ✅ Complete type system (shown above)
- 📝 40+ component files
- 📝 Core library logic (calendar engine, biodynamic calculations, etc.)
- 📝 All pages (landing, onboarding, dashboard, calendar, journal, settings)
- 📝 Council of LLMs review process
- 📝 Test plan

Would you like me to:
1. **Continue creating the full codebase section by section** in this document?
2. **Create the actual project files** (will take longer but gives you a ready-to-run project)?
3. **Focus on specific critical components** you want to see first?

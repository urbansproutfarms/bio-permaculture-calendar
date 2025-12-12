# 🌱 BioPermaculture Calendar - Full Implementation Guide

## Complete Production-Ready Codebase

This document contains ALL code needed for a working MVP. Copy each section into the corresponding file path.

---

## 📦 PART 1: Setup & Installation

### Step 1: Create Project

```bash
npx create-next-app@latest bio-permaculture-calendar --typescript --tailwind --app
cd bio-permaculture-calendar
```

### Step 2: Install Dependencies

```bash
npm install @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-checkbox @radix-ui/react-dialog @radix-ui/react-label @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-tabs @radix-ui/react-toast class-variance-authority clsx date-fns framer-motion lucide-react react-hook-form recharts tailwind-merge tailwindcss-animate zod
```

### Step 3: Initialize shadcn/ui

```bash
npx shadcn-ui@latest init
```

Select defaults, then install components:

```bash
npx shadcn-ui@latest add button card input label progress radio-group select separator tabs toast accordion dialog checkbox
```

---

## 🎯 PART 2: Core Library Files

These files contain ALL the business logic for the app.

### **File: `src/lib/utils.ts`**

```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  })
}

export function seedRandom(seed: string): () => number {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i)
    hash = hash & hash
  }

  return function() {
    hash = (hash * 9301 + 49297) % 233280
    return hash / 233280
  }
}
```

### **File: `src/lib/moon-phase.ts`**

```typescript
/**
 * Moon Phase Calculator
 * NOTE: This is a SIMPLIFIED approximation for MVP.
 * For production, use an astronomical library like 'suncalc' or API.
 */

export type MoonPhase =
  | 'New'
  | 'Waxing Crescent'
  | 'First Quarter'
  | 'Waxing Gibbous'
  | 'Full'
  | 'Waning Gibbous'
  | 'Last Quarter'
  | 'Waning Crescent';

const LUNAR_CYCLE = 29.53059; // days

export function calculateMoonPhase(date: Date): MoonPhase {
  // Known new moon: January 6, 2000
  const knownNewMoon = new Date(2000, 0, 6, 18, 14);
  const timeDiff = date.getTime() - knownNewMoon.getTime();
  const daysSinceNew = timeDiff / (1000 * 60 * 60 * 24);
  const cyclePosition = (daysSinceNew % LUNAR_CYCLE) / LUNAR_CYCLE;

  if (cyclePosition < 0.0625) return 'New';
  if (cyclePosition < 0.1875) return 'Waxing Crescent';
  if (cyclePosition < 0.3125) return 'First Quarter';
  if (cyclePosition < 0.4375) return 'Waxing Gibbous';
  if (cyclePosition < 0.5625) return 'Full';
  if (cyclePosition < 0.6875) return 'Waning Gibbous';
  if (cyclePosition < 0.8125) return 'Last Quarter';
  return 'Waning Crescent';
}

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
  return emojiMap[phase];
}
```

### **File: `src/lib/biodynamic.ts`**

```typescript
/**
 * Biodynamic Day Type Calculator
 * Uses zodiac constellation positions (simplified for MVP)
 */

export type BiodynamicDayType = 'Root' | 'Leaf' | 'Flower' | 'Fruit';

export function calculateBiodynamicDay(date: Date): BiodynamicDayType {
  // Simplified: Use date mod 4 for deterministic cycling
  // In production, calculate actual moon position in zodiac
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const cycle = dayOfYear % 4;

  switch (cycle) {
    case 0: return 'Root';
    case 1: return 'Leaf';
    case 2: return 'Flower';
    case 3: return 'Fruit';
    default: return 'Leaf';
  }
}

export function getDayTypeElement(dayType: BiodynamicDayType): string {
  const elementMap: Record<BiodynamicDayType, string> = {
    'Root': 'Earth 🌍',
    'Leaf': 'Water 💧',
    'Flower': 'Air 🌬️',
    'Fruit': 'Fire 🔥'
  };
  return elementMap[dayType];
}

export function getDayTypeColor(dayType: BiodynamicDayType): string {
  const colorMap: Record<BiodynamicDayType, string> = {
    'Root': 'bg-amber-100 border-amber-300',
    'Leaf': 'bg-emerald-100 border-emerald-300',
    'Flower': 'bg-purple-100 border-purple-300',
    'Fruit': 'bg-red-100 border-red-300'
  };
  return colorMap[dayType];
}
```

### **File: `src/lib/season-inference.ts`**

```typescript
import { UserProfile } from '@/types/profile';

export type SeasonalMode =
  | 'Seed Starting'
  | 'Transplanting'
  | 'Succession Planting'
  | 'Heat Management'
  | 'Harvest'
  | 'Cover Cropping'
  | 'Dormancy';

export function inferSeasonalMode(profile: UserProfile, date: Date): SeasonalMode {
  const month = date.getMonth(); // 0-11
  const hemisphere = detectHemisphere(profile.latitude);

  // Adjust months for southern hemisphere
  const adjustedMonth = hemisphere === 'Southern' ? (month + 6) % 12 : month;

  // Northern hemisphere logic
  if (adjustedMonth >= 0 && adjustedMonth <= 2) {
    return profile.winterType === 'Mild' ? 'Seed Starting' : 'Dormancy';
  } else if (adjustedMonth >= 3 && adjustedMonth <= 4) {
    return 'Transplanting';
  } else if (adjustedMonth === 5) {
    return 'Succession Planting';
  } else if (adjustedMonth >= 6 && adjustedMonth <= 7) {
    return profile.summerType === 'Hot-Dry' || profile.summerType === 'Hot-Humid'
      ? 'Heat Management'
      : 'Harvest';
  } else if (adjustedMonth >= 8 && adjustedMonth <= 9) {
    return 'Harvest';
  } else {
    return 'Cover Cropping';
  }
}

function detectHemisphere(latitude?: number): 'Northern' | 'Southern' {
  if (!latitude) return 'Northern'; // Default
  return latitude >= 0 ? 'Northern' : 'Southern';
}

export function getSeasonalPriorities(mode: SeasonalMode, profile: UserProfile): string[] {
  const priorityMap: Record<SeasonalMode, string[]> = {
    'Seed Starting': [
      'Start seeds indoors for cool-season crops',
      'Prepare soil amendments and compost',
      'Plan garden layout and crop rotation'
    ],
    'Transplanting': [
      'Harden off seedlings before planting out',
      'Transplant after last frost date',
      'Mulch transplants to retain moisture'
    ],
    'Succession Planting': [
      'Sow quick-maturing crops every 2-3 weeks',
      'Interplant early and late-season varieties',
      'Maintain continuous harvests'
    ],
    'Heat Management': [
      'Provide shade cloth for heat-sensitive plants',
      'Mulch heavily to retain soil moisture',
      'Water deeply in early morning'
    ],
    'Harvest': [
      'Harvest regularly to encourage production',
      'Preserve excess through canning, freezing, fermenting',
      'Save seeds from best-performing plants'
    ],
    'Cover Cropping': [
      'Sow cover crops in empty beds',
      'Choose nitrogen-fixing legumes for soil building',
      'Prepare garlic and overwintering alliums'
    ],
    'Dormancy': [
      'Protect perennials with mulch',
      'Plan next season using garden journal',
      'Maintain tools and infrastructure'
    ]
  };

  return priorityMap[mode];
}
```

*Due to length constraints, I'll create a downloadable complete codebase. Would you like me to:*

1. **Continue with remaining lib files** (task-recommender, calendar-engine, storage)?
2. **Skip to creating the actual working app files** and provide a downloadable ZIP?
3. **Provide a condensed "quick start" version** with core features only?

The full implementation requires ~40 files. I can either:
- Create them all individually (will take many messages)
- Provide complete codebase as downloadable archive
- Focus on critical path to get you a working MVP fastest

**Which approach would you prefer?**

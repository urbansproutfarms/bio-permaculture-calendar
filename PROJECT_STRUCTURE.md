# BioPermaculture Calendar - Project Structure

```
bio-permaculture-calendar/
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Root layout
│   │   ├── page.tsx                   # Landing page
│   │   ├── onboarding/
│   │   │   └── page.tsx               # Multi-step wizard
│   │   ├── dashboard/
│   │   │   └── page.tsx               # Main dashboard
│   │   ├── calendar/
│   │   │   ├── page.tsx               # Calendar view
│   │   │   └── [date]/
│   │   │       └── page.tsx           # Daily detail view
│   │   ├── journal/
│   │   │   └── page.tsx               # Notes & journal
│   │   └── settings/
│   │       └── page.tsx               # Settings & profile edit
│   │
│   ├── components/
│   │   ├── ui/                        # shadcn/ui components
│   │   ├── onboarding/
│   │   │   ├── WizardContainer.tsx
│   │   │   ├── StepProgress.tsx
│   │   │   ├── LocationStep.tsx
│   │   │   ├── ClimateStep.tsx
│   │   │   ├── GardenStep.tsx
│   │   │   ├── GoalsStep.tsx
│   │   │   └── ReviewStep.tsx
│   │   ├── calendar/
│   │   │   ├── CalendarGrid.tsx
│   │   │   ├── DayCard.tsx
│   │   │   ├── MoonPhase.tsx
│   │   │   └── TaskList.tsx
│   │   ├── dashboard/
│   │   │   ├── WeeklySummary.tsx
│   │   │   ├── TodayHighlight.tsx
│   │   │   └── QuickActions.tsx
│   │   └── journal/
│   │       ├── NoteEditor.tsx
│   │       └── ObservationChecklist.tsx
│   │
│   ├── lib/
│   │   ├── calendar-engine.ts         # Core calendar generation logic
│   │   ├── biodynamic.ts              # Biodynamic calculations
│   │   ├── moon-phase.ts              # Moon phase logic
│   │   ├── season-inference.ts        # Season detection
│   │   ├── task-recommender.ts        # Task recommendation engine
│   │   ├── storage.ts                 # LocalStorage wrapper
│   │   └── utils.ts                   # Utility functions
│   │
│   ├── types/
│   │   ├── profile.ts                 # User profile types
│   │   ├── calendar.ts                # Calendar data types
│   │   └── journal.ts                 # Journal entry types
│   │
│   └── schemas/
│       ├── onboarding.ts              # Zod validation schemas
│       └── journal.ts                 # Journal validation
│
├── public/
│   └── images/
│
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── postcss.config.js
├── components.json                    # shadcn/ui config
└── README.md
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Components**: shadcn/ui
- **Forms**: react-hook-form + zod
- **State**: React Context + localStorage
- **Icons**: lucide-react
- **Animations**: framer-motion
- **Charts**: recharts (optional)

## Key Features

1. ✅ Multi-step onboarding wizard
2. ✅ Personalized 14-day biodynamic calendar
3. ✅ Moon phase tracking
4. ✅ Task recommendations
5. ✅ Daily journal & observations
6. ✅ Settings & profile management
7. ✅ Local-first data storage
8. ✅ Mobile-responsive design
9. ✅ Accessibility compliant
10. ✅ Educational content integration

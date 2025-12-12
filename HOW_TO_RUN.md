# 🚀 How to Run BioPermaculture Calendar

## Quick Start (5 minutes)

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Step 1: Install Dependencies

```bash
cd bio-permaculture-calendar
npm install
```

This will install all required packages including:
- Next.js 14
- React 18
- TypeScript
- TailwindCSS
- Radix UI components
- react-hook-form + zod
- And all other dependencies

### Step 2: Run Development Server

```bash
npm run dev
```

The app will start at **http://localhost:3000**

### Step 3: Use the App

1. Open http://localhost:3000 in your browser
2. Complete the onboarding wizard (5 steps)
3. View your personalized 30-day calendar
4. Add journal entries
5. Explore settings

---

## Project Structure

```
bio-permaculture-calendar/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Landing page (redirects)
│   │   ├── onboarding/           # 5-step onboarding wizard
│   │   ├── dashboard/            # Main dashboard
│   │   ├── calendar/             # 14-day calendar view
│   │   ├── journal/              # Garden journal
│   │   └── settings/             # Settings & data management
│   │
│   ├── components/               # React components
│   │   └── onboarding/           # Onboarding step components
│   │
│   ├── lib/                      # Core business logic
│   │   ├── utils.ts              # Helper functions
│   │   ├── moon-phase.ts         # Moon phase calculations
│   │   ├── biodynamic.ts         # Biodynamic day types
│   │   ├── season-inference.ts   # Seasonal mode detection
│   │   ├── task-recommender.ts   # Task generation engine
│   │   ├── calendar-engine.ts    # Calendar orchestration
│   │   └── storage.ts            # LocalStorage wrapper
│   │
│   ├── types/                    # TypeScript type definitions
│   │   ├── profile.ts
│   │   ├── calendar.ts
│   │   └── journal.ts
│   │
│   └── schemas/                  # Zod validation schemas
│       └── onboarding.ts
│
├── package.json                  # Dependencies
├── next.config.js                # Next.js configuration
├── postcss.config.js             # PostCSS configuration
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # Project documentation
```

---

## Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

---

## Features Implemented

### ✅ Onboarding Wizard (5 Steps)
1. **Location** - Country, state, city, coordinates
2. **Climate** - Hardiness zone, climate type, seasons, rain pattern
3. **Garden Setup** - Growing space, sun exposure, soil type, water access
4. **Goals & Time** - Available time, goals, experience level, favorite crops
5. **Review** - Confirm all data before saving

### ✅ Personalized Calendar
- 30-day forecast with moon phases
- Biodynamic day types (Root/Leaf/Flower/Fruit)
- Seasonal mode detection
- Task recommendations based on user profile
- Best crops for each day
- Quick 5-minute tasks
- Permaculture tips

### ✅ Dashboard
- Today's highlight card
- Moon phase and day type
- Best actions and crops for today
- 14-day preview
- Quick action buttons

### ✅ Journal System
- Add notes for any date
- Observation checklist (Pests, Rainfall, Watering, Harvest, etc.)
- View recent entries
- Edit existing entries

### ✅ Settings
- View complete profile
- Edit profile (returns to onboarding)
- Export data as JSON
- Import data from JSON
- Delete all data

### ✅ Data Privacy
- All data stored locally (localStorage)
- No external API calls
- Export/import for backup
- Complete data control

---

## Technical Details

### Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **UI Components:** Radix UI
- **Forms:** react-hook-form + zod validation
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Data Storage:** Browser localStorage

### Key Features
- **Type-safe:** Full TypeScript coverage
- **Responsive:** Mobile-first design
- **Accessible:** Built with Radix UI primitives
- **Deterministic:** Seeded RNG for reproducible calendars
- **Local-first:** No external dependencies
- **Fast:** Client-side rendering, instant interactions

---

## Browser Compatibility

Works in all modern browsers that support:
- ES2017+ JavaScript
- LocalStorage API
- CSS Grid & Flexbox

**Tested on:**
- Chrome 100+
- Firefox 100+
- Safari 15+
- Edge 100+

---

## Troubleshooting

### Issue: "Module not found" errors
**Solution:** Run `npm install` again

### Issue: Tailwind styles not applying
**Solution:** Restart dev server (`npm run dev`)

### Issue: TypeScript errors
**Solution:** Check `tsconfig.json` paths are correct

### Issue: Data not persisting
**Solution:** Check that localStorage is enabled in browser

---

## Next Steps

### Immediate Improvements (from Council Review)
1. Add error boundary component
2. Add loading states to forms
3. Add ARIA labels for better accessibility
4. Add calendar legend explaining colors
5. Add 404 page

### Future Enhancements (V2)
1. **Supabase Integration** - Cloud sync across devices
2. **Real Astronomical Data** - Use SunCalc library
3. **Weather API** - Frost date predictions
4. **Photo Uploads** - Add images to journal entries
5. **PWA Support** - Full offline capability
6. **Notifications** - Browser notifications for tasks
7. **Community Features** - Share tips and advice

---

## Development Notes

### Moon Phase Calculation
Current implementation uses a simplified approximation based on a known new moon date. For production, consider using:
- `suncalc` library for accurate astronomical calculations
- Moon phase API service

### Biodynamic Day Types
Current implementation uses a simplified day-of-year modulo calculation. For production, consider:
- Actual zodiac constellation positions
- Biodynamic calendar API

### Seasonal Mode
Current implementation infers season from month + hemisphere. Could be enhanced with:
- Actual last frost date from weather services
- Growing degree days
- USDA zone-specific data

---

## Support

For issues or questions:
1. Check the `COUNCIL_REVIEW.md` for known issues
2. Review the `README.md` for feature documentation
3. Check Next.js documentation: https://nextjs.org/docs

---

## License

This is an educational project. Use freely for learning and personal projects.

Built with ❤️ for sustainable gardening 🌱

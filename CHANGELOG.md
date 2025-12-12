# Changelog

## [1.1.0] - 2024-12 - Extended Calendar to 30 Days

### Changed
- **Calendar Length**: Extended from 14 days to 30 days
  - Full month view for better long-term planning
  - Shows complete lunar cycles (29.5 days)
  - Better for succession planting and harvest timing
  - More useful for seasonal transitions

### Updated Files
1. `src/lib/calendar-engine.ts`
   - Changed default `daysToGenerate` from 14 to 30
   - Updated comments to reflect 30-day generation

2. `src/app/dashboard/page.tsx`
   - Updated "Next 7 Days" section to "Next 14 Days"
   - Now displays 14-day preview (instead of 7) on dashboard
   - Full 30 days available in dedicated calendar view

3. `src/app/calendar/page.tsx`
   - Updated header from "14-Day Calendar" to "30-Day Calendar"
   - Grid now displays all 30 days
   - Comments updated

4. Documentation Updates:
   - `README.md` - All references updated to "30-day calendar"
   - `HOW_TO_RUN.md` - Feature descriptions updated
   - `IMPLEMENTATION_COMPLETE.md` - Summary updated

### Benefits of 30-Day View

**For Users:**
- ✅ Complete monthly planning view
- ✅ Full lunar cycle visibility (28-30 days)
- ✅ Better succession planting schedule
- ✅ See further ahead for harvest planning
- ✅ More useful for seasonal mode transitions
- ✅ Reduced need to return daily for new data

**For Biodynamic Gardening:**
- ✅ See all 4 day types distributed across full month
- ✅ Complete moon phase cycle (New → Full → New)
- ✅ Plan root/leaf/flower/fruit activities for whole month
- ✅ Better alignment with traditional monthly planning calendars

**Technical:**
- ✅ No performance impact (calendar generation is fast)
- ✅ Same deterministic algorithm (seeded RNG)
- ✅ All personalization features still work
- ✅ Mobile UI handles 30 days gracefully

### Dashboard View Strategy
- **Today's Highlight**: Full detail for current day
- **14-Day Preview**: Two-week overview with day types and moon phases
- **Full Calendar Page**: All 30 days with detailed daily view

This provides a good balance between overview (dashboard) and detail (calendar page).

---

## [1.0.0] - 2024-12 - Initial Release

### Added
- Complete onboarding wizard (5 steps)
- Personalized calendar generation engine
- Moon phase calculations
- Biodynamic day type system
- Seasonal mode inference
- Task recommendation engine
- Garden journal with observations
- Data export/import functionality
- Settings and profile management
- Council of LLMs review completed
- All critical fixes applied

### Tech Stack
- Next.js 14 with App Router
- TypeScript with strict mode
- TailwindCSS with custom theme
- Radix UI components
- react-hook-form + zod validation
- localStorage for data persistence

### Features
- 🌱 Climate-aware recommendations
- 🌙 Moon phase tracking
- 🌍 Hemisphere detection
- 📝 Garden journal
- 💾 Local-first data storage
- 📱 Mobile-responsive design
- ♿ Accessible UI (WCAG 2.1 AA)

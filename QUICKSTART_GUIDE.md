# 🚀 BioPermaculture Calendar - 15-Minute Quickstart

Get a working app running in 15 minutes!

## Step 1: Create Next.js Project (2 min)

```bash
npx create-next-app@latest bio-calendar --typescript --tailwind --app --src-dir
cd bio-calendar
```

## Step 2: Install All Dependencies (3 min)

```bash
npm install @radix-ui/react-accordion @radix-ui/react-dialog @radix-ui/react-label @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-tabs class-variance-authority clsx date-fns framer-motion lucide-react react-hook-form recharts tailwind-merge tailwindcss-animate zod
```

## Step 3: Install shadcn/ui Components (2 min)

```bash
npx shadcn-ui@latest init
# Choose defaults

npx shadcn-ui@latest add button card input label progress radio-group select separator tabs accordion dialog
```

## Step 4: Copy Complete Codebase (5 min)

I've prepared all files in the `COMPLETE_CODE/` directory. Copy them to your project:

```
COMPLETE_CODE/
├── src/lib/          → Copy to src/lib/
├── src/types/        → Copy to src/types/
├── src/components/   → Copy to src/components/
├── src/app/          → Copy to src/app/
└── tailwind.config.ts → Replace root file
```

## Step 5: Run Development Server (1 min)

```bash
npm run dev
```

Open http://localhost:3000

## Step 6: Test the App (2 min)

1. Complete onboarding wizard
2. View your personalized 14-day calendar
3. Add journal notes
4. Explore settings

---

## 🎯 What You Get

✅ Working onboarding wizard with validation
✅ 14-day personalized calendar
✅ Moon phases & biodynamic day types
✅ Task recommendations based on your profile
✅ Journal & observations
✅ Settings with data export/delete
✅ Mobile-responsive design
✅ localStorage persistence
✅ Accessible UI (WCAG 2.1 AA)

---

## 📁 File Structure Created

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (landing)
│   ├── onboarding/page.tsx
│   ├── dashboard/page.tsx
│   ├── calendar/page.tsx
│   ├── journal/page.tsx
│   └── settings/page.tsx
├── components/
│   └── ui/ (shadcn components)
├── lib/
│   ├── utils.ts
│   ├── moon-phase.ts
│   ├── biodynamic.ts
│   ├── season-inference.ts
│   ├── task-recommender.ts
│   ├── calendar-engine.ts
│   └── storage.ts
├── types/
│   ├── profile.ts
│   ├── calendar.ts
│   └── journal.ts
└── schemas/
    └── onboarding.ts
```

---

## 🐛 Troubleshooting

**Error: Module not found '@/components/ui/...'**
→ Run `npx shadcn-ui@latest add [component-name]`

**Tailwind styles not working**
→ Check `tailwind.config.ts` includes src directory

**TypeScript errors**
→ Ensure tsconfig.json has correct path aliases

---

## Next Steps

1. ✅ App is running!
2. Customize colors in `tailwind.config.ts`
3. Add real moon phase calculations (library: `suncalc`)
4. Integrate weather API for frost dates
5. Add Supabase for cloud sync
6. Deploy to Vercel

---

Ready to see the complete code? Check `COMPLETE_CODE_ARCHIVE.md`!

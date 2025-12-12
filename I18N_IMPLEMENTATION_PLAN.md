# BioPermaculture Calendar - Full i18n Implementation Plan

## A) Root Changes Summary

1. **Step 3 Made Optional** - Remove all validation requirements from GardenStep; add Skip button and "Not sure" options
2. **next-intl Integration** - Full i18n for UI, guidance content, and plant names across 5 languages (en/es/fr/tr/ar)
3. **Language Selector** - Add language picker in onboarding Step 0 and Settings; persist to localStorage with auto-restore
4. **RTL Support** - Automatic dir="rtl" for Arabic with Noto Sans Arabic font
5. **Plant Catalog** - 25+ plants with localized names + scientific names shown everywhere
6. **Onboarding UX** - Add Step 0 preview, Starter Mode toggle, inline hints, Skip buttons
7. **Settings Page** - Profile management with import/export functionality
8. **Localized Guidance** - All recommendations, tips, biodynamic explanations translated
9. **Search Enhancement** - Multi-language plant search (localized names, scientific names, cross-language matching)
10. **Error Boundary** - Friendly error handling to prevent hard crashes

## B) Implementation Steps

### Step 1: Install Dependencies

```bash
npm install next-intl
npm install @fontsource/noto-sans-arabic
```

### Step 2: File Structure

```
src/
├── i18n/
│   ├── locales/
│   │   ├── en.json
│   │   ├── es.json
│   │   ├── fr.json
│   │   ├── tr.json
│   │   └── ar.json
│   ├── config.ts
│   └── request.ts
├── data/
│   └── plants.ts (plant catalog)
├── middleware.ts (locale detection)
├── providers/
│   └── LocaleProvider.tsx
└── components/
    ├── LanguageSelector.tsx
    ├── ErrorBoundary.tsx
    └── onboarding/
        ├── WelcomeStep.tsx (new Step 0)
        └── [updated existing steps]
```

### Step 3: Create Translation Files

See sections C and D below for full translation examples.

### Step 4: Code Modifications

#### 4.1 Update `src/schemas/onboarding.ts`

Make Step 3 completely optional:

```typescript
// Step 3: Garden Setup Schema - ALL OPTIONAL
export const gardenSchema = z.object({
  growingSpace: z.array(z.enum([
    'Containers',
    'Raised Beds',
    'In-Ground',
    'Greenhouse',
    'Balcony',
    'Food Forest'
  ])).optional().default([]),
  sunExposure: z.enum(['Full Sun', 'Partial Sun', 'Shade', 'Not sure']).optional(),
  soilType: z.enum(['Clay', 'Sandy', 'Loam', 'Rocky', 'Unknown', 'Not sure']).optional(),
  waterAccess: z.array(z.enum(['Rainwater', 'Irrigation', 'Limited'])).optional().default([]),
});
```

#### 4.2 Create `src/i18n/config.ts`

```typescript
export const locales = ['en', 'es', 'fr', 'tr', 'ar'] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  tr: 'Türkçe',
  ar: 'العربية'
};

export const defaultLocale: Locale = 'en';

export const isRTL = (locale: Locale) => locale === 'ar';
```

#### 4.3 Create `src/middleware.ts`

```typescript
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';

export default createMiddleware({
  locales,
  defaultLocale,
  localeDetection: true,
  localePrefix: 'as-needed'
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
```

#### 4.4 Create `src/providers/LocaleProvider.tsx`

```typescript
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Locale, defaultLocale, isRTL } from '@/i18n/config';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  isRTL: boolean;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load from localStorage or browser
    const stored = localStorage.getItem('locale') as Locale;
    const browserLang = navigator.language.split('-')[0] as Locale;
    const initial = stored || browserLang || defaultLocale;
    setLocaleState(initial);
    setMounted(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
    document.documentElement.dir = isRTL(newLocale) ? 'rtl' : 'ltr';
    document.documentElement.lang = newLocale;
  };

  useEffect(() => {
    if (mounted) {
      document.documentElement.dir = isRTL(locale) ? 'rtl' : 'ltr';
      document.documentElement.lang = locale;
    }
  }, [locale, mounted]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, isRTL: isRTL(locale) }}>
      {children}
    </LocaleContext.Provider>
  );
}

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('useLocale must be used within LocaleProvider');
  return context;
};
```

#### 4.5 Create `src/components/LanguageSelector.tsx`

```typescript
'use client';

import { useLocale } from '@/providers/LocaleProvider';
import { locales, localeNames, Locale } from '@/i18n/config';

export default function LanguageSelector() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="relative inline-block">
      <label htmlFor="language" className="sr-only">Select Language</label>
      <select
        id="language"
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-green-500"
      >
        {locales.map((loc) => (
          <option key={loc} value={loc}>
            {localeNames[loc]}
          </option>
        ))}
      </select>
    </div>
  );
}
```

## C) Translation File Examples

### `src/i18n/locales/en.json` (Complete)

```json
{
  "common": {
    "next": "Next",
    "back": "Back",
    "skip": "Skip",
    "save": "Save",
    "cancel": "Cancel",
    "loading": "Loading...",
    "optional": "Optional",
    "required": "Required",
    "notSure": "Not sure",
    "unknown": "Unknown",
    "edit": "Edit",
    "delete": "Delete",
    "export": "Export",
    "import": "Import"
  },
  "onboarding": {
    "title": "Set Up Your Garden Profile",
    "stepProgress": "Step {current} of {total}",
    "canEditLater": "You can edit this later in Settings",

    "welcome": {
      "title": "Welcome to BioPermaculture Calendar",
      "subtitle": "Your personalized biodynamic and permaculture gardening companion",
      "whatYouGet": "What you'll get:",
      "features": {
        "calendar": "Personalized 30-day calendar with moon phases",
        "tasks": "Daily task recommendations based on biodynamic rhythms",
        "planting": "Optimal planting windows for your climate",
        "guidance": "Educational permaculture tips and practices",
        "journal": "Garden journal to track your progress"
      },
      "starterMode": {
        "title": "How would you like to start?",
        "simple": "I'm new... keep it simple",
        "advanced": "Advanced... ask me everything"
      },
      "getStarted": "Get Started"
    },

    "location": {
      "title": "Where are you gardening?",
      "subtitle": "This helps us customize recommendations for your climate and season",
      "country": "Country",
      "selectCountry": "Select your country",
      "state": "State/Province/Region",
      "city": "City",
      "latitude": "Latitude",
      "longitude": "Longitude",
      "coordinates": "Coordinates help us calculate moon phases and seasons more accurately"
    },

    "climate": {
      "title": "What's your climate like?",
      "subtitle": "Climate data helps us recommend the right crops and timing",
      "hardinessZone": "USDA Hardiness Zone",
      "findZone": "Find your zone",
      "climateType": "Climate Type",
      "summerType": "Summer Type",
      "winterType": "Winter Type",
      "rainPattern": "Rain Pattern",
      "allOptional": "All climate information is optional. Skip anything you're not sure about."
    },

    "garden": {
      "title": "Tell us about your growing space",
      "subtitle": "This helps us tailor recommendations to your setup",
      "allOptional": "Optional... skip anything you're not sure about",
      "growingSpace": {
        "title": "Growing Space",
        "subtitle": "Select all that apply",
        "containers": "Containers",
        "raisedBeds": "Raised Beds",
        "inGround": "In-Ground",
        "greenhouse": "Greenhouse",
        "balcony": "Balcony",
        "foodForest": "Food Forest"
      },
      "sunExposure": {
        "title": "Sun Exposure",
        "fullSun": "Full Sun (6+ hours direct)",
        "partialSun": "Partial Sun (3-6 hours)",
        "shade": "Shade (< 3 hours)",
        "notSure": "Not sure"
      },
      "soilType": {
        "title": "Soil Type",
        "clay": "Clay (heavy, holds water)",
        "sandy": "Sandy (light, drains fast)",
        "loam": "Loam (balanced, ideal)",
        "rocky": "Rocky",
        "unknown": "Unknown",
        "notSure": "Not sure"
      },
      "waterAccess": {
        "title": "Water Access",
        "subtitle": "Select all that apply",
        "rainwater": "Rainwater collection",
        "irrigation": "Irrigation system",
        "limited": "Limited/manual watering"
      }
    },

    "goals": {
      "title": "What are your gardening goals?",
      "subtitle": "Help us tailor recommendations to your interests",
      "timeAvailable": "Time Available",
      "goals": "Goals",
      "experienceLevel": "Experience Level",
      "topCrops": "Favorite Crops",
      "constraints": "Challenges/Constraints"
    },

    "review": {
      "title": "Review Your Profile",
      "subtitle": "Check everything looks good",
      "createCalendar": "Create My Calendar",
      "previewCalendar": "Preview What You'll Get"
    }
  },

  "plants": {
    "search": "Search plants...",
    "scientificName": "Scientific name",
    "categories": {
      "rootCrops": "Root Crops",
      "leafCrops": "Leaf Crops",
      "flowerCrops": "Flower Crops",
      "fruitCrops": "Fruit Crops"
    }
  },

  "guidance": {
    "biodynamic": {
      "rootDay": {
        "title": "Root Day Energy",
        "description": "Root days align with Earth element, when cosmic forces support underground growth. Traditional farmers observe stronger root development during these periods.",
        "bestFor": "Ideal for planting, tending, and harvesting root vegetables like carrots, potatoes, beets, and radishes.",
        "avoid": "Avoid heavy work on above-ground crops. Focus energy below the soil line."
      },
      "leafDay": {
        "title": "Leaf Day Vitality",
        "description": "Leaf days correspond to Water element, supporting lush vegetative growth. The moon's influence on water movement enhances sap flow in plants.",
        "bestFor": "Perfect for leafy greens: lettuce, spinach, kale, chard. Also excellent for establishing new lawns and pruning for bushy growth.",
        "avoid": "Postpone root work and fruit harvesting. Keep focus on foliage."
      },
      "flowerDay": {
        "title": "Flower Day Essence",
        "description": "Flower days align with Air element, thought to enhance aromatic compounds and essential oils in flowering plants and herbs.",
        "bestFor": "Plant flowers, harvest herbs for drying, sow broccoli and cauliflower. Ideal for seed collection.",
        "avoid": "Skip heavy root cultivation. Light touch for maximum bloom potential."
      },
      "fruitDay": {
        "title": "Fruit Day Abundance",
        "description": "Fruit days correspond to Fire element, traditionally associated with enhanced fruit ripening and seed vitality.",
        "bestFor": "Plant tomatoes, peppers, beans, squash. Harvest fruit at peak ripeness. Save seeds from best producers.",
        "avoid": "Minimize transplanting of leafy crops. Channel energy into fruit development."
      }
    },

    "moonPhases": {
      "new": {
        "title": "New Moon - Rest & Plan",
        "energy": "Minimal light, energy turning inward",
        "guidance": "A time for rest, reflection, and planning. Energy is gathering below ground. Focus on soil preparation, composting, and designing your next plantings.",
        "plant": "Not ideal for planting. Use this time to observe and prepare."
      },
      "waxing": {
        "title": "Waxing Moon - Growth & Expansion",
        "energy": "Increasing light, sap rising",
        "guidance": "As moonlight increases, plants draw energy upward. Sap flow increases in stems and leaves. Excellent time for sowing and transplanting crops that grow above ground.",
        "plant": "Sow leafy annuals, grains, and above-ground crops. Ideal for grafting and taking cuttings."
      },
      "full": {
        "title": "Full Moon - Peak Energy",
        "energy": "Maximum light, peak vitality",
        "guidance": "Full moon brings peak energy and moisture. Traditional farmers note enhanced germination and root establishment. Excellent for transplanting and watering.",
        "plant": "Transplant seedlings. Plant root crops as moon begins to wane. Harvest for maximum flavor."
      },
      "waning": {
        "title": "Waning Moon - Root & Ground",
        "energy": "Decreasing light, energy downward",
        "guidance": "As light diminishes, energy moves into roots and soil. Excellent for planting root crops, perennials, and bulbs. Good time for pruning and composting.",
        "plant": "Plant root vegetables, garlic, onions, perennials. Focus on soil building and underground development."
      }
    },

    "permaculture": {
      "waterRetention": {
        "title": "Capturing Every Drop",
        "principle": "Slow, spread, and sink water into the landscape",
        "practice": "Apply 3-4 inches of organic mulch around plants to reduce evaporation by up to 70%. Use swales, berms, and rain gardens to capture runoff. Every gallon saved is one less gallon to pump.",
        "science": "Mulch moderates soil temperature, suppresses weeds, and feeds soil life as it decomposes. Studies show properly mulched gardens need 25-50% less irrigation."
      },
      "soilBuilding": {
        "title": "Feed the Soil, Not the Plant",
        "principle": "Healthy soil creates healthy plants",
        "practice": "Use chop-and-drop: cut nitrogen-fixing plants (clover, fava beans, comfrey) and leave cuttings as mulch. Feeds soil organisms while building organic matter. Nature's slow-release fertilizer.",
        "science": "Soil microbes break down organic matter, releasing nutrients gradually. Living soil holds 20% more water and provides disease resistance. Chemical fertilizers bypass this natural system."
      }
    }
  },

  "dashboard": {
    "welcome": "Welcome to Your Garden",
    "today": "Today's Tasks",
    "moonPhase": "Current Moon Phase",
    "dayType": "Biodynamic Day",
    "seasonalMode": "Current Season",
    "quickActions": "Quick Actions",
    "viewCalendar": "View Full Calendar",
    "addJournalEntry": "Add Journal Entry",
    "browseGuidance": "Browse Guidance"
  },

  "settings": {
    "title": "Settings",
    "language": "Language",
    "profile": "Garden Profile",
    "editProfile": "Edit Profile",
    "starterMode": "Starter Mode",
    "starterModeDesc": "Simplified recommendations for beginners",
    "exportProfile": "Export Profile",
    "importProfile": "Import Profile",
    "exportDesc": "Download your profile as JSON",
    "importDesc": "Upload a previously exported profile",
    "dataManagement": "Data Management",
    "clearData": "Clear All Data",
    "clearDataWarning": "This will permanently delete all your data"
  }
}
```

### `src/i18n/locales/es.json` (Spanish - Key Sections)

```json
{
  "common": {
    "next": "Siguiente",
    "back": "Atrás",
    "skip": "Saltar",
    "save": "Guardar",
    "cancel": "Cancelar",
    "loading": "Cargando...",
    "optional": "Opcional",
    "required": "Requerido",
    "notSure": "No estoy seguro",
    "unknown": "Desconocido"
  },
  "onboarding": {
    "title": "Configura Tu Perfil de Jardín",
    "stepProgress": "Paso {current} de {total}",
    "canEditLater": "Puedes editar esto más tarde en Ajustes",

    "welcome": {
      "title": "Bienvenido al Calendario BioPermacultura",
      "subtitle": "Tu compañero personalizado de jardinería biodinámica y permacultura",
      "whatYouGet": "Lo que obtendrás:",
      "getStarted": "Comenzar"
    },

    "location": {
      "title": "¿Dónde estás jardinando?",
      "subtitle": "Esto nos ayuda a personalizar recomendaciones para tu clima y temporada",
      "country": "País",
      "selectCountry": "Selecciona tu país"
    },

    "garden": {
      "title": "Cuéntanos sobre tu espacio de cultivo",
      "subtitle": "Esto nos ayuda a adaptar recomendaciones a tu configuración",
      "allOptional": "Opcional... salta lo que no estés seguro"
    }
  },

  "guidance": {
    "biodynamic": {
      "rootDay": {
        "title": "Energía del Día de Raíz",
        "description": "Los días de raíz se alinean con el elemento Tierra, cuando las fuerzas cósmicas apoyan el crecimiento subterráneo.",
        "bestFor": "Ideal para plantar, cuidar y cosechar vegetales de raíz como zanahorias, papas, remolachas y rábanos."
      },
      "leafDay": {
        "title": "Vitalidad del Día de Hoja",
        "description": "Los días de hoja corresponden al elemento Agua, apoyando el crecimiento vegetativo exuberante."
      }
    }
  }
}
```

### `src/i18n/locales/ar.json` (Arabic - Key Sections)

```json
{
  "common": {
    "next": "التالي",
    "back": "رجوع",
    "skip": "تخطي",
    "save": "حفظ",
    "cancel": "إلغاء",
    "loading": "جاري التحميل...",
    "optional": "اختياري",
    "required": "مطلوب",
    "notSure": "غير متأكد",
    "unknown": "غير معروف"
  },
  "onboarding": {
    "title": "إعداد ملف حديقتك",
    "stepProgress": "الخطوة {current} من {total}",
    "canEditLater": "يمكنك تعديل هذا لاحقًا في الإعدادات",

    "welcome": {
      "title": "مرحبًا بك في تقويم الزراعة البيولوجية",
      "subtitle": "رفيقك الشخصي للزراعة البيوديناميكية والزراعة المستدامة",
      "getStarted": "ابدأ"
    },

    "location": {
      "title": "أين تقوم بالزراعة؟",
      "country": "البلد",
      "selectCountry": "اختر بلدك"
    }
  }
}
```

## D) Plant Catalog with Localized Names

### `src/data/plants.ts`

```typescript
export interface PlantName {
  en: string;
  es: string;
  fr: string;
  tr: string;
  ar: string;
}

export interface Plant {
  id: string;
  name: PlantName;
  scientificName: string;
  category: 'root' | 'leaf' | 'flower' | 'fruit';
  aliases?: string[]; // for search matching
}

export const PLANT_CATALOG: Plant[] = [
  {
    id: 'tomato',
    name: {
      en: 'Tomato',
      es: 'Tomate',
      fr: 'Tomate',
      tr: 'Domates',
      ar: 'طماطم'
    },
    scientificName: 'Solanum lycopersicum',
    category: 'fruit',
    aliases: ['tomatos', 'tomatoes']
  },
  {
    id: 'basil',
    name: {
      en: 'Basil',
      es: 'Albahaca',
      fr: 'Basilic',
      tr: 'Fesleğen',
      ar: 'ريحان'
    },
    scientificName: 'Ocimum basilicum',
    category: 'leaf'
  },
  {
    id: 'carrot',
    name: {
      en: 'Carrot',
      es: 'Zanahoria',
      fr: 'Carotte',
      tr: 'Havuç',
      ar: 'جزر'
    },
    scientificName: 'Daucus carota',
    category: 'root'
  },
  {
    id: 'lettuce',
    name: {
      en: 'Lettuce',
      es: 'Lechuga',
      fr: 'Laitue',
      tr: 'Marul',
      ar: 'خس'
    },
    scientificName: 'Lactuca sativa',
    category: 'leaf'
  },
  {
    id: 'pepper',
    name: {
      en: 'Pepper',
      es: 'Pimiento',
      fr: 'Poivron',
      tr: 'Biber',
      ar: 'فلفل'
    },
    scientificName: 'Capsicum annuum',
    category: 'fruit',
    aliases: ['bell pepper', 'sweet pepper']
  },
  {
    id: 'cucumber',
    name: {
      en: 'Cucumber',
      es: 'Pepino',
      fr: 'Concombre',
      tr: 'Salatalık',
      ar: 'خيار'
    },
    scientificName: 'Cucumis sativus',
    category: 'fruit'
  },
  {
    id: 'kale',
    name: {
      en: 'Kale',
      es: 'Col Rizada',
      fr: 'Chou Frisé',
      tr: 'Karalahana',
      ar: 'كرنب'
    },
    scientificName: 'Brassica oleracea var. sabellica',
    category: 'leaf'
  },
  {
    id: 'potato',
    name: {
      en: 'Potato',
      es: 'Papa',
      fr: 'Pomme de terre',
      tr: 'Patates',
      ar: 'بطاطس'
    },
    scientificName: 'Solanum tuberosum',
    category: 'root'
  },
  {
    id: 'beans',
    name: {
      en: 'Beans',
      es: 'Frijoles',
      fr: 'Haricots',
      tr: 'Fasulye',
      ar: 'فاصوليا'
    },
    scientificName: 'Phaseolus vulgaris',
    category: 'fruit'
  },
  {
    id: 'spinach',
    name: {
      en: 'Spinach',
      es: 'Espinaca',
      fr: 'Épinard',
      tr: 'Ispanak',
      ar: 'سبانخ'
    },
    scientificName: 'Spinacia oleracea',
    category: 'leaf'
  },
  {
    id: 'onion',
    name: {
      en: 'Onion',
      es: 'Cebolla',
      fr: 'Oignon',
      tr: 'Soğan',
      ar: 'بصل'
    },
    scientificName: 'Allium cepa',
    category: 'root'
  },
  {
    id: 'garlic',
    name: {
      en: 'Garlic',
      es: 'Ajo',
      fr: 'Ail',
      tr: 'Sarımsak',
      ar: 'ثوم'
    },
    scientificName: 'Allium sativum',
    category: 'root'
  },
  {
    id: 'radish',
    name: {
      en: 'Radish',
      es: 'Rábano',
      fr: 'Radis',
      tr: 'Turp',
      ar: 'فجل'
    },
    scientificName: 'Raphanus sativus',
    category: 'root'
  },
  {
    id: 'mint',
    name: {
      en: 'Mint',
      es: 'Menta',
      fr: 'Menthe',
      tr: 'Nane',
      ar: 'نعناع'
    },
    scientificName: 'Mentha',
    category: 'leaf'
  },
  {
    id: 'rosemary',
    name: {
      en: 'Rosemary',
      es: 'Romero',
      fr: 'Romarin',
      tr: 'Biberiye',
      ar: 'إكليل الجبل'
    },
    scientificName: 'Salvia rosmarinus',
    category: 'leaf'
  },
  {
    id: 'thyme',
    name: {
      en: 'Thyme',
      es: 'Tomillo',
      fr: 'Thym',
      tr: 'Kekik',
      ar: 'زعتر'
    },
    scientificName: 'Thymus vulgaris',
    category: 'leaf'
  },
  {
    id: 'oregano',
    name: {
      en: 'Oregano',
      es: 'Orégano',
      fr: 'Origan',
      tr: 'Kekik otu',
      ar: 'زعتر بري'
    },
    scientificName: 'Origanum vulgare',
    category: 'leaf'
  },
  {
    id: 'parsley',
    name: {
      en: 'Parsley',
      es: 'Perejil',
      fr: 'Persil',
      tr: 'Maydanoz',
      ar: 'بقدونس'
    },
    scientificName: 'Petroselinum crispum',
    category: 'leaf'
  },
  {
    id: 'cilantro',
    name: {
      en: 'Cilantro',
      es: 'Cilantro',
      fr: 'Coriandre',
      tr: 'Kişniş',
      ar: 'كزبرة'
    },
    scientificName: 'Coriandrum sativum',
    category: 'leaf',
    aliases: ['coriander']
  },
  {
    id: 'dill',
    name: {
      en: 'Dill',
      es: 'Eneldo',
      fr: 'Aneth',
      tr: 'Dereotu',
      ar: 'شبت'
    },
    scientificName: 'Anethum graveolens',
    category: 'leaf'
  },
  {
    id: 'chamomile',
    name: {
      en: 'Chamomile',
      es: 'Manzanilla',
      fr: 'Camomille',
      tr: 'Papatya',
      ar: 'بابونج'
    },
    scientificName: 'Matricaria chamomilla',
    category: 'flower'
  },
  {
    id: 'calendula',
    name: {
      en: 'Calendula',
      es: 'Caléndula',
      fr: 'Souci',
      tr: 'Aynısafa',
      ar: 'آذريون'
    },
    scientificName: 'Calendula officinalis',
    category: 'flower'
  },
  {
    id: 'lavender',
    name: {
      en: 'Lavender',
      es: 'Lavanda',
      fr: 'Lavande',
      tr: 'Lavanta',
      ar: 'خزامى'
    },
    scientificName: 'Lavandula',
    category: 'flower'
  },
  {
    id: 'sunflower',
    name: {
      en: 'Sunflower',
      es: 'Girasol',
      fr: 'Tournesol',
      tr: 'Ayçiçeği',
      ar: 'عباد الشمس'
    },
    scientificName: 'Helianthus annuus',
    category: 'flower'
  },
  {
    id: 'marigold',
    name: {
      en: 'Marigold',
      es: 'Caléndula',
      fr: 'Souci',
      tr: 'Kadife çiçeği',
      ar: 'قطيفة'
    },
    scientificName: 'Tagetes',
    category: 'flower'
  },
  {
    id: 'squash',
    name: {
      en: 'Squash',
      es: 'Calabaza',
      fr: 'Courge',
      tr: 'Kabak',
      ar: 'قرع'
    },
    scientificName: 'Cucurbita',
    category: 'fruit'
  },
  {
    id: 'peas',
    name: {
      en: 'Peas',
      es: 'Guisantes',
      fr: 'Pois',
      tr: 'Bezelye',
      ar: 'بازلاء'
    },
    scientificName: 'Pisum sativum',
    category: 'fruit'
  },
  {
    id: 'watermelon',
    name: {
      en: 'Watermelon',
      es: 'Sandía',
      fr: 'Pastèque',
      tr: 'Karpuz',
      ar: 'بطيخ'
    },
    scientificName: 'Citrullus lanatus',
    category: 'fruit'
  },
  {
    id: 'cantaloupe',
    name: {
      en: 'Cantaloupe',
      es: 'Melón',
      fr: 'Cantaloup',
      tr: 'Kavun',
      ar: 'شمام'
    },
    scientificName: 'Cucumis melo',
    category: 'fruit'
  },
  {
    id: 'okra',
    name: {
      en: 'Okra',
      es: 'Okra',
      fr: 'Gombo',
      tr: 'Bamya',
      ar: 'بامية'
    },
    scientificName: 'Abelmoschus esculentus',
    category: 'fruit'
  }
];

// Helper function to get plant name by locale
export function getPlantName(plantId: string, locale: string): string {
  const plant = PLANT_CATALOG.find(p => p.id === plantId);
  if (!plant) return plantId;
  return plant.name[locale as keyof PlantName] || plant.name.en;
}

// Helper function to search plants (multi-language)
export function searchPlants(query: string, locale: string): Plant[] {
  const q = query.toLowerCase().trim();
  if (!q) return PLANT_CATALOG;

  return PLANT_CATALOG.filter(plant => {
    // Search in current locale name
    if (plant.name[locale as keyof PlantName]?.toLowerCase().includes(q)) return true;

    // Search in English name
    if (plant.name.en.toLowerCase().includes(q)) return true;

    // Search in scientific name
    if (plant.scientificName.toLowerCase().includes(q)) return true;

    // Search in aliases
    if (plant.aliases?.some(alias => alias.toLowerCase().includes(q))) return true;

    // Search in all language variants
    return Object.values(plant.name).some(name =>
      name.toLowerCase().includes(q)
    );
  });
}
```

## E) Quick Test Checklist

### Manual Testing Steps:

1. **Language Selection**
   - [ ] Open app, see language selector on welcome/onboarding
   - [ ] Switch between en/es/fr/tr/ar
   - [ ] Verify UI text changes immediately
   - [ ] Reload page - language persists
   - [ ] Check Arabic displays RTL layout

2. **Step 3 Optional**
   - [ ] Start onboarding
   - [ ] Reach Step 3 (Garden Setup)
   - [ ] Click "Next" without selecting anything - should proceed
   - [ ] Click "Skip" button - should proceed
   - [ ] Select "Not sure" options - should proceed
   - [ ] Complete onboarding with minimal data

3. **Plant Names**
   - [ ] View calendar/recommendations
   - [ ] Verify plant names shown in selected language
   - [ ] Verify scientific names shown everywhere: "Basil (Ocimum basilicum)"
   - [ ] Search for plants in different languages
   - [ ] Search "tomate" in English UI - should find tomato

4. **Guidance Localization**
   - [ ] View biodynamic day explanations
   - [ ] Verify guidance text is in selected language
   - [ ] Check moon phase descriptions
   - [ ] Verify permaculture tips are translated

5. **RTL Support (Arabic)**
   - [ ] Switch to Arabic
   - [ ] Verify text flows right-to-left
   - [ ] Check layout mirrors correctly
   - [ ] Verify Noto Sans Arabic font loads

6. **Settings Page**
   - [ ] Navigate to Settings
   - [ ] Change language - UI updates
   - [ ] Edit profile fields
   - [ ] Export profile to JSON
   - [ ] Import previously exported profile
   - [ ] Toggle Starter Mode

7. **Starter Mode**
   - [ ] Enable Starter Mode during onboarding
   - [ ] Verify simplified flow (fewer questions)
   - [ ] Disable Starter Mode in Settings
   - [ ] Verify advanced options appear

8. **Error Boundary**
   - [ ] Force an error (edit code temporarily)
   - [ ] Verify friendly error message appears
   - [ ] Click Reload - app recovers

9. **Mobile Testing**
   - [ ] Test on mobile viewport
   - [ ] Verify responsive layout
   - [ ] Test language selector on mobile
   - [ ] Verify RTL works on mobile

10. **Deployment**
    - [ ] Deploy to Vercel
    - [ ] Test production build
    - [ ] Verify no console errors
    - [ ] Test all languages in production

## Next Steps

This plan is complete and ready for implementation. The key files to create/modify are:

1. Install dependencies
2. Create i18n configuration files
3. Create translation JSON files
4. Create plant catalog
5. Update onboarding components
6. Add language selector
7. Add Settings page
8. Test thoroughly

Would you like me to proceed with implementing these changes?

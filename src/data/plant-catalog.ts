import { Locale } from '@/i18n/config';

export interface Plant {
  id: string;
  scientificName: string;
  names: Record<Locale, string>;
  type: 'vegetable' | 'herb' | 'flower' | 'fruit';
  category: 'root' | 'leaf' | 'flower' | 'fruit';
  growingZones?: string;
  seasonalNotes?: Record<Locale, string>;
}

export const plantCatalog: Plant[] = [
  // Root Crops
  {
    id: 'carrot',
    scientificName: 'Daucus carota',
    names: {
      en: 'Carrot',
      es: 'Zanahoria',
      fr: 'Carotte',
      tr: 'Havuç',
      ar: 'جزر',
    },
    type: 'vegetable',
    category: 'root',
    growingZones: '3-10',
  },
  {
    id: 'beet',
    scientificName: 'Beta vulgaris',
    names: {
      en: 'Beet',
      es: 'Remolacha',
      fr: 'Betterave',
      tr: 'Pancar',
      ar: 'شمندر',
    },
    type: 'vegetable',
    category: 'root',
    growingZones: '2-10',
  },
  {
    id: 'radish',
    scientificName: 'Raphanus sativus',
    names: {
      en: 'Radish',
      es: 'Rábano',
      fr: 'Radis',
      tr: 'Turp',
      ar: 'فجل',
    },
    type: 'vegetable',
    category: 'root',
    growingZones: '2-11',
  },
  {
    id: 'turnip',
    scientificName: 'Brassica rapa',
    names: {
      en: 'Turnip',
      es: 'Nabo',
      fr: 'Navet',
      tr: 'Şalgam',
      ar: 'لفت',
    },
    type: 'vegetable',
    category: 'root',
    growingZones: '2-9',
  },
  {
    id: 'potato',
    scientificName: 'Solanum tuberosum',
    names: {
      en: 'Potato',
      es: 'Papa',
      fr: 'Pomme de terre',
      tr: 'Patates',
      ar: 'بطاطس',
    },
    type: 'vegetable',
    category: 'root',
    growingZones: '3-10',
  },
  {
    id: 'onion',
    scientificName: 'Allium cepa',
    names: {
      en: 'Onion',
      es: 'Cebolla',
      fr: 'Oignon',
      tr: 'Soğan',
      ar: 'بصل',
    },
    type: 'vegetable',
    category: 'root',
    growingZones: '3-9',
  },
  {
    id: 'garlic',
    scientificName: 'Allium sativum',
    names: {
      en: 'Garlic',
      es: 'Ajo',
      fr: 'Ail',
      tr: 'Sarımsak',
      ar: 'ثوم',
    },
    type: 'vegetable',
    category: 'root',
    growingZones: '3-9',
  },

  // Leaf Crops
  {
    id: 'lettuce',
    scientificName: 'Lactuca sativa',
    names: {
      en: 'Lettuce',
      es: 'Lechuga',
      fr: 'Laitue',
      tr: 'Marul',
      ar: 'خس',
    },
    type: 'vegetable',
    category: 'leaf',
    growingZones: '2-11',
  },
  {
    id: 'spinach',
    scientificName: 'Spinacia oleracea',
    names: {
      en: 'Spinach',
      es: 'Espinaca',
      fr: 'Épinard',
      tr: 'Ispanak',
      ar: 'سبانخ',
    },
    type: 'vegetable',
    category: 'leaf',
    growingZones: '2-9',
  },
  {
    id: 'kale',
    scientificName: 'Brassica oleracea var. sabellica',
    names: {
      en: 'Kale',
      es: 'Col rizada',
      fr: 'Chou frisé',
      tr: 'Karalahana',
      ar: 'كرنب',
    },
    type: 'vegetable',
    category: 'leaf',
    growingZones: '2-11',
  },
  {
    id: 'chard',
    scientificName: 'Beta vulgaris subsp. cicla',
    names: {
      en: 'Swiss Chard',
      es: 'Acelga',
      fr: 'Bette à carde',
      tr: 'Pazı',
      ar: 'سلق',
    },
    type: 'vegetable',
    category: 'leaf',
    growingZones: '2-11',
  },
  {
    id: 'cabbage',
    scientificName: 'Brassica oleracea var. capitata',
    names: {
      en: 'Cabbage',
      es: 'Repollo',
      fr: 'Chou',
      tr: 'Lahana',
      ar: 'ملفوف',
    },
    type: 'vegetable',
    category: 'leaf',
    growingZones: '1-9',
  },
  {
    id: 'basil',
    scientificName: 'Ocimum basilicum',
    names: {
      en: 'Basil',
      es: 'Albahaca',
      fr: 'Basilic',
      tr: 'Fesleğen',
      ar: 'ريحان',
    },
    type: 'herb',
    category: 'leaf',
    growingZones: '9-11',
  },
  {
    id: 'parsley',
    scientificName: 'Petroselinum crispum',
    names: {
      en: 'Parsley',
      es: 'Perejil',
      fr: 'Persil',
      tr: 'Maydanoz',
      ar: 'بقدونس',
    },
    type: 'herb',
    category: 'leaf',
    growingZones: '5-9',
  },
  {
    id: 'cilantro',
    scientificName: 'Coriandrum sativum',
    names: {
      en: 'Cilantro',
      es: 'Cilantro',
      fr: 'Coriandre',
      tr: 'Kişniş',
      ar: 'كزبرة',
    },
    type: 'herb',
    category: 'leaf',
    growingZones: '3-11',
  },

  // Flower Crops
  {
    id: 'broccoli',
    scientificName: 'Brassica oleracea var. italica',
    names: {
      en: 'Broccoli',
      es: 'Brócoli',
      fr: 'Brocoli',
      tr: 'Brokoli',
      ar: 'بروكلي',
    },
    type: 'vegetable',
    category: 'flower',
    growingZones: '3-10',
  },
  {
    id: 'cauliflower',
    scientificName: 'Brassica oleracea var. botrytis',
    names: {
      en: 'Cauliflower',
      es: 'Coliflor',
      fr: 'Chou-fleur',
      tr: 'Karnabahar',
      ar: 'قرنبيط',
    },
    type: 'vegetable',
    category: 'flower',
    growingZones: '2-11',
  },
  {
    id: 'artichoke',
    scientificName: 'Cynara cardunculus var. scolymus',
    names: {
      en: 'Artichoke',
      es: 'Alcachofa',
      fr: 'Artichaut',
      tr: 'Enginar',
      ar: 'خرشوف',
    },
    type: 'vegetable',
    category: 'flower',
    growingZones: '7-11',
  },
  {
    id: 'sunflower',
    scientificName: 'Helianthus annuus',
    names: {
      en: 'Sunflower',
      es: 'Girasol',
      fr: 'Tournesol',
      tr: 'Ayçiçeği',
      ar: 'دوار الشمس',
    },
    type: 'flower',
    category: 'flower',
    growingZones: '2-11',
  },
  {
    id: 'marigold',
    scientificName: 'Tagetes',
    names: {
      en: 'Marigold',
      es: 'Caléndula',
      fr: 'Souci',
      tr: 'Kadife çiçeği',
      ar: 'قطيفة',
    },
    type: 'flower',
    category: 'flower',
    growingZones: '2-11',
  },
  {
    id: 'lavender',
    scientificName: 'Lavandula',
    names: {
      en: 'Lavender',
      es: 'Lavanda',
      fr: 'Lavande',
      tr: 'Lavanta',
      ar: 'خزامى',
    },
    type: 'flower',
    category: 'flower',
    growingZones: '5-9',
  },

  // Fruit Crops
  {
    id: 'tomato',
    scientificName: 'Solanum lycopersicum',
    names: {
      en: 'Tomato',
      es: 'Tomate',
      fr: 'Tomate',
      tr: 'Domates',
      ar: 'طماطم',
    },
    type: 'vegetable',
    category: 'fruit',
    growingZones: '5-11',
  },
  {
    id: 'pepper',
    scientificName: 'Capsicum annuum',
    names: {
      en: 'Pepper',
      es: 'Pimiento',
      fr: 'Poivron',
      tr: 'Biber',
      ar: 'فلفل',
    },
    type: 'vegetable',
    category: 'fruit',
    growingZones: '9-11',
  },
  {
    id: 'cucumber',
    scientificName: 'Cucumis sativus',
    names: {
      en: 'Cucumber',
      es: 'Pepino',
      fr: 'Concombre',
      tr: 'Salatalık',
      ar: 'خيار',
    },
    type: 'vegetable',
    category: 'fruit',
    growingZones: '4-11',
  },
  {
    id: 'zucchini',
    scientificName: 'Cucurbita pepo',
    names: {
      en: 'Zucchini',
      es: 'Calabacín',
      fr: 'Courgette',
      tr: 'Kabak',
      ar: 'كوسة',
    },
    type: 'vegetable',
    category: 'fruit',
    growingZones: '3-10',
  },
  {
    id: 'pumpkin',
    scientificName: 'Cucurbita pepo',
    names: {
      en: 'Pumpkin',
      es: 'Calabaza',
      fr: 'Citrouille',
      tr: 'Balkabağı',
      ar: 'يقطين',
    },
    type: 'vegetable',
    category: 'fruit',
    growingZones: '3-9',
  },
  {
    id: 'strawberry',
    scientificName: 'Fragaria × ananassa',
    names: {
      en: 'Strawberry',
      es: 'Fresa',
      fr: 'Fraise',
      tr: 'Çilek',
      ar: 'فراولة',
    },
    type: 'fruit',
    category: 'fruit',
    growingZones: '5-8',
  },
  {
    id: 'apple',
    scientificName: 'Malus domestica',
    names: {
      en: 'Apple',
      es: 'Manzana',
      fr: 'Pomme',
      tr: 'Elma',
      ar: 'تفاح',
    },
    type: 'fruit',
    category: 'fruit',
    growingZones: '3-8',
  },
];

// Helper function to get plant name by locale
export function getPlantName(plantId: string, locale: Locale): string {
  const plant = plantCatalog.find((p) => p.id === plantId);
  return plant ? plant.names[locale] : plantId;
}

// Helper function to get plant by ID
export function getPlant(plantId: string): Plant | undefined {
  return plantCatalog.find((p) => p.id === plantId);
}

// Helper function to search plants by name (cross-language)
export function searchPlants(query: string, locale: Locale): Plant[] {
  const lowerQuery = query.toLowerCase();

  return plantCatalog.filter((plant) => {
    // Search in current locale name
    if (plant.names[locale].toLowerCase().includes(lowerQuery)) {
      return true;
    }

    // Search in scientific name
    if (plant.scientificName.toLowerCase().includes(lowerQuery)) {
      return true;
    }

    // Search in all other locale names (cross-language support)
    return Object.values(plant.names).some((name) =>
      name.toLowerCase().includes(lowerQuery)
    );
  });
}

// Helper function to get plants by category
export function getPlantsByCategory(category: Plant['category'], locale: Locale): Plant[] {
  return plantCatalog.filter((plant) => plant.category === category);
}

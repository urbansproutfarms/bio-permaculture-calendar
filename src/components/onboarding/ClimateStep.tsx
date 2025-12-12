'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { climateSchema, ClimateFormData } from '@/schemas/onboarding';
import { UserProfile, ClimateType, SummerType, WinterType, RainPattern } from '@/types/profile';

interface ClimateStepProps {
  initialData: Partial<UserProfile>;
  onNext: (data: ClimateFormData) => void;
  onBack: () => void;
}

const CLIMATE_TYPES: ClimateType[] = [
  'Mediterranean',
  'Humid Subtropical',
  'Oceanic',
  'Continental',
  'Tropical',
  'Arid',
  'Semi-arid',
  'Mountain',
  'Other',
];

const SUMMER_TYPES: SummerType[] = ['Hot-Dry', 'Hot-Humid', 'Mild', 'Short'];
const WINTER_TYPES: WinterType[] = ['Mild', 'Snowy', 'Rainy', 'Hard Freeze'];
const RAIN_PATTERNS: RainPattern[] = ['Year-round', 'Wet Winters', 'Wet Summers', 'Monsoon', 'Very Dry'];

export default function ClimateStep({ initialData, onNext, onBack }: ClimateStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClimateFormData>({
    resolver: zodResolver(climateSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-green-900 mb-2">
          What's your climate like?
        </h2>
        <p className="text-sm text-green-700 mb-6">
          Climate data helps us recommend the right crops and timing
        </p>
      </div>

      {/* Hardiness Zone */}
      <div>
        <label htmlFor="hardinessZone" className="block text-sm font-medium text-gray-700 mb-1">
          USDA Hardiness Zone (Optional)
        </label>
        <input
          {...register('hardinessZone')}
          type="text"
          id="hardinessZone"
          placeholder="e.g., 9b or 10a"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <p className="mt-1 text-xs text-gray-500">
          Not sure? <a href="https://planthardiness.ars.usda.gov/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">Find your zone</a>
        </p>
      </div>

      {/* Climate Type */}
      <div>
        <label htmlFor="climateType" className="block text-sm font-medium text-gray-700 mb-1">
          Climate Type (Optional)
        </label>
        <select
          {...register('climateType')}
          id="climateType"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="">Select...</option>
          {CLIMATE_TYPES.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {errors.climateType && (
          <p className="mt-1 text-sm text-red-600">{errors.climateType.message}</p>
        )}
      </div>

      {/* Summer Type */}
      <div>
        <label htmlFor="summerType" className="block text-sm font-medium text-gray-700 mb-1">
          Summer Type (Optional)
        </label>
        <select
          {...register('summerType')}
          id="summerType"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="">Select...</option>
          {SUMMER_TYPES.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {errors.summerType && (
          <p className="mt-1 text-sm text-red-600">{errors.summerType.message}</p>
        )}
      </div>

      {/* Winter Type */}
      <div>
        <label htmlFor="winterType" className="block text-sm font-medium text-gray-700 mb-1">
          Winter Type (Optional)
        </label>
        <select
          {...register('winterType')}
          id="winterType"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="">Select...</option>
          {WINTER_TYPES.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {errors.winterType && (
          <p className="mt-1 text-sm text-red-600">{errors.winterType.message}</p>
        )}
      </div>

      {/* Rain Pattern */}
      <div>
        <label htmlFor="rainPattern" className="block text-sm font-medium text-gray-700 mb-1">
          Rain Pattern (Optional)
        </label>
        <select
          {...register('rainPattern')}
          id="rainPattern"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="">Select...</option>
          {RAIN_PATTERNS.map(pattern => (
            <option key={pattern} value={pattern}>{pattern}</option>
          ))}
        </select>
        {errors.rainPattern && (
          <p className="mt-1 text-sm text-red-600">{errors.rainPattern.message}</p>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Next
        </button>
      </div>
    </form>
  );
}

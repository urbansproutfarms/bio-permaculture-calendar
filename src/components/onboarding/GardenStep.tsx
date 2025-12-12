'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { gardenSchema, GardenFormData } from '@/schemas/onboarding';
import { UserProfile, GrowingSpace, SunExposure, SoilType, WaterAccess } from '@/types/profile';

interface GardenStepProps {
  initialData: Partial<UserProfile>;
  onNext: (data: GardenFormData) => void;
  onBack: () => void;
}

const GROWING_SPACES: GrowingSpace[] = [
  'Containers',
  'Raised Beds',
  'In-Ground',
  'Greenhouse',
  'Balcony',
  'Food Forest',
];

const SUN_EXPOSURES: SunExposure[] = ['Full Sun', 'Partial Sun', 'Shade'];
const SOIL_TYPES: SoilType[] = ['Clay', 'Sandy', 'Loam', 'Rocky', 'Unknown'];
const WATER_ACCESSES: WaterAccess[] = ['Rainwater', 'Irrigation', 'Limited'];

export default function GardenStep({ initialData, onNext, onBack }: GardenStepProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<GardenFormData>({
    resolver: zodResolver(gardenSchema),
    defaultValues: {
      growingSpace: initialData.growingSpace || [],
      sunExposure: initialData.sunExposure,
      soilType: initialData.soilType,
      waterAccess: initialData.waterAccess || [],
    },
  });

  const growingSpace = watch('growingSpace') || [];
  const waterAccess = watch('waterAccess') || [];

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-green-900 mb-2">
          Tell us about your growing space
        </h2>
        <p className="text-sm text-green-700 mb-6">
          Understanding your garden setup helps personalize recommendations
        </p>
      </div>

      {/* Growing Space */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Growing Space * (Select all that apply)
        </label>
        <div className="grid grid-cols-2 gap-3">
          {GROWING_SPACES.map((space) => (
            <Controller
              key={space}
              name="growingSpace"
              control={control}
              render={({ field }) => (
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value={space}
                    checked={field.value?.includes(space)}
                    onChange={(e) => {
                      const newValue = e.target.checked
                        ? [...(field.value || []), space]
                        : (field.value || []).filter((v) => v !== space);
                      field.onChange(newValue);
                    }}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">{space}</span>
                </label>
              )}
            />
          ))}
        </div>
        {errors.growingSpace && (
          <p className="mt-1 text-sm text-red-600">{errors.growingSpace.message}</p>
        )}
      </div>

      {/* Sun Exposure */}
      <div>
        <label htmlFor="sunExposure" className="block text-sm font-medium text-gray-700 mb-1">
          Sun Exposure *
        </label>
        <select
          {...register('sunExposure')}
          id="sunExposure"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="">Select...</option>
          {SUN_EXPOSURES.map(exposure => (
            <option key={exposure} value={exposure}>{exposure}</option>
          ))}
        </select>
        {errors.sunExposure && (
          <p className="mt-1 text-sm text-red-600">{errors.sunExposure.message}</p>
        )}
      </div>

      {/* Soil Type */}
      <div>
        <label htmlFor="soilType" className="block text-sm font-medium text-gray-700 mb-1">
          Soil Type *
        </label>
        <select
          {...register('soilType')}
          id="soilType"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="">Select...</option>
          {SOIL_TYPES.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {errors.soilType && (
          <p className="mt-1 text-sm text-red-600">{errors.soilType.message}</p>
        )}
      </div>

      {/* Water Access */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Water Access * (Select all that apply)
        </label>
        <div className="space-y-2">
          {WATER_ACCESSES.map((access) => (
            <Controller
              key={access}
              name="waterAccess"
              control={control}
              render={({ field }) => (
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value={access}
                    checked={field.value?.includes(access)}
                    onChange={(e) => {
                      const newValue = e.target.checked
                        ? [...(field.value || []), access]
                        : (field.value || []).filter((v) => v !== access);
                      field.onChange(newValue);
                    }}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">{access}</span>
                </label>
              )}
            />
          ))}
        </div>
        {errors.waterAccess && (
          <p className="mt-1 text-sm text-red-600">{errors.waterAccess.message}</p>
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

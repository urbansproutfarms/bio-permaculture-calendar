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

const SUN_EXPOSURES: (SunExposure | 'Not sure')[] = ['Full Sun', 'Partial Sun', 'Shade', 'Not sure'];
const SOIL_TYPES: (SoilType | 'Not sure')[] = ['Clay', 'Sandy', 'Loam', 'Rocky', 'Unknown', 'Not sure'];
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

  const handleSkip = () => {
    onNext({
      growingSpace: [],
      sunExposure: undefined,
      soilType: undefined,
      waterAccess: []
    });
  };

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-green-900 mb-2">
          Tell us about your growing space
        </h2>
        <p className="text-sm text-green-700 mb-2">
          Understanding your garden setup helps personalize recommendations
        </p>
        <p className="text-xs text-green-600 italic mb-4">
          Optional... skip anything you're not sure about. You can edit this later in Settings.
        </p>
      </div>

      {/* Growing Space */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Growing Space <span className="text-gray-500 font-normal">(Optional - Select all that apply)</span>
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
          Sun Exposure <span className="text-gray-500 font-normal">(Optional)</span>
        </label>
        <select
          {...register('sunExposure')}
          id="sunExposure"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
        >
          <option value="">Select...</option>
          <option value="Full Sun">Full Sun (6+ hours direct)</option>
          <option value="Partial Sun">Partial Sun (3-6 hours)</option>
          <option value="Shade">Shade (&lt; 3 hours)</option>
          <option value="Not sure">Not sure</option>
        </select>
        {errors.sunExposure && (
          <p className="mt-1 text-sm text-red-600">{errors.sunExposure.message}</p>
        )}
      </div>

      {/* Soil Type */}
      <div>
        <label htmlFor="soilType" className="block text-sm font-medium text-gray-700 mb-1">
          Soil Type <span className="text-gray-500 font-normal">(Optional)</span>
        </label>
        <select
          {...register('soilType')}
          id="soilType"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
        >
          <option value="">Select...</option>
          <option value="Clay">Clay (heavy, holds water)</option>
          <option value="Sandy">Sandy (light, drains fast)</option>
          <option value="Loam">Loam (balanced, ideal)</option>
          <option value="Rocky">Rocky</option>
          <option value="Unknown">Unknown</option>
          <option value="Not sure">Not sure</option>
        </select>
        {errors.soilType && (
          <p className="mt-1 text-sm text-red-600">{errors.soilType.message}</p>
        )}
      </div>

      {/* Water Access */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Water Access <span className="text-gray-500 font-normal">(Optional - Select all that apply)</span>
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
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleSkip}
            className="px-6 py-2 border border-green-300 text-green-700 rounded-lg hover:bg-green-50 transition-colors"
          >
            Skip
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </form>
  );
}

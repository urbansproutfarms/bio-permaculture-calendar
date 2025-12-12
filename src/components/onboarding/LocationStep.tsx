'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { locationSchema, LocationFormData } from '@/schemas/onboarding';
import { UserProfile } from '@/types/profile';

interface LocationStepProps {
  initialData: Partial<UserProfile>;
  onNext: (data: LocationFormData) => void;
}

export default function LocationStep({ initialData, onNext }: LocationStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-green-900 mb-2">
          Where are you gardening?
        </h2>
        <p className="text-sm text-green-700 mb-6">
          This helps us customize recommendations for your climate and season
        </p>
      </div>

      {/* Country */}
      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
          Country *
        </label>
        <input
          {...register('country')}
          type="text"
          id="country"
          placeholder="e.g., United States"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        {errors.country && (
          <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
        )}
      </div>

      {/* State/Province */}
      <div>
        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
          State/Province (Optional)
        </label>
        <input
          {...register('state')}
          type="text"
          id="state"
          placeholder="e.g., California"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      {/* City */}
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
          City (Optional)
        </label>
        <input
          {...register('city')}
          type="text"
          id="city"
          placeholder="e.g., San Francisco"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      {/* Coordinates (Optional) */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-1">
            Latitude (Optional)
          </label>
          <input
            {...register('latitude', { valueAsNumber: true })}
            type="number"
            step="0.0001"
            id="latitude"
            placeholder="37.7749"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-1">
            Longitude (Optional)
          </label>
          <input
            {...register('longitude', { valueAsNumber: true })}
            type="number"
            step="0.0001"
            id="longitude"
            placeholder="-122.4194"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
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

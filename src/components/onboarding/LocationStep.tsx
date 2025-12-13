'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { locationSchema, LocationFormData } from '@/schemas/onboarding';
import { UserProfile } from '@/types/profile';

interface LocationStepProps {
  initialData: Partial<UserProfile>;
  onNext: (data: LocationFormData) => void;
}

export default function LocationStep({ initialData, onNext }: LocationStepProps) {
  const t = useTranslations('onboarding.location');
  const tCommon = useTranslations('common');

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
          {t('title')}
        </h2>
        <p className="text-sm text-green-700 mb-2">
          {t('subtitle')}
        </p>
        <p className="text-xs text-green-600 italic">
          You can edit this later in Settings.
        </p>
      </div>

      {/* Country */}
      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
          {t('country')} <span className="text-red-600">*</span>
        </label>
        <select
          {...register('country')}
          id="country"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
        >
          <option value="">{t('countryPlaceholder')}</option>
          <option value="United States">United States</option>
          <option value="Canada">Canada</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="Australia">Australia</option>
          <option value="New Zealand">New Zealand</option>
          <option value="Germany">Germany</option>
          <option value="France">France</option>
          <option value="Spain">Spain</option>
          <option value="Italy">Italy</option>
          <option value="Netherlands">Netherlands</option>
          <option value="Belgium">Belgium</option>
          <option value="Switzerland">Switzerland</option>
          <option value="Austria">Austria</option>
          <option value="Ireland">Ireland</option>
          <option value="Sweden">Sweden</option>
          <option value="Norway">Norway</option>
          <option value="Denmark">Denmark</option>
          <option value="Finland">Finland</option>
          <option value="Japan">Japan</option>
          <option value="South Korea">South Korea</option>
          <option value="Mexico">Mexico</option>
          <option value="Brazil">Brazil</option>
          <option value="Argentina">Argentina</option>
          <option value="Chile">Chile</option>
          <option value="South Africa">South Africa</option>
          <option value="India">India</option>
          <option value="Other">Other</option>
        </select>
        {errors.country && (
          <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
        )}
      </div>

      {/* State/Province */}
      <div>
        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
          {t('state')} <span className="text-gray-500 font-normal">{tCommon('optional')}</span>
        </label>
        <input
          {...register('state')}
          type="text"
          id="state"
          placeholder={t('statePlaceholder')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      {/* City */}
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
          {t('city')} <span className="text-gray-500 font-normal">{tCommon('optional')}</span>
        </label>
        <input
          {...register('city')}
          type="text"
          id="city"
          placeholder={t('cityPlaceholder')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

      {/* Coordinates (Optional) */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-1">
            {t('latitude')} <span className="text-gray-500 font-normal">{tCommon('optional')}</span>
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
            {t('longitude')} <span className="text-gray-500 font-normal">{tCommon('optional')}</span>
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
          {tCommon('next')}
        </button>
      </div>
    </form>
  );
}

'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { goalsSchema, GoalsFormData } from '@/schemas/onboarding';
import { UserProfile, TimeAvailable, Goal, ExperienceLevel } from '@/types/profile';

interface GoalsStepProps {
  initialData: Partial<UserProfile>;
  onNext: (data: GoalsFormData) => void;
  onBack: () => void;
}

const TIME_OPTIONS: TimeAvailable[] = ['10 min/day', '30 min/day', 'Weekends'];
const GOAL_OPTIONS: Goal[] = ['Vegetables', 'Herbs', 'Flowers', 'Fruit Trees', 'Landscape Planning', 'All'];
const EXPERIENCE_LEVELS: ExperienceLevel[] = ['Beginner', 'Intermediate', 'Advanced'];

const COMMON_CROPS = [
  'Tomatoes', 'Lettuce', 'Carrots', 'Peppers', 'Cucumbers',
  'Beans', 'Squash', 'Kale', 'Basil', 'Strawberries',
  'Radishes', 'Onions', 'Garlic', 'Spinach', 'Potatoes'
];

const COMMON_CONSTRAINTS = [
  'Limited space', 'Deer pressure', 'Drought', 'Poor soil',
  'Shade', 'Short season', 'Hot climate', 'Cold climate',
  'Limited time', 'Container only'
];

export default function GoalsStep({ initialData, onNext, onBack }: GoalsStepProps) {
  const [customCrop, setCustomCrop] = useState('');
  const [customConstraint, setCustomConstraint] = useState('');

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<GoalsFormData>({
    resolver: zodResolver(goalsSchema),
    defaultValues: {
      timeAvailable: initialData.timeAvailable,
      goals: initialData.goals || [],
      experienceLevel: initialData.experienceLevel,
      topCrops: initialData.topCrops || [],
      constraints: initialData.constraints || [],
    },
  });

  const goals = watch('goals') || [];
  const topCrops = watch('topCrops') || [];
  const constraints = watch('constraints') || [];

  const addCustomCrop = () => {
    if (customCrop && !topCrops.includes(customCrop) && topCrops.length < 5) {
      setValue('topCrops', [...topCrops, customCrop]);
      setCustomCrop('');
    }
  };

  const removeCrop = (crop: string) => {
    setValue('topCrops', topCrops.filter(c => c !== crop));
  };

  const addCustomConstraint = () => {
    if (customConstraint && !constraints.includes(customConstraint) && constraints.length < 5) {
      setValue('constraints', [...constraints, customConstraint]);
      setCustomConstraint('');
    }
  };

  const removeConstraint = (constraint: string) => {
    setValue('constraints', constraints.filter(c => c !== constraint));
  };

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-green-900 mb-2">
          What are your gardening goals?
        </h2>
        <p className="text-sm text-green-700 mb-6">
          Help us tailor recommendations to your interests and experience
        </p>
      </div>

      {/* Time Available */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Time Available *
        </label>
        <div className="space-y-2">
          {TIME_OPTIONS.map((option) => (
            <label key={option} className="flex items-center space-x-2 cursor-pointer">
              <input
                {...register('timeAvailable')}
                type="radio"
                value={option}
                className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">{option}</span>
            </label>
          ))}
        </div>
        {errors.timeAvailable && (
          <p className="mt-1 text-sm text-red-600">{errors.timeAvailable.message}</p>
        )}
      </div>

      {/* Goals */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Goals * (Select all that apply)
        </label>
        <div className="grid grid-cols-2 gap-3">
          {GOAL_OPTIONS.map((goal) => (
            <Controller
              key={goal}
              name="goals"
              control={control}
              render={({ field }) => (
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value={goal}
                    checked={field.value?.includes(goal)}
                    onChange={(e) => {
                      const newValue = e.target.checked
                        ? [...(field.value || []), goal]
                        : (field.value || []).filter((v) => v !== goal);
                      field.onChange(newValue);
                    }}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">{goal}</span>
                </label>
              )}
            />
          ))}
        </div>
        {errors.goals && (
          <p className="mt-1 text-sm text-red-600">{errors.goals.message}</p>
        )}
      </div>

      {/* Experience Level */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Experience Level *
        </label>
        <div className="space-y-2">
          {EXPERIENCE_LEVELS.map((level) => (
            <label key={level} className="flex items-center space-x-2 cursor-pointer">
              <input
                {...register('experienceLevel')}
                type="radio"
                value={level}
                className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">{level}</span>
            </label>
          ))}
        </div>
        {errors.experienceLevel && (
          <p className="mt-1 text-sm text-red-600">{errors.experienceLevel.message}</p>
        )}
      </div>

      {/* Top Crops */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Favorite Crops (Optional, up to 5)
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {COMMON_CROPS.filter(crop => !topCrops.includes(crop)).map((crop) => (
            <button
              key={crop}
              type="button"
              onClick={() => topCrops.length < 5 && setValue('topCrops', [...topCrops, crop])}
              disabled={topCrops.length >= 5}
              className="px-3 py-1 text-sm border border-green-300 text-green-700 rounded-full hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              + {crop}
            </button>
          ))}
        </div>
        {topCrops.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {topCrops.map((crop) => (
              <span
                key={crop}
                className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
              >
                {crop}
                <button
                  type="button"
                  onClick={() => removeCrop(crop)}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
        {topCrops.length < 5 && (
          <div className="flex gap-2">
            <input
              type="text"
              value={customCrop}
              onChange={(e) => setCustomCrop(e.target.value)}
              placeholder="Add custom crop..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomCrop())}
            />
            <button
              type="button"
              onClick={addCustomCrop}
              className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
            >
              Add
            </button>
          </div>
        )}
      </div>

      {/* Constraints */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Challenges/Constraints (Optional, up to 5)
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {COMMON_CONSTRAINTS.filter(constraint => !constraints.includes(constraint)).map((constraint) => (
            <button
              key={constraint}
              type="button"
              onClick={() => constraints.length < 5 && setValue('constraints', [...constraints, constraint])}
              disabled={constraints.length >= 5}
              className="px-3 py-1 text-sm border border-amber-300 text-amber-700 rounded-full hover:bg-amber-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              + {constraint}
            </button>
          ))}
        </div>
        {constraints.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {constraints.map((constraint) => (
              <span
                key={constraint}
                className="inline-flex items-center px-3 py-1 bg-amber-100 text-amber-800 text-sm rounded-full"
              >
                {constraint}
                <button
                  type="button"
                  onClick={() => removeConstraint(constraint)}
                  className="ml-2 text-amber-600 hover:text-amber-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
        {constraints.length < 5 && (
          <div className="flex gap-2">
            <input
              type="text"
              value={customConstraint}
              onChange={(e) => setCustomConstraint(e.target.value)}
              placeholder="Add custom constraint..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomConstraint())}
            />
            <button
              type="button"
              onClick={addCustomConstraint}
              className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
            >
              Add
            </button>
          </div>
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
          Review
        </button>
      </div>
    </form>
  );
}

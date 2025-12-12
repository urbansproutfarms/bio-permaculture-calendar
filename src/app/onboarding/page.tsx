'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserProfile } from '@/types/profile';
import { Storage } from '@/lib/storage';
import { LocationFormData, ClimateFormData, GardenFormData, GoalsFormData } from '@/schemas/onboarding';

// Steps
import LocationStep from '@/components/onboarding/LocationStep';
import ClimateStep from '@/components/onboarding/ClimateStep';
import GardenStep from '@/components/onboarding/GardenStep';
import GoalsStep from '@/components/onboarding/GoalsStep';
import ReviewStep from '@/components/onboarding/ReviewStep';

const TOTAL_STEPS = 5;

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});

  const handleLocationComplete = (data: LocationFormData) => {
    setFormData(prev => ({ ...prev, ...data }));
    setCurrentStep(2);
  };

  const handleClimateComplete = (data: ClimateFormData) => {
    setFormData(prev => ({ ...prev, ...data }));
    setCurrentStep(3);
  };

  const handleGardenComplete = (data: GardenFormData) => {
    setFormData(prev => ({ ...prev, ...data }));
    setCurrentStep(4);
  };

  const handleGoalsComplete = (data: GoalsFormData) => {
    setFormData(prev => ({ ...prev, ...data }));
    setCurrentStep(5);
  };

  const handleFinalSubmit = () => {
    // Create complete profile with defaults for optional fields
    const profile: UserProfile = {
      ...formData as any,
      topCrops: formData.topCrops || [],
      constraints: formData.constraints || [],
      growingSpace: formData.growingSpace || [],
      waterAccess: formData.waterAccess || [],
      goals: formData.goals || [],
      advancedMode: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Save to localStorage
    Storage.saveProfile(profile);

    // Redirect to dashboard
    router.push('/dashboard');
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto max-w-2xl px-4 py-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-green-900">
              Set Up Your Garden Profile
            </h1>
            <span className="text-sm text-green-700">
              Step {currentStep} of {TOTAL_STEPS}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-green-100 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          {currentStep === 1 && (
            <LocationStep
              initialData={formData}
              onNext={handleLocationComplete}
            />
          )}

          {currentStep === 2 && (
            <ClimateStep
              initialData={formData}
              onNext={handleClimateComplete}
              onBack={handleBack}
            />
          )}

          {currentStep === 3 && (
            <GardenStep
              initialData={formData}
              onNext={handleGardenComplete}
              onBack={handleBack}
            />
          )}

          {currentStep === 4 && (
            <GoalsStep
              initialData={formData}
              onNext={handleGoalsComplete}
              onBack={handleBack}
            />
          )}

          {currentStep === 5 && (
            <ReviewStep
              profile={formData}
              onSubmit={handleFinalSubmit}
              onBack={handleBack}
            />
          )}
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-green-700">
          Your data is stored locally on your device only
        </p>
      </div>
    </div>
  );
}

'use client';

import { UserProfile } from '@/types/profile';

interface ReviewStepProps {
  profile: Partial<UserProfile>;
  onSubmit: () => void;
  onBack: () => void;
}

export default function ReviewStep({ profile, onSubmit, onBack }: ReviewStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-green-900 mb-2">
          Review Your Profile
        </h2>
        <p className="text-sm text-green-700 mb-6">
          Confirm everything looks good before we create your personalized calendar
        </p>
      </div>

      {/* Location */}
      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="font-semibold text-green-900 mb-2">Location</h3>
        <dl className="space-y-1 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-600">Country:</dt>
            <dd className="text-gray-900 font-medium">{profile.country}</dd>
          </div>
          {profile.state && (
            <div className="flex justify-between">
              <dt className="text-gray-600">State/Province:</dt>
              <dd className="text-gray-900 font-medium">{profile.state}</dd>
            </div>
          )}
          {profile.city && (
            <div className="flex justify-between">
              <dt className="text-gray-600">City:</dt>
              <dd className="text-gray-900 font-medium">{profile.city}</dd>
            </div>
          )}
        </dl>
      </div>

      {/* Climate */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">Climate</h3>
        <dl className="space-y-1 text-sm">
          {profile.hardinessZone && (
            <div className="flex justify-between">
              <dt className="text-gray-600">Hardiness Zone:</dt>
              <dd className="text-gray-900 font-medium">{profile.hardinessZone}</dd>
            </div>
          )}
          <div className="flex justify-between">
            <dt className="text-gray-600">Climate Type:</dt>
            <dd className="text-gray-900 font-medium">{profile.climateType}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-600">Summer:</dt>
            <dd className="text-gray-900 font-medium">{profile.summerType}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-600">Winter:</dt>
            <dd className="text-gray-900 font-medium">{profile.winterType}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-600">Rain Pattern:</dt>
            <dd className="text-gray-900 font-medium">{profile.rainPattern}</dd>
          </div>
        </dl>
      </div>

      {/* Garden Setup */}
      <div className="bg-amber-50 p-4 rounded-lg">
        <h3 className="font-semibold text-amber-900 mb-2">Garden Setup</h3>
        <dl className="space-y-2 text-sm">
          <div>
            <dt className="text-gray-600 mb-1">Growing Space:</dt>
            <dd className="flex flex-wrap gap-1">
              {profile.growingSpace?.map((space) => (
                <span key={space} className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full text-xs">
                  {space}
                </span>
              ))}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-600">Sun Exposure:</dt>
            <dd className="text-gray-900 font-medium">{profile.sunExposure}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-600">Soil Type:</dt>
            <dd className="text-gray-900 font-medium">{profile.soilType}</dd>
          </div>
          <div>
            <dt className="text-gray-600 mb-1">Water Access:</dt>
            <dd className="flex flex-wrap gap-1">
              {profile.waterAccess?.map((access) => (
                <span key={access} className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full text-xs">
                  {access}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </div>

      {/* Goals & Experience */}
      <div className="bg-purple-50 p-4 rounded-lg">
        <h3 className="font-semibold text-purple-900 mb-2">Goals & Experience</h3>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-600">Time Available:</dt>
            <dd className="text-gray-900 font-medium">{profile.timeAvailable}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-600">Experience Level:</dt>
            <dd className="text-gray-900 font-medium">{profile.experienceLevel}</dd>
          </div>
          <div>
            <dt className="text-gray-600 mb-1">Goals:</dt>
            <dd className="flex flex-wrap gap-1">
              {profile.goals?.map((goal) => (
                <span key={goal} className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full text-xs">
                  {goal}
                </span>
              ))}
            </dd>
          </div>
          {profile.topCrops && profile.topCrops.length > 0 && (
            <div>
              <dt className="text-gray-600 mb-1">Favorite Crops:</dt>
              <dd className="flex flex-wrap gap-1">
                {profile.topCrops.map((crop) => (
                  <span key={crop} className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs">
                    {crop}
                  </span>
                ))}
              </dd>
            </div>
          )}
          {profile.constraints && profile.constraints.length > 0 && (
            <div>
              <dt className="text-gray-600 mb-1">Constraints:</dt>
              <dd className="flex flex-wrap gap-1">
                {profile.constraints.map((constraint) => (
                  <span key={constraint} className="px-2 py-0.5 bg-red-100 text-red-800 rounded-full text-xs">
                    {constraint}
                  </span>
                ))}
              </dd>
            </div>
          )}
        </dl>
      </div>

      {/* Privacy Note */}
      <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
        <p className="text-xs text-gray-600">
          <strong className="text-gray-700">Privacy:</strong> All data is stored locally on your device.
          No information is sent to external servers. You can export or delete your data anytime.
        </p>
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
          type="button"
          onClick={onSubmit}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
        >
          Create My Calendar
        </button>
      </div>
    </div>
  );
}

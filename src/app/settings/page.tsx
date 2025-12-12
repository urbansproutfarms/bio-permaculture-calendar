'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Storage } from '@/lib/storage';
import { UserProfile } from '@/types/profile';

export default function SettingsPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const loadedProfile = Storage.loadProfile();

    if (!loadedProfile) {
      router.push('/onboarding');
      return;
    }

    setProfile(loadedProfile);
    setLoading(false);
  }, [router]);

  const handleExportData = () => {
    const data = Storage.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `garden-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const success = Storage.importData(content);

      if (success) {
        alert('Data imported successfully!');
        window.location.reload();
      } else {
        alert('Failed to import data. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  const handleDeleteAll = () => {
    if (showDeleteConfirm) {
      Storage.clearAll();
      router.push('/onboarding');
    } else {
      setShowDeleteConfirm(true);
      setTimeout(() => setShowDeleteConfirm(false), 5000);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4 text-muted-foreground">Loading settings...</p>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-green-600 text-white p-4">
        <div className="container mx-auto max-w-6xl flex items-center justify-between">
          <h1 className="text-2xl font-bold">Settings</h1>
          <nav className="flex gap-4">
            <Link href="/dashboard" className="text-white hover:underline">
              Dashboard
            </Link>
            <Link href="/calendar" className="text-white hover:underline">
              Calendar
            </Link>
            <Link href="/journal" className="text-white hover:underline">
              Journal
            </Link>
            <Link href="/settings" className="text-white hover:underline font-semibold">
              Settings
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl p-4 md:p-8 space-y-6">
        {/* Profile Summary */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Profile</h2>

          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Location</p>
              <p className="text-gray-900 font-medium">
                {profile.city && profile.state
                  ? `${profile.city}, ${profile.state}, ${profile.country}`
                  : profile.country}
              </p>
            </div>

            <div>
              <p className="text-gray-600">Climate Type</p>
              <p className="text-gray-900 font-medium">{profile.climateType}</p>
            </div>

            <div>
              <p className="text-gray-600">Experience Level</p>
              <p className="text-gray-900 font-medium">{profile.experienceLevel}</p>
            </div>

            <div>
              <p className="text-gray-600">Time Available</p>
              <p className="text-gray-900 font-medium">{profile.timeAvailable}</p>
            </div>

            {profile.hardinessZone && (
              <div>
                <p className="text-gray-600">Hardiness Zone</p>
                <p className="text-gray-900 font-medium">{profile.hardinessZone}</p>
              </div>
            )}

            <div>
              <p className="text-gray-600">Goals</p>
              <p className="text-gray-900 font-medium">{profile.goals.join(', ')}</p>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => router.push('/onboarding')}
              className="px-6 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Management</h2>

          <div className="space-y-4">
            {/* Export */}
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-900">Export Data</h3>
                <p className="text-sm text-gray-600">
                  Download all your profile and journal data as JSON
                </p>
              </div>
              <button
                onClick={handleExportData}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Export
              </button>
            </div>

            {/* Import */}
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-900">Import Data</h3>
                <p className="text-sm text-gray-600">
                  Restore from a previously exported JSON file
                </p>
              </div>
              <label className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                Import
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportData}
                  className="hidden"
                />
              </label>
            </div>

            {/* Delete */}
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border-2 border-red-200">
              <div>
                <h3 className="font-semibold text-red-900">Delete All Data</h3>
                <p className="text-sm text-red-700">
                  {showDeleteConfirm
                    ? 'Click again to confirm deletion'
                    : 'Permanently delete all profile and journal data'}
                </p>
              </div>
              <button
                onClick={handleDeleteAll}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  showDeleteConfirm
                    ? 'bg-red-700 text-white hover:bg-red-800'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                {showDeleteConfirm ? 'Confirm Delete' : 'Delete All'}
              </button>
            </div>
          </div>
        </div>

        {/* Privacy & Info */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Privacy & Information</h2>

          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Local Storage Only</h3>
              <p>
                All your data is stored locally in your browser using localStorage. Nothing is sent
                to external servers. Your data stays on your device.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Biodynamic Calculations</h3>
              <p>
                Moon phase and biodynamic day calculations are simplified approximations for this MVP.
                For production use, consider integrating astronomical libraries like 'suncalc' for
                precise calculations.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Permaculture Principles</h3>
              <p>
                Recommendations blend traditional biodynamic practices with modern permaculture
                principles. Always adapt advice to your specific conditions and local knowledge.
              </p>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <h2 className="text-lg font-semibold text-green-900 mb-2">About This App</h2>
          <p className="text-sm text-green-800">
            BioPermaculture Calendar helps you plan garden activities based on biodynamic
            principles, moon phases, and your local climate. Built with Next.js, TypeScript, and TailwindCSS.
          </p>
          <p className="text-xs text-green-700 mt-2">
            Version 1.0.0 | Created as an educational tool for sustainable gardening
          </p>
        </div>
      </div>
    </div>
  );
}

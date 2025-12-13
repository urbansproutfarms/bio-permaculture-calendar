'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Storage } from '@/lib/storage';
import { generateCalendar } from '@/lib/calendar-engine';
import { getMoonEmoji } from '@/lib/moon-phase';
import { getDayTypeElement, getDayTypeColor } from '@/lib/biodynamic';
import { UserProfile } from '@/types/profile';
import { CalendarDay } from '@/types/calendar';

export default function CalendarPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [calendar, setCalendar] = useState<CalendarDay[]>([]);
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadedProfile = Storage.loadProfile();

    if (!loadedProfile) {
      router.push('/onboarding');
      return;
    }

    setProfile(loadedProfile);

    // Generate 30-day calendar
    const cal = generateCalendar(loadedProfile);
    setCalendar(cal);

    // Select today by default
    setSelectedDay(cal[0]);

    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4 text-muted-foreground">Loading calendar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-green-600 text-white p-4">
        <div className="container mx-auto max-w-6xl flex items-center justify-between">
          <h1 className="text-2xl font-bold">30-Day Calendar</h1>
          <nav className="flex gap-4">
            <Link href="/dashboard" className="text-white hover:underline">
              Dashboard
            </Link>
            <Link href="/calendar" className="text-white hover:underline font-semibold">
              Calendar
            </Link>
            <Link href="/journal" className="text-white hover:underline">
              Journal
            </Link>
            <Link href="/settings" className="text-white hover:underline">
              Settings
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto max-w-6xl p-4 md:p-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar Grid */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Select a Day</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {calendar.map((day, idx) => {
                const isSelected = selectedDay?.date.getDate() === day.date.getDate();
                const isToday = idx === 0;

                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedDay(day)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      isSelected
                        ? 'ring-2 ring-green-500 shadow-lg'
                        : 'hover:shadow-md'
                    } ${getDayTypeColor(day.dayType)}`}
                  >
                    {isToday && (
                      <span className="inline-block mb-2 px-2 py-0.5 bg-green-600 text-white text-xs font-semibold rounded">
                        TODAY
                      </span>
                    )}
                    <p className="text-sm text-gray-600 mb-1">
                      {day.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </p>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-3xl">{getMoonEmoji(day.moonPhase)}</span>
                      <div className="text-right">
                        <p className="text-xs text-gray-600">{day.moonPhase}</p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {day.dayType} Day
                    </p>
                    <p className="text-xs text-gray-600">{getDayTypeElement(day.dayType)}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Day Details */}
          {selectedDay && (
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-4">
                <div className={`p-6 rounded-lg border-2 ${getDayTypeColor(selectedDay.dayType)}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {selectedDay.date.toLocaleDateString('en-US', { weekday: 'long' })}
                      </h3>
                      <p className="text-sm text-gray-700">
                        {selectedDay.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                    <span className="text-4xl">{getMoonEmoji(selectedDay.moonPhase)}</span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-xs text-gray-600">Moon Phase</p>
                      <p className="font-semibold text-gray-900">{selectedDay.moonPhase}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Day Type</p>
                      <p className="font-semibold text-gray-900">
                        {selectedDay.dayType} {getDayTypeElement(selectedDay.dayType)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Seasonal Mode</p>
                      <p className="font-semibold text-gray-900">{selectedDay.seasonalMode}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Best Actions</h4>
                    <ul className="space-y-1">
                      {selectedDay.bestActions.map((action, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                          <span className="text-green-600 mt-0.5">✓</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Avoid</h4>
                    <ul className="space-y-1">
                      {selectedDay.avoidActions.map((action, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                          <span className="text-red-600 mt-0.5">✗</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Best Crops</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedDay.bestCrops.map((crop) => (
                        <span key={crop} className="px-2 py-0.5 bg-white rounded-full text-xs text-gray-700 border border-gray-200">
                          {crop}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/50 p-3 rounded-lg">
                    <p className="text-xs font-semibold text-gray-900 mb-1">Quick Task</p>
                    <p className="text-xs text-gray-700">{selectedDay.microTask}</p>
                  </div>
                </div>

                {/* Permaculture Tip */}
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">💡</span>
                    <h4 className="text-sm font-semibold text-gray-900">Permaculture Tip</h4>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">{selectedDay.permacultureTip.category}</p>
                  <h5 className="font-semibold text-sm text-gray-900 mb-1">{selectedDay.permacultureTip.title}</h5>
                  <p className="text-xs text-gray-700">{selectedDay.permacultureTip.description}</p>
                </div>

                {/* Add Journal Note Button */}
                <Link
                  href="/journal"
                  className="block w-full px-4 py-2 bg-green-600 text-white text-center rounded-lg hover:bg-green-700 transition-colors"
                >
                  Add Journal Entry
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

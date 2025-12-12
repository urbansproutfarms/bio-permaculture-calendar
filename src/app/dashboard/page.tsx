'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Storage } from '@/lib/storage';
import { generateCalendar, getTodayData } from '@/lib/calendar-engine';
import { getMoonEmoji } from '@/lib/moon-phase';
import { getDayTypeElement, getDayTypeColor } from '@/lib/biodynamic';
import { UserProfile } from '@/types/profile';
import { CalendarDay } from '@/types/calendar';

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [todayData, setTodayData] = useState<CalendarDay | null>(null);
  const [calendar, setCalendar] = useState<CalendarDay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadedProfile = Storage.loadProfile();

    if (!loadedProfile) {
      router.push('/onboarding');
      return;
    }

    setProfile(loadedProfile);

    // Generate today's data
    const today = getTodayData(loadedProfile);
    setTodayData(today);

    // Generate 30-day calendar
    const cal = generateCalendar(loadedProfile);
    setCalendar(cal);

    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4 text-muted-foreground">Loading your calendar...</p>
        </div>
      </div>
    );
  }

  if (!todayData || !profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-green-600 text-white p-4">
        <div className="container mx-auto max-w-6xl flex items-center justify-between">
          <h1 className="text-2xl font-bold">BioPermaculture Calendar</h1>
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
            <Link href="/settings" className="text-white hover:underline">
              Settings
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto max-w-6xl p-4 md:p-8 space-y-8">
        {/* Today's Highlight */}
        <div className={`p-6 rounded-lg border-2 ${getDayTypeColor(todayData.dayType)}`}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Today</h2>
              <p className="text-gray-700">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
            </div>
            <span className="text-4xl">{getMoonEmoji(todayData.moonPhase)}</span>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-600">Moon Phase</p>
              <p className="font-semibold text-gray-900">{todayData.moonPhase}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Day Type</p>
              <p className="font-semibold text-gray-900">{todayData.dayType} {getDayTypeElement(todayData.dayType)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Seasonal Mode</p>
              <p className="font-semibold text-gray-900">{todayData.seasonalMode}</p>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 mb-2">Best Actions Today</h3>
            <ul className="space-y-1">
              {todayData.bestActions.map((action, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 mb-2">Best Crops for {todayData.dayType} Day</h3>
            <div className="flex flex-wrap gap-2">
              {todayData.bestCrops.map((crop) => (
                <span key={crop} className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border border-gray-200">
                  {crop}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white/50 p-4 rounded-lg">
            <p className="text-sm font-semibold text-gray-900 mb-1">5-Minute Task</p>
            <p className="text-sm text-gray-700">{todayData.microTask}</p>
          </div>
        </div>

        {/* Permaculture Tip */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">💡</span>
            <h3 className="text-lg font-semibold text-gray-900">Permaculture Tip</h3>
          </div>
          <p className="text-xs text-gray-500 mb-2">{todayData.permacultureTip.category}</p>
          <h4 className="font-semibold text-gray-900 mb-1">{todayData.permacultureTip.title}</h4>
          <p className="text-sm text-gray-700">{todayData.permacultureTip.description}</p>
        </div>

        {/* Upcoming Week Preview */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Next 14 Days</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {calendar.slice(0, 14).map((day, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border ${getDayTypeColor(day.dayType)} text-center`}
              >
                <p className="text-xs text-gray-600 mb-1">
                  {day.date.toLocaleDateString('en-US', { weekday: 'short' })}
                </p>
                <p className="text-sm font-semibold text-gray-900 mb-2">
                  {day.date.getDate()}
                </p>
                <p className="text-2xl mb-1">{getMoonEmoji(day.moonPhase)}</p>
                <p className="text-xs font-semibold text-gray-700">{day.dayType}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link
              href="/calendar"
              className="inline-block px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              View Full Calendar
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            href="/journal"
            className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow text-center"
          >
            <span className="text-3xl mb-2 block">📝</span>
            <h3 className="font-semibold text-gray-900 mb-1">Add Journal Entry</h3>
            <p className="text-sm text-gray-600">Record today's observations</p>
          </Link>

          <Link
            href="/calendar"
            className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow text-center"
          >
            <span className="text-3xl mb-2 block">📅</span>
            <h3 className="font-semibold text-gray-900 mb-1">Full Calendar</h3>
            <p className="text-sm text-gray-600">View 14-day forecast</p>
          </Link>

          <Link
            href="/settings"
            className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow text-center"
          >
            <span className="text-3xl mb-2 block">⚙️</span>
            <h3 className="font-semibold text-gray-900 mb-1">Settings</h3>
            <p className="text-sm text-gray-600">Manage your profile</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

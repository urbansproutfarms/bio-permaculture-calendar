'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Storage } from '@/lib/storage';
import { JournalEntry, ObservationType } from '@/types/journal';

const OBSERVATION_TYPES: ObservationType[] = [
  'Pests Seen',
  'Rainfall',
  'Watering',
  'Harvest',
  'Germination',
  'Temperature',
  'Other',
];

export default function JournalPage() {
  const router = useRouter();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [note, setNote] = useState('');
  const [observations, setObservations] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const profile = Storage.loadProfile();
    if (!profile) {
      router.push('/onboarding');
      return;
    }

    loadEntries();
    setLoading(false);
  }, [router]);

  useEffect(() => {
    // Load entry for selected date
    const entry = Storage.loadJournalEntry(new Date(selectedDate));
    if (entry) {
      setNote(entry.note);
      const obs: Record<string, boolean> = {};
      entry.observations.forEach((o) => {
        if (typeof o.value === 'boolean') {
          obs[o.type] = o.value;
        }
      });
      setObservations(obs);
    } else {
      setNote('');
      setObservations({});
    }
  }, [selectedDate]);

  const loadEntries = () => {
    const allEntries = Storage.loadAllJournalEntries();
    setEntries(allEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  };

  const handleSave = () => {
    const entry: JournalEntry = {
      id: `${selectedDate}-${Date.now()}`,
      date: new Date(selectedDate),
      note,
      observations: Object.entries(observations)
        .filter(([_, value]) => value)
        .map(([type, value]) => ({
          type: type as ObservationType,
          value,
        })),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    Storage.saveJournalEntry(entry);
    loadEntries();

    alert('Journal entry saved!');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4 text-muted-foreground">Loading journal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-green-600 text-white p-4">
        <div className="container mx-auto max-w-6xl flex items-center justify-between">
          <h1 className="text-2xl font-bold">Garden Journal</h1>
          <nav className="flex gap-4">
            <Link href="/dashboard" className="text-white hover:underline">
              Dashboard
            </Link>
            <Link href="/calendar" className="text-white hover:underline">
              Calendar
            </Link>
            <Link href="/journal" className="text-white hover:underline font-semibold">
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
          {/* New Entry Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Add Entry</h2>

              {/* Date Selector */}
              <div className="mb-4">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Observations Checklist */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Observations
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {OBSERVATION_TYPES.map((type) => (
                    <label key={type} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={observations[type] || false}
                        onChange={(e) =>
                          setObservations({ ...observations, [type]: e.target.checked })
                        }
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="mb-4">
                <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={6}
                  placeholder="What happened in the garden today? Any observations, harvests, plantings, or learnings..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                />
              </div>

              <button
                onClick={handleSave}
                disabled={!note && Object.keys(observations).filter((k) => observations[k]).length === 0}
                className="w-full px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Save Entry
              </button>
            </div>
          </div>

          {/* Previous Entries */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Entries</h2>

              {entries.length === 0 ? (
                <div className="bg-white p-6 rounded-lg shadow text-center">
                  <p className="text-gray-500 text-sm">No journal entries yet</p>
                  <p className="text-gray-400 text-xs mt-2">Start documenting your garden journey!</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {entries.slice(0, 10).map((entry) => (
                    <div
                      key={entry.id}
                      className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedDate(new Date(entry.date).toISOString().split('T')[0])}
                    >
                      <p className="text-sm font-semibold text-gray-900 mb-1">
                        {new Date(entry.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>

                      {entry.observations.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {entry.observations.map((obs, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full"
                            >
                              {obs.type}
                            </span>
                          ))}
                        </div>
                      )}

                      <p className="text-xs text-gray-600 line-clamp-2">{entry.note}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

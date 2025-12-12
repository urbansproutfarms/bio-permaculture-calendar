/**
 * LocalStorage wrapper for persisting user data
 * Handles serialization, validation, and error recovery
 */

import { UserProfile } from '@/types/profile';
import { JournalEntry } from '@/types/journal';

const STORAGE_KEYS = {
  PROFILE: 'bio-calendar-profile',
  JOURNAL: 'bio-calendar-journal',
  SETTINGS: 'bio-calendar-settings',
} as const;

export class Storage {
  private static isClient(): boolean {
    return typeof window !== 'undefined';
  }

  // User Profile
  static saveProfile(profile: UserProfile): void {
    if (!this.isClient()) return;
    try {
      const data = JSON.stringify(profile);
      localStorage.setItem(STORAGE_KEYS.PROFILE, data);
    } catch (error) {
      console.error('Failed to save profile:', error);
    }
  }

  static loadProfile(): UserProfile | null {
    if (!this.isClient()) return null;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (!data) return null;
      const parsed = JSON.parse(data);

      // Parse dates from strings
      return {
        ...parsed,
        createdAt: new Date(parsed.createdAt),
        updatedAt: new Date(parsed.updatedAt),
        lastSpringFrost: parsed.lastSpringFrost ? new Date(parsed.lastSpringFrost) : null,
        firstFallFrost: parsed.firstFallFrost ? new Date(parsed.firstFallFrost) : null,
      };
    } catch (error) {
      console.error('Failed to load profile:', error);
      return null;
    }
  }

  static hasProfile(): boolean {
    return this.loadProfile() !== null;
  }

  // Journal Entries
  static saveJournalEntry(entry: JournalEntry): void {
    if (!this.isClient()) return;
    try {
      const entries = this.loadAllJournalEntries();
      const existingIndex = entries.findIndex(e => e.id === entry.id);

      if (existingIndex >= 0) {
        entries[existingIndex] = entry;
      } else {
        entries.push(entry);
      }

      localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(entries));
    } catch (error) {
      console.error('Failed to save journal entry:', error);
    }
  }

  static loadAllJournalEntries(): JournalEntry[] {
    if (!this.isClient()) return [];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.JOURNAL);
      if (!data) return [];
      const entries = JSON.parse(data);

      // Parse dates from strings for all entries
      return entries.map((entry: any) => ({
        ...entry,
        date: new Date(entry.date),
        createdAt: new Date(entry.createdAt),
        updatedAt: new Date(entry.updatedAt),
      }));
    } catch (error) {
      console.error('Failed to load journal entries:', error);
      return [];
    }
  }

  static loadJournalEntry(date: Date): JournalEntry | null {
    const entries = this.loadAllJournalEntries();
    const dateString = date.toISOString().split('T')[0];
    return entries.find(e => {
      const entryDateString = new Date(e.date).toISOString().split('T')[0];
      return entryDateString === dateString;
    }) || null;
  }

  // Clear all data
  static clearAll(): void {
    if (!this.isClient()) return;
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }

  // Export data as JSON
  static exportData(): string {
    return JSON.stringify({
      profile: this.loadProfile(),
      journal: this.loadAllJournalEntries(),
      exportedAt: new Date().toISOString()
    }, null, 2);
  }

  // Import data from JSON
  static importData(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (data.profile) this.saveProfile(data.profile);
      if (data.journal && Array.isArray(data.journal)) {
        data.journal.forEach((entry: JournalEntry) => this.saveJournalEntry(entry));
      }
      return true;
    } catch (error) {
      console.error('Failed to import data:', error);
      return false;
    }
  }
}

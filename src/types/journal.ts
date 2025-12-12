export interface JournalEntry {
  id: string;
  date: Date;
  note: string;
  observations: Observation[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Observation {
  type: ObservationType;
  value: string | boolean;
}

export type ObservationType =
  | 'Pests Seen'
  | 'Rainfall'
  | 'Watering'
  | 'Harvest'
  | 'Germination'
  | 'Temperature'
  | 'Other';

export interface HistoryItem {
    id: number;
    created_at: string;
    category: 'fralda' | 'amamentacao' | 'sono';
    date_time: string | null;
    start_time: string | null;
    end_time: string | null;
    notes: string | null;
    diaper_type: string | null;
    type: string | null;
    duration: number | null;
    user_uuid: string;
  }
  
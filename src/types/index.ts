export type AlertType = 'fire' | 'earthquake';

export interface LogEntry {
  id: string;
  type: AlertType;
  timestamp: number;
}

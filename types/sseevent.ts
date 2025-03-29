
export type SSEEventType = 'progress' | 'error' | 'complete'; 
export type SSEEventData = {
  message?: string;
  progress?: number;
  error?: string;
  success?: boolean;
  hash?: string;
  data?: any;
};
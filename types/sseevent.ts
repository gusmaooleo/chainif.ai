
export type SSEEventType = 'progress' | 'error' | 'complete'; 
export type SSEEventData = {
  message?: string;
  progress?: number;
  error?: string;
  author?: string;
  success?: boolean;
  hash?: string;
  data?: any;
};
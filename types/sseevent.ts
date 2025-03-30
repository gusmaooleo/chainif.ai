
export type SSEEventType = 'progress' | 'error' | 'complete'; 
export type SSEEventData = {
  message?: string;
  progress?: number;
  state?: string;
  error?: number;
  author?: string;
  success?: boolean;
  hash?: string;
  data?: any;
  tx_id?: string;
};
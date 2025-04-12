import { SerializableFile } from "./serializable-file";

export interface SSEBaseEvent {
  type: SSEEventType;
}

export interface SSEProgressEvent extends SSEBaseEvent {
  type: 'progress';
  state: string;
  progress: number;
}

export interface SSECompleteEvent extends SSEBaseEvent {
  type: 'complete';
  success?: boolean;
  message?: string;
  state?: string;
  data: string | SerializableFile;
  date?: string;
  hash: string;
  author?: string;
  tx_id?: string;
}

export interface SSEErrorEvent extends SSEBaseEvent {
  type: 'error';
  message: string;
  error?: number;
  date?: string;
}

export type SSEEvent = SSEProgressEvent | SSECompleteEvent | SSEErrorEvent;
export type SSEEventType = 'progress' | 'error' | 'complete'; 

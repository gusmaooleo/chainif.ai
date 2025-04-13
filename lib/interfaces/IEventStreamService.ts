import { 
  SSECompleteEvent, 
  SSEErrorEvent, 
  SSEEvent, 
} from "@/types/sseevent";

export interface IEventStreamService {
  /**
   * Send a generic event on stream
   * @param event O evento to be sent
   */
  sendEvent(event: SSEEvent): void;

  /**
   * Send a event progress
   * @param state Current process state
   * @param progress (0-100)
   */
  sendProgress(state: string, progress: number): void;

  /**
   * Send a conclusion event
   * @param data Event data
   */
  sendComplete(data: Omit<SSECompleteEvent, 'type'>): void;

  /**
   * Throws an error event
   * @param data Error data
   */
  sendError(data: Omit<SSEErrorEvent, 'type'>): void;

  /**
   * Close stream event
   */
  close(): void;
}
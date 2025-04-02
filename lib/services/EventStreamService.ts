import { SSECompleteEvent, SSEErrorEvent, SSEEvent } from "@/types/sseevent";

export class EventStreamService {
  private controller: ReadableStreamDefaultController;
  private encoder: TextEncoder;

  constructor(controlller: ReadableStreamDefaultController) {
    this.controller = controlller;
    this.encoder = new TextEncoder();
  }

  public sendEvent(event: SSEEvent): void {
    const message = `event: ${event.type}\ndata: ${JSON.stringify(event)}\n\n`;
    this.controller.enqueue(this.encoder.encode(message));
  }

  public sendProgress(state: string, progress: number): void {
    this.sendEvent({
      type: 'progress',
      state,
      progress,
    })
  }

  public sendComplete(data: Omit<SSECompleteEvent, 'type'>): void {
    this.sendEvent({
      type: 'complete',
      ...data,
    })
  }

  public sendError(data: Omit<SSEErrorEvent, 'type'>): void {
    this.sendEvent({
      type: 'error',
      ...data,
    });
  }

  public close(): void {
    this.controller.close();
  }
}
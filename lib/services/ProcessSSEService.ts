import { parseSSEData } from "@/utils/parse-ssedata";
import { SSEEvent } from "@/types/sseevent";
import { RequestForm } from "@/types/form";

type ProcessSSEOptions = {
  onError: (error: Error) => void;
  onData: (data: SSEEvent) => void;
};

export class ProcessSSEService {
  static async processSSEResponse(
    response: Response,
    options: ProcessSSEOptions
  ) {
    if (!response.body) {
      throw new Error("We cannot connect to the server.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const events = chunk.split("\n\n").filter(Boolean);

      for (const event of events) {
        ProcessSSEService.processSSEEvent(event, options);
      }
    }
  }

  private static processSSEEvent(event: string, options: ProcessSSEOptions) {
    const lines = event.split("\n");
    const data = parseSSEData(lines) as SSEEvent;

    if (data === null) return;

    options.onData(data as SSEEvent);

    if (data.type === "error" && data.error === 400) {
      options.onError(
        new Error(
          data.message || "Check that all data has been passed correctly."
        )
      );
    }
  }

  static async uploadContent(
    { content, author }: RequestForm,
    options: ProcessSSEOptions
  ) {
    const response = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, author }),
    });

    await this.processSSEResponse(response, options);
  }
}
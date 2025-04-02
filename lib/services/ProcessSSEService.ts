import { parseSSEData } from "@/utils/parse-ssedata";
import { SSEEvent } from "@/types/sseevent";

type UploadParams = {
  content: string;
  author: string;
};

type ProcessSSEOptions = {
  onData: (data: SSEEvent) => void;
  onError: (error: Error) => void;
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

    options.onData(data);

    if (data.type === "error" && data.error === 400) {
      options.onError(
        new Error(
          data.message || "Check that all data has been passed correctly."
        )
      );
    }
  }

  static async uploadContent(
    { content, author }: UploadParams,
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
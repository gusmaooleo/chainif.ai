import { SSEEvent } from "@/types/sseevent";

export function parseSSEData(lines: string[]): SSEEvent | null {
  const validLines = lines.filter(
    (line) =>
      line.startsWith("data:") || line.startsWith("event:") || line === ""
  );

  if (!validLines.some((line) => line.startsWith("data:"))) {
    return null;
  }

  try {
    const jsonStr = validLines
      .filter((line) => line.startsWith("data:"))
      .map((line) => line.slice(5).trim())
      .join("");

    if (!(jsonStr.includes("{") && jsonStr.includes("}"))) {
      return null;
    }

    const parsed = JSON.parse(jsonStr) as SSEEvent;

    if (parsed.type === "complete" && typeof parsed.data === "string") {
      parsed.data = parsed.data
        .replace(/\\n/g, "\n")
        .replace(/\\r/g, "\r")
        .replace(/\\t/g, "\t");
    }

    return parsed;
  } catch (error) {
    console.error("SSE Parsing Error:", error);
    return {
      type: "error",
      message: "Error when receiving data",
    };
  }
}
